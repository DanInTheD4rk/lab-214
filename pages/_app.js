import "../styles/globals.css"

import "@rainbow-me/rainbowkit/styles.css"

import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import { metaMaskWallet, coinbaseWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets"
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import Avatar from "../components/Avatar"
import Layout from "../components/Layout"

console.log(process.env.ALCHEMY_ID)
const { chains, provider } = configureChains(
	[chain.mainnet, chain.goerli],
	// [chain.mainnet, chain.goerli, chain.hardhat],
	[alchemyProvider({ apiKey: process.env.ALCHEMY_ID })]
	// [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
)

const connectors = connectorsForWallets([
	{
		groupName: "Recommended",
		wallets: [metaMaskWallet({ chains }), coinbaseWallet({ chains }), walletConnectWallet({ chains })],
	},
])

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
})

function MyApp({ Component, pageProps }) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				avatar={Avatar}
				theme={darkTheme({
					borderRadius: "none",
					fontStack: "system",
				})}
				chains={[]}
				modalSize="compact"
			>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</RainbowKitProvider>
		</WagmiConfig>
	)
}

export default MyApp
