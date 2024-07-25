"use client";
import { UserButton, useUser, useAuth } from "@clerk/nextjs";
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
