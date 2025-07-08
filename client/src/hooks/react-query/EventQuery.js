import { useQuery } from "@tanstack/react-query";
import { EVENTS } from "./QueryKey";
import { allEvent, getEventById } from "../../Api/functions/Events";




export const useGetAllEventQuery = () => {
  return useQuery({
    queryKey: [EVENTS],
    queryFn: allEvent,
  });
};

export const useGetEventByIdQuery = (id) => {
  return useQuery({
    queryKey: [EVENTS, id],
    queryFn: () => getEventById (id),
    enabled: !!id, // Only run the query if id is truthy
  });
}