// @flow
import API, { APIResponse } from 'util/API';

/**
 * API to handle the health status.
 */
export default class ProductsAPI extends API {
  /**
   * Gets the list of available products.
   *
   * @returns An object indicating if the process was successful or not.
   */
  async get(): Promise<APIResponse> {
    const response = await this.request('api/shopping/products');

    return response.json();
  }
}
