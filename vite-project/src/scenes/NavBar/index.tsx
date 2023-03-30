import React, { useState, ReactElement } from "react";
import FlexBetween from "../../components/FlexBetween";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import { Box, Typography, useTheme } from "@mui/material";
interface Props {}

const NavBar = ({}: Props): ReactElement => {
  // const aboveMediumScreens = useMediaQuery("(min-width:1200px)");
  const { palette } = useTheme();
  const [select, setSelect] = useState("dashboard");
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          Finance
        </Typography>
      </FlexBetween>
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => {
              setSelect("dashboard");
            }}
            style={{
              color: select === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/predictions"
            onClick={() => {
              setSelect("predicitions");
            }}
            style={{
              color: select === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Predicitions
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};
export default NavBar;
