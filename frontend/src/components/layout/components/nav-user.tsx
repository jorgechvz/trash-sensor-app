import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { getTokenFromLocalStorage, useAuth } from "@/components/login/hooks/use-auth";

export default function NavUser() {
  const user = getTokenFromLocalStorage();

  if (!user) {
    return null;
  }

  const user_data = JSON.parse(user);

  const { logout } = useAuth();
  return (
    <div className="border-b bg-white dark:bg-gray-900 px-6">
      <div className="flex h-16 items-center px-4 justify-between">
        {/* Sección Izquierda: Links de navegación */}
        <nav className="flex space-x-4">
          <img src="/logo.png" alt="logo" width={200} height={200} />
        </nav>

        {/* Sección Derecha: Notificaciones y Menú de Usuario */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Menú de Usuario */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="Avatar" />
                  <AvatarFallback>{user_data.name[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user_data.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user_data.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
