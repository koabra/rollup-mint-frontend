import React, { useState } from "react";
import HeaderMain from "./Components/HeaderMain/HeaderMain";
import { APP_ENUM } from "./enums/appEnum";
import styles from "./styles/app.module.scss";
import arrowIcon from "./assets/arrowIcon.svg";
import MintNFT from "./Components/MintNft/MintNFT";

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const handleOnClickDrip = async () => {
    //TODO
    try {
      const walletDetails = {
        wallet_address: walletAddress,
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(walletDetails),
      };
      const response = await fetch(
        process.env.REACT_APP_SERVER_URI + "/get-drip-response",
        requestOptions
      );
      if (response.ok) {
        //TODO: continue the process
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <HeaderMain setWalletAddress={setWalletAddress} />
      <div className={styles.getTokenContainer}>
        <div className={styles.getTokenContent}>{APP_ENUM.getTokenContent}</div>
        <div className={styles.walletAddressDetails}>
          <div className={styles.walletAddressKeyAndValue}>
            <div className={styles.ethAddress}>{APP_ENUM.ethAddress}</div>
            <div className={styles.walletAddressContainer}>
              {walletAddress ? walletAddress : APP_ENUM.getStartByWalletConnect}
            </div>
          </div>
          <div className={styles.dripButton} onClick={handleOnClickDrip}>
            <button className={styles.dripButtonContent}>
              {APP_ENUM.dripButton}
              <img src={arrowIcon} alt="arrow-icon" />
            </button>
          </div>
        </div>
      </div>
      <MintNFT />
    </div>
  );
};

export default App;
