import React from "react";
import { useAccount } from "wagmi";
import styles from "./index.module.scss";
import { APP_ENUM } from "../../enums/appEnum";
const HeaderMain = ({ wagmiConnectors, wagmiConnect, wagmiDisconnect }) => {
  // console.log(wagmiConnectors[0]);
  const account = useAccount();

  const handleOnClickConnect = (connector) => {
    wagmiConnect({ connector });
    // TODO
    // implement the wallet connect process using wagmi
    // once connection is successful, store the wallet address in state setWalletAddress
  };
  return (
    <div className={styles.headerMainContainer}>
      <div className={styles.logoContainer}>LOGO</div>
      <div className={styles.buttonGroupContainer}>
        {account.status === "connected" && (
          <button
            className={styles.walletDisconnectButton}
            onClick={() => wagmiDisconnect()}
          >
            {APP_ENUM.disconnectWallet}
          </button>
        )}

        {account.status !== "connected" && (
          <>
            <div className={styles.buttonContainer}>
              <button
                className={styles.walletConnectButton}
                onClick={() => handleOnClickConnect(wagmiConnectors[0])}
              >
                {APP_ENUM.connectCoinbaseWallet}
              </button>
            </div>
            <div className={styles.buttonContainer}>
              <button
                className={styles.walletConnectButton}
                onClick={() => handleOnClickConnect(wagmiConnectors[1])}
              >
                {APP_ENUM.connectWalletConnect}
              </button>
            </div>
            <div className={styles.buttonContainer}>
              <button
                className={styles.walletConnectButton}
                onClick={() => handleOnClickConnect(wagmiConnectors[3])}
              >
                {APP_ENUM.connectMetamaskWallet}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderMain;
