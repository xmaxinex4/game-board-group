import { createTheme } from "@mui/material/styles";
import { Theme } from "@mui/material";

import { SitePaletteColors } from "./theme/site-palettes";
import { MeeplePaletteColors, MeeplePaletteColorTheme } from "./theme/meeple-palettes";

// https://material-ui.com/customization/themes/
export const getMuiTheme = (primary: keyof MeeplePaletteColorTheme): Theme => createTheme({
  palette: {
    primary: MeeplePaletteColors[primary],
    secondary: SitePaletteColors.Secondary,
    error: SitePaletteColors.Error,
    success: SitePaletteColors.Success,
    info: SitePaletteColors.Info,
    warning: SitePaletteColors.Warning,
  },
});

export const defaultTheme = createTheme({
  palette: {
    primary: SitePaletteColors.Primary,
    secondary: SitePaletteColors.Secondary,
    error: SitePaletteColors.Error,
    success: SitePaletteColors.Success,
    info: SitePaletteColors.Info,
    warning: SitePaletteColors.Warning,
  },
});
