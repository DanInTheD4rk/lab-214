import { useEffect, useState } from "react"
import ExtractTile from "./ExtractTile"
import { checkIfZeroAddress } from "utils/utils"
import { ethers } from "ethers"
import abis from "constants/abis"
import { useNetwork } from "wagmi"
import PropTypes from "prop-types"

const DNA_CONTRACT = process.env.NEXT_PUBLIC_DNA_CONTRACT
const FACTORY_CONTRACT = process.env.NEXT_PUBLIC_EXTRACTOR_LAB_FACTORY_CONTRACT
const NETWORK = process.env.NEXT_PUBLIC_NETWORK

const Extraction = ({ provider: provider }) => {
	const [stakedMutants, setStakedMutants] = useState()
	const [mutantTiles, setMutantTiles] = useState()
	const { chain } = useNetwork()

	useEffect(() => {
		if (provider) {
			const dnaContract = new ethers.Contract(DNA_CONTRACT, abis.dna, provider)
			const factoryContract = new ethers.Contract(FACTORY_CONTRACT, abis.extractorLabFactory, provider)

			;(async () => {
				const labMutantIds = await factoryContract.getMutantIds()
				Promise.all(
					labMutantIds.map((labMutantId) => {
						let stakedMutant = {}
						return factoryContract.mutantToLab(labMutantId).then(async (labAddress) => {
							const stakeContract = new ethers.Contract(labAddress, abis.extractorLab, provider)
							const contractMutantOwner = await stakeContract.getMutantOwner()
							if (!checkIfZeroAddress(contractMutantOwner)) {
								let isPaused = false
								const isCooledDown = await dnaContract.isCooledDown(labMutantId)
								if (isCooledDown) {
									isPaused = await stakeContract.getPauseState()
								}
								let extractedDnaId = !isCooledDown ? await stakeContract.getExtractedDnaId() : -1
								extractedDnaId =
									typeof extractedDnaId === "object"
										? parseInt(ethers.utils.formatEther(extractedDnaId))
										: extractedDnaId
								const extractionCost = await stakeContract.getTotalExtractionCost()
								const lastExtractor =
									extractedDnaId >= 0 ? await stakeContract.getLastExtractor() : ethers.constants.AddressZero
								return await dnaContract.mutantInfo(labMutantId).then((mutantInfo) => {
									stakedMutant = {
										tokenId: labMutantId.toString(),
										labAddress: labAddress,
										isStaked: true,
										tier: mutantInfo.tier,
										canExtract: isCooledDown && !isPaused,
										lastExtractor: lastExtractor,
										extractedDnaId: extractedDnaId,
										extractionCost: ethers.utils.formatEther(extractionCost),
										mutantOwner: contractMutantOwner,
										chain: chain && chain.network,
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
	}, [provider, chain])

	useEffect(() => {
		const tiles = {}
		if (stakedMutants && stakedMutants.length > 0) {
			stakedMutants.forEach((mutant) => {
				if (mutant.tokenId >= 0) {
					tiles[mutant.tokenId] = <ExtractTile key={mutant.tokenId} mutant={mutant} />
				}
			})
		}
		setMutantTiles(tiles)
	}, [stakedMutants])

	if (mutantTiles && Object.keys(mutantTiles).length > 0) {
		return (
			<>
				{chain && chain.network !== NETWORK && (
					<div className="flex flex-row flex-wrap justify-center text-xl font-bold bg-white p-3 bg-opacity-60 rounded-lg">
						Please switch to {NETWORK === "goerli" ? NETWORK : "mainnet"} to use this application
					</div>
				)}
				<div className="flex flex-row flex-wrap justify-center">{[...Object.values(mutantTiles)]}</div>
			</>
		)
	} else if (mutantTiles) {
		return (
			<>
				{chain && chain.network !== NETWORK && (
					<div className="flex flex-row flex-wrap justify-center text-xl font-bold bg-white p-3 bg-opacity-60 rounded-lg mb-2">
						Please switch to {NETWORK === "goerli" ? NETWORK : "mainnet"} to use this application
					</div>
				)}
				<div className="flex flex-row flex-wrap justify-center text-xl font-bold bg-white p-3 bg-opacity-60 rounded-lg">
					No mutants available for extraction
				</div>
			</>
		)
	} else {
		return null
	}
}

export default Extraction

Extraction.propTypes = {
	provider: PropTypes.object,
}
