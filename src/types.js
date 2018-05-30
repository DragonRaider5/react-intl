// @flow
/*
 * Copyright 2018, Pavel Lang <langpavel@phpskelet.org>
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import * as React from 'react';

export type MessageDescription =
  | string
  | {
      [name: string]: string,
    };

export type MessageDescriptor = {
  id: string,
  description?: MessageDescription,
  cs?: string,
  en?: string,
  sk?: string,
  default?: string,
  // [lang: string]: string,
};

export type MessageDescriptorMap = { [key: string]: MessageDescriptor };

export type MessageDictionary = { [key: string]: string };

export type DateTimeFormatSettings = {
  localeMatcher: 'best fit' | 'lookup',
  formatMatcher: 'basic' | 'best fit',

  timeZone: string,
  hour12: boolean,

  weekday: 'narrow' | 'short' | 'long',
  era: 'narrow' | 'short' | 'long',
  year: 'numeric' | '2-digit',
  month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long',
  day: 'numeric' | '2-digit',
  hour: 'numeric' | '2-digit',
  minute: 'numeric' | '2-digit',
  second: 'numeric' | '2-digit',
  timeZoneName: 'short' | 'long',
};

export type DateTimeFormatProps = {
  ...DateTimeFormatSettings,
  value: any,
  format: string,
  children: React.Node,
};

export type NumberFormatSettings = {
  localeMatcher: 'best fit' | 'lookup',

  style: 'decimal' | 'currency' | 'percent',
  currency: string,
  currencyDisplay: 'symbol' | 'code' | 'name',
  useGrouping: boolean,

  minimumIntegerDigits: number,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
  minimumSignificantDigits: number,
  maximumSignificantDigits: number,
};

export type NumberFormatProps = {
  ...NumberFormatSettings,
  value: any,
  format: string,
  children: React.Node,
};

export type RelativeFormatProps = {
  style: 'best fit' | 'numeric',
  units: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year',
};

export type PluralFormatProps = {
  style: 'cardinal' | 'ordinal',
};
