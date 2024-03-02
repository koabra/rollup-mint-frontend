import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { APP_ENUM } from "../../enums/appEnum";
// import nftIcon from "../../assets/sparqy.png";
import nftIcon from "../../assets/sparqy.svg";
// import nftIcon from "../../assets/sparqy2.svg";
import mainnetIcon from "../../assets/mainnetIcon.svg";
import chainIcon from "../../assets/chainIcon.svg";
import { ethers } from "ethers";
import polygonIcon from "../../assets/polygonIcon.svg";
import arbitrumIcon from "../../assets/arbitrum.svg";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
  useReadContract,
  useSendTransaction,
  // useNetwork,
  // useContractFunction,
} from "wagmi";
import { readContract, readContracts } from "@wagmi/core";
import { mintAbi } from "../../src/abis/mintAbi.ts";
import { claimAbi } from "../../src/abis/claimAbi.ts";
import { contractAddresses } from "../../src/addresses/contractAddresses.ts";
import ErrorToast from "../../src/ErrorToast/ErrorToast.jsx";
// import { config } from "../../src/wagmi.ts";
import { config } from "../../src/sparqConfig.ts";
import { sendTransaction } from "@wagmi/core";
import { parseEther } from "viem";
// import { config } from "../../src/localhostWagmiConfig.ts";

// import { useChain } from "wagmi";

// Register the chain configuration with Wagmi
// registerChain(customChainConfig);

// Use the custom chain by specifying the chain ID or network name
// useChain(chainIdToUse); // Use chain ID
// or
// useChain(customChainConfig.chainName); // Use network name

// Now you can interact with contracts and perform other actions on your custom chain

function MintNFT() {
  const [activeStep, setActiveStep] = useState(1); // Default active step is 1
  const [mintResponse, setMintResponse] = useState(null);
  const [mintPageError, setMintPageError] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [showToaster, setShowToaster] = useState(false);

  const [tokenDetails, setTokenDetails] = useState("");
  const [burnedTokenDetails, setBurnedTokenDetails] = useState("");
  const [preburnTokenDetails, setPreburnTokenDetails] = useState("");
  const [selectedToken, setSelectedToken] = useState("");
  const [selectedPreburnedToken, setSelectedPreburnedToken] = useState("");

  const account = useAccount();
  const { sendTransaction } = useSendTransaction();

  const chainIdToUse = 808080;

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  // const { readContract } = useReadContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const handleMintButtonClick = async () => {
    // to be updated
    try {
      const txHash = await writeContract({
        address: contractAddresses.mintable,
        abi: mintAbi,
        functionName: "mint",
        args: [account.address],
        // chainId: chainIdToUse,
      });
      console.log(txHash);
    } catch (error) {
      console.error("Error minting:", error);
    }
  };

  const [tokenId, setTokenId] = useState("");
  // const { network, setNetwork } = useNetwork();

  const mintTokens = async (tokenId) => {
    try {
      const burnedToken = await readContract({
        address: contractAddresses.mintable,
        abi: mintAbi,
        functionName: "burnedTokens",
        args: [tokenId],
        // chainId: chainIdToUse,
      });

      if (burnedToken.exists) {
        mintSend(
          burnedToken.user,
          burnedToken.v,
          burnedToken.r,
          burnedToken.s,
          burnedToken.rarity
        );
      } else {
        console.error("BurnedToken does not exist");
      }
    } catch (error) {
      console.error("Error fetching or minting tokens:", error);
    }
  };

  // const handleMintTokensInZeta = async () => {
  //   // Trigger a network change request before minting
  //   // await setNetwork("zetachain");

  //   // Mint tokens after the network has been switched
  //   mintTokens(tokenId);
  // };

  // Define a function to fetch and mint tokens
  const handleMintTokensInZeta = async () => {
    try {
      // Fetch the BurnedToken struct from the tokenMintable contract
      const burnedToken = await readContract(config, {
        address: contractAddresses.mintable, // Address of the tokenMintable contract
        abi: mintAbi, // ABI of the tokenMintable contract
        functionName: "burnedTokens", // Function to fetch BurnedToken
        args: [tokenId], // Pass any required arguments
        chainId: chainIdToUse,
      });

      console.log("burnedToken", burnedToken);

      // Check if the BurnedToken exists
      if (burnedToken.exists) {
        // Call the mint function of the tokenClaimable contract using useContractFunction hook
        // const { state, send } = writeContract({
        //   address: contractAddresses.claimable, // Address of the tokenClaimable contract
        //   abi: claimAbi, // ABI of the tokenClaimable contract
        //   functionName: "mint", // Function to call
        //   chainId: chainIdToUse,
        // });

        // Send the transaction with the retrieved parameters

        // Send a transaction with custom message and gas price of 100 gwei
        // const transaction = await signer.sendTransaction({
        //   to: contractAddresses.claimable,
        //   value: ethers.utils.parseUnits("1000", "gwei"), // Specify the amount of ETH to send (if any)
        //   data: encodedMessage,
        //   gasPrice: ethers.utils.parseUnits("100", "gwei"), // Gas price of 100 gwei
        // });
        // const result = await sendTransaction(config, {
        //   to: contractAddresses.claimable,
        //   value: parseEther("0.01"),
        // });
        // console.log("ethers", ethers.utils.defaultAbiCoder);
        // const abiCoder = ethers.utils.defaultAbiCoder;
        // const messageData = abiCoder.encode(
        //   ["address", "uint8", "bytes32", "bytes32", "uint256"], // encode as address array
        //   [
        //     burnedToken.user,
        //     burnedToken.v,
        //     burnedToken.r,
        //     burnedToken.s,
        //     burnedToken.rarity,
        //   ]
        // );
        //   burnedToken.user,
        //   burnedToken.v,
        //   burnedToken.r,
        //   burnedToken.s,
        //   burnedToken.rarity

        sendTransaction({
          to: contractAddresses.claimable,
          value: parseEther("0.01"),
          // data: messageData,
        });

        // Wait for the transaction to be mined
        await result.wait();

        console.log("Transaction sent successfully!");

        // send(
        //   burnedToken.user,
        //   burnedToken.v,
        //   burnedToken.r,
        //   burnedToken.s,
        //   burnedToken.rarity
        // );
      } else {
        // Handle the case where the BurnedToken does not exist
        console.error("BurnedToken does not exist");
      }
    } catch (error) {
      // Handle any errors
      console.error("Error fetching or minting tokens:", error);
    }
  };

  const handlePreBurnButtonClick = async () => {
    // to be updated
    // preBurn(uint256 tokenId)

    try {
      const preBurnTx = await writeContract({
        address: contractAddresses.mintable,
        abi: mintAbi,
        functionName: "preBurn",
        args: [selectedToken],
        chainId: chainIdToUse,
      });
      console.log("preBurnTx", preBurnTx);
    } catch (e) {
      console.log("error", e);
    }

    // try {
    //   // Call the tokenURI function to get the URI of the token metadata
    //   const tokenURI = await contract.tokenURI(tokenId);
    //   console.log("Token URI:", tokenURI);

    //   // Fetch metadata from the token URI
    //   const response = await fetch(tokenURI);
    //   const metadata = await response.json();
    //   console.log("Token Metadata:", metadata);

    //   // Handle metadata as needed
    // } catch (error) {
    //   console.error("Error:", error);
    // }

    setActiveStep(3);
  };

  useEffect(() => {
    setMintPageError(true);
  }, [error]);

  useEffect(() => {
    if (isConfirming) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isConfirming]);

  async function refreshData() {
    try {
      // Get the token tokenID of the minted NFT
      console.log("account.address", account.address);

      const nftTokensOwned = await readContract(config, {
        address: contractAddresses.mintable,
        abi: mintAbi,
        functionName: "getAllTokensOwnedByUser",
        args: [account.address],
        chainId: chainIdToUse,
      });

      console.log("nftTokensOwned", nftTokensOwned);

      let tokenUris = [];
      // for (let i = 0; i < nftTokensOwned.length; i++) {
      //   const tokenId_own = nftTokensOwned[i];
      //   console.log("tokenId for uri", tokenId_own);
      //   const uri = await readContract(config, {
      //     address: contractAddresses.mintable,
      //     abi: mintAbi,
      //     functionName: "tokenURI",
      //     args: [tokenId_own],
      //     chainId: chainIdToUse,
      //   });
      //   tokenUris.push(uri);
      // }

      if (nftTokensOwned) {
        setTokenDetails({
          tokenCount: nftTokensOwned.length,
          tokenIds: nftTokensOwned,
          tokenURIs: tokenUris,
        });
        console.log(tokenUris);
      }

      const nftTokensPreBurned = await readContract(config, {
        address: contractAddresses.mintable,
        abi: mintAbi,
        functionName: "getPreburnedTokensByOwner",
        args: [account.address],
        chainId: chainIdToUse,
      });

      console.log("nftTokensPreBurned", nftTokensPreBurned);

      // let preBurnTokenUris = [];
      // for (let i = 0; i < nftTokensPreBurned.length; i++) {
      //   const tokenId = nftTokensPreBurned[i];
      //   console.log("tokenId for uri nftTokensPreBurned", tokenId);
      //   const uri = await readContract(config, {
      //     address: contractAddresses.mintable,
      //     abi: mintAbi,
      //     functionName: "tokenURI",
      //     args: [tokenId],
      //     chainId: chainIdToUse,
      //   });
      //   preBurnTokenUris.push(uri);
      // }

      if (nftTokensPreBurned) {
        setPreburnTokenDetails({
          preBurnedTokenCount: nftTokensPreBurned.length,
          preBurnedTokenIds: nftTokensPreBurned,
          // preBurnedTokenURIs: preBurnTokenUris,
        });
      }
    } catch (error) {
      console.error("Error in useEffect for IsConfirmed:", error);
    }
  }

  useEffect(() => {
    if (isConfirmed) {
      async function fetchData() {
        try {
          // Get the token tokenID of the minted NFT
          console.log("account.address", account.address);

          const nftTokensOwned = await readContract(config, {
            address: contractAddresses.mintable,
            abi: mintAbi,
            functionName: "getAllTokensOwnedByUser",
            args: [account.address],
            chainId: chainIdToUse,
          });

          console.log("nftTokensOwned", nftTokensOwned);

          let tokenUris = [];
          // for (let i = 0; i < nftTokensOwned.length; i++) {
          //   const tokenId_own = nftTokensOwned[i];
          //   console.log("tokenId for uri", tokenId_own);
          //   const uri = await readContract(config, {
          //     address: contractAddresses.mintable,
          //     abi: mintAbi,
          //     functionName: "tokenURI",
          //     args: [tokenId_own],
          //     chainId: chainIdToUse,
          //   });
          //   tokenUris.push(uri);
          // }

          if (nftTokensOwned) {
            setTokenDetails({
              tokenCount: nftTokensOwned.length,
              tokenIds: nftTokensOwned,
              tokenURIs: tokenUris,
            });
            console.log(tokenUris);
          }

          const nftTokensPreBurned = await readContract(config, {
            address: contractAddresses.mintable,
            abi: mintAbi,
            functionName: "getPreburnedTokensByOwner",
            args: [account.address],
            chainId: chainIdToUse,
          });

          console.log("nftTokensPreBurned", nftTokensPreBurned);

          let preBurnTokenUris = [];
          // for (let i = 0; i < nftTokensPreBurned.length; i++) {
          //   const tokenId = nftTokensPreBurned[i];
          //   console.log("tokenId for uri nftTokensPreBurned", tokenId);
          //   const uri = await readContract(config, {
          //     address: contractAddresses.mintable,
          //     abi: mintAbi,
          //     functionName: "tokenURI",
          //     args: [tokenId],
          //     chainId: chainIdToUse,
          //   });
          //   preBurnTokenUris.push(uri);
          // }

          if (nftTokensPreBurned) {
            setPreburnTokenDetails({
              preBurnedTokenCount: nftTokensPreBurned.length,
              preBurnedTokenIds: nftTokensPreBurned,
              // preBurnedTokenURIs: preBurnTokenUris,
            });
          }

          // Get the details of the contract now
          // const nftTokenUri = await readContract(config, {
          //   address: contractAddresses.mintable,
          //   abi,
          //   functionName: "tokenURI",
          //   args: [tokenDetails.tokenId],
          // });
          // Fetch metadata from the token URI
          // const response = await fetch(nftTokenUri);
          // const metadata = await response.json();
          // console.log(" tokenDetails.tokenCount:", tokenDetails.tokenIds);
          // console.log("Token Metadata:", metadata);
          // Handle metadata as needed
        } catch (error) {
          console.error("Error in useEffect for IsConfirmed:", error);
          // Handle revert reason
          // const revertReason = error.signature;
          // console.error(
          //   `Error fetching URI for token ID ${tokenId}: ${revertReason}`
          // );
        }
      }

      fetchData(); // Call the async function

      setActiveStep(2);
      setMintResponse(true);
      setShowToaster(true);
      setTimeout(() => {
        setShowToaster(false);
      }, 3000); // Close toaster after 3 seconds
    }
  }, [isConfirmed]);

  const handleRefresh = () => {
    // Handle Mainnet button click
    refreshData();
  };

  const handleOnClickChain = () => {
    // Handle Chain button click
  };

  const handleOnClickPolygonChain = () => {
    // Handle Polygon Chain button click
  };

  const handleOnClickArbitrumChain = () => {
    // Handle Arbitrum Chain button click
  };

  return (
    <div className={styles.mintSectionMainContainer}>
      <div
        className={styles.preBurnButton}
        // style={{
        //   background:
        //     mintResponse && activeStep === 2
        //       ? "var(--Primary-5, #3D6EFF)"
        //       : "#3A3C41",
        // }}
        onClick={handleRefresh}
      >
        REFRESH
      </div>
      <div className={styles.mintContainer}>
        <div className={styles.mintNftContentAndImage}>
          <div className={styles.mintYourNft}>{APP_ENUM.mintNtf}</div>
          {tokenDetails ? (
            tokenDetails.tokenIds.map((tokenId, index) => (
              <div className={styles.walletAddressContainer} key={index}>
                <img
                  src={nftIcon}
                  alt={`NFT-${tokenId}`}
                  onClick={() => {
                    setSelectedToken(tokenId);
                    console.log("selected token :", tokenId);
                  }}
                />
              </div>
            ))
          ) : (
            <div className={styles.walletAddressContainer}>
              <img src={nftIcon} alt="NFT-Icon" />
            </div>
          )}
          <br></br>
          <div className={styles.mintYourNft}>{APP_ENUM.preBurnedNft}</div>
          {preburnTokenDetails ? (
            preburnTokenDetails.preBurnedTokenIds.map((tokenId, index) => (
              <div className={styles.walletAddressContainer} key={index}>
                <img
                  src={nftIcon}
                  alt={`NFT-${tokenId}`}
                  onClick={() => {
                    setSelectedToken(tokenId);
                    console.log("selected token :", tokenId);
                  }}
                />
              </div>
            ))
          ) : (
            <div className={styles.walletAddressContainer}>
              <img src={nftIcon} alt="NFT-Icon" />
            </div>
          )}
        </div>

        <div className={styles.stepIndicator}>
          <div className={styles.circle}>
            <div
              className={`${styles.step} ${
                activeStep === 1 ? styles.active : ""
              }`}
            >
              1
            </div>
          </div>
          <div className={styles.line}></div>
          {/* Line between Step 1 and Step 2 */}
          <div
            className={`${styles.step} ${
              activeStep === 2 ? styles.active : ""
            }`}
          >
            <div className={styles.circle}>2</div>
          </div>
          <div className={styles.line}></div>
          {/* Line between Step 2 and Step 3 */}
          <div
            className={`${styles.step} ${
              activeStep === 3 ? styles.active : ""
            }`}
          >
            <div className={styles.circle}>3</div>
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <div
            className={styles.mintButton}
            style={{
              background:
                activeStep === 1 ? "var(--Primary-5, #3D6EFF)" : "#3A3C41",
            }}
            onClick={handleMintButtonClick}
            disabled={isLoading || isConfirmed}
          >
            {isLoading ? <div className={styles.spinner} /> : "MINT"}
            {/* <button disabled={isPending} type="submit">
              {isPending ? "Confirming..." : "Mint"}
            </button> */}
            {/* {hash && <div>Transaction Hash: {hash}</div>} */}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {/* {isConfirmed && <div>Transaction confirmed.</div>} */}
            {/* {error && <div>Error: {error.shortMessage || error.message}</div>} */}
            {/* Render error toaster if error is present */}
          </div>
          {showToaster && hash && isConfirmed && (
            <div className={styles.toaster}>
              <div className={styles.progress}>
                <div className={styles.progressBar} />
              </div>
              <div>Mint confirmed with {hash}</div>
            </div>
          )}
          {error && mintPageError && (
            <ErrorToast
              message={error.shortMessage || error.message}
              onClose={() => setMintPageError(false)}
            />
          )}
          <div
            className={styles.preBurnButton}
            style={{
              background:
                mintResponse && activeStep === 2
                  ? "var(--Primary-5, #3D6EFF)"
                  : "#3A3C41",
            }}
            onClick={handlePreBurnButtonClick}
          >
            PREBURN
          </div>

          <div className={styles.chainButtonsContainer}>
            <div>
              <button
                className={styles.button}
                onClick={handleMintTokensInZeta}
              >
                <img src={mainnetIcon} alt="mainnetIcon" />
              </button>
              <button className={styles.button} onClick={handleOnClickChain}>
                <img src={chainIcon} alt="chainIcon" />
              </button>
            </div>
            <div>
              <button
                className={styles.button}
                onClick={handleOnClickPolygonChain}
              >
                <img src={polygonIcon} alt="polygonIcon" />
              </button>
              <button
                className={styles.button}
                onClick={handleOnClickArbitrumChain}
              >
                <img src={arbitrumIcon} alt="arbitrumIcon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MintNFT;
