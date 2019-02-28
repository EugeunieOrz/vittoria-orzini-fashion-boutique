// @flow
import API, { APIResponse } from 'util/API';

/**
 * Executes auth calls against the backend API.
 */
export default class HomeAPI extends API {
  /**
   * Passes product id to the next page.
   *
   * @param productID The product's ID.
   * @returns An object indicating if the process was successful or not.
   */
  async passProductID(productID: string): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/product/${productID}`);

    return response.json();
  }
}
