import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { signUp } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      return setError("Passwords do not match");
    }

    if (emailRef.current && passwordRef.current) {
      try {
        setError("");
        setLoading(true);
        await signUp(emailRef.current.value, passwordRef.current.value);
        navigate("/");
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          setError("Email already in use");
        } else if (error.code === "auth/invalid-email") {
          setError("Invalid email");
        } else if (error.code === "auth/weak-password") {
          setError("Password is too weak");
        } else {
          setError("Failed to create an account");
        }
        console.error("Error creating account:", error);
      }

      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" ref={emailRef} required placeholder="Email" />
        <input
          type="password"
          ref={passwordRef}
          required
          placeholder="Password"
        />
        <input
          type="password"
          ref={passwordConfirmRef}
          required
          placeholder="Confirm Password"
        />
        <button disabled={loading} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
