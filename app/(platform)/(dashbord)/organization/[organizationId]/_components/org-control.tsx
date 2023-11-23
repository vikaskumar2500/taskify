"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useOrganizationList } from "@clerk/nextjs";

export const OrgControl = () => {
  const { organizationId }: { organizationId: string } = useParams();
  console.log("testing", organizationId);
  const { setActive } = useOrganizationList();

  console.log("setActive", setActive);

  useEffect(() => {
    console.log("useEffect triggered");
    if (!setActive) return;

    setActive({
      organization: organizationId,
    });
  }, [setActive, organizationId]);
  return null;
};
