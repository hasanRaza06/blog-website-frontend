import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@hasan1025/common-medium";
import axios from "axios";

type LabeledInputType = {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  type: string;
};

function LabeledInput({ label, placeholder, onChange, value, name, type }: LabeledInputType) {
  return (
    <div className="w-full mt-5">
      <label className="block tracking-wide text-gray-700 text-s font-bold mb-2 ml-0">
        {label}
      </label>
      <input
        onChange={onChange}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
      />
    </div>
  );
}

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInput, setPostInput] = useState<SignupInput>({
    email: "",
    password: "",
    name: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post(`https://backend.hasanraza102515209.workers.dev/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInput);
      const { jwt, message } = response.data;
      localStorage.setItem("token", jwt);
      setSuccessMessage(message);
      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/blogs");
      }, 1000); // Set timeout to 2 seconds for success message
    } catch (e) {
      setError("An error occurred. Please try again.");
      setTimeout(() => {
        setError(null);
      }, 2000); // Set timeout to 2 seconds for error message
      console.error(e); // Log the error for debugging purposes
    }
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col justify-center">
        <div className="pl-10 pr-10">
          <div className="text-3xl font-extrabold">{type === "signup" ? "Create an account" : "Validate Yourself"}</div>
          <div className="text-slate-500">
            {type === "signup" ? "Already have an account?" : "Don't have an account?"}
            <Link className="pl-2 underline" to={type === "signup" ? "/signin" : "/signup"}>
              {type === "signup" ? "Login" : "Signup"}
            </Link>
          </div>
        </div>
        <LabeledInput
          label="Email"
          placeholder="Enter your email"
          value={postInput.email}
          onChange={handleInputChange}
          name="email"
          type="email"
        />
        <div className="relative w-full">
          <LabeledInput
            label="Password"
            placeholder="Enter your password"
            value={postInput.password}
            onChange={handleInputChange}
            name="password"
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-500 focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {type === "signup" && (
          <LabeledInput
            label="Name"
            placeholder="Enter your name"
            value={postInput.name}
            onChange={handleInputChange}
            name="name"
            type="text"
          />
        )}
        {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
        {successMessage && <p className="text-green-500 text-xs italic mt-2">{successMessage}</p>}
        <button
          type="button"
          onClick={sendRequest}
          className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          {type === "signup" ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
