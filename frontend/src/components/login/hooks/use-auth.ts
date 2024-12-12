import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login, register, RegisterType } from "@/api/user.api";

const USER_INFO = "user-info";

export const saveUserToLocalStorage = (data: RegisterType) => {
  localStorage.setItem(USER_INFO, JSON.stringify(data));
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem(USER_INFO);
};

export const useAuth = () => {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      saveUserToLocalStorage(data);
      navigate("/app");
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/login");
    },
  });

  const isAuthenticated = () => {
    return !!getTokenFromLocalStorage();
  };

  return {
    loginMutation,
    registerMutation,
    isAuthenticated,
  };
};
