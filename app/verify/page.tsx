"use client";

import { notFound, useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  searchParams: { token: string; userId: string };
}

const Verify: FC<Props> = ({ searchParams }) => {
  const router = useRouter();
  const { userId, token } = searchParams;

  useEffect(() => {
    fetch("/api/users/verify", {
      method: "POST",
      body: JSON.stringify({ userId, token }),
    }).then(async (res) => {
      const apiRes = await res.json();
      const { message, error } = apiRes as { message: string; error: string };
      if (res.ok) {
        console.log(message);
      }
      if (!res.ok) {
        toast.error(error);
      }
      router.replace("/");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userId || !token) return notFound();

  return (
    <div className=" text-3xl opacity-70 text-center animate-pulse p-5">
      Please wait...
      <p> We are verifying your email!</p>
    </div>
  );
};

export default Verify;
