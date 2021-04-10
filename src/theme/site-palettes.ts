import { PaletteColor } from "@material-ui/core/styles/createPalette";

interface SitePaletteColorTheme {
  Primary: PaletteColor;
  Secondary: PaletteColor;
}

export const SitePaletteColors: SitePaletteColorTheme = {
  Primary: {
    light: "#4ab298",
    dark: "#00543f",
    main: "#00826a",
    contrastText: "",
  },
  Secondary: {
    light: "#b84a2b",
    dark: "#510000",
    main: "#821a00",
    contrastText: "",
  },
};
