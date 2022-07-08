import React from "react";
import { useForm } from "react-hook-form";
export default function Form() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true })} />
      {errors.firstName
        ? errors.firstName.type === "required" && "First name is required"
        : null}

      <input {...register("lastName", { required: true })} />
      {errors.lastName && <p>Last name is required</p>}

      <input {...register("mail", { required: "Email Address is required" })} />
      <p>{errors.mail ? errors.mail.message : null}</p>

      <input type="submit" />
    </form>
  );
}
