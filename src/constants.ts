export const MAX_PLAYERS = 6;
export const STAGE_ONE_INVADER_CARD_COUNT = 4;
export const STAGE_TWO_INVADER_CARD_COUNT = 5;
export const STAGE_THREE_INVADER_CARD_COUNT = 6;
export const PANGAEA = "pangaea";
export const ARCHIPELAGOS = "archipelago";
export const MAP_SETUP_TYPES = [PANGAEA, ARCHIPELAGOS];
export const MAX_PLAYERS_TO_AVOID_BOARD_PAIRINGS = 4;

export interface Spirit {
  name: string;
  set: "Base Game";
  complexity: "Low" | "Moderate" | "High" | "Very High";
}

const LIGHTNINGS_SWIFT_STRIKE: Spirit = {
  name: "Lightning's Swift Strike",
  set: "Base Game",
  complexity: "Low",
};

const RIVER_SURGERS_IN_SUNLIGHT: Spirit = {
  name: "River Surges in Sunlight",
  set: "Base Game",
  complexity: "Low",
};

const VITAL_STRENGTH_OF_THE_EARTH: Spirit = {
  name: "Vital Strength of the Earth",
  set: "Base Game",
  complexity: "Low",
};

const SHADOWS_FLICKER_LIKE_FLAME: Spirit = {
  name: "Shadows Flicker Like Flame",
  set: "Base Game",
  complexity: "Low",
};

const THUNDERSPEAKER: Spirit = {
  name: "Thunderspeaker",
  set: "Base Game",
  complexity: "Moderate",
};
const A_SPREAD_OF_RAMPANT_GREEN: Spirit = {
  name: "A Spread of Rampant Green",
  set: "Base Game",
  complexity: "Moderate",
};
const OCEANS_HUNGRY_GRASP: Spirit = {
  name: "Ocean's Hungry Grasp",
  set: "Base Game",
  complexity: "High",
};
const BRINGER_OF_DREAMS_AND_NIGHTMARES: Spirit = {
  name: "Bringer of Dreams and Nightmares",
  set: "Base Game",
  complexity: "High",
};

export const SPIRITS: Spirit[] = [
  LIGHTNINGS_SWIFT_STRIKE,
  RIVER_SURGERS_IN_SUNLIGHT,
  VITAL_STRENGTH_OF_THE_EARTH,
  SHADOWS_FLICKER_LIKE_FLAME,
  THUNDERSPEAKER,
  A_SPREAD_OF_RAMPANT_GREEN,
  OCEANS_HUNGRY_GRASP,
  BRINGER_OF_DREAMS_AND_NIGHTMARES,
];
