
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import RegisterForm from "./register-form";
export default function RegisterLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-200">
      {/* Left Side - Illustration */}
      <div className="relative hidden lg:flex items-center justify-center ">
        <DotLottieReact
          src="https://lottie.host/4800aea2-a052-496c-94aa-fa2e8093f54b/Y7nRoKMeq4.lottie"
          autoplay
          loop
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg space-y-8 py-24 p-16 rounded-2xl bg-white">
          <RegisterForm/>
        </div>
      </div>
    </div>
  );
}
