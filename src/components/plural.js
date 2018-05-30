// // @flow
// /*
//  * Copyright 2018, Pavel Lang <langpavel@phpskelet.org>
//  * Copyright 2015, Yahoo Inc.
//  * Copyrights licensed under the New BSD License.
//  * See the accompanying LICENSE file for terms.
//  */
//
// import * as React from 'react';
// import { Consumer } from './context';
// import type { PluralFormatPropTypes } from '../types';
//
// export default class FormattedPlural extends React.Component<
//   PluralFormatPropTypes,
// > {
//   static displayName = 'FormattedPlural';
//
//   static contextTypes = {
//     intl: intlShape,
//   };
//
//   static propTypes = {
//     ...pluralFormatPropTypes,
//     value: PropTypes.any.isRequired,
//
//     other: PropTypes.node.isRequired,
//     zero: PropTypes.node,
//     one: PropTypes.node,
//     two: PropTypes.node,
//     few: PropTypes.node,
//     many: PropTypes.node,
//
//     children: PropTypes.func,
//   };
//
//   static defaultProps = {
//     style: 'cardinal',
//   };
//
//   constructor(props, context) {
//     super(props, context);
//     invariantIntlContext(context);
//   }
//
//   shouldComponentUpdate(...next) {
//     return shouldIntlComponentUpdate(this, ...next);
//   }
//
//   render() {
//     const { formatPlural, textComponent: Text } = this.context.intl;
//     const { value, other, children } = this.props;
//
//     const pluralCategory = formatPlural(value, this.props);
//     const formattedPlural = this.props[pluralCategory] || other;
//
//     if (typeof children === 'function') {
//       return children(formattedPlural);
//     }
//
//     return <Text>{formattedPlural}</Text>;
//   }
// }
