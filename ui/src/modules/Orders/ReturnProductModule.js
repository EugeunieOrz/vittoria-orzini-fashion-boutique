// @flow
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export type RequestState = {
  isPending: boolean
}

export type ReturnProductForm = {
  firstName: string,
  lastName: string,
  email: string,
  telephone: string,
  reasonForRefund: string,
}

export const modelPath: string = 'fillReturnProduct.data';
export const requestState: RequestState = { isPending: false };
export const formState: ReturnProductForm = {
  firstName: '',
  lastName: '',
  email: '',
  telephone: '',
  reasonForRefund: '',
};

export const checkItemToReturn = createAction('CHECK_ITEM_TO_RETURN');
export const checkItemToReturn2 = createAction('CHECK_ITEM_TO_RETURN_2');

export const fillReturnProduct = createAction('FILL_RETURN_PRODUCT_FORM');
export const fillReturnProductPending = createAction('FILL_RETURN_PRODUCT_FORM_PENDING');
export const fillReturnProductFulfilled = createAction('FILL_RETURN_PRODUCT_FORM_FULFILLED');
export const fillReturnProductRejected = createAction('FILL_RETURN_PRODUCT_FORM_REJECTED');

export const resetModelPathAndRemoveItemFromStorage = createAction('RESET_MODELPATH_AND_REMOVE_ITEM_FROM_STORAGE');

export default combineReducers({
  request: handleActions({
    [fillReturnProductPending]: () => ({ isPending: true }),
    [fillReturnProductFulfilled]: () => ({ isPending: false }),
    [fillReturnProductRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
