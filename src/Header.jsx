import { React, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import "./Header.scss";
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
              fontWeight: 500,
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
              if (account) {
                props.onDisconnectClick();
              } else {
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
