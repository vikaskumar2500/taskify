import React, { ReactNode } from "react";

const OrganizationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center w-full h-[200px]">
      {children}
    </div>
  );
};

export default OrganizationLayout;
