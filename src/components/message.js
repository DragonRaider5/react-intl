// @flow
/*
 * Copyright 2018, Pavel Lang <langpavel@phpskelet.org>
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/* eslint-disable react/no-unused-prop-types */

import * as React from 'react';
import { IntlConsumer } from './context';
import type { MessageDescription } from '../types';

type FormattedMessageProps = {
  id: string,
  description?: MessageDescription,
  cs?: string,
  en?: string,
  sk?: string,
  default?: string,
  values?: Object,
  component?: string | React.ComponentType<{}>,
  children?: (translated: string) => React.Element,
};

export default class FormattedMessage extends React.PureComponent<
  FormattedMessageProps,
> {
  render() {
    return (
      <IntlConsumer>
        {translator => {
          if (!translator) {
            // eslint-disable-next-line jsx-a11y/accessible-emoji
            return <span className="msg-na"> ⏳ </span>;
          }

          const {
            id,
            values,
            component: Component = React.Fragment,
            children,
          } = this.props;

          let tokenDelimiter;
          const tokenizedValues = {};
          let elements;

          if (values) {
            const valKeys = Object.keys(values);

            // Creates a token with a random UID that should not be guessable or
            // conflict with other parts of the `message` string.
            const uid = Math.floor(Math.random() * 0x10000000000).toString(16);

            const generateToken = (() => {
              let counter = 0;
              // eslint-disable-next-line no-plusplus
              return () => `ELEMENT-${uid}-${counter++}`;
            })();

            // Splitting with a delimiter to support IE8. When using a regex
            // with a capture group IE8 does not include the capture group in
            // the resulting array.
            tokenDelimiter = `@__${uid}__@`;
            elements = {};

            // Iterates over the `props` to keep track of any React Element
            // values so they can be represented by the `token` as a placeholder
            // when the `message` is formatted. This allows the formatted
            // message to then be broken-up into parts with references to the
            // React Elements inserted back in.
            valKeys.forEach(name => {
              const value = values[name];

              if (React.isValidElement(value)) {
                const token = generateToken();
                tokenizedValues[name] = tokenDelimiter + token + tokenDelimiter;
                elements[token] = value;
              } else {
                tokenizedValues[name] = value;
              }
            });
          }

          const formattedMessage = translator.formatMessage(
            __DEV__ ? this.props : { id },
            tokenizedValues || values,
          );

          let nodes;

          const hasElements = elements && Object.keys(elements).length > 0;
          if (hasElements) {
            // Split the message into parts so the React Element values captured
            // above can be inserted back into the rendered message. This
            // approach allows messages to render with React Elements while
            // keeping React's virtual diffing working properly.
            nodes = formattedMessage
              .split(tokenDelimiter)
              .filter(part => !!part)
              .map(part => elements[part] || part);
          } else {
            nodes = [formattedMessage];
          }

          if (typeof children === 'function') {
            // huuu toduu
            return children(...nodes);
          }

          // huuu toduu
          return <Component>{nodes}</Component>;
        }}
      </IntlConsumer>
    );
  }
}
