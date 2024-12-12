import LoginForm from "./login-form";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
export default function LoginLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-200">
      {/* Left Side - Illustration */}
      <div className="relative hidden lg:flex items-center justify-center ">
        <DotLottieReact
          src="https://lottie.host/0aadf1fa-43c0-4932-99a6-e68cce3fa033/hYKrfnsdfI.lottie"
          autoplay
          loop
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg space-y-8 py-24 p-16 rounded-2xl bg-white">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
