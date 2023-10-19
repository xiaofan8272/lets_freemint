import { React, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { SupportedChainIds } from "./utils/FChainDef";
import FMintNFT from "./web3/FMintNFT";
import "./Header.scss";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const Header = (props) => {
  const { account } = props;

  return (
    <AppBar position="static">
      <Container className="header_bg" maxWidth={false}>
        <Toolbar disableGutters>
          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "rgba(92,114,136,1)",
              textDecoration: "none",
            }}
          >
            LETS FREEMINT
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 400,
              fontSize: "1.2rem",
              color: "rgba(54,61,80,1)",
              textDecoration: "none",
              paddingLeft: "1.8rem",
              paddingRight: "1.8rem",
              borderRadius: "1.4rem",
              border: 1,
              borderColor: "rgba(54,61,80,1)",
            }}
            onClick={(event) => {
              event.stopPropagation();
              if(account){
                props.onDisconnectClick();  
              }else {
                props.onConnectClick();
              }
              
            }}
          >
            {account
              ? account.substring(0, 5) +
                "....." +
                account.substring(account.length - 4, account.length)
              : "MetaMask"}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
