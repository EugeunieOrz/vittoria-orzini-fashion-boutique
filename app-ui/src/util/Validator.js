// @flow
import isAlpha from 'validator/lib/isAlpha';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';

/* eslint-disable import/prefer-default-export */
export const isRequired = (val: string): boolean => !isEmpty(val);
export const required = (value) => value;
export const titleRequired = (val: string): boolean => equals(val, "Mr") || equals(val, "Mrs.") || equals(val, "Ms.");

export const passwordsMatch = ({ password, confirmPassword }) => password === confirmPassword;

export const validPasswordd = (val: string): boolean =>
   val.length > 9 &&
   /[a-z]/.test(val) &&
   /[A-Z]/.test(val) &&
   /[0-9]/.test(val) &&
   /[ !@#$%^&~*()_+\-=\[\]{};'`:"\\|,.<>\/?]/.test(val) &&
   /(?!(.)\1\1).{3}/.test(val);

export const isLatin = (val:string): boolean => isAlpha(val);
