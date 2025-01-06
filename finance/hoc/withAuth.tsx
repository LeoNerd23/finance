"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export const withAuth = (Component: React.FC) => {
  return function AuthenticatedComponent(props: any) {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (user === null) {
        router.push("/");
      }
    }, [user, router]);

    if (user === null) {
      return null;
    }

    return <Component {...props} />;
  };
};
