// @flow
import API, { APIResponse } from 'util/API';
import type { CheckEmailForm } from 'bundles/Home/modules/CheckEmailModule';

/**
 * Executes auth calls against the backend API.
 */
export default class AuthAPI extends API {

  /**
   * Checks by email if a customer is registered or not.
   *
   * @param data The email data.
   * @returns An object indicating if the process was successful or not.
   */
  async checkEmail(data: CheckEmailForm): Promise<APIResponse> {
    const response = await this.jsonRequest('api/auth/check-email', data);
    return response.json();
  }

  /**
   * Signs in the registered user.
   *
   * @param data The password data.
   * @returns An object indicating if the process was successful or not.
   */
  async completeSignIn(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest('api/auth/complete-signin', data);

    return response.json();
  }

  /**
   * Creates account for a new customer.
   *
   * @param data The data.
   * @returns An object indicating if the process was successful or not.
   */
  async createAccount(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest('api/auth/create-account', data);

    return response.json();
  }

}
