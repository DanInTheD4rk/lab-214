import { useEffect, useState, useRef } from "react"
import abis from "../../constants/abis"
import abisMainnet from "../../constants/abisMainnet"
import { ethers } from "ethers"
import { Network, Alchemy } from "alchemy-sdk"
import { alchemy } from "../../utils/Alchemy"
import PropTypes from "prop-types"
import { Testnet } from "web3uikit"

const styles = {
	button:
		"px-6 py-2.5 bg-gray-600 text-white font-medium text-xs font-bold leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
	tierButton:
		"w-full hover:bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const MUTANT_CONTRACT = process.env.NEXT_PUBLIC_MUTANT_CONTRACT

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

const Staking = (props) => {
	const [mutantTiles, setMutantTiles] = useState({})
	const [serverMutants, setServerMutants] = useState([])

	useEffect(() => {
		if (props.contracts && props.contracts.dna) {
			;(async () => {
				alchemy.nft
					.getNftsForOwner(props.signerAddress, {
						contractAddresses: [MUTANT_CONTRACT],
					})
					.then((nfts) => {
						return (
							nfts.ownedNfts &&
							nfts.ownedNfts.map((nft) => {
								return {
									id: nft.rawMetadata.tokenId,
									imageUrl: nft.rawMetadata.image,
									ownerAddress: props.signerAddress,
								}
							})
						)
					})
					.then((mutants) => {
						fetch(BASE_URL + "/mutant/update/" + props.signerAddress, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(mutants),
						})
							.then((res) => res.json())
							.then((serverMutants) => {
								Promise.all(
									serverMutants
										.filter((mutant) => mutant.tier === null)
										.map(async (mutant) => {
											return await props.contracts.dna.mutantInfo(mutant.id).then((mutantInfo) => {
												mutant.tier = mutantInfo.tier
												mutant.canStake = !(mutantInfo.coolDownStarted || mutantInfo.extractionOngoing)
												return mutant
											})
										})
								).then((mutantsToUpdate) => {
									fetch(BASE_URL + "/mutant/update/" + props.signerAddress, {
										method: "POST",
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify(mutantsToUpdate),
									})
										.then((resp) => resp.json())
										.then(setServerMutants)
										.catch((error) => {
											// enter your logic for when there is an error (ex. error toast)
											console.log(error)
										})
								})
							})
							.catch((error) => {
								// enter your logic for when there is an error (ex. error toast)
								console.log(error)
							})
					})
			})()
		}
	}, [props.contracts])

	useEffect(() => {
		const mutantTiles = {}
		console.log(serverMutants)
		serverMutants.forEach((mutant) => {
			mutantTiles[mutant.id] = (
				<MutantTile
					provider={props.provider}
					signerAddress={props.signerAddress}
					contracts={props.contracts}
					mutant={mutant}
				/>
			)
		})
		setMutantTiles(mutantTiles)
	}, [serverMutants])

	return (
		<div>
			<div className="flex flex-row justify-center mb-3">
				<button type="button" className={`${styles.button} mx-2`} onClick={() => console.log("staked!")}>
					Stake All
				</button>
				<button type="button" className={`${styles.button} mx-2`} onClick={() => console.log("staked!")}>
					Stake Selected
				</button>
				<button type="button" className={`${styles.button} mx-2`} onClick={() => console.log("unstaked!")}>
					Unstake All
				</button>
				<button type="button" className={`${styles.button} mx-2`} onClick={() => console.log("unstaked!")}>
					Unstake Selected
				</button>
			</div>
			<div className="flex flex-row flex-wrap justify-center">{[...Object.values(mutantTiles)]}</div>
		</div>
	)
}

const MutantTile = (props) => {
	const mutant = props.mutant
	let tierColor = getTierColor(mutant.tier)
	const tierRef = useRef(null)
	const tierButtonRef = useRef(null)

	const updateMutant = async () => {
		await props.contracts.dna
			.mutantInfo(mutant.id)
			.then((mutantInfo) => {
				mutant.tier = mutantInfo.tier
				mutant.canStake = !(mutantInfo.coolDownStarted || mutantInfo.extractionOngoing)
				return mutant
			})
			.then((mutantToUpdate) => {
				fetch(BASE_URL + "/mutant/update/" + props.signerAddress, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify([mutantToUpdate]),
				})
					.then((resp) => resp.json())
					.then((mutantData) => {
						if (mutantData[0]) {
							tierRef.current.innerText = "Tier: " + MUTANT_TIERS[mutantData[0].tier]
							tierButtonRef.current.className = `${
								styles.tierButton + " " + getTierColor(mutantData[0].tier)
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
				<img src={mutant.imageUrl} className="rounded-lg w-full mb-2" alt="..." />
				<button type="button" className={`${styles.button} w-full`} onClick={() => console.log("staked!")}>
					Stake
				</button>
			</div>
		</div>
	)
}

export default Staking

Staking.propTypes = {
	signerAddress: PropTypes.string,
	contracts: PropTypes.object,
}

MutantTile.propTypes = {
	signerAddress: PropTypes.string,
	contracts: PropTypes.object,
}
