"use client";
import { createTheme } from "@mui/material/styles";
import { colorSchemes, shadows, shape, typography } from "./themePrimitives";
import { inputsCustomizations } from "./customizations/inputs";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-mui-color-scheme",
    cssVarPrefix: "template",
  },
  components: {
    ...inputsCustomizations,
  },
  colorSchemes,
  typography,
  shadows,
  shape,
});

export default theme;
