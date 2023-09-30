import React, { FC, FormEventHandler, ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

const AuthFormContainer: FC<Props> = ({ title, children, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-96 p-6 space-y-6 bg-white shadow-md rounded-md"
    >
      <h3 className="text-center font-semibold">{title}</h3>
      {children}
    </form>
  );
};

export default AuthFormContainer;
