import { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import failedExperiment from "public/extractor/failedExperiment.gif"
import abis from "constants/abis"
import { Contract, ethers } from "ethers"
import { useContractEvent, useSigner } from "wagmi"
import { ACTION_TYPES, MUTANT_TIERS } from "constants/extractor"
import { useLoading } from "../LoadingContext"
import { useModal } from "../ModalContext"
import ManageModal from "./ManageModal"

const styles = {
	button:
		"px-6 py-2.5 bg-gray-600 text-white font-medium text-xs font-bold leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
	tierButton:
		"w-full text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
}

const MUTANT_CONTRACT = process.env.NEXT_PUBLIC_MUTANT_CONTRACT
const FACTORY_CONTRACT = process.env.NEXT_PUBLIC_EXTRACTOR_LAB_FACTORY_CONTRACT

const getTierColor = (tier) => {
	// prettier-ignore
	return tier === 6 
		? "bg-green-700"
		: [5, 4, 3].includes(tier)
			? "bg-yellow-700"
			: "bg-red-700"
}

const MutantTile = ({ mutant, action }) => {
	const { setLoading: setLoading } = useLoading()
	let tierColor = getTierColor(mutant.tier)
	const tierRef = useRef(null)
	const tierButtonRef = useRef(null)
	const imgRef = useRef(null)
	const actionButtonRef = useRef(null)
	const { data: signer } = useSigner()
	const mutantContract = new ethers.Contract(MUTANT_CONTRACT, abis.mutant, signer)
	const [actionFunc, setActionFunc] = useState(null)
	const { open, setOpen, setContents } = useModal()

	useEffect(() => {
		// prettier-ignore
		const actionFunction = action === ACTION_TYPES.CREATE
			? () => createLab()
			: action === ACTION_TYPES.STAKE
				? () => stakeMutant()
				: () => unstakeMutant()
		setActionFunc(() => actionFunction)
	}, [])

	const createLab = async () => {
		setLoading(true)
		const factoryContract = new ethers.Contract(FACTORY_CONTRACT, abis.extractorLabFactory, signer)
		const filter = factoryContract.filters.LabCreated(mutant.tokenId, null)

		factoryContract.once(filter, async () => {
			factoryContract.off(filter)
			actionButtonRef.current.innerText = "Stake"
			setActionFunc(() => stakeMutant)
			actionButtonRef.current.disabled = false
			setLoading(false)
		})

		await factoryContract
			.createLab(mutant.tokenId)
			.then(() => {
				actionButtonRef.current.disabled = true
				actionButtonRef.current.innerText = "Creating..."
				setLoading(false)
			})
			.catch((error) => {
				console.log(error)
				setLoading(false)
			})
	}

	const stakeMutant = async () => {
		setLoading(true)
		const mutantContract = new ethers.Contract(MUTANT_CONTRACT, abis.mutant, signer)
		const factoryContract = new ethers.Contract(FACTORY_CONTRACT, abis.extractorLabFactory, signer)
		const stakingAddress = await factoryContract.mutantToLab(mutant.tokenId)

		const stakingContract = new ethers.Contract(stakingAddress, abis.extractorLab, signer)
		const filter = stakingContract.filters.Staked(mutant.tokenId, null)
		stakingContract.once(filter, () => {
			stakingContract.off(filter)
			actionButtonRef.current.innerText = "Unstake"
			setActionFunc(() => unstakeMutant)
			imgRef.current.src = failedExperiment.src
			setLoading(false)
		})

		const approvedAddress = await mutantContract.getApproved(mutant.tokenId)
		if (approvedAddress !== stakingAddress) {
			const approvefilter = mutantContract.filters.Approval(signer._address, stakingAddress, null)
			mutantContract.once(approvefilter, () => {
				mutantContract.off(approvefilter)
				stakeMutant()
			})
			await mutantContract.approve(stakingAddress, mutant.tokenId).catch((error) => {
				console.log(error)
				setLoading(false)
			})
		} else {
			await stakingContract.stakeMutant(mutant.tokenId).catch((error) => {
				console.log(error)
				setLoading(false)
			})
		}
	}

	const unstakeMutant = async () => {
		const stakingContract = new ethers.Contract(mutant.labAddress, abis.extractorLab, signer)
		const filter = stakingContract.filters.Unstaked(mutant.tokenId, null)
		stakingContract.once(filter, async () => {
			mutantContract.off(filter)
			actionButtonRef.current.innerText = "Stake"
			setActionFunc(() => stakeMutant)
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

	return (
		<>
			<div
				id={`mutantTile${mutant.tokenId}`}
				key={mutant.tokenId}
				className="rounded-lg bg-black bg-opacity-50 p-1 m-2"
			>
				<div className="w-32 m-2">
					<div className="w-full flex justify-center items-center">
						<button
							disabled={mutant.labAddress === ethers.constants.AddressZero}
							ref={tierButtonRef}
							type="button"
							className={`${styles.tierButton + " " + tierColor} font-bold mb-2 ${
								mutant.labAddress !== ethers.constants.AddressZero
									? "hover:bg-gray-600 hover:outline-none outline outline-2 outline-offset-2 outline-indigo-500 "
									: ""
							}`}
							onClick={() => {
								const resultsModalInfo = {
									title: "Mutant #" + mutant.tokenId,
									component: <ManageModal mutant={mutant} />,
								}
								setContents(resultsModalInfo)
								setOpen(true)
							}}
						>
							<div className={"px-1.5 py-1.5 relative"}>
								<span className="font-bold text-lg mr-2">{mutant.tokenId}</span>{" "}
								<span ref={tierRef} className="italic">
									Tier: {MUTANT_TIERS[mutant.tier]}
								</span>
								{mutant.labAddress !== ethers.constants.AddressZero ? (
									<p
										className={`px-6 py-3.5 rounded absolute inset-0 opacity-0 hover:opacity-100 hover:bg-gray-500 z-11 text-white font-bold 
											${signer ? "" : `hover:opacity-0 hover:${tierColor} active:${tierColor}`}`}
									>
										Manage
									</p>
								) : null}
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
						disabled={!signer}
						type="button"
						className={`${styles.button} w-full disabled:opacity-50`}
						onClick={actionFunc}
					>
						{action}
					</button>
				</div>
			</div>
		</>
	)
}

export default MutantTile

MutantTile.propTypes = {
	mutant: PropTypes.shape({
		tier: PropTypes.number,
		tokenId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		labAddress: PropTypes.string,
		rawMetadata: PropTypes.object,
	}),
	action: PropTypes.string,
}
