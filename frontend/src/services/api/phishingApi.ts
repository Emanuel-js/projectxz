import { api } from "../../lib/axios";
import {
  PhishingAttempt,
  CreatePhishingAttemptRequest,
} from "../../types/phishing";

export const phishingApi = {
  /**
   * Get all phishing attempts
   */
  getPhishingAttempts: () => api.get<PhishingAttempt[]>("/phishing/attempts"),

  /**
   * Send a phishing email
   */
  sendPhishingEmail: (data: CreatePhishingAttemptRequest) =>
    api.post<PhishingAttempt>("/phishing/send", data),

  /**
   * Track a phishing email click
   */
  trackClick: (trackingId: string) =>
    api.get<PhishingAttempt>(`/phishing/track/${trackingId}`),
};
