"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton, CircularProgress } from "@mui/material";
type Props = {};

function AuthProvider({ role, direction, children }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("auth");
    if (token) {
      fetch("/api/auth/" + role, {
        method: "GET",
        headers: { "Content-Type": "application/json", Auth: token },
      })
        .then((res) => res.json())
        .then((res) => {
          {
            if (res.stat === false) {
              router.push(direction);
            } else {
              setLoading(false);
            }
          }
        });
    } else {
      router.push(direction);
    }
  }, []);

  return (
    <div>
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <CircularProgress color="warning" />
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export default AuthProvider;
