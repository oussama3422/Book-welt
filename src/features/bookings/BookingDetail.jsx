import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiTrash } from "react-icons/hi2";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useNavigate } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;
function BookingDetail() {
  const { isLoading, booking, error } = useBooking();
  const { checkOut, IsCheckingOut } = useCheckOut();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  // Handle loading state
  if (isLoading) {
    return <Spinner />;
  }
  if (!booking) {
    return <Empty resource="booking" />;
  }
  // Handle error state
  if (error) {
    return <div>Error fetching booking: {error.message}</div>;
  }
  // Ensure booking is defined before destructuring
  if (!booking) {
    return <div>No booking details found.</div>;
  }
  const { status, id: bookingId } = booking ?? [];
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

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
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkIn/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button disabled={IsCheckingOut} onClick={() => checkOut(bookingId)}>
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete">
            <Button icon={<HiTrash />}>Delete booking</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeletingBooking}
              onConfirm={() =>
                deleteBooking(bookingId, { onSettled: () => navigate(-1) })
              }
            />
          </Modal.Window>
        </Modal>
        <Button variations="primary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
      <Row />
    </>
  );
}

export default BookingDetail;
