import {
  LayoutGrid,
  Scissors,
  Camera,
  MessageSquare,
  Flower2,
  Star,
  Calendar,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function MobileBottomNav() {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { name: "Home", path: "/", icon: LayoutGrid },
    { name: "About", path: "/about", icon: Flower2 },
    { name: "Services", path: "/services", icon: Scissors },
    { name: "Gallery", path: "/gallery", icon: Camera },
    { name: "Membership", path: "/membership", icon: Star },
    { name: "Contact", path: "/contact", icon: MessageSquare },
    { name: "Reserve", path: "/book", icon: Calendar },
  ];

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 w-full z-50 bg-white/95 backdrop-blur-xl border-t border-primary/5 pb-safe lg:hidden">
      <div className="flex justify-around items-center py-2 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 transition-colors relative ${
                isActive ? "text-primary" : "text-on-surface/40"
              }`}
            >
              <Icon
                size={20}
                fill={isActive ? "currentColor" : "none"}
                className={isActive ? "opacity-90" : ""}
              />
              <span
                className={`text-[9px] uppercase tracking-widest ${
                  isActive ? "font-bold" : "font-medium"
                }`}
              >
                {item.name}
              </span>
              {isActive && (
                <div className="absolute -top-2 w-6 h-0.5 bg-primary rounded-full transition-all" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
