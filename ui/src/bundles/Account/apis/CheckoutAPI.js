// @flow
import API, { APIResponse } from 'util/API';

/**
 * API to handle the health status.
 */
export default class CheckoutAPI extends API {

  /**
   * Sends the checkout data of the user to the server-side
   * if no addresses and no cards were saved to user's account.
   *
   * @param data The checkout data of the user.
   * @returns An object indicating if the process was successful or not.
   */
  async fillCheckoutData(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/product/checkout`, data);

    return response.json();
  }

  /**
   * Sends the checkout data of the user to the server-side
   * if some addresses and no cards were saved to user's account.
   *
   * @param data The checkout data of the user.
   * @returns An object indicating if the process was successful or not.
   */
  async fillCheckoutData2(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/product/checkout-2`, data);

    return response.json();
  }

  /**
   * Sends the checkout data of the user to the server-side
   * if no addresses and some cards were saved to user's account.
   *
   * @param data The checkout data of the user.
   * @returns An object indicating if the process was successful or not.
   */
  async fillCheckoutData3(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/product/checkout-3`, data);
    return response.json();
  }

  /**
   * Sends the checkout data of the user to the server-side
   * if some addresses and some cards were saved to user's account.
   *
   * @param data The checkout data of the user.
   * @returns An object indicating if the process was successful or not.
   */
  async fillCheckoutData4(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/product/checkout-4`, data);

    return response.json();
  }

}
