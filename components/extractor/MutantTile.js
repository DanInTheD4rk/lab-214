import { useRef } from "react"
import PropTypes from "prop-types"
import failedExperiment from "../../public/failedExperiment.gif"
import abisMainnet from "../../constants/abisMainnet"
import { ethers } from "ethers"
import { useSigner } from "wagmi"

const styles = {
	button:
		"px-6 py-2.5 bg-gray-600 text-white font-medium text-xs font-bold leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
	tierButton:
		"w-full hover:bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const MUTANT_CONTRACT = process.env.NEXT_PUBLIC_MUTANT_CONTRACT
const DNA_CONTRACT = process.env.NEXT_PUBLIC_DNA_CONTRACT

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
	let tierColor = getTierColor(mutant.tier)
	const tierRef = useRef(null)
	const tierButtonRef = useRef(null)
	const imgRef = useRef(null)
	const { data: signer } = useSigner()

	const updateMutant = async () => {
		if (!mutant.imageUrl) {
			const mutantContract = new ethers.Contract(MUTANT_CONTRACT, abisMainnet.mutant, signer)
			await mutantContract
				.tokenURI(mutant.id)
				.then(fetch)
				.then((resp) => resp.json())
				.then((mutantData) => {
					mutant.imageUrl = mutantData.image
					imgRef.current.src = mutantData.image
				})
		}

		const dnaContract = new ethers.Contract(DNA_CONTRACT, abisMainnet.dna, signer)
		await dnaContract
			.mutantInfo(mutant.id)
			.then((mutantInfo) => {
				mutant.tier = mutantInfo.tier
				mutant.canStake = !(mutantInfo.coolDownStarted || mutantInfo.extractionOngoing)
				return mutant
			})
			.then((mutantToUpdate) => {
				fetch(BASE_URL + "/mutant/update/id/" + mutant.id, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(mutantToUpdate),
				})
					.then((resp) => resp.json())
					.then((mutantData) => {
						console.log(mutantData)
						if (mutantData) {
							tierRef.current.innerText = "Tier: " + MUTANT_TIERS[mutantData.tier]
							tierButtonRef.current.className = `${
								styles.tierButton + " " + getTierColor(mutantData.tier)
							} opacity-80 font-bold mb-2`
						}
					})
					.catch((error) => {
						// enter your logic for when there is an error (ex. error toast)
						console.log(error)
					})
			})

		// extractorAddress = await extractorFactory.mutantToLab(mutant.id)
		// const signer = provider.getSigner(props.signerAddress)
		// const extractorContract = new ethers.Contract(extractorAddress, abisMainnet.extractor, signer),
		// mutant.isStaked = extractorContract.getMutantOwner() !== 0x address
		// fetch(BASE_URL + "/mutant/update/" + props.signerAddress, {...
	}

	return (
		<div id={`mutantTile${mutant.id}`} key={mutant.id} className="rounded-lg bg-gray-200 p-1 m-2">
			<div className="w-32 m-2">
				<div className="w-full flex justify-center items-center">
					<button
						disabled={!signer}
						ref={tierButtonRef}
						type="button"
						className={`${styles.tierButton + " " + tierColor} opacity-80 font-bold mb-2`}
						onClick={() => updateMutant(mutant.id)}
					>
						<div className={"px-1.5 py-1.5 relative"}>
							<span className="font-bold text-lg mr-2">{mutant.id}</span>{" "}
							<span ref={tierRef} className="italic">
								Tier: {MUTANT_TIERS[mutant.tier]}
							</span>
							<p className="px-6 py-3 rounded absolute inset-0 opacity-0 hover:opacity-100 hover:bg-gray-400 z-11 text-white font-bold">
								Update
							</p>
						</div>
					</button>
				</div>
				<img
					ref={imgRef}
					src={mutant.imageUrl || failedExperiment.src}
					className="rounded-lg w-full mb-2"
					alt="failed experiment"
				/>
				<button
					disabled={!signer}
					type="button"
					className={`${styles.button} w-full`}
					onClick={() => props.action.func()}
				>
					{props.action.type}
				</button>
			</div>
		</div>
	)
}

export default MutantTile

MutantTile.propTypes = {
	mutant: PropTypes.object,
	action: PropTypes.object,
}
