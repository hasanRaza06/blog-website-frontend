import React from "react";
import { useNavigate } from "react-router-dom";

export default function PostBar() {
  const navigate=useNavigate();

  const handleButton=()=>{
     navigate("/create");
  }

  return (
    <div className="ml-10 mt-4">
        <button onClick={handleButton} className="rounded-full flex border-solid border-2 border-grey-500 p-1">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <div className="pl-2 pr-5">New</div>
      </button>
    </div>
  );
}
