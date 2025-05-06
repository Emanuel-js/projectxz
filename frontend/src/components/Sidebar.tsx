import { Link, useLocation } from "react-router-dom";
import { Home, Mail, Settings, Shield, BarChart } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Phishing", href: "/phishing", icon: Mail },
    { name: "Analytics", href: "/analytics", icon: BarChart },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="flex h-full w-[240px] flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6" />
          <span>PhishGuard</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {links.map((link) => (
            <Button
              key={link.href}
              variant={pathname === link.href ? "secondary" : "ghost"}
              className={cn(
                "justify-start",
                pathname === link.href ? "bg-secondary" : ""
              )}
              asChild
            >
              <Link to={link.href}>
                <link.icon className="mr-2 h-5 w-5" />
                {link.name}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
