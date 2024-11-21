import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/",
      active: location.pathname === "/",
    },
    {
      icon: BookOpen,
      label: "Start Quiz",
      path: "/quiz",
      active: location.pathname === "/quiz",
    },
    // {
    //   icon: Trophy,
    //   label: 'Achievements',
    //   path: '/achievements',
    //   active: location.pathname === '/achievements'
    // },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
      active: location.pathname === "/settings",
    },
  ];

  const handleLogout = async () => {
    // Implement logout logic
    console.log("Logging out");
    await logout();
  };

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">QuizMaster</h1>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-3 rounded-lg transition-colors ${
                item.active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-gray-100"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </nav>
        {/* 
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
