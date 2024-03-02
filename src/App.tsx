import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState } from "react";
import HeaderMain from "../Components/HeaderMain/HeaderMain.jsx";
import { APP_ENUM } from "../enums/appEnum.jsx";
import styles from "../styles/app.module.scss";
import arrowIcon from "../assets/arrowIcon.svg";
import MintNFT from "../Components/MintNft/MintNFT.jsx";

// require("dotenv").config();

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [globalError, setGlobalError] = useState<String | null>(null);
  const [dripStatus, setDripStatus] = useState<Boolean | null>(false);

  // console.log("globalError", globalError);
  const clearGlobalErrMsg = () => {
    setGlobalError("");
  };

  function showToast(message) {
    var toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";

    // Add the clock animation class immediately when showing the toast
    toast.classList.add(styles.clockAnimation);

    setTimeout(function () {
      toast.classList.add(styles.hidden); // Add 'hidden' class after 5 seconds
      setTimeout(function () {
        toast.style.display = "none";
        toast.classList.remove(styles.hidden); // Remove 'hidden' class for next use
        toast.classList.remove(styles.clockAnimation); // Remove animation class
      }, 500); // Hide after the animation ends
    }, 5000); // 5 seconds
  }

  const handleOnClickDrip = async () => {
    //TODO
    try {
      const walletDetails = {
        wallet_address: account.addresses
          ? account.addresses[0]
          : APP_ENUM.getStartByWalletConnect,
      };

      const messageBody = {
        method: "dripToAddress",
        params: [walletDetails.wallet_address],
        id: 1,
        jsonrpc: "2.0",
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageBody),
      };
      const res = await fetch(
        import.meta.env.VITE_SERVER_URI + "/get-faucet-token",
        requestOptions
      );
      let response = await res.json();
      if (res.ok) {
        //TODO: continue the process
        showToast(response.message);
        setDripStatus(true);
      } else {
        setGlobalError(response.message);
      }
    } catch (error) {
      console.log("Error from console", error);
      setGlobalError(error.message);
    }
  };

  return (
    <div className={styles.getRootBg}>
      {globalError && (
        <>
          <div
            className={styles.closeRootErrorMessage}
            onClick={clearGlobalErrMsg}
          >
            &times;
          </div>
          <div className={styles.rootErrorMessage}>{globalError}</div>
        </>
      )}

      {/* <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div> */}

      <HeaderMain
        setWalletAddress={account.addresses}
        wagmiConnectors={connectors}
        wagmiConnect={connect}
        wagmiDisconnect={disconnect}
        wagmiConnectStatus={status}
        wagmiConnectError={error}
      />
      <div className={styles.toaster} id="toast"></div>
      <div className={styles.getTokenContainer}>
        <div className={styles.getTokenContent}>{APP_ENUM.getTokenContent}</div>
        <div className={styles.walletAddressDetails}>
          <div className={styles.walletAddressKeyAndValue}>
            <div className={styles.ethAddress}>{APP_ENUM.ethAddress}</div>
            <div className={styles.walletAddressContainer}>
              {account.addresses
                ? account.addresses[0]
                : APP_ENUM.getStartByWalletConnect}
            </div>
          </div>
          {!dripStatus && (
            <div className={styles.dripButton} onClick={handleOnClickDrip}>
              <button className={styles.dripButtonContent}>
                {APP_ENUM.dripButton}
                <img src={arrowIcon} alt="arrow-icon" />
              </button>
            </div>
          )}
        </div>
      </div>
      <MintNFT />
    </div>
  );
}

export default App;
