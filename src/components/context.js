// @flow
/*
 * Copyright 2018, Pavel Lang <langpavel@phpskelet.org>
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import * as React from 'react';
import { hasTranslator } from '../get-translator';
import type Translator from '../translator';

function getDefaultContext(): Translator | null {
  let locale: LocaleCode = 'en-US';
  if (
    __CLIENT__ &&
    document &&
    document.documentElement &&
    document.documentElement.lang
  ) {
    locale = ((document.documentElement.lang: any): LocaleCode);
  }
  return hasTranslator(locale);
}

export const { Consumer: IntlConsumer, Provider } = React.createContext(
  getDefaultContext(),
);

type IntlProviderProps =
  | {| translator: Translator, children: React.Node |}
  | {| locale: LocaleCode, children: React.Node |};

type IntlProviderState = {
  locale: LocaleCode,
  translator: ?Translator,
  nextLocale?: ?LocaleCode,
};

export class IntlProvider extends React.Component<
  IntlProviderProps,
  IntlProviderState,
> {
  constructor(props: IntlProviderProps) {
    super(props);
    if (props.translator) {
      this.state = {
        locale: props.translator.locale,
        translator: props.translator,
      };
    } else if (props.locale) {
      this.state = {
        locale: props.locale,
        translator: hasTranslator(props.locale),
      };
    }
  }

  static getDerivedStateFromProps(
    nextProps: IntlProviderProps,
    prevState: IntlProviderState,
  ) {
    if (
      nextProps.translator &&
      (!prevState || nextProps.translator !== prevState.translator)
    ) {
      return {
        locale: nextProps.translator.locale,
        translator: nextProps.translator,
        nextLocale: null,
      };
    }

    if (
      nextProps.locale &&
      (!prevState || nextProps.locale !== prevState.locale)
    ) {
      const translator = hasTranslator(nextProps.locale);
      if (translator) {
        return {
          locale: nextProps.locale,
          translator,
        };
      }
      // signal that state is not in sync with props
      // and new locale should be used when available
      return {
        nextLocale: nextProps.locale,
      };
    }

    return null;
  }

  render() {
    const { translator } = this.state;
    return <Provider value={translator}>{this.props.children}</Provider>;
  }
}
