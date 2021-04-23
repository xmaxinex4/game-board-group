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
    light: "#db6d39",
    dark: "#6f0d00",
    main: "#a43f0c",
    contrastText: "",
  },
};
