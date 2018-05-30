// @flow

type Dictionary = { [id: string]: string };
type Dictionaries = { [locale: LocaleCode]: Dictionary };

const store: Dictionaries = {};

export function addDictionary(locale: LocaleCode, dictionary: Dictionary) {
  if (store[locale]) {
    store[locale] = {
      ...store[locale],
      ...dictionary,
    };
  } else {
    store[locale] = dictionary;
  }
}

export function getDictionary(locale: LocaleCode): Dictionary {
  // eslint-disable-next-line no-return-assign
  return store[locale] || (store[locale] = {});
}

global.ReactIntlAddDict = addDictionary;
