"use client";
import React, { useRef, useState } from 'react';
import InputFields from './InputField';

type Props = {
    onCodeCheck: (isCodeCorrect: boolean) => void;
    passCode: string;
}

export default function FormCode({onCodeCheck, passCode}: Props) {
    const inputFieldsRef = useRef<any>(null);
    const [enteredCode, setEnteredCode] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 

        const isCodeCorrect = passCode == enteredCode;
        onCodeCheck(isCodeCorrect); 

        if (!isCodeCorrect) {
            clearForm();
        }
    };

    const clearForm = () => {
        inputFieldsRef.current.clearForm();
    }

    const handleInputChange = (value: string) => {
        setEnteredCode(value);
    };
    return (
        <form onSubmit={handleSubmit}>
            <InputFields
                containerClassName="grid grid-cols-4 gap-x-2"
                inputClassName=""
                onInputChange={handleInputChange}
                ref={inputFieldsRef}
            />
            <button type="button" onClick={clearForm} className="text-base float-end rounded-lg p-1.5 bg-transparent text-white font-bold tracking-wide">Clear Form</button>
            <button
                type="submit"
                className="w-full h-16 mt-2 rounded-lg bg-transparent text-white border-2 border-white/60 font-bold hover:bg-slate-900 hover:text-white"
            >
                Try Code
            </button>
        </form>
    );
}
