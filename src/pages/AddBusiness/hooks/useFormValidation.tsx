import { useState } from "react";

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface ValidationErrors {
  [key: string]: string;
}

export function useFormValidation<T extends Record<string, any>>(
  initialData: T,
  rules: ValidationRules
) {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (field: string, value: any): string => {
    const rule = rules[field];
    if (!rule) return "";

    if (rule.required && (!value || value.toString().trim() === "")) {
      return rule.message || `${field} is required`;
    }

    if (value && rule.minLength && value.toString().length < rule.minLength) {
      return (
        rule.message || `${field} must be at least ${rule.minLength} characters`
      );
    }

    if (value && rule.maxLength && value.toString().length > rule.maxLength) {
      return (
        rule.message ||
        `${field} must be no more than ${rule.maxLength} characters`
      );
    }

    if (value && rule.pattern && !rule.pattern.test(value.toString())) {
      return rule.message || `${field} format is invalid`;
    }

    return "";
  };

  const validateAll = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(rules).forEach((field) => {
      const error = validateField(field, data[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const updateField = (field: keyof T, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));

    // Validate field on change if it has been touched
    if (touched[field as string]) {
      const error = validateField(field as string, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const touchField = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, data[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const reset = () => {
    setData(initialData);
    setErrors({});
    setTouched({});
  };

  return {
    data,
    errors,
    touched,
    updateField,
    touchField,
    validateAll,
    reset,
    isValid: Object.keys(errors).length === 0,
  };
}
