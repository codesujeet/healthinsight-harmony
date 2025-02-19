
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/auth";
import {
  Bell,
  ChevronDown,
  FileText,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: React.ReactNode;
  role?: UserRole;
  userName?: string;
}

const Layout = ({ children, role = "patient", userName = "Guest" }: LayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-medical-50 to-white">
      <header className="border-b bg-white/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-medical-900">
                HealthInsight
              </h1>
              <nav className="hidden md:flex items-center space-x-4">
                <Button
                  variant="ghost"
                  className="text-medical-600 hover:text-medical-800"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
                {role === "doctor" && (
                  <Button
                    variant="ghost"
                    className="text-medical-600 hover:text-medical-800"
                    onClick={() => navigate("/patients")}
                  >
                    Patients
                  </Button>
                )}
                <Button
                  variant="ghost"
                  className="text-medical-600 hover:text-medical-800"
                  onClick={() => navigate("/records")}
                >
                  Records
                </Button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-medical-600 hover:text-medical-800"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-medical-600 hover:text-medical-800"
                  >
                    <User className="h-5 w-5" />
                    <span>{userName}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    Documents
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 animate-fadeIn">
        {children}
      </main>
    </div>
  );
};

export default Layout;
