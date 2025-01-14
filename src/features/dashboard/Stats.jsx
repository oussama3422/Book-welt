import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStats, numDays, countCabins }) {
  // 1. number of bookings
  const numOfBookings = bookings.length;

  //   2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //   3. checkIns
  const checkIns = confirmedStats.length;

  //   4.occupancy

  const occupancy =
    confirmedStats.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * countCabins);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numOfBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check Ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancy * 100) + "%"}
      />
    </>
  );
}

export default Stats;
