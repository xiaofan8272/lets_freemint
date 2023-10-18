import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { SupportedChainIds } from "./utils/FChainDef";
import "./Home.scss";
function Home() {
  const injectedConnector = new InjectedConnector({
    supportedChainIds: SupportedChainIds,
  });
  const { activate, account, chainId, active, library, deactivate } =
    useWeb3React();

  useEffect(() => {
    addWeb3Listen();
    return () => {
      removeWeb3Listen();
    };
  }, []);

  const onAccounts = (accounts) => {
    console.log(`Accounts:\n${accounts.join("\n")}`);
    if (accounts.length === 0) {
      deactivate();
    }
  };

  const onDisconnect = () => {
    deactivate();
  };

  const onMessage = (message) => {
    console.log("Message", message);
  };

  const onChainChanged = () => {
    activateMask();
  };

  const addWeb3Listen = () => {
    if (!window.ethereum) {
      return;
    }
    window.ethereum.on("accountsChanged", onAccounts);
    window.ethereum.on("disconnect", onDisconnect);
    window.ethereum.on("message", onMessage);
    window.ethereum.on("chainChanged", onChainChanged);
  };

  const removeWeb3Listen = () => {
    if (!window.ethereum) {
      return;
    }
    window.ethereum.removeListener("accountsChanged", onAccounts);
    window.ethereum.removeListener("disconnect", onDisconnect);
    window.ethereum.removeListener("message", onMessage);
    window.ethereum.removeListener("chainChanged", onChainChanged);
  };

  const activateMask = async () => {
    try {
      await activate(injectedConnector, undefined, true)
        .then((res) => {
          console.log("Activate Success", res);
        })
        .catch((error) => {
          console.log("Activate Error", error);
        });
    } catch (ex) {
      console.log("Activate Fail", ex);
    }
  };
  return (
    <Box className="home_bg" maxWidth="false">
      <Button
        variant="contained"
        sx={{
          marginTop: "42px",
          width: "200px",
          height: "48px",
          fontSize: "16px",
          fontFamily: "Saira",
          fontWeight: "500",
          borderRadius: "5px",
          color: "#FFFFFF",
        }}
        onClick={(event) => {
          event.stopPropagation();
          activateMask();
        }}
      >
        {"MetaMask"}
      </Button>
      <Typography
        sx={{
          fontSize: "14px",
          // fontFamily: "Saira",
          fontWeight: "500",
          textAlign: "center",
          color: "black",
        }}
      >
        {account}
      </Typography>
    </Box>
  );
}

export default Home;
