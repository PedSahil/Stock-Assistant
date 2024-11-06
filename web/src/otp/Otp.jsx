// src/components/Otp.js
import React, { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase"; // Import auth from firebase.js

const Otp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verificationId, setVerificationId] = useState(null);

  useEffect(() => {
    // Initialize reCAPTCHA once when the component mounts
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA verified", response);
          },
          "expired-callback": () => {
            // Handle reCAPTCHA expiration
            console.warn("reCAPTCHA expired. Please try again.");
          },
        }
      );
    }
  }, []);

  // Function to send OTP
  const handleSendOtp = async () => {
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      setIsOtpSent(true);
      alert("OTP has been sent to your phone.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  // Function to verify OTP
  const handleVerifyOtp = async () => {
    if (!verificationId || !otp) return;

    try {
      const result = await verificationId.confirm(otp);
      alert("Phone number verified successfully!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div>
      <h3>Phone Authentication</h3>
      <div id="recaptcha-container"></div>{" "}
      {/* Do not remove or modify this div */}
      {!isOtpSent ? (
        <div>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number (e.g., +1234567890)"
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default Otp;
