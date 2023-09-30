import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { FC, ReactNode } from "react";
import NavBar from "@components/navbar";

interface Props {
  children: ReactNode;
}

export default async function HomeLayout({ children }: Props) {
  return (
    <div className="max-w-screen-xl mx-auto xl:p-0 p-4">
      <NavBar />
      {children}
    </div>
  );
}

// const GuestLayout: FC<Props> = async ({ children }) => {
//   const session = await auth();
//   console.log("session", session);
//   if (session) return redirect("/");
//   return <div>{children}</div>;
// };

// export default GuestLayout;
