import { useState, useRef, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import failedExperiment from "../../public/failedExperiment.gif"
import dnaTransfer from "../../public/dna/dnaTransfer.gif"
import abis from "../../constants/abisGoerli"
import abisMainnet from "../../constants/abisMainnet"
import { Contract, ethers } from "ethers"
import { useContractEvent, useSigner } from "wagmi"
import { MUTANT_TIERS, DEFAULT_DNA_ID } from "../../constants/extractor"
import { useLoading } from "../LoadingContext"
import { useModal } from "../ModalContext"
import ResultsModal from "./ResultsModal"
import Select from "../Select"

const styles = {
	button:
		"px-6 py-2.5 bg-gray-600 text-white font-medium text-xs font-bold leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
	tierButton:
		"w-full text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
}

const MUTANT_CONTRACT = process.env.NEXT_PUBLIC_MUTANT_CONTRACT
const DNA_CONTRACT = process.env.NEXT_PUBLIC_DNA_CONTRACT
const FACTORY_CONTRACT = process.env.NEXT_PUBLIC_EXTRACTOR_LAB_FACTORY_CONTRACT
const SCALES_CONTRACT = process.env.NEXT_PUBLIC_SCALES_CONTRACT
const RWASTE_CONTRACT = process.env.NEXT_PUBLIC_RWASTE_CONTRACT

const getTierColor = (tier) => {
	// prettier-ignore
	return tier === 6 
		? "bg-green-700"
		: [5, 4, 3].includes(tier)
			? "bg-yellow-700"
			: "bg-red-700"
}

const boostOptions = [
	{ id: 0, value: "0", name: "Default", probability: "(1%, 4%, 15%, 30%, 50%)" },
	{ id: 1, value: "200", name: "Basic Boost", probability: "(2%, 8%, 25%, 45%, 20%)" },
	{ id: 2, value: "100", name: "No Commons", probability: "(1%, 4%, 15%, 80%, 0%)" },
	{ id: 3, value: "75", name: "50/50 Rare/Common", probability: "(0%, 0%, 50%, 0%, 50%)" },
	{ id: 4, value: "500", name: "Flattened", probability: "(20%, 20%, 20%, 20%, 20%)" },
	{ id: 5, value: "750", name: "Always Epic", probability: "(0%, 100%, 0%, 0%, 0%)" },
]

const ExtractTile = (props) => {
	const mutant = props.mutant
	const { setLoading: setLoading } = useLoading()
	let tierColor = getTierColor(mutant.tier)
	const tierRef = useRef(null)
	const tierButtonRef = useRef(null)
	const imgRef = useRef(null)
	const actionButtonRef = useRef(null)
	const { data: signer } = useSigner()
	const { open, setOpen, setContents } = useModal()
	const canTransfer = mutant.lastExtractor === signer._address && mutant.extractedDnaId !== DEFAULT_DNA_ID
	const extractCost = mutant.extractionCost && mutant.extractionCost.split(".")[0]

	const extractDna = async (boostOption) => {
		const dnaContract = new ethers.Contract(DNA_CONTRACT, abis.dna, signer)
		const scalesContract = new ethers.Contract(SCALES_CONTRACT, abis.scales, signer)
		const stakingContract = new ethers.Contract(mutant.labAddress, abis.extractorLab, signer)
		const filter = scalesContract.filters.Approval(signer._address, mutant.labAddress, null)
		const rwasteContract = new ethers.Contract(RWASTE_CONTRACT, abis.rwaste, signer)

		// scalesContract.once(filter, async () => {
		// 	scalesContract.off(filter)
		const extractionFilter = dnaContract.filters.ExtractionComplete(mutant.tokenId, null, null, null)

		dnaContract.once(extractionFilter, (mutantId, batchId, boostId, results) => {
			dnaContract.off(extractionFilter)
			const resultsModalInfo = {
				title: "Extraction Results",
				component: <ResultsModal results={results} transferDna={() => transferDna(mutant)} />,
			}
			setContents(resultsModalInfo)
			actionButtonRef.current.disabled = true
			setLoading(false)
			setOpen(true)
		})
		// 	await stakingContract.extractDna(mutant.tokenId, 0).catch((error) => {
		// 		console.log(error)
		// 		setLoading(false)
		// 	})
		// })

		const canExtract = await dnaContract.isCooledDown(mutant.tokenId).catch((error) => {
			console.log(error)
			setLoading(false)
		})
		if (canExtract) {
			setLoading(true)
			const totalCost = await stakingContract.getFee().then(async (fee) => {
				const extractCost = await stakingContract.getExtractionCost()
				return (Number(fee) + Number(extractCost)).toString()
			})

			const scalesPromise = await scalesContract.approve(mutant.labAddress, totalCost).catch((error) => {
				console.log(error)
				setLoading(false)
			})
			const rwastePromise =
				boostOption.id > 0
					? await rwasteContract
							.approve(mutant.labAddress, ethers.utils.parseEther(boostOption.value))
							.catch((error) => {
								console.log(error)
								setLoading(false)
							})
					: new Promise()

			Promise.all([scalesPromise, rwastePromise]).then(async () => {
				await stakingContract.extractDna(mutant.tokenId, boostOption.id).catch((error) => {
					console.log(error)
					setLoading(false)
				})
			})
		} else {
			// toast: mutant is not cooled down
			console.log("not cooled down")
		}
	}

	const transferDna = async (mutant) => {
		setLoading(true)
		const dnaContract = new ethers.Contract(DNA_CONTRACT, abis.dna, signer)
		const stakingContract = new ethers.Contract(mutant.labAddress, abis.extractorLab, signer)
		const transferFilter = dnaContract.filters.TransferSingle(null, mutant.labAddress, signer._address, null, null)

		dnaContract.once(transferFilter, (operator, from, to, id, amount) => {
			// TODO: transfer complete toast
			console.log("transfered!")
			dnaContract.off(transferFilter)
			setLoading(false)
			// setOpen(true)
		})
		await stakingContract.transferDna().catch((error) => {
			console.log(error)
			setLoading(false)
		})
	}

	const modalInfo = {
		title: "Extract DNA",
		component: <ModalComponent extractCost={extractCost} extractDna={extractDna} />,
	}

	return (
		<>
			<div id={`mutantTile${mutant.tokenId}`} key={mutant.tokenId} className="rounded-lg bg-gray-200 p-1 m-2">
				<div className="w-32 m-2">
					<div className="font-medium text-xs leading-tight uppercase text-center font-bold mb-2">
						{extractCost} $SCALES
					</div>
					<div className="w-full flex justify-center items-center">
						<button
							disabled
							ref={tierButtonRef}
							type="button"
							className={`${styles.tierButton + " " + tierColor} opacity-80 font-bold mb-2`}
						>
							<div className={"px-1.5 py-1.5 relative"}>
								<span className="font-bold text-lg mr-2">{mutant.tokenId}</span>{" "}
								<span ref={tierRef} className="italic">
									Tier: {MUTANT_TIERS[mutant.tier]}
								</span>
							</div>
						</button>
					</div>
					<img
						ref={imgRef}
						src={canTransfer ? dnaTransfer.src : failedExperiment.src}
						className="rounded-lg w-full mb-2"
						alt="failed experiment"
					/>
					<button
						ref={actionButtonRef}
						disabled={(!signer || !mutant.canExtract) && !canTransfer}
						type="button"
						className={`${styles.button} w-full disabled:opacity-50`}
						onClick={
							canTransfer
								? () => transferDna(mutant)
								: () => {
										setContents(modalInfo)
										setOpen(true)
								  }
						}
					>
						{canTransfer ? "Transfer" : "Extract"}
					</button>
				</div>
			</div>
		</>
	)
}

const ModalComponent = ({ extractCost, extractDna }) => {
	const [boostOption, setBoostOption] = useState(boostOptions[0])
	const { setOpen } = useModal()

	return (
		<div>
			<div className="flex">
				<div className="pl-4 pt-2">
					<div className="mb-2">SCALES: {extractCost}</div>
					<div className="mb-2">RWASTE: {boostOption && boostOption.value}</div>
					<Select
						className="w-56"
						value={boostOption}
						setValue={setBoostOption}
						options={boostOptions}
						placeholder={"RWASTE Boost"}
					/>
				</div>
				<div className="pr-6">
					<div className="mb-2">Rarity Probability:</div>
					<div className="text-xs">Legendary &#x21e8; Common</div>
					<div>{boostOption && boostOption.probability}</div>
				</div>
			</div>
			<div className="mt-3 px-2 py-1 min-w-max sm:flex sm:flex-row-reverse">
				<button
					type="button"
					className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-700 hover:opacity-80 px-4 py-2 text-base font-medium
						text-white leading-tight uppercase shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
					onClick={() => {
						extractDna(boostOption)
						setOpen(false)
					}}
				>
					Extract
				</button>
				<button
					type="button"
					className="mt-3 leading-tight uppercase inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base
						font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
					onClick={() => setOpen(false)}
				>
					Cancel
				</button>
			</div>
		</div>
	)
}

export default ExtractTile

ExtractTile.propTypes = {
	mutant: PropTypes.object,
}
