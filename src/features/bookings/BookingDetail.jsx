import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;
function BookingDetail() {
  const { isLoading, booking, error } = useBooking();
  // Handle loading state
  if (isLoading) {
    return <Spinner />;
  }
  // Handle error state
  if (error) {
    return <div>Error fetching booking: {error.message}</div>;
  }
  // Ensure booking is defined before destructuring
  if (!booking) {
    return <div>No booking details found.</div>;
  }
  const { status, id: bookingId } = booking;
  const moveBack = useMoveBack();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  function handleCheckIn() {}

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      <ButtonGroup>
        <Button onClick={handleCheckIn}>Check in</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
      <Row />
    </>
  );
}

export default BookingDetail;
