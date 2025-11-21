// hooks/useApi.ts
import { useState } from 'react';

export interface UseApiReturn {
  isLoading: boolean;
  showSuccess: boolean;
  showError: boolean;
  errorMessage: string;
  successMessage: string;
  setIsLoading: (value: boolean) => void;
  setShowSuccess: (value: boolean) => void;
  setShowError: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
  setSuccessMessage: (value: string) => void;
  handleErrorClose: () => void;
  handleSuccessClose: () => void;
  resetStates: () => void;
}

export const useApi = (): UseApiReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleErrorClose = () => {
    setShowError(false);
    setErrorMessage('');
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setSuccessMessage('');
  };

  const resetStates = () => {
    setIsLoading(false);
    setShowSuccess(false);
    setShowError(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  return {
    isLoading,
    showSuccess,
    showError,
    errorMessage,
    successMessage,
    setIsLoading,
    setShowSuccess,
    setShowError,
    setErrorMessage,
    setSuccessMessage,
    handleErrorClose,
    handleSuccessClose,
    resetStates,
  };
};