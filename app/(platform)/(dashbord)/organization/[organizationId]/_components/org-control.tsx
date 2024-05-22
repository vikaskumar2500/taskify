"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useOrganizationList } from "@clerk/nextjs";

export const OrgControl = () => {
  const { organizationId }: { organizationId: string } = useParams();
  const { setActive, isLoaded } = useOrganizationList();


  useEffect(() => {
    if (!setActive) return;

    setActive({
      organization: organizationId,
    });
  }, [setActive, organizationId, isLoaded]);

  return null;
};
