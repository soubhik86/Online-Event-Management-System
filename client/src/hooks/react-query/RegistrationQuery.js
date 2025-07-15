// src/hooks/react-query/RegistrationQuery.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getMyRegistrations, getTicketByEvent, registerEvent } from "../../Api/functions/Registration";
import { REGISTRATIONS, TICKETS } from "./QueryKey";

// ✅ Register for event (mutation)
export const useRegisterEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerEvent,
    onSuccess: () => {
      toast.success("Registered successfully for the event ✅");
      queryClient.invalidateQueries([REGISTRATIONS]);
    },
  });
};

// ✅ Get all registrations by current user
export const useGetMyRegistrationsQuery = () => {
  return useQuery({
    queryKey: [REGISTRATIONS],
    queryFn: getMyRegistrations,
  });
};

// ✅ Get ticket by eventId
export const useGetTicketByEventQuery = (eventId) => {
  return useQuery({
    queryKey: [TICKETS, eventId],
    queryFn: () => getTicketByEvent(eventId),
    enabled: !!eventId,
  });
};
