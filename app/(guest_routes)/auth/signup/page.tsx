"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import Link from "next/link";
import { signIn } from "next-auth/react";

import AuthFormContainer from "@components/AuthFormContainer";
import { formikFilterForm } from "@utils/formikHelpers";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp = () => {
  const {
    values,
    isSubmitting,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues: { name: "", email: "", password: "", password2: "" },
    validationSchema,
    onSubmit: async (values, action) => {
      action.setSubmitting(true);
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const { message, error } = (await res.json()) as {
        message: string;
        error: string;
      };
      if (res.ok) {
        toast.success(message);
        await signIn("credentials", { email, password });
      }
      if (!res.ok && error) {
        toast.error(error);
      }

      action.setSubmitting(false);
    },
  });

  const formErrors: string[] = formikFilterForm(touched, errors, values);

  type valuesType = keyof typeof values;

  const { name, email, password, password2 } = values;

  const error = (name: valuesType) =>
    errors[name] && touched[name] ? true : false;

  return (
    <AuthFormContainer title="Create New Account" onSubmit={handleSubmit}>
      <Input
        name="name"
        label="Name"
        value={name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error("name")}
        crossOrigin="anonymous"
      />
      <Input
        name="email"
        label="Email"
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error("email")}
        crossOrigin="anonymous"
      />
      <Input
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error("password")}
        crossOrigin="anonymous"
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
        disabled={isSubmitting}
        color="blue"
        type="submit"
        className="w-full"
      >
        Sign up
      </Button>
      <div className="flex items-center justify-between">
        <Link href="/auth/signin">Sign in</Link>
        <Link href="/auth/forgot-password">Forget password</Link>
      </div>
      <div className="">
        {formErrors.map((value, index) => {
          return (
            <div
              key={index}
              className="space-x-1 flex items-center text-red-500 "
            >
              <XMarkIcon className="w-4 h-4" />
              <p className="text-xs">{value}</p>
            </div>
          );
        })}
      </div>
    </AuthFormContainer>
  );
};

export default SignUp;
