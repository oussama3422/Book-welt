import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export default function useBooking() {
  const { bookingId } = useParams();
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  console.log(booking);
  return { isLoading, booking, error };
}
