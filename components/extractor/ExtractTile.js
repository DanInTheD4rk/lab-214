import { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import failedExperiment from "../../public/failedExperiment.gif"
import abis from "../../constants/abisGoerli"
import abisMainnet from "../../constants/abisMainnet"
import { Contract, ethers } from "ethers"
import { useContractEvent, useSigner } from "wagmi"
import { MUTANT_TIERS } from "../../constants/extractor"
import { useLoading } from "../LoadingContext"
import { useModal } from "../ModalContext"
import ResultsModal from "./ResultsModal"
import { setLazyProp } from "next/dist/server/api-utils"

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

const getTierColor = (tier) => {
	// prettier-ignore
	return tier === 6 
		? "bg-green-700"
		: [5, 4, 3].includes(tier)
			? "bg-yellow-700"
			: "bg-red-700"
}

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

	const extractDna = async () => {
		const dnaContract = new ethers.Contract(DNA_CONTRACT, abis.dna, signer)
		const scalesContract = new ethers.Contract(SCALES_CONTRACT, abis.scales, signer)
		const stakingContract = new ethers.Contract(mutant.labAddress, abis.extractorLab, signer)
		const filter = scalesContract.filters.Approval(signer._address, mutant.labAddress, null)

		scalesContract.once(filter, async () => {
			scalesContract.off(filter)
			const extractionFilter = dnaContract.filters.ExtractionComplete(mutant.tokenId, null, null, null)

			dnaContract.once(extractionFilter, (mutantId, batchId, boostId, results) => {
				dnaContract.off(extractionFilter)

				console.log(results)
				const resultsModalInfo = {
					title: "Extraction Results",
					actionName: results.success ? "Transfer" : "",
					action: results.success ? () => transerDna(results) : () => console.log("test"),
					actionColor: "green",
					component: <ResultsModal results={results} />,
				}
				actionButtonRef.current.disabled = true
				setLoading(false)
				setContents(resultsModalInfo)
				setOpen(true)
			})
			await stakingContract.extractDna(mutant.tokenId, 0).catch((error) => {
				console.log(error)
				setLoading(false)
			})
		})

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
			await scalesContract.approve(mutant.labAddress, totalCost).catch((error) => {
				console.log(error)
				setLoading(false)
			})
		} else {
			// toast: mutant is not cooled down
			console.log("not cooled down")
		}
	}

	const transerDna = async (results) => {
		console.log("transfered!")
		setLoading(true)
		const dnaContract = new ethers.Contract(DNA_CONTRACT, abis.dna, signer)
		const stakingContract = new ethers.Contract(mutant.labAddress, abis.extractorLab, signer)
		const transferFilter = dnaContract.filters.TransferSingle(null, mutant.labAddress, signer._address, null, null)

		dnaContract.once(transferFilter, (operator, from, to, id, amount) => {
			dnaContract.off(transferFilter)
			console.log(results)

			const resultsModalInfo = {
				title: "Extraction Results",
				actionName: results.success ? "Transfer" : "",
				action: results.success ? transerDna(results) : () => {},
				actionColor: "green",
				component: <ResultsModal results={results} />,
			}
			actionButtonRef.current.disabled = true
			setLoading(false)
			setContents(resultsModalInfo)
			setOpen(true)
		})

		await stakingContract.transferDna(results.tokenId).catch((error) => {
			console.log(error)
			setLoading(false)
		})
	}

	const modalInfo = {
		title: "Extract DNA",
		actionName: "Extract",
		action: () => extractDna(),
		actionColor: "red",
		component: <>Extracting DNA</>,
	}

	return (
		<>
			<div id={`mutantTile${mutant.tokenId}`} key={mutant.tokenId} className="rounded-lg bg-gray-200 p-1 m-2">
				<div className="w-32 m-2">
					<div className="w-full flex justify-center items-center">
						<button
							disabled={true}
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
						src={(mutant.rawMetadata && mutant.rawMetadata.image) || failedExperiment.src}
						className="rounded-lg w-full mb-2"
						alt="failed experiment"
					/>
					<button
						ref={actionButtonRef}
						disabled={!signer || !mutant.canExtract}
						type="button"
						className={`${styles.button} w-full disabled:opacity-50`}
						// onClick={() => extractDna()}
						// onClick={() => props.setOpenModal(true)}
						onClick={() => {
							setContents(modalInfo)
							setOpen(true)
						}}
					>
						Extract
					</button>
				</div>
			</div>
		</>
	)
}

export default ExtractTile

ExtractTile.propTypes = {
	mutant: PropTypes.object,
}
