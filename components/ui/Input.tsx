"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
 
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
 
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div
        className="p-[2px] rounded-lg"
      >
        <input
          type={type}
          className={cn(
            `flex text-[8vh] w-full border-white/60 border-2 focus:outline-none rounded-md px-3 py-2
           disabled:cursor-not-allowed disabled:opacity-50 transition duration-400
           `,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
 
export { Input };