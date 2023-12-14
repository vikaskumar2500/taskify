import React from "react";
import Info from "./_components/info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./_components/board-list";

const OrganizationIdPage = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  return (
    <div className="flex flex-col ml-5">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  );
};

export default OrganizationIdPage;
