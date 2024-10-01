import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import FormRowTwo from "../../ui/FormRowTwo";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, CreateCabin } = useCreateCabin();
  const { isEditing, EditCabin } = useEditCabin();

  const isEditingOrIsCreating = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      EditCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onClose();
          },
        }
      );
    } else {
      CreateCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onClose();
          },
        }
      );
    }
  }
  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRowTwo label="Cabin name" error={errors.name?.message}>
        <Input
          disabled={isEditingOrIsCreating}
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRowTwo>
      <FormRowTwo label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          disabled={isEditingOrIsCreating}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1.",
            },
          })}
        />
      </FormRowTwo>

      <FormRowTwo label="Regular price" error={errors.regularPrice?.message}>
        <Input
          disabled={isEditingOrIsCreating}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should at least 1",
            },
          })}
        />
      </FormRowTwo>
      <FormRowTwo label="Discount" error={errors.discount?.message}>
        <Input
          disabled={isEditingOrIsCreating}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular Price",
          })}
        />
      </FormRowTwo>
      <FormRowTwo
        label="Description for website"
        error={errors.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRowTwo>
      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          disabled={isEditingOrIsCreating}
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isEditingOrIsCreating}>
          {isEditSession ? "Edit cabin" : "Create New cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
