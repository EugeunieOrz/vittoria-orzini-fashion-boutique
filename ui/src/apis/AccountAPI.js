// @flow
import API, { APIResponse } from 'util/API';
/**
 * Executes user calls against the backend API.
 */
export default class AccountAPI extends API {

  /**
   * Sends last item alert notifications to the user.
   *
   * @param data The data.
   * @return A resolved or rejected promise containing an API result.
   */
  async checkForLastItem(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/account/wishlist/check-last-item`, data);
    return response.json();
  }

  /**
   * Marks last item notification in user's account as received.
   *
   * @param data The data.
   * @return A resolved or rejected promise containing an API result.
   */
  async receiveLastItemAlert(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/account/wishlist/receive-last-item-alert`, data);
    return response.json();
  }

}
