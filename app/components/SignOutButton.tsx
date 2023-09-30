import { signOut } from "next-auth/react";
import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SignOutButton: FC<Props> = ({ children }) => {
  return <div onClick={async () => signOut()}>{children}</div>;
};

export default SignOutButton;
