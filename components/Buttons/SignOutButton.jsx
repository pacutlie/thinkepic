"use client";

import { signOut } from "next-auth/react";

function SignOutButton() {
  return (
    <li className="nav-item">
      <a
        className="nav-link collapsed"
        style={{ cursor: "pointer" }}
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: "/",
          })
        }
      >
        <i className="bi bi-box-arrow-left"></i>
        <span>Sign Out</span>
      </a>
    </li>
  );
}

export default SignOutButton;
