import { createClient, http } from "viem";
import { createConfig } from "@wagmi/core";
import { sparqMainnet } from "./sparqWagmiChain.ts";

export const config = createConfig({
  chains: [sparqMainnet],
  client({ chain }) {
    return createClient({ chain, transport: http("http://45.32.129.67:3001") });
  },
});
