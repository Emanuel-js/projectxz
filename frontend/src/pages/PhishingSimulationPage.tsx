import { useState } from "react";
import {
  useSendPhishingEmail,
  usePhishingAttempts,
} from "../hooks/usePhishing";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

import { toast } from "sonner";

const PhishingSimulationPage = () => {
  const [formData, setFormData] = useState({
    recipientEmail: "",
    subject: "Security Alert: Action Required",
    content: "Please click the link below to verify your account security.",
  });
  const [error, setError] = useState<string | null>(null);

  const { data: phishingAttempts, isLoading, isError } = usePhishingAttempts();
  const sendPhishingEmailMutation = useSendPhishingEmail();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.recipientEmail) {
      setError("Email is required");
      return;
    }

    try {
      await sendPhishingEmailMutation.mutateAsync(formData);
      setFormData((prev) => ({ ...prev, recipientEmail: "" }));
      toast.success("Phishing email sent successfully");
    } catch (err) {
      setError("Failed to send phishing email. Please try again.");
      toast.error("Failed to send phishing email");
      console.error("Phishing attempt error:", err);
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "sent":
        return "bg-blue-100 text-blue-800";
      case "clicked":
        return "bg-purple-100 text-purple-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to render phishing attempts content based on loading/error state
  const renderPhishingAttemptsContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">
            Error loading phishing attempts
          </span>
        </div>
      );
    }

    if (phishingAttempts && phishingAttempts.length > 0) {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {phishingAttempts.map((attempt) => (
                <tr key={attempt._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {attempt.recipientEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {attempt.subject}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(attempt.status)}`}
                    >
                      {attempt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {attempt.createdBy?.name || "Unknown"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(attempt.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="text-center py-8 text-gray-500">
        <p>No phishing attempts found</p>
        <p className="mt-2 text-sm">
          Create your first phishing attempt using the form above.
        </p>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Phishing Simulation</h1>

      {/* Phishing Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Create New Phishing Attempt
        </h2>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="recipientEmail">Recipient Email</Label>
            <Input
              id="recipientEmail"
              name="recipientEmail"
              type="email"
              value={formData.recipientEmail}
              onChange={handleChange}
              placeholder="recipient@example.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="subject">Email Subject</Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Security Alert: Action Required"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="content">Email Content</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Please click the link below to verify your account security."
              className="mt-1 min-h-[100px]"
            />
          </div>

          <Button
            type="submit"
            disabled={sendPhishingEmailMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {sendPhishingEmailMutation.isPending
              ? "Sending..."
              : "Send Phishing Email"}
          </Button>
        </form>
      </div>

      {/* Phishing Attempts Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Phishing Attempts</h2>

        {renderPhishingAttemptsContent()}
      </div>
    </div>
  );
};

export default PhishingSimulationPage;
