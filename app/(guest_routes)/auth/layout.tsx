import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className=" h-screen flex justify-center items-center">{children}</div>
  );
};

export default AuthLayout;
