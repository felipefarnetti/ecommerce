import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import AdminSidebar from "@components/AdminSidebar";

interface Props {
  children: ReactNode;
}

export default async function AdminLayout({ children }: Props) {
  const session = await auth();
  const user = session?.user; //Verifier SI INTERROGATION NECESSAIRE
  const isAdmin = user?.role === "admin";

  if (!isAdmin) return redirect("/auth/signin");
  //   console.log(session.user);
  //   session.user.verified;

  return <AdminSidebar>{children}</AdminSidebar>;
}
