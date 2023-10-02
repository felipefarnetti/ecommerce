"use client";
import React from "react";
import FormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { FormikErrors, useFormik } from "formik";
import * as yup from "yup";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { formikFilterForm } from "@utils/formikHelpers";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const validationSchema = yup.object().shape({
  password1: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  password2: yup
    .string()
    .oneOf([yup.ref("password1")], "Passwords must match")
    .required("Confirm password is required"),
});

interface Props {
  userId: string;
  token: string;
}

export default function UpdatePassword({ token, userId }: Props) {
  const router = useRouter();
  const {
    values,
    isSubmitting,
    touched,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues: { password1: "", password2: "" },
    validationSchema,
    onSubmit: async (values, actions) => {
      const res = await fetch("/api/users/update-password", {
        method: "POST",
        body: JSON.stringify({ password: values.password1, token, userId }),
      });
      const { message, error } = await res.json();

      if (res.ok) {
        toast.success(message);
        router.replace("/auth/signin");
      }

      if (!res.ok && error) {
        toast.error(error);
      }
    },
  });

  // Modify the formikFilterForm function or create a new function to transform errors
  const transformErrors = (
    errors: FormikErrors<{ password1: string; password2: string }>
  ) => {
    const transformedErrors: { [key: string]: boolean } = {};
    for (const key in errors) {
      transformedErrors[key] = true; // Set to true if there's an error
    }
    return transformedErrors;
  };

  // Then use the transformed errors in your component
  const errorsToRender = transformErrors(errors);

  type valueKeys = keyof typeof values;

  const { password1, password2 } = values;
  const error = (name: valueKeys) => {
    return errors[name] && touched[name] ? true : false;
  };

  return (
    <FormContainer title="Reset password" onSubmit={handleSubmit}>
      <Input
        name="password1"
        label="Password"
        value={password1}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error("password1")}
        type="password"
        crossOrigin={"anonymous"}
      />
      <Input
        name="password2"
        label="Confirm Password"
        value={password2}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error("password2")}
        type="password"
        crossOrigin={"anonymous"}
      />
      <Button
        type="submit"
        className="w-full"
        color="indigo"
        disabled={isSubmitting}
      >
        Reset Password
      </Button>
      <div className="">
        {Object.keys(errorsToRender).map((item) => {
          return (
            <div
              key={item}
              className="space-x-1 flex items-center text-red-500"
            >
              <XMarkIcon className="w-4 h-4" />
              <p className="text-xs">{item}</p>
            </div>
          );
        })}
      </div>
    </FormContainer>
  );
}
