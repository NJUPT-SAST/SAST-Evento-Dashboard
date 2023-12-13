"use client";

import { Button } from "@douyinfe/semi-ui";
import { useEffect } from "react";
import { linkLogin } from "@/apis/login";
import { useRouter } from "next/navigation";
import { getMyAdminPermission } from "@/apis/permission";

const OAuth2 = () => {
  const router = useRouter();
  const info = "Authorizing...";

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const code = String(searchParams.get("code"));

    linkLogin(code).then((res) => {
      if (res.success === false) router.push("/login");
      if (res.success) {
        router.push("/home");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userinfo", JSON.stringify(res.data.userInfo));
        getMyAdminPermission().then((res) => {
          console.log(res);
          if (res.success) {
            localStorage.setItem("adminPermission", JSON.stringify(res.data));
          }
        });
      }
    });
  }, [router]);

  if (typeof window === "undefined") {
    // Server-side rendering, return a placeholder or null
    return null;
  }

  const code = window.location.href
    ?.split("?")[1]
    ?.split("&")[0]
    ?.split("=")[1];

  return (
    <>
      <div>
        <p>{info}</p>
        <Button
          color="medium"
          onClick={() => {
            router.push("/home");
          }}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default OAuth2;
