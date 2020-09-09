// @flow
import API, { APIResponse } from 'util/API';
import type { RecoverPasswordForm } from 'bundles/Auth/modules/RecoverPasswordModule';
import type { ResetPasswordForm } from 'bundles/Auth/modules/ResetPasswordModule';
import type { SignInForm } from 'bundles/Auth/modules/SignInModule';
import type { SignUpForm } from 'bundles/Auth/modules/SignUpModule';

/**
 * Executes auth calls against the backend API.
 */
export default class AuthAPI extends API {
  /**
   * Sign up a user.
   *
   * @param data The sign-up data.
   * @return A resolved or rejected promise containing an API result.
   */
  async signUp(data: SignUpForm): Promise<APIResponse> {
    const response = await this.jsonRequest('api/auth/sign-up', data);
    return response.json();
  }

  /**
   * Sign up a user with a shopping bag.
   *
   * @param data The sign-up data.
   * @return A resolved or rejected promise containing an API result.
   */
  async signUpToShop(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest('api/auth/sign-up/shopping', data);
    return response.json();
  }

  /**
   * Sign in a user.
   *
   * @param data The sign-in data.
   * @returns An object indicating if the process was successful or not.
   */
  async signIn(data: SignInForm): Promise<APIResponse> {
    const response = await this.jsonRequest('api/auth/sign-in', data);
    return response.json();
  }

  /**
   * Sign in a user with a shopping bag.
   *
   * @param data The sign-in data.
   * @returns An object indicating if the process was successful or not.
   */
  async signInToShop(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest('api/auth/sign-in/shopping', data);
    return response.json();
  }

  /**
   * Requests an email with password recovery instructions.
   *
   * @param data The forgot password data.
   * @returns An object indicating if the process was successful or not.
   */
  async recoverPassword(data: RecoverPasswordForm): Promise<APIResponse> {
    const response = await this.jsonRequest('api/auth/password/recovery', data);
    return response.json();
  }

  /**
   * Validates the password recovery token.
   *
   * @param token The token to validate.
   * @returns An object indicating if the token is valid or not.
   */
  async validatePasswordToken(token: string): Promise<APIResponse> {
    const response = await this.request(`api/auth/password/recovery/${token}`);

    return response.json();
  }

  /**
   * Resets the password.
   *
   * @param token The recovery token.
   * @param data  The reset password data.
   * @returns An object indicating if the process was successful or not.
   */
  async resetPassword(token: string, data: ResetPasswordForm): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/auth/password/recovery/${token}`, data);

    return response.json();
  }

  /**
   * Submits result of password survey.
   *
   * @param id The user's id to save results.
   * @param data  The password survey data.
   * @returns An object indicating if the process was successful or not.
   */
  async submitPasswordSurvey(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/auth/password/survey`, data);
    console.log('response: ', response);
    return response.json();
  }
}
