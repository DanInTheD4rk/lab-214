import { useEffect, useState } from "react"
import abis from "constants/abis"
import { ethers } from "ethers"
import { alchemy } from "utils/Alchemy"
import MutantTile from "./MutantTile"
import { useSigner } from "wagmi"
import { ACTION_TYPES } from "constants/extractor"
import { checkIfZeroAddress } from "utils/utils"
import { useNetwork } from "wagmi"
import PropTypes from "prop-types"

const styles = {
	button:
		"px-6 py-2.5 bg-gray-600 text-white font-medium text-xs font-bold leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
	tierButton:
		"w-full hover:bg-gray-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
}

const MUTANT_CONTRACT = process.env.NEXT_PUBLIC_MUTANT_CONTRACT
const DNA_CONTRACT = process.env.NEXT_PUBLIC_DNA_CONTRACT
const FACTORY_CONTRACT = process.env.NEXT_PUBLIC_EXTRACTOR_LAB_FACTORY_CONTRACT
const SCALES_CONTRACT = process.env.NEXT_PUBLIC_SCALES_CONTRACT
const RWASTE_CONTRACT = process.env.NEXT_PUBLIC_RWASTE_CONTRACT
const NETWORK = process.env.NEXT_PUBLIC_NETWORK

const Staking = ({ provider: provider }) => {
	const [mutantTiles, setMutantTiles] = useState(null)
	const [ownedMutants, setOwnedMutants] = useState([])
	/* 
		Ray: 0x9E29A34dFd3Cb99798E8D88515FEe01f2e4cD5a8 
		d4rk: 0x66bc5c43fB0De86A638e56e139DdF6EfE13B130d
	*/
	const { data: signer, isError, isLoading } = useSigner()
	const { chain } = useNetwork()

	useEffect(() => {
		if (provider && !isLoading && signer) {
			const signerAddress = signer._address
			const dnaContract = new ethers.Contract(DNA_CONTRACT, abis.dna, provider)
			const factoryContract = new ethers.Contract(FACTORY_CONTRACT, abis.extractorLabFactory, provider)

			;(async () => {
				const labMutantIds = await factoryContract.getMutantIds()
				Promise.all(
					labMutantIds.map(async (labMutantId) => {
						return factoryContract.mutantToLab(labMutantId).then(async (labAddress) => {
							const stakeContract = new ethers.Contract(labAddress, abis.extractorLab, provider)
							const contractMutantOwner = await stakeContract.getMutantOwner()
							if (contractMutantOwner === signerAddress) {
								return {
									tokenId: labMutantId.toString(),
									labAddress: labAddress,
									isStaked: true,
								}
							} else {
								return {}
							}
						})
					})
				).then((ownedStakedMutants) => {
					alchemy.nft
						.getNftsForOwner(signerAddress, {
							contractAddresses: [MUTANT_CONTRACT],
						})
						.then(async (nfts) => {
							const ownedMutants = nfts.ownedNfts.concat(ownedStakedMutants.filter((mutant) => mutant.labAddress))
							const mutantsWithLab = labMutantIds.map((idObj) => idObj.toString())
							Promise.all(
								ownedMutants.map(async (mutant) => {
									const labAddress = mutantsWithLab.includes(mutant.tokenId)
										? await factoryContract.mutantToLab(mutant.tokenId)
										: ethers.constants.AddressZero
									return await dnaContract.mutantInfo(mutant.tokenId).then((mutantInfo) => {
										mutant.tier = mutantInfo.tier
										mutant.canStake = !(mutantInfo.coolDownStarted || mutantInfo.extractionOngoing)
										mutant.labAddress = labAddress
										return mutant
									})
								})
							)
								.then(setOwnedMutants)
								.catch((error) => {
									// enter your logic for when there is an error (ex. error toast)
									console.log(error)
								})
						})
				})
			})()
		}
	}, [provider, isLoading, signer])

	useEffect(() => {
		const tiles = {}
		ownedMutants.forEach((mutant) => {
			// prettier-ignore
			const action = checkIfZeroAddress(mutant.labAddress)
				? ACTION_TYPES.CREATE
				: mutant.isStaked
					? ACTION_TYPES.UNSTAKE
					: ACTION_TYPES.STAKE

			// prettier-ignore
			tiles[mutant.tokenId] = (
				<MutantTile
					key={mutant.tokenId}
					mutant={mutant}
					action={action}
				/>
			)
		})
		setMutantTiles(tiles)
	}, [ownedMutants])

	if (chain && chain.network !== NETWORK) {
		return (
			<div className="flex flex-row flex-wrap justify-center text-xl font-bold bg-white p-3 bg-opacity-60 rounded-lg">
				Please switch to {NETWORK} to use this application
			</div>
		)
	} else if (signer) {
		if (mutantTiles && Object.keys(mutantTiles).length > 0) {
			return (
				<div>
					{/* <div className="flex flex-row justify-center mb-3">
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
				</div> */}
					<div className="flex flex-row flex-wrap justify-center">{mutantTiles && [...Object.values(mutantTiles)]}</div>
				</div>
			)
		} else {
			return (
				<div className="flex flex-row flex-wrap justify-center text-xl font-bold bg-white p-3 bg-opacity-60 rounded-lg">
					No mutants available for staking
				</div>
			)
		}
	} else if (isError) {
		return (
			<div className="flex flex-row flex-wrap justify-center text-xl font-bold bg-white p-3 bg-opacity-60 rounded-lg">
				Unable to retrieve wallet info
			</div>
		)
	} else {
		return (
			<div className="flex flex-row flex-wrap justify-center text-xl font-bold bg-white p-3 bg-opacity-60 rounded-lg">
				Connect wallet to stake mutants
			</div>
		)
	}
}

export default Staking

Staking.propTypes = {
	provider: PropTypes.object,
}
