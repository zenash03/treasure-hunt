"use client";
import { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Input } from './ui/Input';
import { cn } from '@/lib/utils';

type InputFieldsProps = {
  containerClassName?: string;
  inputClassName?: string;
  onInputChange: (code: string) => void;
};

const InputFields = forwardRef(({ containerClassName, inputClassName, onInputChange }: InputFieldsProps, ref) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [code, setCode] = useState<string[]>(Array(4).fill(""));

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (value.length <= 1) {
      const updatedCode = [...code];
      updatedCode[index] = value;
      setCode(updatedCode);
      onInputChange(updatedCode.join("")); 
    }

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  useImperativeHandle(ref, () => ({
    clearForm: () => {
      setCode(Array(4).fill(""));
      inputRefs.current[0]?.focus();
    }
  }));

  return (
    <div className={containerClassName}>
      {Array.from({ length: 4 }, (_, index) => (
        <Input
          key={index}
          type="text"
          maxLength={1}
          ref={(el) => (inputRefs.current[index] = el)}
          className={cn("bg-transparent text-white text-center font-mono", inputClassName)}
          value={code[index]} 
          onChange={(e) => handleInput(e, index)}
        />
      ))}
    </div>
  );
});

InputFields.displayName = 'InputFields'; 

export default InputFields;
