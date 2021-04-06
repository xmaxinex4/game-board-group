import { createMuiTheme } from "@material-ui/core";
import { blue, green } from "@material-ui/core/colors";
import { PaletteColor } from "@material-ui/core/styles/createPalette";

// https://material-ui.com/customization/themes/
export const muiTheme = createMuiTheme({
  palette: {
    primary: green,
    secondary: blue,
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

interface IPaletteColorTheme {
  Red: PaletteColor;
  LightPink: PaletteColor;
  Pink: PaletteColor;
  LightOrange: PaletteColor;
  Orange: PaletteColor;
  DarkOrange: PaletteColor;
  LightYellow: PaletteColor;
  Yellow: PaletteColor;
  LightGreen: PaletteColor;
  Green: PaletteColor;
  DarkGreen: PaletteColor;
  LightBlue: PaletteColor;
  Cyan: PaletteColor;
  Blue: PaletteColor;
  Teal: PaletteColor;
  DarkBlue: PaletteColor;
  LightPurple: PaletteColor;
  Purple: PaletteColor;
  DarkPurple: PaletteColor;
  Brown: PaletteColor;
  DarkBrown: PaletteColor;
  Grey: PaletteColor;
  DarkGrey: PaletteColor;
  BlueGrey: PaletteColor;
}

export const PaletteColors: IPaletteColorTheme = {
  Red: {
    light: "#ff5131",
    dark: "#9b0000",
    main: "#d50000",
    contrastText: "",
  },
  LightPink: {
    light: "#ffc6f3",
    dark: "#ca6490",
    main: "#ff94c0",
    contrastText: "",
  },
  Pink: {
    light: "#ff94c0",
    dark: "#c72763",
    main: "#ff6090",
    contrastText: "",
  },
  LightOrange: {
    light: "#fff562",
    dark: "#c79300",
    main: "#ffc32b",
    contrastText: "",
  },
  Orange: {
    light: "#ffb54e",
    dark: "#c55500",
    main: "#ff8418",
    contrastText: "",
  },
  DarkOrange: {
    light: "#fe8438",
    dark: "#8e2600",
    main: "#c55500",
    contrastText: "",
  },
  LightYellow: {
    light: "#ffffcf",
    dark: "#cbcc6d",
    main: "#ffff9d",
    contrastText: "",
  },
  Yellow: {
    light: "#ffff6b",
    dark: "#c8c500",
    main: "#fff82f",
    contrastText: "",
  },
  LightGreen: {
    light: "#afff58",
    dark: "#34c600",
    main: "#76fa0a",
    contrastText: "",
  },
  Green: {
    light: "#80e27e",
    dark: "#087f23",
    main: "#4CAF50",
    contrastText: "",
  },
  DarkGreen: {
    light: "#3d825f",
    dark: "#002b0f",
    main: "#065535",
    contrastText: "",
  },
  LightBlue: {
    light: "#e6ffff",
    dark: "#82b3c9",
    main: "#B3E5FC",
    contrastText: "",
  },
  Cyan: {
    light: "#62efff",
    dark: "#008ba3",
    main: "#00BCD4",
    contrastText: "",
  },
  Blue: {
    light: "#6ec6ff",
    dark: "#0069c0",
    main: "#2196F3",
    contrastText: "",
  },
  Teal: {
    light: "#52c7b8",
    dark: "#00675b",
    main: "#009688",
    contrastText: "",
  },
  DarkBlue: {
    light: "#3f5c94",
    dark: "#000c3b",
    main: "#003366",
    contrastText: "",
  },
  LightPurple: {
    light: "#ffc4ff",
    dark: "#9c64a6",
    main: "#CE93D8",
    contrastText: "",
  },
  Purple: {
    light: "#d05ce3",
    dark: "#6a0080",
    main: "#9C27B0",
    contrastText: "",
  },
  DarkPurple: {
    light: "#9b3eb0",
    dark: "#3a0053",
    main: "#6a0080",
    contrastText: "",
  },
  Brown: {
    light: "#997b77",
    dark: "#3e2723",
    main: "#6a4f4b",
    contrastText: "",
  },
  DarkBrown: {
    light: "#6a4f4b",
    dark: "#1b0000",
    main: "#3E2723",
    contrastText: "",
  },
  Grey: {
    light: "#cfcfcf",
    dark: "#707070",
    main: "#9E9E9E",
    contrastText: "",
  },
  DarkGrey: {
    light: "",
    dark: "",
    main: "#666666",
    contrastText: "",
  },
  BlueGrey: {
    light: "#8eacbb",
    dark: "#34515e",
    main: "#607D8B",
    contrastText: "",
  },
};

export const MeepleColorStringArray: string[] = [
  PaletteColors.Red.main,
  PaletteColors.LightPink.main,
  PaletteColors.Pink.main,
  PaletteColors.LightOrange.main,
  PaletteColors.Orange.main,
  PaletteColors.DarkOrange.main,
  PaletteColors.LightYellow.main,
  PaletteColors.Yellow.main,
  PaletteColors.LightGreen.main,
  PaletteColors.Green.main,
  PaletteColors.DarkGreen.main,
  PaletteColors.LightBlue.main,
  PaletteColors.Cyan.main,
  PaletteColors.Blue.main,
  PaletteColors.Teal.main,
  PaletteColors.DarkBlue.main,
  PaletteColors.LightPurple.main,
  PaletteColors.Purple.main,
  PaletteColors.DarkPurple.main,
  PaletteColors.Brown.main,
  PaletteColors.DarkBrown.main,
  PaletteColors.Grey.main,
  PaletteColors.DarkGrey.main,
  PaletteColors.BlueGrey.main,
];
