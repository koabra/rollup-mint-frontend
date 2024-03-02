export const claimAbi = [
  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    outputs: [],
  },
] as const;
