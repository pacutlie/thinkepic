"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import SocialMediaLoginButton from "../02-Molecules/SocialMediaLoginButton";
import { toastDone, toastProcess } from "@/utils/Toast";

export default function SignInForm() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session && status === "authenticated") {
      const redirect = session.user.role.toLowerCase();
      router.refresh();
      router.push(redirect);
    }
  }, [session, status, router]);

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const removeError = (e) => {
    const inputName = e.target.name;

    if (inputName === "email") setErrorEmail("");
    if (inputName === "password") setErrorPassword("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkInputs = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(input.email)) setErrorEmail("Format email tidak valid!");

    if (input.email === "") setErrorEmail("Email belum diisi!");
    if (input.password === "") {
      setErrorPassword("Password belum diisi!");
    } else {
      if (input.password.length < 8) setErrorPassword("Password minimal harus 8 karakter!");
    }

    if (input.email === "" || input.password === "" || !emailPattern.test(input.email) || input.password.length < 8) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkInputs()) return;

    const process = toastProcess();

    const signInData = await signIn("credentials", {
      email: input.email,
      password: input.password,
      redirect: false,
    });

    if (!signInData.ok) {
      toastDone(process, "Email dan Password tidak sesuai", "error");
    } else {
      toastDone(process, "Login berhasil");
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form>
        <h1>Sign in</h1>
        <SocialMediaLoginButton />
        <span>or use your account</span>
        <div className="form-input">
          <input type="email" name="email" className={errorEmail !== "" ? "border border-2 rounded border-danger" : ""} value={input.email} onChange={handleChange} onFocus={removeError} placeholder="Email" />
          {errorEmail !== "" ? <span className="error-message">{errorEmail}</span> : ""}
        </div>
        <div className="form-input">
          <input type="password" name="password" className={errorPassword !== "" ? "border border-2 rounded border-danger" : ""} value={input.password} onChange={handleChange} onFocus={removeError} placeholder="Password" />
          {errorPassword !== "" ? <span className="error-message">{errorPassword}</span> : ""}
        </div>
        <a href="#">Forgot your password?</a>
        <button onClick={handleSubmit}>Sign In</button>
      </form>
    </div>
  );
}
