import UpdatePassword from "@components/UpdatePassword";
import startDb from "@lib/db";
import PasswordResetToken from "@models/passwordResetToken";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: {
    token: string;
    userId: string;
  };
}

const fetchTokenValidation = async (token: string, userId: string) => {
  await startDb();

  const resetToken = await PasswordResetToken.findOne({ user: userId });
  if (!resetToken) return null;

  const matched = await resetToken.compareToken(token);
  if (!matched) return null;

  return true;
};

export default async function ResetPassword({ searchParams }: Props) {
  const { token, userId } = searchParams;
  //   console.log(props);

  if (!token || !userId) return redirect("/404");

  const isValid = await fetchTokenValidation(token, userId);
  if (!isValid) return redirect("/404");

  return <UpdatePassword token={token} userId={userId} />;
}
