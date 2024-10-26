import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkOut, IsCheckingOut } = useCheckOut();
  return (
    <Button
      onClick={() => checkOut(bookingId)}
      disabled={IsCheckingOut}
      variation="primary"
      size="small"
    >
      CheckOut
    </Button>
  );
}

export default CheckoutButton;
