export const mintAbi = [
  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    outputs: [],
  },
  {
    name: "preBurn",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    outputs: [],
  },
  {
    name: "tokenURI",
    type: "function",
    stateMutability: "view",
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    outputs: [{ internalType: "string", name: "", type: "string" }],
  },
  {
    name: "getAllTokensOwnedByUser",
    type: "function",
    stateMutability: "view",
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
  },
  {
    name: "ownerOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    outputs: [{ internalType: "address", name: "", type: "address" }],
  },
  {
    name: "getPreburnedTokensByOwner",
    type: "function",
    stateMutability: "view",
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
  },
  {
    name: "burnedTokens",
    type: "function",
    stateMutability: "view",
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "rarity",
            type: "uint256",
          },
        ],
        internalType: "truct MyTokenMintable.BurnedToken",
        name: "",
        type: "tuple",
      },
    ],
  },
] as const;
