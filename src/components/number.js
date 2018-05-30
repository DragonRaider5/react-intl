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
// import type { NumberFormatPropTypes } from '../types';
//
// export default class FormattedNumber extends React.Component<
//   NumberFormatPropTypes,
// > {
//   //  ...numberFormatPropTypes,
//   //  value: PropTypes.any.isRequired,
//   //  format: PropTypes.string,
//   //  children: PropTypes.func,
//
//   render() {
//     const { value, children } = this.props;
//     return (
//       <Consumer>
//         {intl => {
//           const { formatNumber, textComponent: Text } = intl;
//
//           const formattedNumber = formatNumber(value, this.props);
//
//           if (typeof children === 'function') {
//             return children(formattedNumber);
//           }
//
//           return <Text>{formattedNumber}</Text>;
//         }}
//       </Consumer>
//     );
//   }
// }
