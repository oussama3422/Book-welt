import styled from "styled-components";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, numNights, guests } = activity;
  console.log("activity", activity);

  // Destructure safely
  const countryFlag = guests?.countryFlag || "default-flag-url"; // Provide a default URL if necessary
  const fullName = guests?.fullName || "Unknown Guest"; // Default name if absent

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={countryFlag} alt={`Flag of ${countryFlag}`} />
      <Guest>{fullName}</Guest>
      <div>{numNights} nights</div>
      <div style={{ display: "flex" }}>
        {" "}
        {/* Adding flex for button alignment */}
        {status === "unconfirmed" && (
          <Button
            as={Link}
            to={`/checkin/${id}`}
            size="small"
            variant="primary"
          >
            CheckIn
          </Button>
        )}
        {status === "checked-in" && <CheckoutButton bookingId={id} />}
      </div>
    </StyledTodayItem>
  );
}

export default TodayItem;
