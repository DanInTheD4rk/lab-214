import { useEffect, useState } from "react"
import { ethers } from "ethers"
import Staking from "components/extractor/Staking"
import Extraction from "components/extractor/Extraction"
import { useSigner } from "wagmi"
import Profile from "components/appInfo/Profile"
import TabBase from "components/TabBase"

const FACTORY_CONTRACT = process.env.NEXT_PUBLIC_EXTRACTOR_LAB_FACTORY_CONTRACT
const EXTRACTOR_CONTRACT = process.env.NEXT_PUBLIC_EXTRACTOR_LAB_CONTRACT
const NETWORK = process.env.NEXT_PUBLIC_NETWORK
const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_ID

const appInfo = {
	contracts: [EXTRACTOR_CONTRACT, FACTORY_CONTRACT],
	contributors: [<Profile user="DanInTheD4rk" />],
	projectId: 1,
}

const DnaExtractor = () => {
	const [provider, setProvider] = useState()
	const { data: signer, isError, isLoading } = useSigner()

	const tabs = [
		{
			title: "Extraction",
			content: <Extraction provider={provider} />,
		},
		{
			title: "Staking",
			content: !isLoading && <Staking provider={provider} />,
		},
	]

	useEffect(() => {
		setProvider(new ethers.providers.AlchemyProvider(NETWORK, ALCHEMY_ID))
	}, [])

	return (
		<>
			<TabBase appInfo={appInfo} tabs={tabs} />
		</>
	)
}

export default DnaExtractor
