"use client";
import * as React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { styled, useColorScheme, useTheme } from "@mui/material";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";
import { getDesignTokens } from "./themePrimitives";

// const StyledPath = styled('path')(({ theme }) => ({
//   fill: theme.palette.primary.main,
// }));
export default function PetrecaIcon() {
  const { systemMode, mode } = useColorScheme();
  const theme = useTheme();
  const [fillColor, setFillColor] = React.useState<string>(
    theme.palette.primary.dark
  );

  const darkFillColor = theme.palette.info.dark;
  const lightFillColor = theme.palette.text.secondary;

  React.useEffect(() => {
    console.log("$$$ systemMode", systemMode);
    console.log("$$$ mode", mode);
    if (!mode || mode === "system") {
      setFillColor(systemMode === 'dark' ? darkFillColor : lightFillColor);
    } else if (mode === 'dark') {
      setFillColor(darkFillColor);
    } else {
      setFillColor(lightFillColor);
    }
    console.log("$$$ fillColor", fillColor);
  }, [systemMode, mode]);

  return (
    <SvgIcon sx={{ height: 40, width: 40, mr: 2 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 203.684 203.684"
        fill="none"
      >
        <path
          fill={fillColor}
          d="M119.946,49.268c13.903,-0 23.39,11.287 21.174,25.19l-1.882,11.802c-2.213,13.875 -15.274,25.141 -29.15,25.141l-6.242,-0l8.419,-52.803c-0.035,-1.984 -0.983,-2.623 -3.039,-2.023l-11.589,72.685c-2.214,13.884 -15.283,25.156 -29.167,25.156l-6.227,-0l12.757,-80.012c2.212,-13.873 15.271,-25.136 29.144,-25.136l15.802,-0Z"
        />
      </svg>
    </SvgIcon>
  );
}
