/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import Cleric from "./images/cleric.jpg";
import Exorcist from "./images/exorcist.png";
import Hydromancer from "./images/hydromancer.png";
import Monk from "./images/monk.jpg";
import Summoner from "./images/summoner.jpg";
import Bard from "./images/bard.jpg";
import Blacksmith from "./images/blacksmith.jpg";
import Engineer from "./images/engineer.png";
import Lumberjack from "./images/lumberjack.png";
import Merchant from "./images/merchant.jpg";
import Alchemist from "./images/alchemist.jpg";
import Bandit from "./images/bandit.png";
import Mercenary from "./images/mercenary.jpg";

import MonsterBarrens from "./images/monster-barrens.jpg";
import MonsterCavern from "./images/monster-cavern.jpg";
import MonsterCrypt from "./images/monster-crypt.png";
import MonsterCutthroats from "./images/monster-cutthroats.png";
import MonsterDarkWaters from "./images/monster-dark-waters.png";
import MonsterDen from "./images/monster-den.png";
import MonsterDesert from "./images/monster-desert.jpg";
import MonsterForest from "./images/monster-forest.jpg";
import MonsterGlacier from "./images/monster-glacier.jpg";
import MonsterGloomGyre from "./images/monster-gloom-gyre.png";
import MonsterHills from "./images/monster-hills.jpg";
import MonsterMountains from "./images/monster-mountains.jpg";
import MonsterNecropolis from "./images/monster-necropolis.png";
import MonsterOasis from "./images/monster-oasis.jpg";
import MonsterRuins from "./images/monster-ruins.jpg";
import MonsterSewer from "./images/monster-sewer.png";
import MonsterSkerry from "./images/monster-skerry.png";
import MonsterSwamp from "./images/monster-swamp.jpg";
import MonsterTheDeep from "./images/monster-the-deep.png";
import MonsterTundra from "./images/monster-tundra.jpg";
import MonsterUndeadSamurai from "./images/monster-undead-samurai.jpg";
import MonsterValley from "./images/monster-valley.jpg";
import MonsterValcano from "./images/monster-volcano.jpg";
import MonsterWoods from "./images/monster-woods.png";

export type ValeriaCardKingdomsSetFilters = {
  base: boolean;
  crimsonSeas: boolean;
  flamesAndFrost: boolean;
  peasantsAndKnights: boolean; // exp04
  shadowvale: boolean;
  undeadSamurai: boolean; // exp
};

export enum ValeriaCardKingdomsCardBucket {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  ELEVEN = 11,
  MONSTER,
}

export type ValeriaCardKingdomsCard = {
  name: string;
  imgSrc: string;
  sortOrder: number;
  set: keyof ValeriaCardKingdomsSetFilters;
  bucket: ValeriaCardKingdomsCardBucket;
};

export const ValeriaCardKingdomsCardData: ValeriaCardKingdomsCard[] = [
  {
    set: "base",
    name: "Barrens",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 1,
    imgSrc: MonsterBarrens,
  },
  {
    set: "base",
    name: "Cavern",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 6.1,
    imgSrc: MonsterCavern,
  },
  {
    set: "flamesAndFrost",
    name: "Desert",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 4.2,
    imgSrc: MonsterDesert,
  },
  {
    set: "base",
    name: "Forest",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 3,
    imgSrc: MonsterForest,
  },
  {
    set: "flamesAndFrost",
    name: "Glacier",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 7.1,
    imgSrc: MonsterGlacier,
  },
  {
    set: "base",
    name: "Hills",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 1,
    imgSrc: MonsterHills,
  },
  {
    set: "base",
    name: "Mountains",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 5,
    imgSrc: MonsterMountains,
  },
  {
    set: "flamesAndFrost",
    name: "Oasis",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 4,
    imgSrc: MonsterOasis,
  },
  {
    set: "base",
    name: "Ruins",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 2,
    imgSrc: MonsterRuins,
  },
  {
    set: "base",
    name: "Swamp",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 5.1,
    imgSrc: MonsterSwamp,
  },
  {
    set: "flamesAndFrost",
    name: "Tundra",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 5.2,
    imgSrc: MonsterTundra,
  },
  {
    set: "base",
    name: "Valley",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 4,
    imgSrc: MonsterValley,
  },
  {
    set: "undeadSamurai",
    name: "Undead Samurai",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 3,
    imgSrc: MonsterUndeadSamurai,
  },
  {
    set: "flamesAndFrost",
    name: "Volcano",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 8.1,
    imgSrc: MonsterValcano,
  },
  {
    set: "base",
    name: "Cleric",
    bucket: ValeriaCardKingdomsCardBucket.ONE,
    sortOrder: 0,
    imgSrc: Cleric,
  },
  {
    set: "base",
    name: "Monk",
    bucket: ValeriaCardKingdomsCardBucket.ONE,
    sortOrder: 0,
    imgSrc: Monk,
  },
  {
    set: "flamesAndFrost",
    name: "Summoner",
    bucket: ValeriaCardKingdomsCardBucket.ONE,
    sortOrder: 0,
    imgSrc: Summoner,
  },
  {
    set: "flamesAndFrost",
    name: "Bard",
    bucket: ValeriaCardKingdomsCardBucket.TWO,
    sortOrder: 0,
    imgSrc: Bard,
  },
  {
    set: "base",
    name: "Blacksmith",
    bucket: ValeriaCardKingdomsCardBucket.TWO,
    sortOrder: 0,
    imgSrc: Blacksmith,
  },
  {
    set: "base",
    name: "Merchant",
    bucket: ValeriaCardKingdomsCardBucket.TWO,
    sortOrder: 0,
    imgSrc: Merchant,
  },
  {
    set: "base",
    name: "Alchemist",
    bucket: ValeriaCardKingdomsCardBucket.THREE,
    sortOrder: 0,
    imgSrc: Alchemist,
  },
  {
    set: "base",
    name: "Mercenary",
    bucket: ValeriaCardKingdomsCardBucket.THREE,
    sortOrder: 0,
    imgSrc: Mercenary,
  },
  {
    set: "flamesAndFrost",
    name: "Sorceress",
    bucket: ValeriaCardKingdomsCardBucket.THREE,
    sortOrder: 0,
    imgSrc: "images/03-sorceress.jpg",
  },
  {
    set: "base",
    name: "Archer",
    bucket: ValeriaCardKingdomsCardBucket.FOUR,
    sortOrder: 0,
    imgSrc: "images/04-archer.jpg",
  },
  {
    set: "flamesAndFrost",
    name: "Barbarian",
    bucket: ValeriaCardKingdomsCardBucket.FOUR,
    sortOrder: 0,
    imgSrc: "images/04-barbarian.jpg",
  },
  {
    set: "base",
    name: "Wizard",
    bucket: ValeriaCardKingdomsCardBucket.FOUR,
    sortOrder: 0,
    imgSrc: "images/04-wizard.jpg",
  },
  {
    set: "peasantsAndKnights",
    name: "Alt. Peasant",
    bucket: ValeriaCardKingdomsCardBucket.FIVE,
    sortOrder: 0,
    imgSrc: "images/05-alt-peasant.jpg",
  },
  {
    set: "base",
    name: "Peasant",
    bucket: ValeriaCardKingdomsCardBucket.FIVE,
    sortOrder: 0,
    imgSrc: "images/05-peasant.jpg",
  },
  {
    set: "peasantsAndKnights",
    name: "Alt. Knight",
    bucket: ValeriaCardKingdomsCardBucket.SIX,
    sortOrder: 0,
    imgSrc: "images/06-alt-knight.jpg",
  },
  {
    set: "base",
    name: "Knight",
    bucket: ValeriaCardKingdomsCardBucket.SIX,
    sortOrder: 0,
    imgSrc: "images/06-knight.jpg",
  },
  {
    set: "flamesAndFrost",
    name: "Condottiere",
    bucket: ValeriaCardKingdomsCardBucket.SEVEN,
    sortOrder: 0,
    imgSrc: "images/07-condottiere.jpg",
  },
  {
    set: "base",
    name: "Rogue",
    bucket: ValeriaCardKingdomsCardBucket.SEVEN,
    sortOrder: 0,
    imgSrc: "images/07-rogue.jpg",
  },
  {
    set: "base",
    name: "Thief",
    bucket: ValeriaCardKingdomsCardBucket.SEVEN,
    sortOrder: 0,
    imgSrc: "images/07-thief.jpg",
  },
  {
    set: "flamesAndFrost",
    name: "Bogatyr",
    bucket: ValeriaCardKingdomsCardBucket.EIGHT,
    sortOrder: 0,
    imgSrc: "images/08-bogatyr.jpg",
  },
  {
    set: "base",
    name: "Champion",
    bucket: ValeriaCardKingdomsCardBucket.EIGHT,
    sortOrder: 0,
    imgSrc: "images/08-champion.jpg",
  },
  {
    set: "base",
    name: "Warlord",
    bucket: ValeriaCardKingdomsCardBucket.EIGHT,
    sortOrder: 0,
    imgSrc: "images/08-warlord.jpg",
  },
  {
    set: "base",
    name: "Paladin",
    bucket: ValeriaCardKingdomsCardBucket.NINE,
    sortOrder: 0,
    imgSrc: "images/09-10-paladin.jpg",
  },
  {
    set: "base",
    name: "Priestess",
    bucket: ValeriaCardKingdomsCardBucket.NINE,
    sortOrder: 0,
    imgSrc: "images/09-10-priestess.jpg",
  },
  {
    set: "flamesAndFrost",
    name: "Templar",
    bucket: ValeriaCardKingdomsCardBucket.NINE,
    sortOrder: 0,
    imgSrc: "images/09-10-templar.jpg",
  },
  {
    set: "flamesAndFrost",
    name: "Baker",
    bucket: ValeriaCardKingdomsCardBucket.ELEVEN,
    sortOrder: 0,
    imgSrc: "images/11-12-baker.jpg",
  },
  {
    set: "base",
    name: "Butcher",
    bucket: ValeriaCardKingdomsCardBucket.ELEVEN,
    sortOrder: 0,
    imgSrc: "images/11-12-butcher.jpg",
  },
  {
    set: "base",
    name: "Miner",
    bucket: ValeriaCardKingdomsCardBucket.ELEVEN,
    sortOrder: 0,
    imgSrc: "images/11-12-miner.jpg",
  },
  {
    set: "shadowvale",
    name: "Crypt",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 5,
    imgSrc: MonsterCrypt,
  },
  {
    set: "shadowvale",
    name: "Den",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 4,
    imgSrc: MonsterDen,
  },
  {
    set: "shadowvale",
    name: "Necropolis",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 2,
    imgSrc: MonsterNecropolis,
  },
  {
    set: "shadowvale",
    name: "Sewer",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 2.1,
    imgSrc: MonsterSewer,
  },
  {
    set: "shadowvale",
    name: "Woods",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 4.1,
    imgSrc: MonsterWoods,
  },
  {
    set: "shadowvale",
    name: "Exorcist",
    bucket: ValeriaCardKingdomsCardBucket.ONE,
    sortOrder: 0,
    imgSrc: Exorcist,
  },
  {
    set: "shadowvale",
    name: "Lumberjack",
    bucket: ValeriaCardKingdomsCardBucket.TWO,
    sortOrder: 0,
    imgSrc: Lumberjack,
  },
  {
    set: "shadowvale",
    name: "Bandit",
    bucket: ValeriaCardKingdomsCardBucket.THREE,
    sortOrder: 0,
    imgSrc: Bandit,
  },
  {
    set: "shadowvale",
    name: "Hunter",
    bucket: ValeriaCardKingdomsCardBucket.FOUR,
    sortOrder: 0,
    imgSrc: "images/04-hunter.png",
  },
  {
    set: "shadowvale",
    name: "Peasant (magic)",
    bucket: ValeriaCardKingdomsCardBucket.FIVE,
    sortOrder: 0,
    imgSrc: "images/05-peasant-magic.png",
  },
  {
    set: "shadowvale",
    name: "Knight (gold)",
    bucket: ValeriaCardKingdomsCardBucket.SIX,
    sortOrder: 0,
    imgSrc: "images/06-knight-gold.png",
  },
  {
    set: "shadowvale",
    name: "Necromancer",
    bucket: ValeriaCardKingdomsCardBucket.SEVEN,
    sortOrder: 0,
    imgSrc: "images/07-necromancer.png",
  },
  {
    set: "shadowvale",
    name: "Guardian",
    bucket: ValeriaCardKingdomsCardBucket.EIGHT,
    sortOrder: 0,
    imgSrc: "images/08-guardian.png",
  },
  {
    set: "shadowvale",
    name: "Dragoon",
    bucket: ValeriaCardKingdomsCardBucket.NINE,
    sortOrder: 0,
    imgSrc: "images/09-10-dragoon.png",
  },
  {
    set: "shadowvale",
    name: "Inventor",
    bucket: ValeriaCardKingdomsCardBucket.ELEVEN,
    sortOrder: 0,
    imgSrc: "images/11-12-inventor.png",
  },
  {
    set: "crimsonSeas",
    name: "Hydromancer",
    bucket: ValeriaCardKingdomsCardBucket.ONE,
    sortOrder: 0,
    imgSrc: Hydromancer,
  },
  {
    set: "crimsonSeas",
    name: "Engineer",
    bucket: ValeriaCardKingdomsCardBucket.TWO,
    sortOrder: 0,
    imgSrc: Engineer,
  },
  {
    set: "crimsonSeas",
    name: "Vitki",
    bucket: ValeriaCardKingdomsCardBucket.THREE,
    sortOrder: 0,
    imgSrc: "images/03-vitki.png",
  },
  {
    set: "crimsonSeas",
    name: "Marauder",
    bucket: ValeriaCardKingdomsCardBucket.FOUR,
    sortOrder: 0,
    imgSrc: "images/04-marauder.png",
  },
  {
    set: "crimsonSeas",
    name: "Peasant (CS)",
    bucket: ValeriaCardKingdomsCardBucket.FIVE,
    sortOrder: 0,
    imgSrc: "images/05-peasant-cs.png",
  },
  {
    set: "crimsonSeas",
    name: "Knight (CS)",
    bucket: ValeriaCardKingdomsCardBucket.SIX,
    sortOrder: 0,
    imgSrc: "images/06-knight-cs.png",
  },
  {
    set: "crimsonSeas",
    name: "Smuggler",
    bucket: ValeriaCardKingdomsCardBucket.SEVEN,
    sortOrder: 0,
    imgSrc: "images/07-smuggler.png",
  },
  {
    set: "crimsonSeas",
    name: "Dreadnaught",
    bucket: ValeriaCardKingdomsCardBucket.EIGHT,
    sortOrder: 0,
    imgSrc: "images/08-dreadnaught.png",
  },
  {
    set: "crimsonSeas",
    name: "Conjurer",
    bucket: ValeriaCardKingdomsCardBucket.NINE,
    sortOrder: 0,
    imgSrc: "images/09-10-conjurer.png",
  },
  {
    set: "crimsonSeas",
    name: "Purser",
    bucket: ValeriaCardKingdomsCardBucket.ELEVEN,
    sortOrder: 0,
    imgSrc: "images/11-12-purser.png",
  },
  {
    set: "crimsonSeas",
    name: "Cutthroats",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 3.1,
    imgSrc: MonsterCutthroats,
  },
  {
    set: "crimsonSeas",
    name: "Dark Waters",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 3,
    imgSrc: MonsterDarkWaters,
  },
  {
    set: "crimsonSeas",
    name: "Gloom Gyre",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 3.2,
    imgSrc: MonsterGloomGyre,
  },
  {
    set: "crimsonSeas",
    name: "Skerry",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 4.1,
    imgSrc: MonsterSkerry,
  },
  {
    set: "crimsonSeas",
    name: "The Deep",
    bucket: ValeriaCardKingdomsCardBucket.MONSTER,
    sortOrder: 2.1,
    imgSrc: MonsterTheDeep,
  },
];

export const ValeriaCardKingdomsCardBuckets: { [key: string]: ValeriaCardKingdomsCard[]; } = {
  MONSTER: ValeriaCardKingdomsCardData.filter((card) => card.bucket === ValeriaCardKingdomsCardBucket.MONSTER),
  ONE: ValeriaCardKingdomsCardData.filter((card) => card.bucket === ValeriaCardKingdomsCardBucket.ONE),
  TWO: ValeriaCardKingdomsCardData.filter((card) => card.bucket === ValeriaCardKingdomsCardBucket.TWO),
  THREE: ValeriaCardKingdomsCardData.filter((card) => card.bucket === ValeriaCardKingdomsCardBucket.THREE),
  FOUR: ValeriaCardKingdomsCardData.filter((card) => card.bucket === ValeriaCardKingdomsCardBucket.FOUR),
  FIVE: ValeriaCardKingdomsCardData.filter((card) => card.bucket === ValeriaCardKingdomsCardBucket.FIVE),
  SIX: ValeriaCardKingdomsCardData.filter((card) => card.bucket === ValeriaCardKingdomsCardBucket.SIX),
  SEVEN: ValeriaCardKingdomsCardData.filter((card) => card.bucket === ValeriaCardKingdomsCardBucket.SEVEN),
  EIGHT: ValeriaCardKingdomsCardData.filter((card) => card.bucket === ValeriaCardKingdomsCardBucket.EIGHT),
  NINE: ValeriaCardKingdomsCardData.filter((card) => card.bucket === ValeriaCardKingdomsCardBucket.NINE),
  ELEVEN: ValeriaCardKingdomsCardData.filter((card) => card.bucket === ValeriaCardKingdomsCardBucket.ELEVEN),
};
