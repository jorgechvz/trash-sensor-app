import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/use-auth";

export const LoginSchema = z.object({
  email: z.string().email("Debe ser un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const { loginMutation } = useAuth();

  // React Hook Form con Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Bienvenido de nuevo!
        </h1>
        <p className="text-sm text-gray-500">Ingresa tus credenciales</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Email"
            type="email"
            {...register("email")}
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2 relative">
          <Input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none"
            >
              Recordarme 30 días
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm text-gray-500 hover:text-gray-800"
          >
            Olvidaste tu contraseña?
          </Link>
        </div>
        <Button
          className="w-full text-white"
          type="submit"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Ingresando..." : "Ingresar"}
        </Button>
      </form>
      <div className="text-center text-sm">
        No tienes una cuenta?{" "}
        <Link to="/register" className="font-semibold hover:underline">
          Registrate
        </Link>
      </div>
    </div>
  );
}

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}
