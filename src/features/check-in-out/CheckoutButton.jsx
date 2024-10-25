import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkout, IsCheckingOut } = useCheckOut();
  return (
    <Button
      onClick={() => checkout(bookingId)}
      disabled={IsCheckingOut}
      variation="primary"
      size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
