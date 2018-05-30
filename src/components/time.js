// // @flow
// /*
//  * Copyright 2018, Pavel Lang <langpavel@phpskelet.org>
//  * Copyright 2015, Yahoo Inc.
//  * Copyrights licensed under the New BSD License.
//  * See the accompanying LICENSE file for terms.
//  */
// 
// import * as React from 'react';
// import type { DateTimeFormatPropTypes } from '../types';
// 
// type FormattedTimeProps = DateTimeFormatPropTypes & {
//   value: mixed,
//   format: string,
//   children: Function,
// };
// 
// export default class FormattedTime extends React.Component<FormattedTimeProps> {
//   render() {
//     const { formatTime, textComponent: Text } = this.context.intl;
//     const { value, children } = this.props;
// 
//     const formattedTime = formatTime(value, this.props);
// 
//     if (typeof children === 'function') {
//       return children(formattedTime);
//     }
// 
//     return <Text>{formattedTime}</Text>;
//   }
// }
