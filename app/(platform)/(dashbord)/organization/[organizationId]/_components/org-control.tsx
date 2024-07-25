"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useOrganizationList } from "@clerk/nextjs";

export const OrgControl = () => {
  const { organizationId }: { organizationId: string } = useParams();
  const { setActive, isLoaded } = useOrganizationList();
 
  useEffect(() => {
    const activateOrganization = async () => {
      if (!isLoaded || !setActive || !organizationId) return;
      try {
        console.log("OrgId", organizationId);
        setActive({
          organization: organizationId!,
        });
      } catch (error) {
        console.error("Failed to set active organization:", error);
      }
    };

    activateOrganization();
  }, [setActive, organizationId, isLoaded]);

  return null;
};
