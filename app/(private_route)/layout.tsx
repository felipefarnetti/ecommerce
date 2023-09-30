import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { FC, ReactNode } from "react";

import NavBar from "@components/navbar";

interface Props {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: Props) {
  const session = await auth();
  if (!session) return redirect("/auth/signin");
  //   console.log(session.user);

  //   session.user.verified;

  return (
    <div className="max-w-screen-xl mx-auto p-4 xl:p-0">
      <NavBar />
      {children}
    </div>
  );
}
