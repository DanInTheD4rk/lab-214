import { useState, useRef, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import failedExperiment from "public/extractor/failedExperiment.gif"
import dnaTransfer from "public/extractor/dnaTransfer.gif"
import abis from "constants/abis"
import { Contract, ethers } from "ethers"
import { useContractEvent, useSigner } from "wagmi"
import { MUTANT_TIERS, BOOST_OPTIONS } from "constants/extractor"
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

const DNA_CONTRACT = process.env.NEXT_PUBLIC_DNA_CONTRACT
const SCALES_CONTRACT = process.env.NEXT_PUBLIC_SCALES_CONTRACT
const RWASTE_CONTRACT = process.env.NEXT_PUBLIC_RWASTE_CONTRACT
const NETWORK = process.env.NEXT_PUBLIC_NETWORK

const getTierColor = (tier) => {
	// prettier-ignore
	return tier === 6 
		? "bg-green-700"
		: [5, 4, 3].includes(tier)
			? "bg-yellow-700"
			: "bg-red-700"
}

const EXTRACTION_COST = 600

const ExtractTile = ({ mutant: mutant }) => {
	const { setLoading: setLoading } = useLoading()
	let tierColor = getTierColor(mutant.tier)
	const tierRef = useRef(null)
	const imgRef = useRef(null)
	const actionButtonRef = useRef(null)
	const { data: signer } = useSigner()
	const { open, setOpen, setContents } = useModal()
	const canTransfer = mutant.lastExtractor === (signer && signer._address) && mutant.extractedDnaId >= 0
	const extractCost = mutant.extractionCost && mutant.extractionCost.split(".")[0]

	const extractDna = async (boostOption) => {
		const dnaContract = new ethers.Contract(DNA_CONTRACT, abis.dna, signer)
		const scalesContract = new ethers.Contract(SCALES_CONTRACT, abis.scales, signer)
		const stakingContract = new ethers.Contract(mutant.labAddress, abis.extractorLab, signer)
		const rwasteContract = new ethers.Contract(RWASTE_CONTRACT, abis.rwaste, signer)

		const extractionFilter = dnaContract.filters.ExtractionComplete(mutant.tokenId, null, null, null)

		dnaContract.once(extractionFilter, (mutantId, batchId, boostId, results) => {
			dnaContract.off(extractionFilter)
			const resultsModalInfo = {
				title: "Extraction Results",
				component: <ResultsModal results={results} transferDna={() => transferDna(mutant)} />,
			}
			setContents(resultsModalInfo)
			actionButtonRef.current.disabled = results.success
			setLoading(false)
			setOpen(true)
		})

		setLoading(true)
		const totalCost = await stakingContract.getTotalExtractionCost()
		const scaleAllowance = await scalesContract.allowance(signer._address, stakingContract.address)
		const scalesPromise =
			scaleAllowance < totalCost
				? await scalesContract.approve(mutant.labAddress, totalCost).catch((error) => {
						console.log(error)
						setLoading(false)
				  })
				: Promise.resolve()
		let rwastePromise = Promise.resolve()
		const rwasteAllowance = await rwasteContract.allowance(signer._address, stakingContract.address)
		if (boostOption.id > 0) {
			rwastePromise =
				rwasteAllowance < boostOption.value
					? await rwasteContract
							.approve(mutant.labAddress, ethers.utils.parseEther(boostOption.value))
							.catch((error) => {
								console.log(error)
								setLoading(false)
							})
					: rwastePromise
		}
		if (rwasteAllowance >= boostOption.value && scaleAllowance >= totalCost) {
			await stakingContract
				.extractDna(mutant.tokenId, boostOption.id, totalCost.sub(ethers.utils.parseEther(EXTRACTION_COST.toString())))
				.catch((error) => {
					console.log(error)
					setLoading(false)
				})
		} else {
			Promise.all([scalesPromise, rwastePromise]).then(async () => {
				const filterContract = boostOption.id > 0 ? rwasteContract : scalesContract
				const approveFilter = filterContract.filters.Approval(signer._address, stakingContract.address, null)
				filterContract.once(approveFilter, async () => {
					filterContract.off(approveFilter)
					await stakingContract
						.extractDna(
							mutant.tokenId,
							boostOption.id,
							totalCost.sub(ethers.utils.parseEther(EXTRACTION_COST.toString()))
						)
						.catch((error) => {
							console.log(error)
							setLoading(false)
						})
				})
			})
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
			actionButtonRef.current.disabled = true
			dnaContract.off(transferFilter)
			setLoading(false)
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
			<div
				id={`mutantTile${mutant.tokenId}`}
				key={mutant.tokenId}
				className="rounded-lg bg-black bg-opacity-50 p-1 m-2"
			>
				<div className="w-32 m-2">
					<div className="text-white font-medium text-xs leading-tight uppercase text-center font-bold mb-2">
						{extractCost} $SCALES
					</div>
					<div className="w-full flex justify-center items-center">
						<button disabled type="button" className={`${styles.tierButton + " " + tierColor} font-bold mb-2`}>
							<div className={"px-1.5 py-1.5 "}>
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
						disabled={
							((!signer || !mutant.canExtract) && signer && signer._address !== mutant.mutantOwner) ||
							mutant.chain !== NETWORK
						}
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
	const [boostOption, setBoostOption] = useState(BOOST_OPTIONS[0])
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
						options={BOOST_OPTIONS}
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
	mutant: PropTypes.shape({
		tier: PropTypes.number,
		lastExtractor: PropTypes.string,
		extractionCost: PropTypes.string,
		extractedDnaId: PropTypes.number,
		labAddress: PropTypes.string,
		tokenId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		canExtract: PropTypes.bool,
		chain: PropTypes.oneOf(["goerli", "homestead"]),
		mutantOwner: PropTypes.string,
	}),
}

ModalComponent.propTypes = {
	extractCost: PropTypes.string,
	extractDna: PropTypes.func,
}
