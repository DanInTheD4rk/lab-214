import { useEffect, useState, useRef } from "react"
import abis from "../../constants/abis"
import abisMainnet from "../../constants/abisMainnet"
import { ethers } from "ethers"
import { Network, Alchemy } from "alchemy-sdk"
import { alchemy } from "../../utils/Alchemy"
import PropTypes from "prop-types"
import { Testnet } from "web3uikit"
import MutantTile from "./MutantTile"

const styles = {
	button:
		"px-6 py-2.5 bg-gray-600 text-white font-medium text-xs font-bold leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
	tierButton:
		"w-full hover:bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const MUTANT_CONTRACT = process.env.NEXT_PUBLIC_MUTANT_CONTRACT

const Staking = (props) => {
	const [mutantTiles, setMutantTiles] = useState(null)
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
						fetch(BASE_URL + "/mutant/update/address/" + props.signerAddress, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(mutants),
						})
							.then((resp) => resp.json())
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
									fetch(BASE_URL + "/mutant/update/address/" + props.signerAddress, {
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
		const tiles = {}
		console.log(serverMutants)
		console.log(props.contracts)
		serverMutants.forEach((mutant) => {
			tiles[mutant.id] = (
				<MutantTile
					key={mutant.id}
					provider={props.provider}
					signerAddress={props.signerAddress}
					contracts={props.contracts}
					mutant={mutant}
				/>
			)
		})
		setMutantTiles(tiles)
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
			<div className="flex flex-row flex-wrap justify-center">{mutantTiles && [...Object.values(mutantTiles)]}</div>
		</div>
	)
}

export default Staking

Staking.propTypes = {
	signerAddress: PropTypes.string,
	contracts: PropTypes.object,
}
