// @flow
import API, { APIResponse } from 'util/API';
/**
 * Executes user calls against the backend API.
 */
export default class ShoppingAPI extends API {

  /**
   * Tracks and displays order delivery status by the order number.
   *
   * @param data The data.
   * @return A resolved or rejected promise containing an API result.
   */
  async followOrder(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/order-number`, data);
    return response.json();
  }

  /**
   * Searches the order by the order number.
   *
   * @param data The data.
   * @return A resolved or rejected promise containing an API result.
   */
  async fillReturnForm(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/return-form`, data);
    return response.json();
  }


  /**
   * Sends product data to backend in order to obtain a refund.
   *
   * @param data The data.
   * @return A resolved or rejected promise containing an API result.
   */
  async fillReturnProduct(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/return-product`, data);
    return response.json();
  }

}
