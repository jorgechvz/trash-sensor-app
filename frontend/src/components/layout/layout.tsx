import { Toaster } from "../ui/toaster";
import NavUser from "./components/nav-user";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <NavUser />
      <main className="m-4">{children}</main>
      <Toaster />
    </div>
  );
}
