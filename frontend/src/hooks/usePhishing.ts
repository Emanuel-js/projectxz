import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { phishingApi } from "../services/api/phishingApi";
import { CreatePhishingAttemptRequest } from "../types/phishing";

/**
 * Hook to fetch all phishing attempts
 */
export const usePhishingAttempts = () => {
  return useQuery({
    queryKey: ["phishingAttempts"],
    queryFn: phishingApi.getPhishingAttempts,
  });
};

/**
 * Hook to send a phishing email
 */
export const useSendPhishingEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePhishingAttemptRequest) =>
      phishingApi.sendPhishingEmail(data),
    onSuccess: () => {
      // Invalidate the phishing attempts query to refetch the data
      queryClient.invalidateQueries({ queryKey: ["phishingAttempts"] });
    },
  });
};

/**
 * Hook to track a phishing email click
 */
export const useTrackPhishingClick = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trackingId: string) => phishingApi.trackClick(trackingId),
    onSuccess: () => {
      // Invalidate the phishing attempts query to refetch the data
      queryClient.invalidateQueries({ queryKey: ["phishingAttempts"] });
    },
  });
};
