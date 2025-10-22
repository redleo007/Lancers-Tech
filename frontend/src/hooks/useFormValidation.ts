import { useState } from 'react';

type Errors = { [key: string]: string };

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Errors>({});

  const validateField = (name: string, value: string): boolean => {
    let error = "";

    // Generic required check
    if (!value) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Email is invalid.";
    } else if (name === "password" && value.length < 6) { // Example: minimum password length
      error = "Password must be at least 6 characters.";
    }
    // No specific validation for confirmPassword here, it will be handled in the component

    setErrors(prev => ({ ...prev, [name]: error }));
    return !error; // Returns true if valid, false if there's an error
  };

  return { errors, validateField };
};