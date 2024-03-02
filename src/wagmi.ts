import { http, createConfig } from "wagmi";
import {
  mainnet,
  sepolia,
  goerli,
  polygonMumbai,
  localhost,
} from "wagmi/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia, goerli, polygonMumbai, localhost],
  connectors: [
    // injected(),
    coinbaseWallet({ appName: "NFT-Rollup-ETH-Denver" }),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [goerli.id]: http(),
    [polygonMumbai.id]: http(),
    [localhost.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
