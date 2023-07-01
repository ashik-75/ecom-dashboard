import { PropsWithChildren } from "react";

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-center h-full w-full">
      {children}
    </div>
  );
}

export default AuthLayout;
