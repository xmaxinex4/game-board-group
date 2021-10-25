import { PaletteColor } from "@mui/material/styles/createPalette";

export interface MeeplePaletteColorTheme {
  Red: PaletteColor;
  Rose: PaletteColor;
  Pink: PaletteColor;
  Merigold: PaletteColor;
  Orange: PaletteColor;
  Squash: PaletteColor;
  Olive: PaletteColor;
  Green: PaletteColor;
  Pine: PaletteColor;
  Blue: PaletteColor;
  Teal: PaletteColor;
  Navy: PaletteColor;
  Lilac: PaletteColor;
  Purple: PaletteColor;
  Plum: PaletteColor;
  Tan: PaletteColor;
  Brown: PaletteColor;
  Silver: PaletteColor;
  Grey: PaletteColor;
  Slate: PaletteColor;
}

export const MeeplePaletteColors: MeeplePaletteColorTheme = {
  Red: {
    light: "#ff6757",
    dark: "#970004",
    main: "#d0312d",
    contrastText: "#ffffff",
  },
  Rose: {
    light: "#ffc6e1",
    dark: "#c76480",
    main: "#fc94af",
    contrastText: "",
  },
  Pink: {
    light: "#ff94c0",
    dark: "#c72763",
    main: "#ff6090",
    contrastText: "#ffffff",
  },
  Merigold: {
    light: "#fff562",
    dark: "#c79300",
    main: "#ffc32b",
    contrastText: "#ffffff",
  },
  Orange: {
    light: "#ffa048",
    dark: "#b44100",
    main: "#ed7014",
    contrastText: "#ffffff",
  },
  Squash: {
    light: "#ff8a3f",
    dark: "#922d00",
    main: "#c95b0c",
    contrastText: "#ffffff",
  },
  Olive: {
    light: "#caf293",
    dark: "#688f37",
    main: "#98bf64",
    contrastText: "",
  },
  Green: {
    light: "#73e372",
    dark: "#007f12",
    main: "#3cb043",
    contrastText: "#ffffff",
  },
  Pine: {
    light: "#4f7c47",
    dark: "#002600",
    main: "#234f1e",
    contrastText: "#ffffff",
  },
  Blue: {
    light: "#5bc2f5",
    dark: "#006491",
    main: "#0492c2",
    contrastText: "#ffffff",
  },
  Teal: {
    light: "#52c7b8",
    dark: "#00675b",
    main: "#009688",
    contrastText: "#ffffff",
  },
  Navy: {
    light: "#4a39a2",
    dark: "#000046",
    main: "#0a1172",
    contrastText: "#ffffff",
  },
  Lilac: {
    light: "#ffc4ff",
    dark: "#9c64a6",
    main: "#CE93D8",
    contrastText: "#ffffff",
  },
  Purple: {
    light: "#d05ce3",
    dark: "#6a0080",
    main: "#9C27B0",
    contrastText: "#ffffff",
  },
  Plum: {
    light: "#9b3eb0",
    dark: "#3a0053",
    main: "#6a0080",
    contrastText: "#ffffff",
  },
  Tan: {
    light: "#f5cb9a",
    dark: "#8f6c3f",
    main: "#c19a6b",
    contrastText: "#ffffff",
  },
  Brown: {
    light: "#684530",
    dark: "#1d0000",
    main: "#3b1e08",
    contrastText: "#ffffff",
  },
  Silver: {
    light: "#f3f3f3",
    dark: "#909090",
    main: "#c0c0c0",
    contrastText: "",
  },
  Grey: {
    light: "#afafaf",
    dark: "#545454",
    main: "#808080",
    contrastText: "#ffffff",
  },
  Slate: {
    light: "#87a7be",
    dark: "#2c4c61",
    main: "#59788e",
    contrastText: "#ffffff",
  },
};

export const MeepleColorStringArray: string[] = [
  MeeplePaletteColors.Red.main,
  MeeplePaletteColors.Rose.main,
  MeeplePaletteColors.Pink.main,
  MeeplePaletteColors.Merigold.main,
  MeeplePaletteColors.Orange.main,
  MeeplePaletteColors.Squash.main,
  MeeplePaletteColors.Olive.main,
  MeeplePaletteColors.Green.main,
  MeeplePaletteColors.Pine.main,
  MeeplePaletteColors.Blue.main,
  MeeplePaletteColors.Teal.main,
  MeeplePaletteColors.Navy.main,
  MeeplePaletteColors.Lilac.main,
  MeeplePaletteColors.Purple.main,
  MeeplePaletteColors.Plum.main,
  MeeplePaletteColors.Tan.main,
  MeeplePaletteColors.Brown.main,
  MeeplePaletteColors.Silver.main,
  MeeplePaletteColors.Grey.main,
  MeeplePaletteColors.Slate.main,
];

const hashTableOfMainToMeeplePaletteColor = new Map<string, keyof MeeplePaletteColorTheme>([
  ["#d0312d", "Red"],
  ["#fc94af", "Rose"],
  ["#ff6090", "Pink"],
  ["#ffc32b", "Merigold"],
  ["#ed7014", "Orange"],
  ["#c95b0c", "Squash"],
  ["#98bf64", "Olive"],
  ["#3cb043", "Green"],
  ["#234f1e", "Pine"],
  ["#0492c2", "Blue"],
  ["#009688", "Teal"],
  ["#0a1172", "Navy"],
  ["#ce93d8", "Lilac"],
  ["#9c27b0", "Purple"],
  ["#6a0080", "Plum"],
  ["#c19a6b", "Tan"],
  ["#3b1e08", "Brown"],
  ["#c0c0c0", "Silver"],
  ["#808080", "Grey"],
  ["#59788e", "Slate"],
]);

export const getMappedHexToPaletteColor = (
  mainHexColor: string,
): keyof MeeplePaletteColorTheme => {
  console.log("mainHexColor: ", mainHexColor);
  return hashTableOfMainToMeeplePaletteColor.get(mainHexColor) || "Red";
};
