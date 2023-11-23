import React, { ReactNode } from "react";
import { OrgControl } from "./_components/org-control";

const OrganizationIdLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
