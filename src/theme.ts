import { createMuiTheme } from "@material-ui/core";

import { SitePaletteColors } from "./theme/site-palettes";

// https://material-ui.com/customization/themes/
export const muiTheme = createMuiTheme({
  palette: {
    primary: SitePaletteColors.Primary,
    secondary: SitePaletteColors.Secondary,
  },
  // typography: {
  // fontFamily: "\"Open Sans\", sans-serif",
  // h1: {
  // fontFamily: "\"Amatic SC\", cursive"
  // },
  // h2: {
  // fontFamily: "\"Amatic SC\", cursive"
  // },
  // h3: {
  // fontFamily: "\"Amatic SC\", cursive"
  // },
  // h4: {
  // fontFamily: "\"Amatic SC\", cursive"
  // },
  // h5: {
  // fontFamily: "\"Amatic SC\", cursive"
  // },
  // h6: {
  // fontFamily: "\"Amatic SC\", cursive"
  // }
  // },
});
