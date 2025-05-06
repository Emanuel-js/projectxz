/**
 * Phishing attempt interface
 */
export interface PhishingAttempt {
  _id: string;
  recipientEmail: string;
  subject: string;
  content: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  isClicked: boolean;
  clickedAt?: string;
  status: "pending" | "sent" | "clicked" | "failed";
  trackingId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Phishing attempts response from the API
 */
export interface PhishingAttemptsResponse {
  attempts: PhishingAttempt[];
}

/**
 * Single phishing attempt response from the API
 */
export interface PhishingAttemptResponse {
  attempt: PhishingAttempt;
}

/**
 * Create phishing attempt request
 */
export interface CreatePhishingAttemptRequest {
  recipientEmail: string;
  subject: string;
  content: string;
}
