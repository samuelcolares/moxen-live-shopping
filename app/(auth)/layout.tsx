import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="lg:h-screen h-dvh flex items-center justify-center bg-[url('../public/auth/background.png')] bg-cover teste">{children}</main>;
};

export default AuthLayout;
