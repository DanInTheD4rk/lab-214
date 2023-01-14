import { Network, Alchemy } from "alchemy-sdk"

const settings = {
	apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID,
	network: process.env.NEXT_PUBLIC_NETWORK === "homestead" ? Network.ETH_MAINNET : Network.ETH_GOERLI,
}

export const alchemy = new Alchemy(settings)
