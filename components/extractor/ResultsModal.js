import { useEffect, useState } from "react"
import failedExperiment from "../../public/failedExperiment.gif"

const DNA_URI = process.env.NEXT_PUBLIC_DNA_URI
const dnaImages = require.context("../../public/dna", true)

const ResultsModal = (props) => {
	const { tokenId, criticality, success } = props.results
	const imgSource = success ? dnaImages(`./dna${tokenId}.gif`).default.src : failedExperiment.src
	const [dnaInfo, setDnaInfo] = useState()

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
	}, [props.results])

	if (dnaInfo && success) {
		return (
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
		)
	} else if (!success) {
		return (
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
		)
	}
}

export default ResultsModal
