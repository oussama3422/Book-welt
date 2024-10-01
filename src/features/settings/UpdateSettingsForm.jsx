import Form from "../../ui/Form";
import FormRowTwo from "../../ui/FormRowTwo";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import useEditSetting from "./useUpdateSetting";
import Spinner from "../../ui/Spinner";
function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isSetting, EditSetting } = useEditSetting();

  // sourcery skip: avoid-function-declarations-in-blocks
  function handleSetting(e, field) {
    const { value } = e.target;
    if (!value) {
      return;
    }
    EditSetting({ [field]: value });
    console.log(value);
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Form>
      <FormRowTwo label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isSetting}
          onBlur={(e) => handleSetting(e, "minBookingLength")}
        />
      </FormRowTwo>
      <FormRowTwo label="Maximum nights/booking">
        <Input type="number" id="max-nights" defaultValue={maxBookingLength} />
      </FormRowTwo>
      <FormRowTwo label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
        />
      </FormRowTwo>
      <FormRowTwo label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
        />
      </FormRowTwo>
    </Form>
  );
}

export default UpdateSettingsForm;
