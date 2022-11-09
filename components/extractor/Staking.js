import { useEffect, useState, useRef } from "react"
import abis from "../../constants/abis"
import abisMainnet from "../../constants/abisMainnet"
import { ethers } from "ethers"
import { alchemy } from "../../utils/Alchemy"
import MutantTile from "./MutantTile"
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

const Staking = () => {
	const [mutantTiles, setMutantTiles] = useState(null)
	const [serverMutants, setServerMutants] = useState([])
	/* 
		Ray: 0x9E29A34dFd3Cb99798E8D88515FEe01f2e4cD5a8 
		d4rk: 0x66bc5c43fB0De86A638e56e139DdF6EfE13B130d
	*/
	const signerAddress = "0x66bc5c43fB0De86A638e56e139DdF6EfE13B130d"
	const { data: signer, isError, isLoading } = useSigner() //signer._address

	useEffect(() => {
		if (!isLoading && signer) {
			const mutantContract = new ethers.Contract(DNA_CONTRACT, abisMainnet.dna, signer)
			;(async () => {
				alchemy.nft
					.getNftsForOwner(signerAddress, {
						contractAddresses: [MUTANT_CONTRACT],
					})
					.then((nfts) => {
						return (
							nfts.ownedNfts &&
							nfts.ownedNfts.map((nft) => {
								return {
									id: nft.rawMetadata.tokenId,
									imageUrl: nft.rawMetadata.image,
									ownerAddress: signerAddress,
								}
							})
						)
					})
					.then((mutants) => {
						fetch(BASE_URL + "/mutant/update/address/" + signerAddress, {
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
											return await mutantContract.mutantInfo(mutant.id).then((mutantInfo) => {
												mutant.tier = mutantInfo.tier
												mutant.canStake = !(mutantInfo.coolDownStarted || mutantInfo.extractionOngoing)
												return mutant
											})
										})
								).then((mutantsToUpdate) => {
									fetch(BASE_URL + "/mutant/update/address/" + signerAddress, {
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
	}, [isLoading, signer])

	useEffect(() => {
		const tiles = {}
		serverMutants.forEach((mutant) => {
			tiles[mutant.id] = (
				<MutantTile
					key={mutant.id}
					mutant={mutant}
					action={{
						type: "Stake",
						func: () => console.log("Staked!!"),
					}}
				/>
			)
		})
		setMutantTiles(tiles)
	}, [serverMutants])

	if (signer) {
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
	} else if (isError) {
		return <div className="flex flex-row flex-wrap justify-center text-xl">Unable to retrieve wallet info</div>
	} else {
		return <div className="flex flex-row flex-wrap justify-center text-xl">Connect wallet to stake mutants</div>
	}
}

export default Staking
