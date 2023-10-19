import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Header from "./Header";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { SupportedChainIds } from "./utils/FChainDef";
import FMintNFT from "./web3/FMintNFT";
import "./Home.scss";
const FNFTItem = (props) => {
  const { addr, library } = props;
  const [nftInfo, setNFTInfo] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (library) {
      getNFTName();
    }
  }, [library]);

  const getNFTName = () => {
    FMintNFT.name(addr, library)
      .then((res) => {
        if (typeof res == "string" && res.length > 0) {
          nftInfo.name = res;
          setNFTInfo({ ...nftInfo });
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  return (
    <ListItem disablePadding>
      <Typography
        sx={{
          fontSize: "14px",
          // fontFamily: "Saira",
          fontWeight: "500",
          textAlign: "center",
          color: "black",
        }}
      >
        {addr}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
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
      <Box sx={{ flexGrow: 1 }} />
      <Button
        sx={{
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 400,
          fontSize: "1rem",
          color: "rgba(54,61,80,1)",
          textDecoration: "none",
          borderRadius: ".6rem",
          border: 1,
          borderColor: "rgba(54,61,80,1)",
        }}
        onClick={(event) => {
          event.stopPropagation();
          props.onMintClick(addr);
        }}
      >
        {"MINT"}
      </Button>
    </ListItem>
  );
};
const Home = () => {
  const contractAddrs = ["0x1DE087B2Da4EC6F62c1917F39b89D1271E78fd05"];
  const contractAddr = "0x1DE087B2Da4EC6F62c1917F39b89D1271E78fd05";
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

  const mint = (addr) => {
    if (account && addr.length > 0) {
      FMintNFT.mint(addr, library, account)
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
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Header
        account={account}
        onConnectClick={() => {
          activateMask();
        }}
        onDisconnectClick={() => {
          deactivate();
        }}
      />
      <Box
        sx={{
          width: "60rem",
          marginTop:"2rem"
        }}
      >
        <List>
          {contractAddrs.map((addr, index) => {
            return (
              <FNFTItem key={addr + index} addr={addr} library={library} onMintClick={(addr)=>{
                mint(addr);
              }}/>
            );
          })}
        </List>
      </Box>
    </Container>
  );
};

export default Home;
