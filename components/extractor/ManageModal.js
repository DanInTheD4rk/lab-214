import { useEffect, useState, useRef } from "react"
import { useModal } from "../ModalContext"
import { useSigner } from "wagmi"
import { ethers } from "ethers"
import abis from "../../constants/abisGoerli"
import { useLoading } from "../LoadingContext"

const DNA_URI = process.env.NEXT_PUBLIC_DNA_URI
const SCALES_CONTRACT = process.env.NEXT_PUBLIC_SCALES_CONTRACT

const actionButtonClass = `inline-flex font-bold h-9 justify-self-end rounded-md border border-transparent bg-blue-700 hover:opacity-80 px-6 py-2.5 text-xs font-medium
		text-white leading-tight uppercase shadow-sm sm:ml-3 sm:w-auto disabled:bg-gray-600`

const ManageModal = ({ mutant }) => {
	const [mutantInfo, setMutantInfo] = useState({})
	const { setLoading: setLoading } = useLoading()
	const [fee, setFee] = useState()
	const { setOpen } = useModal()
	const { data: signer } = useSigner()
	const pauseRef = useRef()
	const pauseTextRef = useRef()
	const stakingContract = new ethers.Contract(mutant.labAddress, abis.extractorLab, signer)
	const scalesContract = new ethers.Contract(SCALES_CONTRACT, abis.scales, signer)

	useEffect(() => {
		if (Object.keys(mutantInfo).length === 0) {
			;(async () => {
				const info = {}
				info.paused = await stakingContract.getPauseState()
				info.fee = ethers.utils
					.formatEther(await stakingContract.getFee(), 0)
					.toString()
					.split(".")[0]
				info.scales = ethers.utils
					.formatEther(await scalesContract.balanceOf(mutant.labAddress), 0)
					.toString()
					.split(".")[0]
				setMutantInfo(info)
			})()
		}
	}, [])

	const setExtractionFee = (e) => {
		const num = e.target.value
		const parsedNum = parseFloat(num)
		if (num.match(/^[0-9]+$/) != null) {
			setFee(ethers.utils.parseEther(num))
		} else {
			setFee(undefined)
		}
	}

	return (
		<>
			<div className="flex">
				<div className="w-full">
					<div className="flex flex-row items-center justify-between mb-3">
						<div className="flex flex-row items-center">
							<h2 className="font-bold pr-3">SCALES:</h2>
							<p>{mutantInfo.scales}</p>
						</div>
						<button
							disabled={!mutantInfo.scales || mutantInfo.scales == 0}
							className={actionButtonClass}
							onClick={async () => {
								setLoading(true)
								await stakingContract
									.withdraw(ethers.utils.parseEther(mutantInfo.scales))
									.then(setMutantInfo({ ...mutantInfo, scales: "0" }))
									.catch((e) => setLoading(false))
								setLoading(false)
							}}
						>
							Withdraw
						</button>
					</div>

					<div className="flex flex-row items-center justify-between mb-3">
						<div className="flex flex-row items-center">
							<h2 className="font-bold pr-3">Fee:</h2>
							<input
								type="text"
								inputMode="numeric"
								pattern="[0-9]*"
								onChange={setExtractionFee}
								name="price"
								id="price"
								className="block w-3/4 rounded-md border-gray-300 pl-7 pr-12 focus:outline-indigo-500 focus:ring-offset-4 sm:text-sm outline outline-2 outline-offset-2 outline-black"
								placeholder={"Current: " + mutantInfo.fee}
							></input>
						</div>
						<button
							disabled={!fee}
							className={actionButtonClass}
							onClick={async () => {
								setLoading(true)
								await stakingContract.setFee(fee).catch((e) => setLoading(false))
								setLoading(false)
							}}
						>
							Update
						</button>
					</div>

					<div className="flex flex-row justify-between">
						<div className="flex flex-col justify-between">
							<h2 className="font-bold flex flex row">
								Extraction Paused:
								<p ref={pauseTextRef} className="ml-3 font-normal">
									{mutantInfo.paused ? "True" : "False"}
								</p>
							</h2>
							<p className="italic mr-5">Only you will be able to extract when paused</p>
						</div>
						<button
							className={actionButtonClass}
							ref={pauseRef}
							onClick={async () => {
								setLoading(true)
								await stakingContract
									.togglePauseState()
									.then(() => {
										pauseRef.current.innerText = pauseRef.current.innerText === "PAUSE" ? "UNPAUSE" : "PAUSE"
										pauseTextRef.current.innerText = pauseTextRef.current.innerText === "True" ? "False" : "True"
									})
									.catch((error) => {
										console.log(error)
									})
								setLoading(false)
							}}
						>
							{mutantInfo.paused ? "Unpause" : "Pause"}
						</button>
					</div>
				</div>
			</div>
			<div className="mt-3 py-1 min-w-max sm:flex sm:flex-row-reverse">
				<button
					type="button"
					className={actionButtonClass + " w-full"}
					onClick={() => {
						setOpen(false)
					}}
				>
					Okay
				</button>
			</div>
		</>
	)
}

export default ManageModal
