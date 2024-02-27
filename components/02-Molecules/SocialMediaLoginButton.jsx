import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function SocialMediaLoginButton() {
  return (
    <div className="social-container">
      <div className="social shadow-sm" onClick={() => signIn("azure-ad-b2c")}>
        <Image alt="microsoft" src="/assets/svg/microsoft.svg" width={25} height={25} style={{ objectFit: "cover" }} title="Sign In with Microsoft" />
      </div>
      <div className="social shadow-sm" onClick={() => signIn("google")}>
        <Image alt="microsoft" src="/assets/svg/google.svg" width={25} height={25} style={{ objectFit: "cover" }} title="Sign In with Google" />
      </div>
    </div>
  );
}
