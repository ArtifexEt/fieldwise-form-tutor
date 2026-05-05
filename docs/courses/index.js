import { enTrainings } from "./en.js";
import { plExtraTrainings } from "./pl-extra.js";
import { plTrainings } from "./pl.js";

export const courseCatalogs = {
  pl: [...plTrainings, ...plExtraTrainings],
  en: enTrainings
};

export const languageOptions = [
  { code: "pl", flag: "🇵🇱", label: "Polski" },
  { code: "en", flag: "🇬🇧", label: "English" }
];
