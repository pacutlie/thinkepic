"use client";
import { useRef, useState } from "react";
import "@/public/assets/css/auth.css";
import Link from "next/link";
import SignUpForm from "@/components/05-Pages/SignUp";
import SignInForm from "@/components/05-Pages/SignIn";

export default function Auth() {
  const loginRef = useRef(null);
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="auth">
      <div className={containerClass} id="container">
        <SignUpForm loginRef={loginRef} />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost mb-4" id="signIn" ref={loginRef} onClick={() => handleOnClick("signIn")}>
                Sign In
              </button>
              <Link href={"/"} className="text-white text-decoration-underline">
                Back to home
              </Link>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost mb-4" id="signUp" onClick={() => handleOnClick("signUp")}>
                Sign Up
              </button>
              <Link href={"/"} className="text-white text-decoration-underline">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
