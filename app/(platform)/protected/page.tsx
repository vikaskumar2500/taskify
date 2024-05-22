"use client";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import React from "react";

const ProtectedPage = () => {
  const { userId } = useAuth();
  const { user } = useUser();
  return (
    <div>
      {userId} and {user?.fullName}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default ProtectedPage;
