// @flow
import API, { APIResponse } from 'util/API';

/**
 * API to handle the config.
 */
export default class NewsletterAPI extends API {
  /**
   * Gets the config.
   *
   * @returns An object indicating if the process was successful or not.
   */
  async get(userID: string): Promise<APIResponse> {
    const response = await this.request(`api/core/newsletter/${userID}`);

    return response.json();
  }
}
