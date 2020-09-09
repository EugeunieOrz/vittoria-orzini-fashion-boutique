// @flow
import API, { APIResponse } from 'util/API';
import type { NewsletterUnsubscribeForm } from 'modules/NewsletterUnsubscribeModule';
/**
 * Executes user calls against the backend API.
 */
export default class NewsletterAPI extends API {

  /**
   * Sends newsletters to subscribers.
   *
   * @param data The data.
   * @return A resolved or rejected promise containing an API result.
   */
  async sendNewsletter(): Promise<APIResponse> {
    const response = await this.request(`api/newsletter`);
    return response.json();
  }

  /**
   * Updates newsletter subscription.
   *
   * @param data The data.
   * @return A resolved or rejected promise containing an API result.
   */
  async subscribeToNewsletter(data: Object): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/newsletter/subscription`, data);
    return response.json();
  }

  /**
   * Validates the newsletter task id.
   *
   * @param id The newsletter task id to validate.
   * @returns An object indicating if the newsletter task id is valid or not.
   */
  async validateNewsletterID(id: string): Promise<APIResponse> {
    const response = await this.request(`api/newsletter/unsubscribe/${id}`);

    return response.json();
  }

  /**
   * Removes newsletter subscription.
   *
   * @param data The data.
   * @return A resolved or rejected promise containing an API result.
   */
  async unsubscribeFromNewsletter(id: string, data: NewsletterUnsubscribeForm): Promise<APIResponse> {
    const response = await this.jsonRequest(`api/newsletter/unsubscribe/${id}`, data);
    return response.json();
  }

}
