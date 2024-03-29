import "styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"

import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import { metaMaskWallet, coinbaseWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets"
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import Avatar from "components/Avatar"
import Layout from "components/Layout"
import { LoadingProvider } from "components/LoadingContext"
import { ModalProvider } from "components/ModalContext"
import { SessionProvider } from "next-auth/react"

const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_ID

const { chains, provider } = configureChains(
	[chain.mainnet, chain.goerli],
	// [chain.mainnet, chain.goerli, chain.hardhat],
	[alchemyProvider({ apiKey: ALCHEMY_ID })]
	// [alchemyProvider({ apiKey: ALCHEMY_ID }), publicProvider()]
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
				<SessionProvider session={pageProps.session}>
					<LoadingProvider>
						<ModalProvider>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</ModalProvider>
					</LoadingProvider>
				</SessionProvider>
			</RainbowKitProvider>
		</WagmiConfig>
	)
}

export default MyApp
