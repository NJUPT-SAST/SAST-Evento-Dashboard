import { Button } from "@douyinfe/semi-ui";
import { useEffect } from "react";
import "./index.scss";
import { linkLogin } from "@/apis/login";
import { useRouter } from "next/router";

const OAuth2 = () => {
  const code = window.location.href.split("?")[1].split("&")[0].split("=")[1];
  const router = useRouter();
  const info = "Authorizing...";

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);

    const code = String(searchParams.get("code"));
    linkLogin(code).then(
      (res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userinfo", res.userInfo);
        router.push("/console/activity");
      },
      (error) => {
        router.push("/console/login");
      }
    );
  }, [router]);

  return (
    <div className="infoWarpper">
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
  );
};

export default OAuth2;
