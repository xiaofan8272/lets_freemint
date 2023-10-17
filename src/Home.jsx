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
import { ChainIds } from "./utils/FChainDef";
import "./Home.scss";
function Home() {
  const injected = new InjectedConnector({
    supportedChainIds: [ChainIds.MATIC],
  });
  const { activate, account, chainId, active, library, deactivate } =
    useWeb3React();

  useEffect(() => {
    initWeb3Listen();
    return () => {};
  }, []);

  const initWeb3Listen = () => {
    if (!window.ethereum) {
      return;
    }
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length === 0) {
        deactivate();
      }
    });

    window.ethereum.on("disconnect", () => {
      deactivate();
    });

    window.ethereum.on("close", () => {
      deactivate();
    });

    window.ethereum.on("message", (message) => {
      // console.log('message', message)
    });
    window.ethereum.on("networkChanged", () => {
      activateMask();
    });
  };

  const activateMask = async () => {
    try {
      await activate(injected, undefined, true)
        .then((res) => {
          console.log(res, "aaaa");
        })
        .catch((error) => {
          console.log(error, "aaaaa");
        });
    } catch (ex) {
      console.log(ex, "ex");
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
    </Box>
  );
}

export default Home;
