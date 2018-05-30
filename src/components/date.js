// // @flow
// /*
//  * Copyright 2018, Pavel Lang <langpavel@phpskelet.org>
//  * Copyright 2015, Yahoo Inc.
//  * Copyrights licensed under the New BSD License.
//  * See the accompanying LICENSE file for terms.
//  */
//
// import * as React from 'react';
// import { IntlConsumer } from './context';
// import type { DateTimeFormatPropTypes } from '../types';
//
// export default class FormattedDate extends React.Component<
//   DateTimeFormatPropTypes,
// > {
//   render() {
//     const { value, children } = this.props;
//     return (
//       <IntlConsumer>
//         {intl => {
//           const { formatDate, textComponent: Text } = intl;
//
//           const formattedDate = formatDate(value, this.props);
//
//           if (typeof children === 'function') {
//             return children(formattedDate);
//           }
//
//           return <Text>{formattedDate}</Text>;
//         }}
//       </IntlConsumer>
//     );
//   }
// }
