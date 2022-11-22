import { useEffect, useState } from "react"
import failedExperiment from "../../public/failedExperiment.gif"
import { useModal } from "../ModalContext"

const DNA_URI = process.env.NEXT_PUBLIC_DNA_URI
const dnaImages = require.context("../../public/dna", true)

const actionButtonClass = `inline-flex font-bold w-full justify-center rounded-md border border-transparent bg-blue-700 hover:opacity-80 px-6 py-2.5 text-xs font-medium
		text-white leading-tight uppercase shadow-sm sm:ml-3 sm:w-auto`

const ResultsModal = ({ results, transferDna }) => {
	const { tokenId, criticality, success } = results
	const imgSource = success ? dnaImages(`./dna${tokenId}.gif`).default.src : failedExperiment.src
	const [dnaInfo, setDnaInfo] = useState()
	const { setOpen } = useModal()

	useEffect(() => {
		if (success) {
			;(async () => {
				await fetch(DNA_URI + tokenId)
					.then((resp) => resp.json())
					.then((dnaData) => {
						setDnaInfo(dnaData)
					})
					.catch((error) => {
						console.log(error)
						setDnaInfo()
					})
			})()
		}
	}, [results])

	if (dnaInfo && success) {
		return (
			<>
				<div className="flex">
					<div className="max-h-max px-4">
						<img className="shadow-lg rounded max-w-full h-auto border-none" src={imgSource} />
					</div>

					<div>
						{dnaInfo && <h2 className="font-bold">{dnaInfo.name}</h2>}
						{dnaInfo && <p className="mb-3">{dnaInfo.description}</p>}
						<p className="italic">You have 14 days to transfer the DNA to your wallet</p>
					</div>
				</div>
				<div className="mt-3 px-2 py-1 min-w-max sm:flex sm:flex-row-reverse">
					<button
						type="button"
						className={actionButtonClass}
						onClick={() => {
							transferDna()
							props.setOpen(false)
						}}
					>
						Transfer
					</button>
					<button
						type="button"
						className="mt-3 leading-tight font-bold uppercase inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-6 py-2.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto"
						onClick={() => setOpen(false)}
					>
						Cancel
					</button>
				</div>
			</>
		)
	} else if (!success) {
		return (
			<>
				<div className="flex">
					<div className="max-h-max px-4">
						<img className="shadow-lg rounded w-52 h-auto border-none" src={imgSource} />
					</div>

					<div>
						<h2 className="font-bold">Experiment Failed!</h2>
						<p className="mb-3">Extracted DNA is unsuitable for [REDACTED] </p>
						<p className="italic">This mutant will be available for another extraction in 14 days</p>
					</div>
				</div>
				<div className="mt-3 px-2 py-1 min-w-max sm:flex sm:flex-row-reverse">
					<button
						type="button"
						className="mt-3 text-white font-medium text-xs font-bold leading-tight uppercase inline-flex w-full justify-center rounded-md bg-green-700 px-6 py-2.5 shadow-sm hover:opacity-80 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto"
						onClick={() => setOpen(false)}
					>
						Okay
					</button>
				</div>
			</>
		)
	}
}

export default ResultsModal
