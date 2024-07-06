import React from "react";

export default function Quote() {
  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="max-w-lg ">
          <div className=" text-3xl fond-bold">
            "The customer support i recieved was exceptional. The support team
            went above and beyond to address my concerns."
          </div>
          <div className="mt-4">
            <div className="max-w-md text-xl text-slate-600">Julies Winfield</div>
            <div className="max-w-md text-xl  text-slate-400">
              CEO | Acme corp
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
