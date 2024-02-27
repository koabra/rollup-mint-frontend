import React, { useState } from "react";
import styles from "./index.module.scss";
import { APP_ENUM } from "../../enums/appEnum";
import nftIcon from "../../assets/nftIcon.svg";
import mainnetIcon from "../../assets/mainnetIcon.svg";
import chainIcon from "../../assets/chainIcon.svg";
import polygonIcon from "../../assets/polygonIcon.svg";
import arbitrumIcon from "../../assets/arbitrum.svg";

function MintNFT() {
  const [activeStep, setActiveStep] = useState(1); // Default active step is 1
  const [mintResponse, setMintResponse] = useState(null);

  const handleMintButtonClick = async () => {
    // to be updated
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URI + "/get-mint-response-status"
      );
      const data = await response.json();
      console.log("Response:", response); // Log the response
      if (data.status === "OK") {
        setActiveStep(2); // Proceed to Step 2 if response is OK
        setMintResponse(data.status);
      }
    } catch (error) {
      console.error("Error fetching mint response:", error);
    }
  };
  const handlePreBurnButtonClick = () => {
    // to be updated
    setActiveStep(3);
  };

  const handleOnClickMainnet = () => {
    // Handle Mainnet button click
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
      <div className={styles.mintContainer}>
        <div className={styles.mintNftContentAndImage}>
          <div className={styles.mintYourNft}>{APP_ENUM.mintNtf}</div>
          <div className={styles.walletAddressContainer}>
            <img src={nftIcon} alt="NFT-Icon" />
          </div>
        </div>
        <div className={styles.stepIndicator}>
          <div
            className={`${styles.step} ${
              activeStep === 1 ? styles.active : ""
            }`}
          >
            <div className={styles.circle}>1</div>
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
          >
            MINT
          </div>
          <div
            className={styles.preBurnButton}
            style={{
              background:
                mintResponse === "OK" ? "var(--Primary-5, #3D6EFF)" : "#3A3C41",
            }}
            onClick={handlePreBurnButtonClick}
          >
            PREBURN
          </div>

          <div className={styles.chainButtonsContainer}>
            <div>
              <button className={styles.button} onClick={handleOnClickMainnet}>
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
