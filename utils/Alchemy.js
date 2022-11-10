import { Network, Alchemy } from "alchemy-sdk"

const settings = {
	apiKey: process.env.ALCHEMY_ID, // Replace with your Alchemy API Key.
	// network: Network.ETH_MAINNET, // Replace with your network.
	network: Network.ETH_GOERLI, // Replace with your network.
}

export const alchemy = new Alchemy(settings)
