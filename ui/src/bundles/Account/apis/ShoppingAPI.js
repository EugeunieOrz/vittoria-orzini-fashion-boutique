// @flow
import API, { APIResponse } from 'util/API';
/**
 * Executes user calls against the backend API.
 */
export default class ShoppingAPI extends API {

  /**
   * Searches the order by the order number.
   *
   * @param data The data.
   * @return A resolved or rejected promise containing an API result.
   */
  async fillReturnForm2(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/secured/return-form`, data);
    return response.json();
  }

  /**
   * Sends product data to backend in order to obtain a refund.
   *
   * @param data The data.
   * @return A resolved or rejected promise containing an API result.
   */
  async fillReturnProduct2(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/secured/return-product`, data);
    return response.json();
  }

  /**
   * Add a product to a shopping cart.
   *
   * @param product The product.
   * @returns An object indicating if the process was successful or not.
   */
  async addProductToShoppingBag(product: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/product/added`, product);

    return response.json();
  }

  /**
   * Add a product from wishlist to a shopping cart.
   *
   * @param product The product.
   * @returns An object indicating if the process was successful or not.
   */
  async addWItemToBag(product: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/product/added`, product);

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
  async editProductInShoppingBag(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/product/edit`, data);
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
  async editProductQtyInShoppingBag(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/product/edit/qty`, data);
    return response.json();
  }

  /**
   * Removes a product from shopping bag by its id.
   *
   * @param itemID The product id.
   * @param size The product size selected by the user.
   * @returns An object indicating if the process was successful or not.
   */
  async removeItemFromShoppingBag(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/shopping/product/removed`, data);

    return response.json();
  }

  /**
   * Add a product to a wish list.
   *
   * @param product The product.
   * @param size The size of product selected by the user.
   * @param userID The unique id of the user.
   * @returns An object indicating if the process was successful or not.
   */
  async addProductToWishlist(product: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/account/wishlist/product/added`, product);

    return response.json();
  }

  /**
   * Add a product to a wish list.
   *
   * @param product The product.
   * @param size The size of product selected by the user.
   * @param userID The unique id of the user.
   * @returns An object indicating if the process was successful or not.
   */
  async removeItemFromWishlist(product: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/account/wishlist/product/removed`, product);

    return response.json();
  }
}
