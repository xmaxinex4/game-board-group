import { Collection } from "./collection";
import { Play } from "./play";
import { PollOption } from "./poll-option";

export type Game = {
  bggId: string,
  name: string,
  year?: string,
  urlThumb?: string,
  urlImage?: string,
  Collection?: Collection,
  play?: Play[],
  pollOption?: PollOption[];
};