// // @flow
// /*
//  * Copyright 2018, Pavel Lang <langpavel@phpskelet.org>
//  * Copyright 2015, Yahoo Inc.
//  * Copyrights licensed under the New BSD License.
//  * See the accompanying LICENSE file for terms.
//  */
//
// import * as React from 'react';
// import type { RelativeFormatPropTypes } from '../types';
//
// const SECOND = 1000;
// const MINUTE = 1000 * 60;
// const HOUR = 1000 * 60 * 60;
// const DAY = 1000 * 60 * 60 * 24;
//
// // The maximum timer delay value is a 32-bit signed integer.
// // See: https://mdn.io/setTimeout
// const MAX_TIMER_DELAY = 2147483647;
//
// function selectUnits(delta) {
//   const absDelta = Math.abs(delta);
//
//   if (absDelta < MINUTE) {
//     return 'second';
//   }
//
//   if (absDelta < HOUR) {
//     return 'minute';
//   }
//
//   if (absDelta < DAY) {
//     return 'hour';
//   }
//
//   // The maximum scheduled delay will be measured in days since the maximum
//   // timer delay is less than the number of milliseconds in 25 days.
//   return 'day';
// }
//
// function getUnitDelay(units) {
//   switch (units) {
//     case 'second':
//       return SECOND;
//     case 'minute':
//       return MINUTE;
//     case 'hour':
//       return HOUR;
//     case 'day':
//       return DAY;
//     default:
//       return MAX_TIMER_DELAY;
//   }
// }
//
// function isSameDate(a, b) {
//   if (a === b) {
//     return true;
//   }
//
//   const aTime = new Date(a).getTime();
//   const bTime = new Date(b).getTime();
//
//   return Number.isFinite(aTime) && Number.isFinite(bTime) && aTime === bTime;
// }
//
// export default class FormattedRelative extends React.Component<
//   RelativeFormatPropTypes,
// > {
//   // static propTypes = {
//   //   ...relativeFormatPropTypes,
//   //   value: PropTypes.any.isRequired,
//   //   format: PropTypes.string,
//   //   updateInterval: PropTypes.number,
//   //   initialNow: PropTypes.any,
//   //   children: PropTypes.func,
//   // };
//
//   static defaultProps = {
//     updateInterval: 1000 * 10,
//   };
//
//   scheduleNextUpdate(props, state) {
//     // Cancel and pending update because we're scheduling a new update.
//     clearTimeout(this._timer);
//
//     const { value, units, updateInterval } = props;
//     const time = new Date(value).getTime();
//
//     // If the `updateInterval` is falsy, including `0` or we don't have a
//     // valid date, then auto updates have been turned off, so we bail and
//     // skip scheduling an update.
//     if (!updateInterval || !Number.isFinite(time)) {
//       return;
//     }
//
//     const delta = time - state.now;
//     const unitDelay = getUnitDelay(units || selectUnits(delta));
//     const unitRemainder = Math.abs(delta % unitDelay);
//
//     // We want the largest possible timer delay which will still display
//     // accurate information while reducing unnecessary re-renders. The delay
//     // should be until the next "interesting" moment, like a tick from
//     // "1 minute ago" to "2 minutes ago" when the delta is 120,000ms.
//     const delay =
//       delta < 0
//         ? Math.max(updateInterval, unitDelay - unitRemainder)
//         : Math.max(updateInterval, unitRemainder);
//
//     this._timer = setTimeout(() => {
//       this.setState({ now: this.context.intl.now() });
//     }, delay);
//   }
//
//   componentDidMount() {
//     this.scheduleNextUpdate(this.props, this.state);
//   }
//
//   componentWillReceiveProps({ value: nextValue }) {
//     // When the `props.value` date changes, `state.now` needs to be updated,
//     // and the next update can be rescheduled.
//     if (!isSameDate(nextValue, this.props.value)) {
//       this.setState({ now: this.context.intl.now() });
//     }
//   }
//
//   shouldComponentUpdate(...next) {
//     return shouldIntlComponentUpdate(this, ...next);
//   }
//
//   componentWillUpdate(nextProps, nextState) {
//     this.scheduleNextUpdate(nextProps, nextState);
//   }
//
//   componentWillUnmount() {
//     clearTimeout(this._timer);
//   }
//
//   render() {
//     const { formatRelative, textComponent: Text } = this.context.intl;
//     const { value, children } = this.props;
//
//     const formattedRelative = formatRelative(value, {
//       ...this.props,
//       ...this.state,
//     });
//
//     if (typeof children === 'function') {
//       return children(formattedRelative);
//     }
//
//     return <Text>{formattedRelative}</Text>;
//   }
// }
