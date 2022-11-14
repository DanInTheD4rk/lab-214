import { useEffect, useState } from "react"
import MutantTile from "./MutantTile"
import { checkIfZeroAddress } from "../../utils/utils"
import { useSigner } from "wagmi"
import { ethers } from "ethers"
import abis from "../../constants/abisGoerli"
import { ACTION_TYPES } from "../../constants/extractor"

const DNA_CONTRACT = process.env.NEXT_PUBLIC_DNA_CONTRACT
const FACTORY_CONTRACT = process.env.NEXT_PUBLIC_EXTRACTOR_LAB_FACTORY_CONTRACT

const Extraction = () => {
	const [stakedMutants, setStakedMutants] = useState()
	const [mutantTiles, setMutantTiles] = useState()
	const { data: signer, isError, isLoading } = useSigner() //signer._address

	useEffect(() => {
		if (!isLoading && signer) {
			const dnaContract = new ethers.Contract(DNA_CONTRACT, abis.dna, signer)
			const factoryContract = new ethers.Contract(FACTORY_CONTRACT, abis.extractorLabFactory, signer)

			;(async () => {
				const labMutantIds = await factoryContract.getMutantIds()
				Promise.all(
					labMutantIds.map((labMutantId) => {
						let stakedMutant = {}
						return factoryContract.mutantToLab(labMutantId).then(async (labAddress) => {
							const stakeContract = new ethers.Contract(labAddress, abis.extractorLab, signer)
							const contractMutantOwner = await stakeContract.getMutantOwner()
							if (!checkIfZeroAddress(contractMutantOwner)) {
								const isCooledDown = await dnaContract.isCooledDown(labMutantId)
								return await dnaContract.mutantInfo(labMutantId).then((mutantInfo) => {
									stakedMutant = {
										tokenId: labMutantId.toString(),
										labAddress: labAddress,
										isStaked: true,
										tier: mutantInfo.tier,
										canExtract: isCooledDown,
									}
									return stakedMutant
								})
							} else {
								return {
									tokenId: -1,
								}
							}
						})
					})
				).then((mutants) => {
					setStakedMutants(mutants)
				})
			})()
		}
	}, [isLoading, signer])

	useEffect(() => {
		if (stakedMutants && stakedMutants.length > 0) {
			const tiles = {}
			stakedMutants.forEach((mutant) => {
				if (mutant.tokenId >= 0) {
					tiles[mutant.tokenId] = <MutantTile key={mutant.tokenId} mutant={mutant} action={ACTION_TYPES.EXTRACT} />
				}
			})
			setMutantTiles(tiles)
		}
	}, [stakedMutants])

	if (mutantTiles && Object.values(mutantTiles).length > 0) {
		return (
			<div>
				<div className="flex flex-row flex-wrap justify-center">{[...Object.values(mutantTiles)]}</div>
			</div>
		)
	} else if (mutantTiles) {
		return <div className="flex flex-row flex-wrap justify-center text-xl">No mutants available for extraction</div>
	} else {
		return null
	}
}

export default Extraction
