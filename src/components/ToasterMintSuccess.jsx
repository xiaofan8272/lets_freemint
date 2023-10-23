import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Typography from "@mui/material/Typography";

import "./ToasterMintSuccess.scss";
const ToasterMintSuccess = (props) => {
  const { tokenName, tokenId } = props;

  return (
    <Box
      sx={{
        width: "35rem",
        // height: "9rem",
        borderRadius: ".5rem",
        backgroundColor: "rgba(243,246,249,1)",
      }}
    >
      {/* <IconButton
        aria-label="close"
        size="large"
        sx={{ color: "rgba(54,61,80,1)", position:"absolute", top:".1rem", right:".1rem" }}
        onClick={()=>{
          console.log("aaaaa");
          props.dismiss();
        }}
      >
        <CloseRoundedIcon />
      </IconButton> */}
      <Typography
        sx={{
          fontSize: "1rem",
          fontFamily: "monospace",
          fontWeight: 600,
          textAlign: "left",
          color: "rgba(54,61,80,1)",
          paddingTop: "2rem",
          paddingBottom: "3rem",
          paddingLeft: "1.2rem",
          paddingRight: "1.2rem",
        }}
      >
        {"Mint " + tokenName + "#" + tokenId + " Successfully"}
      </Typography>
    </Box>
  );
};

export default ToasterMintSuccess;
