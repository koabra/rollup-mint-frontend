import { createClient, http } from "viem";
import { createConfig } from "@wagmi/core";
import { localhostChain } from "./localhostWagmiChain";

export const config = createConfig({
  chains: [localhostChain],
  client({ chain }) {
    return createClient({ chain, transport: http("http://45.32.129.67:3001") });
  },
});
