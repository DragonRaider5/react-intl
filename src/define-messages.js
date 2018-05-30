// @flow
/*
 * Copyright 2018, Pavel Lang <langpavel@phpskelet.org>
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

import type { MessageDescriptorMap } from './types';

// transparent proxy for @langpavel/babel-plugin-react-intl
export default function defineMessages(
  messageDescriptors: MessageDescriptorMap,
): MessageDescriptorMap {
  return messageDescriptors;
}
