// @flow
import API, { APIResponse } from 'util/API';
import type { DateOfBirthForm } from 'bundles/Admin/modules/UpdateModule';
import type { EditNameForm } from 'bundles/Admin/modules/EditNameModule';
import type { EditEmailForm } from 'bundles/Admin/modules/EditEmailModule';
import type { ChangePasswordForm } from 'bundles/Admin/modules/ChangePasswordModule';
import type { NewsletterForm } from 'bundles/Admin/modules/NewsletterModule';
import type { AddNewAddressForm } from 'bundles/Admin/modules/AddNewAddressFormModule';
import type { EditAddressForm } from 'bundles/Admin/modules/EditAddressFormModule';

/**
 * Executes auth calls against the backend API.
 */
export default class AdminAPI extends API {

  /**
   * Updates date of birth of the user.
   *
   * @param userID The user's ID.
   * @param data  The date of birth data.
   * @returns An object indicating if the process was successful or not.
   */
  async updateDetails(userID: string, data: DateOfBirthForm): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/admin/${userID}`, data);

    return response.json();
  }

  /**
   * Edits user's name.
   *
   * @param data The edit-name data.
   * @return A resolved or rejected promise containing an API result.
   */
  async editName(userID: string, data: EditNameForm): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/admin/edit-name/${userID}`, data);
    return response.json();
  }

  /**
   * Edits user's email.
   *
   * @param data The edit-email data.
   * @return A resolved or rejected promise containing an API result.
   */
  async editEmail(userID: string, data: EditEmailForm): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/admin/edit-email/${userID}`, data);
    return response.json();
  }

  /**
   * Changes user's password.
   *
   * @param data The password data.
   * @return A resolved or rejected promise containing an API result.
   */
  async changePassword(userID: string, data: ChangePasswordForm): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/admin/change-password/${userID}`, data);
    return response.json();
  }

  /**
   * Updates newsletter subscription.
   *
   * @param data The newsletter data.
   * @return A resolved or rejected promise containing an API result.
   */
  async updateNewsletter(userID: string, data: NewsletterForm): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/admin/update-newsletter/${userID}`, data);
    return response.json();
  }

  /**
   * Adds a new address to the user's address book.
   *
   * @param data The address data.
   * @return A resolved or rejected promise containing an API result.
   */
  async addNewAddress(userID: string, countryByIP: string, data: AddNewAddressForm): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/admin/add-a-new-address/${userID}/${countryByIP}`, data);
    return response.json();
  }

  /**
   * Edits address in the user's address book.
   *
   * @param data The address data.
   * @return A resolved or rejected promise containing an API result.
   */
  async editAddress(userID: string, index: Number, countryByIP: string, data: EditAddressForm): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/admin/edit-address/${userID}/${index}/${countryByIP}`, data);
    return response.json();
  }

  /**
   * Removes address from the user's address book.
   *
   * @param indexToRemoveAddress
   * @return A resolved or rejected promise containing an API result.
   */
  async removeAddress(userID: string, indexToRemoveAddress: Number): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/admin/remove-address/${userID}/${indexToRemoveAddress}`);
    return response.json();
  }
}
