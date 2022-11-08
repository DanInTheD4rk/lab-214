import { useEffect, useState } from "react"
import abis from "../../constants/abis"
import abisMainnet from "../../constants/abisMainnet"
import { ethers } from "ethers"
import { Network, Alchemy } from "alchemy-sdk"
import { alchemy } from "../../utils/Alchemy"
import PropTypes from "prop-types"

const styles = {
	button:
		"px-6 py-2.5 bg-gray-600 text-white font-medium text-xs font-bold leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
	tierButton:
		"w-full hover:bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
}

const MUTANT_TIERS = {
	0: "F",
	1: "E",
	2: "D",
	3: "C",
	4: "B",
	5: "A",
	6: "S",
}

const Staking = (props) => {
	const [mutantTiles, setMutantTiles] = useState([])
	const [ownedMutants, setOwnedMutants] = useState([])
	const [serverMutants, setServerMutants] = useState([])

	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
	const MUTANT_CONTRACT = process.env.NEXT_PUBLIC_MUTANT_CONTRACT

	useEffect(() => {
		if (props.contracts && props.contracts.dna) {
			;(async () => {
				alchemy.nft
					.getNftsForOwner(props.signerAddress, {
						contractAddresses: [MUTANT_CONTRACT],
					})
					.then((nfts) => {
						setOwnedMutants(nfts.ownedNfts)
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
		const mutantTiles = []
		console.log(serverMutants)
		serverMutants.forEach((mutant) => {
			// prettier-ignore
			let tierColor = mutant.tier === 6 
				? "bg-green-700"
				: [5, 4, 3].includes(mutant.tier)
					? "bg-yellow-700"
					: "bg-red-700"
			mutantTiles.push(
				<div key={mutant.id} className="rounded-lg bg-gray-200 p-1 m-2">
					<div className="w-32 m-2">
						<div className="w-full flex justify-center items-center">
							<button
								type="button"
								className={`${styles.tierButton + " " + tierColor} opacity-80 font-bold mb-2`}
								onClick={() => console.log("updated!")}
							>
								<div className={"px-1.5 py-1.5 relative"}>
									<span className="font-bold text-lg mr-2">{mutant.id}</span>{" "}
									<span className="italic">Tier: {MUTANT_TIERS[mutant.tier]}</span>
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
				<button type="button" className={`${styles.button} mx-2`} onClick={() => console.log("staked!")}>
					Unstake All
				</button>
				<button type="button" className={`${styles.button} mx-2`} onClick={() => console.log("staked!")}>
					Unstake Selected
				</button>
			</div>
			<div className="flex flex-row flex-wrap justify-center">{mutantTiles}</div>
		</div>
	)
}

export default Staking

Staking.propTypes = {
	signerAddress: PropTypes.string,
	mutantContract: PropTypes.object,
}
