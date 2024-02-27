"use client";

import { toastDone, toastProcess } from "@/utils/Toast";
import { POST } from "@/utils/Fetch";
import { useState } from "react";
import SocialMediaLoginButton from "../02-Molecules/SocialMediaLoginButton";

export default function SignUpForm({ loginRef }) {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "AUTHOR",
    status: "ACTIVE",
  });

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const switchToLogin = () => loginRef.current.click();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const removeError = (e) => {
    const inputName = e.target.name;

    if (inputName === "name") setErrorName("");
    if (inputName === "email") setErrorEmail("");
    if (inputName === "password") setErrorPassword("");
  };

  const checkInputs = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (input.name === "") setErrorName("Nama belum diisi!");

    if (input.password === "") {
      setErrorPassword("Password belum diisi!");
    } else {
      if (input.password.length < 8) setErrorPassword("Password minimal harus 8 karakter!");
    }

    if (input.email === "") {
      setErrorEmail("Email belum diisi!");
    } else {
      if (!emailPattern.test(input.email)) setErrorEmail("Format email tidak valid!");
    }

    if (input.name === "" || input.email === "" || input.password === "" || !emailPattern.test(input.email) || input.password.length < 8) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkInputs()) return;

    const process = toastProcess();

    const response = await POST({
      endpoint: "/api/user/signup",
      body: {
        name: input.name,
        email: input.email,
        password: input.password,
        role: input.role,
        status: input.status,
      },
    });

    if (response.success) {
      toastDone(process, response.message);
      switchToLogin();

      setInput({
        name: "",
        email: "",
        password: "",
        role: "AUTHOR",
        status: "ACTIVE",
      });
    } else {
      toastDone(process, response.message, "error");
      console.error("Terjadi kesalahan:", response);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <SocialMediaLoginButton />
        <span>or use your email for registration</span>
        <div className="form-input">
          <input type="text" className={errorName !== "" ? "border border-2 rounded border-danger" : ""} name="name" value={input.name} onChange={handleChange} onFocus={removeError} placeholder="Name" />
          {errorName !== "" ? <span className="error-message">{errorName}</span> : ""}
        </div>
        <div className="form-input">
          <input type="email" name="email" className={errorEmail !== "" ? "border border-2 rounded border-danger" : ""} value={input.email} onChange={handleChange} onFocus={removeError} placeholder="Email" />
          {errorEmail !== "" ? <span className="error-message">{errorEmail}</span> : ""}
        </div>
        <div className="form-input">
          <input type="password" name="password" className={errorPassword !== "" ? "border border-2 rounded border-danger" : ""} value={input.password} onChange={handleChange} onFocus={removeError} placeholder="Password" />
          {errorPassword !== "" ? <span className="error-message">{errorPassword}</span> : ""}
        </div>
        <button>Sign Up</button>
      </form>
    </div>
  );
}
