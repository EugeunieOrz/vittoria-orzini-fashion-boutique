// @flow
import isAlpha from 'validator/lib/isAlpha';
import isEmpty from 'validator/lib/isEmpty';
import isNumeric from 'validator/lib/isNumeric';
import equals from 'validator/lib/equals';

/* eslint-disable import/prefer-default-export */
export const isRequired = (val: string): boolean => !isEmpty(val);
export const required = (value) => value;
export const ageLimitRequired = (value) => value === true;
export const titleRequired = (val: string): boolean =>
  equals(val, "Mr.") || equals(val, "Mrs.") || equals(val, "Ms.") ||
  equals(val, "SIG.") || equals(val, "SIG.RA") || equals(val, "SIG.NA");

export const statusRequired = (val: string): boolean =>
  equals(val, "Awaiting Order") || equals(val, "Order in Processing") || equals(val, "Order Dispatched") ||
  equals(val, "Order Delivered") || equals(val, "Order Returned");

export const passwordsMatch = ({ password, confirmPassword }) => password === confirmPassword;

export const isLatin = (val:string): boolean => isAlpha(val);

export const monthRequired = (val: string): boolean => !equals(val, "MM") && isNumeric(val);
export const yearRequired = (val: string): boolean => !equals(val, "YY") && isNumeric(val);
