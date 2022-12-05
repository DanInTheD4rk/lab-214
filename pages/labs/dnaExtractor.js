import { useEffect, useState } from "react"
import abis from "../../constants/abisGoerli"
import abisMainnet from "../../constants/abisMainnet"
import { ethers } from "ethers"
import { Network, Alchemy } from "alchemy-sdk"
import { alchemy } from "../../utils/Alchemy"
import Staking from "../../components/extractor/Staking"
import Extraction from "../../components/extractor/Extraction"
import Toast from "../../components/Toast"
import AppInfo from "../../components/appInfo/AppInfo"
import { useContract, useSigner } from "wagmi"
import Contributor from "../../components/appInfo/Contributor"

const styles = {
	button:
		"px-6 py-2.5 w-full bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
	// tabLink:
	// "nav-link w-full block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent",
}

const MUTANT_CONTRACT = process.env.NEXT_PUBLIC_MUTANT_CONTRACT
const DNA_CONTRACT = process.env.NEXT_PUBLIC_DNA_CONTRACT
const FACTORY_CONTRACT = process.env.NEXT_PUBLIC_EXTRACTOR_LAB_FACTORY_CONTRACT
const SCALES_CONTRACT = process.env.NEXT_PUBLIC_SCALES_CONTRACT
const RWASTE_CONTRACT = process.env.NEXT_PUBLIC_RWASTE_CONTRACT
const EXTRACTOR_CONTRACT = process.env.NEXT_PUBLIC_EXTRACTOR_LAB_CONTRACT
const NETWORK = process.env.NEXT_PUBLIC_NETWORK
const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_ID

const contractInfo = [EXTRACTOR_CONTRACT, FACTORY_CONTRACT]
const contributors = [<Contributor user="DanInTheD4rk" />]

const DnaExtractor = () => {
	const [openTab, setOpenTab] = useState(1)

	const [contracts, setContracts] = useState(null)
	const [provider, setProvider] = useState()
	const [ownedMutants, setOwnedMutants] = useState([])

	const { data: signer, isError, isLoading } = useSigner()

	useEffect(() => {
		setProvider(new ethers.providers.AlchemyProvider(NETWORK, ALCHEMY_ID))
		;(async () => {
			// const newProvider = new ethers.providers.Web3Provider(window.ethereum)
			// setProvider(newProvider)
			// await newProvider.send("eth_requestAccounts", [])
			// let signer = newProvider.getSigner()
			// setSignerAddress(await signer.getAddress())
			// setContract(new ethers.Contract("0xa513e6e4b8f2a923d98304ec87f64353c4d5c853", abis.mutant, signer))
			setContracts({
				mutant: new ethers.Contract(MUTANT_CONTRACT, abis.mutant, signer),
				dna: new ethers.Contract(DNA_CONTRACT, abis.dna, signer),
			})
			// setContract(new ethers.Contract("0x83f82414b5065bB9A85E330C67B4A10f798F4eD2", abisMainnet.mutant, signer))
		})()
	}, [])

	// useEffect(() => {
	// 	if (openTab === 2 && ownedMutants.length === 0) {
	// 		;(async () => {
	// 			await alchemy.nft
	// 				.getNftsForOwner("0x66bc5c43fb0de86a638e56e139ddf6efe13b130d", {
	// 					contractAddresses: ["0x83f82414b5065bB9A85E330C67B4A10f798F4eD2"],
	// 				})
	// 				.then(setOwnedMutants)
	// 		})()
	// 	}
	// }, [openTab])

	// useEffect(() => {
	// 	console.log(ownedMutants)
	// }, [ownedMutants])

	const upgrade = async () => {
		/* #######################
		UPGRADE MUTANT
		########################## */
		const mutantId = 1
		const dnaContract = new ethers.Contract(DNA_CONTRACT, abis.dna, signer)
		await dnaContract.upgradeMutant(mutantId, 6)

		const scalesContract = new ethers.Contract(SCALES_CONTRACT, abis.scales, signer)
		const rwasteContract = new ethers.Contract(RWASTE_CONTRACT, abis.rwaste, signer)
		// const tx = await scalesContract.approve(DNA_CONTRACT, ethers.utils.parseEther("600"))
		// await tx.wait(6)
		// await contracts.mutant.approve(signer._address, mutantId)
		// let mutantCount = await contracts.mutant.upgrade(mutantId)
		// console.log("mutant upgraded")

		// await scalesContract.withdraw()
		// await rwasteContract.claimReward()
		// console.log("scales/rwaste added!")
	}

	const mint = async () => {
		// let mutantCount = await contracts.mutant.balanceOf(signerAddress)
		// console.log(mutantCount)
		// let owner = await contracts.mutant.ownerOf(1)
		// console.log(owner)
		const factoryContract = new ethers.Contract(FACTORY_CONTRACT, abis.extractorLabFactory, signer)
		const dnaContract = new ethers.Contract(DNA_CONTRACT, abis.dna, signer)
		const scalesContract = new ethers.Contract(SCALES_CONTRACT, abis.scales, signer)
		const rwasteContract = new ethers.Contract(RWASTE_CONTRACT, abis.rwaste, signer)
		const extractorContract = new ethers.Contract(EXTRACTOR_CONTRACT, abis.extractorLab, signer)

		// let labContract = await factoryContract.mutantToLab(0)
		// console.log(labContract)
		// const extractorDnaContract = new ethers.Contract(labContract, abis.extractorLab, signer)
		// let extractor = await extractorDnaContract.getExtractorForMutant(0)
		// console.log(extractor)
		// await extractorDnaContract.transferDna(0)

		// await scalesContract.withdraw()
		// console.log("scales added!")

		/* #######################
		ASSIGN CONTRACTS/ROLES
		########################## */
		// await rwasteContract.setAllowedAddresses(DNA_CONTRACT, true)
		// await scalesContract.grantRole("0x7434c6f201a551bfd17336985361933e0c4935b520dac8a49d937b325f7d5c0a", DNA_CONTRACT)
		// await dnaContract.setContracts([MUTANT_CONTRACT, RWASTE_CONTRACT, SCALES_CONTRACT])
		// await factoryContract.setContracts([DNA_CONTRACT, RWASTE_CONTRACT, SCALES_CONTRACT, MUTANT_CONTRACT])
		// await extractorContract.setContracts([DNA_CONTRACT, RWASTE_CONTRACT, SCALES_CONTRACT, MUTANT_CONTRACT])

		/* #######################
		SETUP
		########################## */
		// await contracts.mutant.flipRevealed()
		// const revealed = await contracts.mutant.revealed()
		// console.log(revealed)
		// await contracts.mutant.setBaseTokenURI("https://mutant-kaiju-api-2g83z.ondigitalocean.app/mutant/")

		/* #######################
		MINT MUTANT
		########################## */

		try {
			await contracts.mutant.mint(1, { value: ethers.utils.parseEther("0.06666") })
		} catch (error) {
			console.log("Transaction canceled")
			console.log(error)
		}
	}

	return (
		<>
			<div className="mx-10 mt-20">
				<AppInfo contracts={contractInfo} contributors={contributors} />
				{/* <button type="button" className={`m-10 ${styles.button} w-fit`} onClick={mint}>
				Mint
			</button>

			<button type="button" className={`m-10 ${styles.button} w-fit`} onClick={upgrade}>
				Upgrade
			</button> */}

				<div className="flex flex-wrap">
					<div className="w-full">
						<ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
							<li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
								<a
									className={
										"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
										(openTab === 1 ? "text-black bg-white bg-opacity-80" : "text-white bg-white bg-opacity-25")
									}
									onClick={(e) => {
										e.preventDefault()
										setOpenTab(1)
									}}
									data-toggle="tab"
									href="#link1"
									role="tablist"
								>
									<i className="fas fa-space-shuttle text-base mr-1"></i> Extraction
								</a>
							</li>
							<li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
								<a
									className={
										"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
										(openTab === 2 ? "text-black bg-white bg-opacity-80" : "text-white bg-white bg-opacity-25")
									}
									onClick={(e) => {
										e.preventDefault()
										setOpenTab(2)
									}}
									data-toggle="tab"
									href="#link2"
									role="tablist"
								>
									<i className="fas fa-cog text-base mr-1"></i> Staking
								</a>
							</li>
						</ul>
						<div className="unset flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded bg-opacity-25">
							<div className="px-4 py-5 flex-auto">
								<div className="tab-content tab-space">
									<div className={openTab === 1 ? "block" : "hidden"} id="link1">
										<Extraction provider={provider} />
									</div>
									<div className={openTab === 2 ? "block" : "hidden"} id="link2">
										{!isLoading && <Staking provider={provider} />}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default DnaExtractor
