import { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import failedExperiment from "../../public/failedExperiment.gif"
import abis from "../../constants/abisGoerli"
import abisMainnet from "../../constants/abisMainnet"
import { Contract, ethers } from "ethers"
import { useContractEvent, useSigner } from "wagmi"
import { ACTION_TYPES } from "../../constants/extractor"
import { useLoading } from "../LoadingContext"

const styles = {
	button:
		"px-6 py-2.5 bg-gray-600 text-white font-medium text-xs font-bold leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
	tierButton:
		"w-full text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const MUTANT_CONTRACT = process.env.NEXT_PUBLIC_MUTANT_CONTRACT
const DNA_CONTRACT = process.env.NEXT_PUBLIC_DNA_CONTRACT
const FACTORY_CONTRACT = process.env.NEXT_PUBLIC_EXTRACTOR_LAB_FACTORY_CONTRACT
const SCALES_CONTRACT = process.env.NEXT_PUBLIC_SCALES_CONTRACT

const MUTANT_TIERS = {
	0: "F",
	1: "E",
	2: "D",
	3: "C",
	4: "B",
	5: "A",
	6: "S",
}

const getTierColor = (tier) => {
	// prettier-ignore
	return tier === 6 
		? "bg-green-700"
		: [5, 4, 3].includes(tier)
			? "bg-yellow-700"
			: "bg-red-700"
}

const MutantTile = (props) => {
	const mutant = props.mutant
	const { setLoading: setLoading } = useLoading()
	let tierColor = getTierColor(mutant.tier)
	const tierRef = useRef(null)
	const tierButtonRef = useRef(null)
	const imgRef = useRef(null)
	const actionButtonRef = useRef(null)
	const { data: signer } = useSigner()
	const mutantContract = new ethers.Contract(MUTANT_CONTRACT, abis.mutant, signer)
	const [action, setAction] = useState(null)

	useEffect(() => {
		// prettier-ignore
		const actionFunction = props.action === ACTION_TYPES.CREATE
			? () => createLab()
			: props.action === ACTION_TYPES.EXTRACT 
				? () => extractDna()
				: props.action === ACTION_TYPES.STAKE
					? () => stakeMutant()
					: () => unstakeMutant()
		setAction(() => actionFunction)
	}, [])

	const createLab = async () => {
		setLoading(true)
		const factoryContract = new ethers.Contract(FACTORY_CONTRACT, abis.extractorLabFactory, signer)
		await factoryContract.createLab(mutant.tokenId).catch((error) => {
			console.log(error)
			setLoading(false)
		})
		setLoading(false)
	}

	const stakeMutant = async () => {
		setLoading(true)
		const mutantContract = new ethers.Contract(MUTANT_CONTRACT, abis.mutant, signer)
		const factoryContract = new ethers.Contract(FACTORY_CONTRACT, abis.extractorLabFactory, signer)
		const stakingAddress = await factoryContract.mutantToLab(mutant.tokenId)
		const owner = await mutantContract.ownerOf(mutant.tokenId)

		const filter = mutantContract.filters.Approval(owner, mutant.labAddress, mutant.tokenId)
		mutantContract.once(filter, async (_, approvedAddress, tokenId) => {
			mutantContract.off(filter)
			const stakingContract = new ethers.Contract(approvedAddress, abis.extractorLab, signer)
			stakingContract.once("Staked", () => {
				actionButtonRef.current.innerText = "Unstake"
				setAction(() => unstakeMutant)
				imgRef.current.src = failedExperiment.src
				setLoading(false)
			})
			await stakingContract.stakeMutant(tokenId.toString()).catch((error) => {
				console.log(error)
				setLoading(false)
			})
		})

		await mutantContract.approve(stakingAddress, mutant.tokenId).catch((error) => {
			console.log(error)
			setLoading(false)
		})
	}

	const unstakeMutant = async () => {
		const stakingContract = new ethers.Contract(mutant.labAddress, abis.extractorLab, signer)
		const filter = stakingContract.filters.Unstaked(mutant.tokenId, null)
		stakingContract.once(filter, async () => {
			mutantContract.off(filter)
			actionButtonRef.current.innerText = "Stake"
			setAction(() => stakeMutant)
			await mutantContract.tokenURI(mutant.tokenId).then((uri) => {
				fetch(uri)
					.then((resp) => resp.json())
					.then((mutant) => {
						imgRef.current.src = mutant.image || failedExperiment.src
					})
					.catch((error) => {
						console.log(error)
						setLoading(false)
					})
			})
			setLoading(false)
		})
		setLoading(true)
		await stakingContract.unstakeMutant(mutant.tokenId).catch((error) => {
			console.log(error)
			setLoading(false)
		})
	}

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
				actionButtonRef.current.disabled = true
				setLoading(false)
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

	return (
		<>
			<div id={`mutantTile${mutant.tokenId}`} key={mutant.tokenId} className="rounded-lg bg-gray-200 p-1 m-2">
				<div className="w-32 m-2">
					<div className="w-full flex justify-center items-center">
						<button
							disabled={!signer}
							ref={tierButtonRef}
							type="button"
							className={`${styles.tierButton + " " + tierColor} opacity-80 font-bold mb-2`}
							// TODO: remove all the conditional styling for the update button
							// onClick={() => updateMutant(mutant.tokenId)}
						>
							<div className={"px-1.5 py-1.5 relative"}>
								<span className="font-bold text-lg mr-2">{mutant.tokenId}</span>{" "}
								<span ref={tierRef} className="italic">
									Tier: {MUTANT_TIERS[mutant.tier]}
								</span>
								<p
									className={`px-6 py-3 rounded absolute inset-0 opacity-0 hover:opacity-100 hover:bg-gray-500 z-11 text-white font-bold 
								${signer ? "" : `hover:opacity-0 hover:${tierColor} active:${tierColor}`}`}
								>
									Update
								</p>
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
						disabled={!signer || (props.action === "Extract" && !mutant.canExtract)}
						type="button"
						className={`${styles.button} w-full disabled:opacity-50`}
						onClick={action}
					>
						{props.action}
					</button>
				</div>
			</div>
		</>
	)
}

export default MutantTile

MutantTile.propTypes = {
	mutant: PropTypes.object,
	action: PropTypes.string,
}
