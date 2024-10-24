import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStates } from "./useRecentStates";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
  margin-top: 8px;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const {
    stays,
    confirmedStays,
    isLoading: isLoading2,
    numDays,
  } = useRecentStates();
  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) {
    return <Spinner />;
  }
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmStats={confirmedStays}
        numDays={numDays}
        countCabins={cabins.length}
      />
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Charts sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
