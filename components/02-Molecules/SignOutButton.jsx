"use client";

import { signOut } from "next-auth/react";

function SignOutButton() {
  return (
    <a
      href="#"
      className="navi-link"
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: "/",
        })
      }
    >
      <span className="symbol symbol-20 mr-3">
        <i className="fas fa-sign-out-alt icon-md"></i>
      </span>
      <span className="navi-text">Sign Out</span>
    </a>
  );
}

export default SignOutButton;
