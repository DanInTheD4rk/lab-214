import { useEffect, useState } from "react"
import abis from "../../constants/abis"
import abisMainnet from "../../constants/abisMainnet"
import { ethers } from "ethers"
import { Network, Alchemy } from "alchemy-sdk"
import { alchemy } from "../../utils/Alchemy"
import Staking from "../../components/extractor/Staking"
import Extraction from "../../components/extractor/Extraction"
import Toast from "../../components/Toast"

const styles = {
	button:
		"px-6 py-2.5 w-full bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out",
	// tabLink:
	// "nav-link w-full block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent",
}

const DnaExtractor = () => {
	const [openTab, setOpenTab] = useState(1)

	const [contracts, setContracts] = useState(null)
	const [signerAddress, setSignerAddress] = useState(null)
	const [provider, setProvider] = useState()
	const [ownedMutants, setOwnedMutants] = useState([])

	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
	const MUTANT_CONTRACT = process.env.NEXT_PUBLIC_MUTANT_CONTRACT
	const DNA_CONTRACT = process.env.NEXT_PUBLIC_DNA_CONTRACT

	useEffect(() => {
		;(async () => {
			const newProvider = new ethers.providers.Web3Provider(window.ethereum)
			setProvider(newProvider)
			await newProvider.send("eth_requestAccounts", [])
			let signer = newProvider.getSigner()
			setSignerAddress(await signer.getAddress())
			console.log(newProvider)
			console.log(signer)
			console.log(signerAddress)
			// setContract(new ethers.Contract("0xa513e6e4b8f2a923d98304ec87f64353c4d5c853", abis.mutant, signer))
			setContracts({
				mutant: new ethers.Contract(MUTANT_CONTRACT, abisMainnet.mutant, signer),
				dna: new ethers.Contract(DNA_CONTRACT, abisMainnet.dna, signer),
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

	const mint = async () => {
		let mutantCount = await contracts.mutant.balanceOf("0x66bc5c43fb0de86a638e56e139ddf6efe13b130d")
		console.log(mutantCount)
		// try {
		// 	await contract.mint(1, { value: ethers.utils.parseEther("0.06666") })
		// } catch (error) {
		// 	console.log("Transaction canceled")
		// }
	}

	const getMutantCount = async () => {
		// let mutantCount = await contract.balanceOf(address)
		// let mutantCount = await contract.balanceOf("0x66bc5c43fb0de86a638e56e139ddf6efe13b130d")
		// console.log(mutantCount)

		let addy = "0x9E29A34dFd3Cb99798E8D88515FEe01f2e4cD5a8"
		;(async () => {
			alchemy.nft
				.getNftsForOwner(addy, {
					contractAddresses: [MUTANT_CONTRACT],
				})
				.then((nfts) => nfts.ownedNfts && nfts.ownedNfts.map((nft) => nft.rawMetadata.tokenId))
				.then((mutantIds) => {
					console.log(mutantIds)
					fetch("http://localhost:8080/mutant/update/" + addy, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(mutantIds),
					})
						.then((resp) => resp.json())
						.then((data) => {
							// enter you logic when the fetch is successful
							console.log(data)
						})
						.catch((error) => {
							// enter your logic for when there is an error (ex. error toast)
							console.log(error)
						})
				})
		})()
	}

	return (
		<div className="mx-10">
			<button type="button" className={`m-10 ${styles.button} w-fit`} onClick={mint}>
				Mint
			</button>

			<button type="button" className={`${styles.button} w-fit`} onClick={getMutantCount}>
				Get Mutant Count
			</button>

			<div className="flex flex-wrap">
				<div className="w-full">
					<ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
						<li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
							<a
								className={
									"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
									(openTab === 1 ? "text-white bg-slate-600" : "text-slate-600 bg-white")
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
									(openTab === 2 ? "text-white bg-slate-600" : "text-slate-600 bg-white")
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
					<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
						<div className="px-4 py-5 flex-auto">
							<div className="tab-content tab-space">
								<div className={openTab === 1 ? "block" : "hidden"} id="link1">
									{/* Should be signerAddress here. Ray: 0x9E29A34dFd3Cb99798E8D88515FEe01f2e4cD5a8 d4rk: 0x66bc5c43fB0De86A638e56e139DdF6EfE13B130d*/}
									{contracts && provider && (
										<Extraction
											provider={provider}
											contracts={contracts}
											signerAddress={"0x66bc5c43fB0De86A638e56e139DdF6EfE13B130d"}
										/>
									)}
								</div>
								<div className={openTab === 2 ? "block" : "hidden"} id="link2">
									{/* Should be signerAddress here. Ray: 0x9E29A34dFd3Cb99798E8D88515FEe01f2e4cD5a8 d4rk: 0x66bc5c43fB0De86A638e56e139DdF6EfE13B130d*/}
									{contracts && provider && (
										<Staking
											provider={provider}
											contracts={contracts}
											signerAddress={"0x66bc5c43fB0De86A638e56e139DdF6EfE13B130d"}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DnaExtractor
