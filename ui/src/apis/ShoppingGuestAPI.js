// @flow
import API, { APIResponse } from 'util/API';

/**
 * API to handle the health status.
 */
export default class ShoppingAPI extends API {

  /**
   * Add a product to a shopping cart.
   *
   * @param product The product.
   * @returns An object indicating if the process was successful or not.
   */
  async addProductToShoppingBag(product: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/guest/product/added`, product);
    return response.json();
  }

  /**
   * Edit a product size in a shopping cart.
   *
   * @param itemID The product id.
   * @param sizeToAdd The product size to add.
   * @param sizeToRemove The product size to remove.
   * @param qty The quantity of product size selected by the user.
   * @returns An object indicating if the process was successful or not.
   */
  async editProductInGuestShoppingBag(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/guest/product/edit`, data);
    return response.json();
  }

  /**
   * Edit a product quantity in a shopping cart.
   *
   * @param itemID The product id.
   * @param qtyToAdd The quantity of product to add.
   * @param size The product size selected by the user.
   * @returns An object indicating if the process was successful or not.
   */
  async editProductQtyInGuestShoppingBag(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/guest/product/edit/qty`, data);
    return response.json();
  }

  /**
   * Removes the products from shopping bag by its id.
   *
   * @param shoppingID The shopping id.
   * @returns An object indicating if the process was successful or not.
   */
  async removeItemFromGuestShoppingBag(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/guest/product/removed`, data);

    return response.json();
  }

}
