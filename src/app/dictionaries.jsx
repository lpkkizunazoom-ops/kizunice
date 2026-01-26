const dictionaries = {
    id: () => import("./dictionaries/id.json").then((module) => module.default),
    jp: () => import("./dictionaries/jp.json").then((module) => module.default),
  };

  export const getDictionary = async (locale) => dictionaries[locale]();
