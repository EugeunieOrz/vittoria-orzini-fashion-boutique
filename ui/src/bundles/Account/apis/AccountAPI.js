// @flow
import API, { APIResponse } from 'util/API';
import type { DateOfBirthForm } from 'bundles/Account/modules/UpdateModule';
import type { EditNameForm } from 'bundles/Account/modules/EditNameModule';
import type { EditEmailForm } from 'bundles/Account/modules/EditEmailModule';
import type { ChangePasswordForm } from 'bundles/Account/modules/ChangePasswordModule';
import type { NewsletterForm } from 'bundles/Account/modules/NewsletterModule';

/**
 * Executes auth calls against the backend API.
 */
export default class AccountAPI extends API {

  /**
   * Updates date of birth of the user.
   *
   * @param userID The user's ID.
   * @param data  The date of birth data.
   * @returns An object indicating if the process was successful or not.
   */
  async updateDetails(userID: string, data: DateOfBirthForm): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/account/edit-birthdate/${userID}`, data);

    return response.json();
  }

  /**
   * Edits user's name.
   *
   * @param data The edit-name data.
   * @return A resolved or rejected promise containing an API result.
   */
  async editName(userID: string, data: EditNameForm): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/account/edit-name/${userID}`, data);
    return response.json();
  }

  /**
   * Edits user's email.
   *
   * @param data The edit-email data.
   * @return A resolved or rejected promise containing an API result.
   */
  async editEmail(userID: string, data: EditEmailForm): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/account/edit-email/${userID}`, data);
    return response.json();
  }

  /**
   * Changes user's password.
   *
   * @param data The password data.
   * @return A resolved or rejected promise containing an API result.
   */
  async changePassword(userID: string, data: ChangePasswordForm): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/account/change-password/${userID}`, data);
    return response.json();
  }

  /**
   * Updates newsletter subscription.
   *
   * @param data The newsletter data.
   * @return A resolved or rejected promise containing an API result.
   */
  async updateNewsletter(userID: string, data: NewsletterForm): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/account/update-newsletter/${userID}`, data);
    return response.json();
  }

  /**
   * Adds a new address to the user's address book.
   *
   * @param data The address data.
   * @return A resolved or rejected promise containing an API result.
   */
  async addNewAddress(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/account/add-new-address`, data);
    return response.json();
  }

  /**
   * Edits address in the user's address book.
   *
   * @param data The address data.
   * @return A resolved or rejected promise containing an API result.
   */
  async editAddress(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/account/edit-address`, data);
    return response.json();
  }

  /**
   * Removes address from the user's address book.
   *
   * @param indexToRemoveAddress
   * @return A resolved or rejected promise containing an API result.
   */
  async removeAddress(userID: string, indexToRemoveAddress: Number): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/account/remove-address/${userID}/${indexToRemoveAddress}`);
    return response.json();
  }

  /**
   * Adds a new credit card to the user's card wallet.
   *
   * @param data The credit card data.
   * @return A resolved or rejected promise containing an API result.
   */
  async addNewCard(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/account/add-new-card/${data.userID}/${data.cardType}`, data.data);
    console.log(response);
    return response.json();
  }

  /**
   * Edits credit card in the user's card wallet.
   *
   * @param data The credit card data.
   * @return A resolved or rejected promise containing an API result.
   */
  async editCard(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/account/edit-card/${data.userID}/${data.index}/${data.cardType}`, data.data);
    return response.json();
  }

  /**
   * Removes credit card from the user's card wallet.
   *
   * @param indexToRemoveCard
   * @return A resolved or rejected promise containing an API result.
   */
  async removeCard(userID: string, indexToRemoveCard: Number): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/account/remove-card/${userID}/${indexToRemoveCard}`);
    return response.json();
  }

  /**
   * Removes user's account.
   *
   * @param userID
   * @return A resolved or rejected promise containing an API result.
   */
  async removeAccount(userID: string): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/account/remove-account/${userID}`);
    return response.json();
  }

  /**
   * Turns on last item alert notifications in the user's account.
   *
   * @param data The data.
   * @return A resolved or rejected promise containing an API result.
   */
  async setLastItemAlert(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/account/wishlist/last-item-alert`, data);
    return response.json();
  }

}
