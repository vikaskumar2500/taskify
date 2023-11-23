import React from "react";

const OrganizationIdPage = ({
  params,
}: {
  params: { organizationId: string };
}) => {
  return (
    <div className="flex flex-col">
      <p>OrganizationId page</p> <p>Id: {params.organizationId}</p>
    </div>
  );
};

export default OrganizationIdPage;
