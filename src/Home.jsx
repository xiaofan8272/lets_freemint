import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Header from "./Header";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { DEF_IPFS_GATEWAY, SupportedChainIds } from "./utils/FChainDef";
import FMintNFT from "./web3/FMintNFT";
import { catMetaData } from "./api/requestData";
import "./Home.scss";
const FNFTItem = (props) => {
  const { addr, library } = props;
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (library) {
      fetchNFTName();
      fetchTokenURI(1);
    }
  }, [library]);

  const isReadyMint = () => {
    return name.length > 0;
  };

  const fetchNFTName = () => {
    setName("");
    FMintNFT.name(addr, library)
      .then((res) => {
        console.log("Fetch NFT Name Success", res);
        if (typeof res == "string" && res.length > 0) {
          setName(res);
        }
      })
      .catch((err) => {
        console.log("Fetch NFT Name Error", err);
      });
  };

  const fetchMetaData = (metaUrl) => {
    catMetaData(metaUrl)
      .then((response) => {
        console.log("Fetch NFT Meta Data Success", response);
        const t_img_url = response.image;
        const t_description = response.description;
        setDescription(t_description);
        if (t_img_url && t_img_url.length > 0) {
          if (t_img_url.startsWith("ipfs://")) {
            setImageUrl(DEF_IPFS_GATEWAY + t_img_url.replace("ipfs://", ""));
          } else if (t_img_url.startsWith("https://")) {
            setImageUrl(t_img_url);
          }
        }
      })
      .catch((err) => {
        console.log("Fetch NFT Meta Data Error", err);
      });
  };

  const fetchTokenURI = (tokenId) => {
    setImageUrl("");
    setDescription("");
    FMintNFT.tokenURI(addr, library, tokenId)
      .then((res) => {
        console.log("Fetch NFT TokenURI Success", res);
        const t_meta_url = res;
        if (t_meta_url && t_meta_url.length > 0) {
          if (t_meta_url.startsWith("ipfs://")) {
            fetchMetaData(DEF_IPFS_GATEWAY + t_meta_url.replace("ipfs://", ""));
          } else if (t_meta_url.startsWith("https://")) {
            fetchMetaData(t_meta_url);
          }
        }
      })
      .catch((err) => {
        console.log("Fetch NFT TokenURI Error", err);
      });
  };

  return (
    <ListItem disablePadding>
      {imageUrl.length > 0 ? (
        <Box
          component="img"
          sx={{
            height: "6rem",
            width: "6rem",
            maxHeight: "6rem",
            maxWidth: "6rem",
          }}
          src={imageUrl}
        />
      ) : (
        <Skeleton variant="rounded" width={"6rem"} height={"6rem"} />
      )}

      <Box sx={{ flexGrow: 1 }} />
      {isReadyMint() === true ? (
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontFamily: "monospace",
            fontWeight: 600,
            textAlign: "center",
            color: "rgba(54,61,80,1)",
          }}
        >
          {name}
        </Typography>
      ) : (
        <Skeleton variant="rounded" width={"20%"} height={40} />
      )}

      <Box sx={{ flexGrow: 6 }} />
      <Button
        disabled={!isReadyMint()}
        sx={{
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 500,
          fontSize: "1rem",
          color: "rgba(54,61,80,1)",
          textDecoration: "none",
          borderRadius: ".6rem",
          border: 1,
          borderColor:
            isReadyMint() === true ? "rgba(54,61,80,1)" : "rgba(231,236,243,1)",
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
  const renderContractList = () => {
    return (
      <Box
        sx={{
          width: "60rem",
          marginTop: "2rem",
        }}
      >
        <List>
          {contractAddrs.map((addr, index) => {
            return (
              <FNFTItem
                key={addr + index}
                addr={addr}
                library={library}
                onMintClick={(addr) => {
                  mint(addr);
                }}
              />
            );
          })}
        </List>
      </Box>
    );
  };
  const renderNonConnect = () => {
    return (
      <Box
        sx={{
          width: "60rem",
          marginTop: "2rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "2rem",
            fontFamily: "monospace",
            fontWeight: 500,
            textAlign: "center",
            color: "rgba(54,61,80,1)",
          }}
        >
          {"Please connect to the Mantle Network"}
        </Typography>
      </Box>
    );
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
      {account ? renderContractList() : renderNonConnect()}
    </Container>
  );
};

export default Home;
