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
import FMintNFT from "./web3/FMintNFT";
import "./Home.scss";
function Home() {
  const contractAddr = "0x1DE087B2Da4EC6F62c1917F39b89D1271E78fd05"; 
  const injectedConnector = new InjectedConnector({
    supportedChainIds: SupportedChainIds,
  });
  const { activate, account, chainId, active, library, deactivate } =
    useWeb3React();

  const [nftInfo, setNFTInfo] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    addWeb3Listen();
    getNFTName();
    return () => {
      removeWeb3Listen();
    };
  }, []);

  const getNFTName = () => {
    if (account) {
      FMintNFT.name(contractAddr, library)
        .then((res) => {
          if (typeof res == "string" && res.length > 0) {
            nftInfo.name = res;
            setNFTInfo({ ...nftInfo });
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    } else {
      return 0;
    }
  };

  const mint = () => {
    if (account) {
      FMintNFT.mint(contractAddr, library, account)
        .then((res) => {
          console.log(res, "res");
        })
        .catch((err) => {
          console.log(err, "err");
        });
    } else {
      return 0;
    }
  };

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
      <Typography
        sx={{
          fontSize: "14px",
          // fontFamily: "Saira",
          fontWeight: "500",
          textAlign: "center",
          color: "black",
        }}
      >
        {nftInfo.name}
      </Typography>
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
          mint();
        }}
      >
        {"MINT"}
      </Button>
    </Box>
  );
}

export default Home;
