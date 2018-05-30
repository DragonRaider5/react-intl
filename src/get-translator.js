// @flow
/**
 * Get Translator instance which can be used in <Context>
 * or directly to retrieve translated messages
 */

import Translator from './translator';
import { addLocaleData } from './locale-data-registry';
import { getDictionary } from './messages-store';

const cache: { [locale: LocaleCode]: Translator } = {};
const asyncCache: { [locale: LocaleCode]: Promise<Translator> } = {};

const loadLocaleCs = () =>
  import(/* webpackChunkName: 'locale-cs-CZ' */ 'react-intl/locale-data/cs');
const loadLocaleSk = () =>
  import(/* webpackChunkName: 'locale-sk-SK' */ 'react-intl/locale-data/sk');
const loadLocaleEn = () =>
  import(/* webpackChunkName: 'locale-en-US' */ 'react-intl/locale-data/en');

async function doLoad(locale: LocaleCode): Promise<Translator> {
  // const m = locale.toLocaleLowerCase().match(/^[a-z]+/);
  // const localeShort = m && m[0];
  // if (!localeShort) {
  //   throw new Error(`Invalid locale ${locale} requested`);
  // }

  // will not work for flow,
  // will work for webpack but can be really expensive to compile
  //   const localeData = await import(`react-intl/locale-data/${localeShort}`);
  // on the other side, switch will work for both :-)
  let localeDataRequest;
  switch (locale) {
    case 'cs-CZ': {
      localeDataRequest = loadLocaleCs();
      break;
    }
    case 'sk-SK': {
      localeDataRequest = loadLocaleSk();
      break;
    }
    case 'en-US': {
      localeDataRequest = loadLocaleEn();
      break;
    }
    default: {
      console.error(
        `[Intl] Unknown locale '${locale}'. You may want to add it to switch`,
      );
      localeDataRequest = loadLocaleEn();
    }
  }

  const localeData = await localeDataRequest;
  addLocaleData(localeData.default);

  const messages = getDictionary(locale);

  const translator = new Translator({
    locale,
    messages,
  });

  cache[locale] = translator;
  return translator;
}

export function loadTranslator(locale: LocaleCode): Promise<Translator> {
  if (asyncCache[locale]) return asyncCache[locale];
  const result = doLoad(locale);
  asyncCache[locale] = result;
  return result;
}

export function hasTranslator(locale: LocaleCode): Translator | null {
  return cache[locale] || null;
}

export function getTranslator(locale: LocaleCode): Translator {
  if (cache[locale]) return cache[locale];
  loadTranslator(locale);
  throw new Error(`Locale ${locale} is not loaded`);
}
