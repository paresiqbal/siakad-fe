import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Home,
  Settings,
  Users,
  HelpCircle,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { AppContext } from "@/context/AppContext"; // Import AppContext
import { useRouter } from "next/navigation"; // For handling navigation

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: Users, label: "Users" },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help" },
];

export default function Sidebar() {
  const [isShrunk, setIsShrunk] = useState(false);
  const { user, setToken, setUser }: any = useContext(AppContext); // Access setUser here

  const router = useRouter();

  const handleLogout = () => {
    // Clear token and user from localStorage and context
    localStorage.removeItem("token");
    setToken(null);
    setUser(null); // Reset user on logout
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden transition-all duration-300 ease-in-out md:flex",
          isShrunk ? "w-16" : "w-64",
        )}
      >
        <SidebarContent
          isShrunk={isShrunk}
          setIsShrunk={setIsShrunk}
          handleLogout={handleLogout}
          user={user}
        />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-4 z-40 md:hidden"
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent
            isShrunk={false}
            setIsShrunk={() => {}}
            handleLogout={handleLogout}
            user={user}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

function SidebarContent({ isShrunk, setIsShrunk, handleLogout, user }: any) {
  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-white transition-all duration-300 ease-in-out",
        isShrunk ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        {!isShrunk && (
          <h2 className="text-lg font-semibold transition-opacity duration-300 ease-in-out">
            SMK 1 RL
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsShrunk(!isShrunk)}
          className={cn(
            "transition-all duration-300 ease-in-out",
            isShrunk ? "ml-0" : "ml-auto",
          )}
        >
          {isShrunk ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav
          className={cn(
            "flex flex-col gap-2 p-2 transition-all duration-300 ease-in-out",
            isShrunk && "items-center",
          )}
        >
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                "justify-start gap-2 transition-all duration-300 ease-in-out",
                isShrunk ? "h-12 w-12 justify-center p-0" : "w-full",
              )}
              title={isShrunk ? item.label : undefined}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!isShrunk && (
                <span className="transition-opacity duration-300 ease-in-out">
                  {item.label}
                </span>
              )}
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <div
        className={cn(
          "border-t p-4 transition-all duration-300 ease-in-out",
          isShrunk && "flex flex-col items-center",
        )}
      >
        <div
          className={cn(
            "mb-2 flex items-center gap-2 transition-all duration-300 ease-in-out",
            isShrunk && "justify-center",
          )}
        >
          <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600" />
          {!isShrunk && user && (
            <span className="text-sm font-medium transition-opacity duration-300 ease-in-out">
              {user.username}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 transition-all duration-300 ease-in-out",
            isShrunk && "h-12 w-12 justify-center p-0",
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!isShrunk && (
            <span className="transition-opacity duration-300 ease-in-out">
              Logout
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
