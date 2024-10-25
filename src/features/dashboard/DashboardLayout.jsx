import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStates } from "./useRecentStates";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

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
    confirmedStats,
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
        confirmedStats={confirmedStats}
        numDays={numDays}
        countCabins={cabins.length}
      />
      <TodayActivity/>
      <DurationChart confirmedStats={confirmedStats} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
