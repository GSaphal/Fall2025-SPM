import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signOut,
} from "../firebase";
import { Button } from "baseui/button";
import toast from "react-hot-toast";

export default function Homepage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let storedEmail = window.localStorage.getItem("emailForSignIn");
      if (!storedEmail) {
        storedEmail = window.prompt(
          "Please provide your email for confirmation"
        );
      }
      signInWithEmailLink(auth, storedEmail, window.location.href)
        .then(async (result) => {
          window.localStorage.removeItem("emailForSignIn");
          localStorage.setItem("user", JSON.stringify(result.user));
          
          // Create wallet for user
          try {
            const { createOrGetWallet } = await import("../services/walletService");
            await createOrGetWallet(result.user.email);
          } catch (error) {
            console.error("Wallet creation error:", error);
            // Continue even if wallet creation fails
          }
          
          toast.success("Logged in successfully");
          navigate("/dashboard");
        })
        .catch((error) => console.error("Email link sign-in error:", error));
    }
  }, [navigate]);

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("user", JSON.stringify(result.user));
      
      // Create wallet for user
      try {
        const { createOrGetWallet } = await import("../services/walletService");
        await createOrGetWallet(result.user.email);
      } catch (error) {
        console.error("Wallet creation error:", error);
        // Continue even if wallet creation fails
      }
      
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  // Email Link Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const actionCodeSettings = {
        url: window.location.href,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      toast.success("Check your email for the sign-in link");
    } catch (error) {
      toast.error("Email login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <main className="bg-white rounded-2xl shadow-lg max-w-sm w-full overflow-hidden">
        <div className="p-8 text-center">
          <h1 className="font-semibold text-4xl mb-4">
            Mone<span className="text-green-400">trix</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Save Money, Make
            <span className="text-green-400"> Money</span>.
          </p>

          {/* Google Login Button */}
          <Button
            onClick={handleGoogleLogin}
            kind="secondary"
            className="w-full"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            <span>Continue with Google</span>
          </Button>

          <div className="flex items-center my-6">
            <hr className="flex-1 border-t border-gray-300" />
            <span className="mx-4 text-gray-500">or</span>
            <hr className="flex-1 border-t border-gray-300" />
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <input
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            <Button type="submit" kind="primary" className="w-full">
              Sign In
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
