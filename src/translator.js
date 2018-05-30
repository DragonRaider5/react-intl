// @flow
/*
 * Copyright 2018, Pavel Lang <langpavel@phpskelet.org>
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import invariant from 'invariant';
import memoizeIntlConstructor from 'intl-format-cache';
import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';
import IntlPluralFormat from './plural';
import type { MessageDictionary, MessageDescriptor } from './types';

type FlowTodo = any;

type TranslatorOptions = {
  locale: LocaleCode,
  formats?: {},
  messages?: MessageDictionary,
};

export const Formatters = {
  getDateTimeFormat: memoizeIntlConstructor(Intl.DateTimeFormat),
  getNumberFormat: memoizeIntlConstructor(Intl.NumberFormat),
  getMessageFormat: memoizeIntlConstructor(IntlMessageFormat),
  getRelativeFormat: memoizeIntlConstructor(IntlRelativeFormat),
  getPluralFormat: memoizeIntlConstructor(IntlPluralFormat),
};

const RELATIVE_FORMAT_THRESHOLDS = {
  second: 60, // seconds to minute
  minute: 60, // minutes to hour
  hour: 24, // hours to day
  day: 30, // days to month
  month: 12, // months to year
};

function updateRelativeFormatThresholds(newThresholds) {
  if (newThresholds.second)
    IntlRelativeFormat.thresholds.second = newThresholds.second;
  if (newThresholds.minute)
    IntlRelativeFormat.thresholds.minute = newThresholds.minute;
  if (newThresholds.hour)
    IntlRelativeFormat.thresholds.hour = newThresholds.hour;
  if (newThresholds.day) IntlRelativeFormat.thresholds.day = newThresholds.day;
  if (newThresholds.month)
    IntlRelativeFormat.thresholds.month = newThresholds.month;
}

function getNamedFormat(formats, type, name) {
  const format = formats && formats[type] && formats[type][name];
  if (format) return format;

  if (__DEV__ || __STAGE__) {
    console.error(`[React Intl] No ${type} format named: ${name}`);
  }
  return null;
}

export default class Translator {
  locale: LocaleCode;
  formats: FlowTodo;
  messages: MessageDictionary;
  now: () => number;

  constructor(config: TranslatorOptions) {
    invariant(
      typeof Intl !== 'undefined',
      '[React Intl] The `Intl` APIs must be available in the runtime, ' +
        'and do not appear to be built-in. An `Intl` polyfill should be loaded.\n' +
        'See: http://formatjs.io/guides/runtime-environments/',
    );

    this.locale = config.locale;
    this.formats = config.formats || {};
    this.messages = config.messages || {};

    this.now = () => Date.now();

    // Creating `Intl*` formatters is expensive. If there's a parent
    // `<IntlProvider>`, then its formatters will be used. Otherwise, this
    // memoize the `Intl*` constructors and cache them for the lifecycle of
    // this IntlProvider instance.

    // this.formatDate = formatDate.bind(null, this, Formatters);
    // this.formatTime = formatTime.bind(null, this, Formatters);
    // this.formatRelative = formatRelative.bind(null, this, Formatters);
    // this.formatNumber = formatNumber.bind(null, this, Formatters);
    // this.formatPlural = formatPlural.bind(null, this, Formatters);
    // this.formatMessage = formatMessage.bind(null, this, Formatters);
  }

  formatDate(value: string | number | Date, options: FlowTodo = {}) {
    const { locale, formats } = this;
    const { format } = options;

    const date = new Date(value);
    const defaults = format && getNamedFormat(formats, 'date', format);

    try {
      return Formatters.getDateTimeFormat(locale, {
        ...defaults,
        ...options,
      }).format(date);
    } catch (e) {
      if (__DEV__ || __STAGE__) {
        console.error(`[React Intl] Error formatting date.\n${e}`);
      }
    }

    return String(date);
  }

  formatTime(value: string | number | Date, options: FlowTodo = {}) {
    const { locale, formats } = this;
    const { format } = options;

    const date = new Date(value);
    const defaults = format && getNamedFormat(formats, 'time', format);
    let filteredOptions = { ...defaults, ...options };

    if (
      !filteredOptions.hour &&
      !filteredOptions.minute &&
      !filteredOptions.second
    ) {
      // Add default formatting options if hour, minute, or second isn't defined.
      filteredOptions = {
        ...filteredOptions,
        hour: 'numeric',
        minute: 'numeric',
      };
    }

    try {
      return Formatters.getDateTimeFormat(locale, filteredOptions).format(date);
    } catch (e) {
      if (__DEV__ || __STAGE__) {
        console.error(`[React Intl] Error formatting time.\n${e}`);
      }
    }

    return String(date);
  }

  formatRelative(value: string | number | Date, options: FlowTodo = {}) {
    const { locale, formats } = this;
    const { format } = options;

    const date = new Date(value);
    const now = new Date(options.now);
    const defaults = format && getNamedFormat(formats, 'relative', format);
    const filteredOptions = { ...defaults, ...options };

    // Capture the current threshold values, then temporarily override them with
    // specific values just for this render.
    const oldThresholds = { ...IntlRelativeFormat.thresholds };
    updateRelativeFormatThresholds(RELATIVE_FORMAT_THRESHOLDS);

    try {
      return Formatters.getRelativeFormat(locale, filteredOptions).format(
        date,
        {
          now: Number.isFinite(now) ? now : this.now(),
        },
      );
    } catch (e) {
      if (__DEV__ || __STAGE__) {
        console.error(`[React Intl] Error formatting relative time.\n${e}`);
      }
    } finally {
      updateRelativeFormatThresholds(oldThresholds);
    }

    return String(date);
  }

  formatNumber(value: number, options: FlowTodo = {}) {
    const { locale, formats } = this;
    const { format } = options;

    const defaults = format && getNamedFormat(formats, 'number', format);

    try {
      return Formatters.getNumberFormat(locale, {
        ...defaults,
        ...options,
      }).format(value);
    } catch (e) {
      if (__DEV__ || __STAGE__) {
        console.error(`[React Intl] Error formatting number.\n${e}`);
      }
    }

    return String(value);
  }

  formatPlural(
    value: number,
    options?: Object = {},
  ): 'zero' | 'one' | 'two' | 'few' | 'many' | 'other' {
    const { locale } = this;

    try {
      return Formatters.getPluralFormat(locale, options).format(value);
    } catch (e) {
      if (__DEV__ || __STAGE__) {
        console.error(`[React Intl] Error formatting plural.\n${e}`);
      }
    }

    return 'other';
  }

  formatMessage(
    messageDescriptor: MessageDescriptor,
    values?: Object = {},
  ): string {
    if (!messageDescriptor) {
      const err = new Error('UNDEFINED_MESSAGE_DESCRIPTOR');
      console.error(`[React Intl] Undefined Message Descriptor.`, err);
      return __DEV__ ? 'UNDEFINED_MESSAGE_DESCRIPTOR' : '';
    }

    const { locale, formats, messages } = this;

    const { id } = messageDescriptor;

    // `id` is a required field of a Message Descriptor.
    invariant(id, '[React Intl] An `id` must be provided to format a message.');

    let message = messages && messages[id];
    if (__DEV__ || __STAGE__) {
      message =
        messageDescriptor[locale.substr(0, 2)] ||
        message ||
        messageDescriptor.default;
    }
    const hasValues = Object.keys(values).length > 0;

    // Avoid expensive message formatting for simple messages without values. In
    // development messages will always be formatted in case of missing values.
    if (!hasValues && process.env.NODE_ENV === 'production') {
      return message || id;
    }

    if (message) {
      try {
        const formatter = Formatters.getMessageFormat(message, locale, formats);

        return formatter.format(values);
      } catch (e) {
        if (__DEV__ || __STAGE__) {
          console.error(
            `[React Intl] Error formatting message: "${id}" for locale: "${locale}"\n${e}`,
          );
        }
      }
    }
    // else if (__DEV__) {
    //   // This prevents warnings from littering the console in development
    //   // when no `messages` are passed into the <IntlProvider> for the
    //   // default locale, and a default message is in the source.
    //   if (
    //     !defaultMessage ||
    //     (locale && locale.toLowerCase() !== defaultLocale.toLowerCase())
    //   ) {
    //     console.error(
    //       `[React Intl] Missing message: "${id}" for locale: "${locale}"${
    //         defaultMessage ? ', using default message as fallback.' : ''
    //       }`,
    //     );
    //   }
    // }

    if (__DEV__ || __STAGE__) {
      console.error(
        `[React Intl] Cannot format message: "${id}", using message id as fallback.`,
      );
    }

    return id;
  }
}
