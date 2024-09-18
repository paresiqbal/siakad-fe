import { useContext, useState } from "react";

// context
import { AppContext } from "@/context/AppContext";

// ui lib
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  X,
  ChevronDown,
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { icon: Home, label: "Home" },
  {
    icon: Users,
    label: "Users",
    submenu: [
      { label: "User List" },
      { label: "Add User" },
      { label: "User Groups" },
    ],
  },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help" },
];

export default function Component() {
  const { user }: any = useContext(AppContext); // Get user from context
  const [isOpen, setIsOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);

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
          isDesktop={true}
          user={user} // Pass user to SidebarContent
        />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
        <SheetContent side="left" className="w-full p-0">
          <SidebarContent
            isShrunk={false}
            setIsShrunk={() => {}}
            isDesktop={false}
            onClose={() => setIsOpen(false)}
            user={user} // Pass user to SidebarContent
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

function SidebarContent({
  isShrunk,
  setIsShrunk,
  isDesktop,
  onClose,
  user,
}: any) {
  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-white transition-all duration-300 ease-in-out dark:bg-gray-800/40",
        isDesktop ? (isShrunk ? "w-16" : "w-64") : "w-full",
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center space-x-2">
          {(!isShrunk || !isDesktop) && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          )}
          {(!isShrunk || !isDesktop) && (
            <span className="text-lg font-semibold">My App</span>
          )}
        </div>
        {isDesktop ? (
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
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="transition-all duration-300 ease-in-out"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close Sidebar</span>
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1">
        <nav
          className={cn(
            "flex flex-col gap-2 p-2 transition-all duration-300 ease-in-out",
            isShrunk && isDesktop && "items-center",
          )}
        >
          {menuItems.map((item, index) =>
            item.submenu ? (
              <Collapsible key={index} className="w-full">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-between",
                      isShrunk && isDesktop && "h-12 justify-center p-0",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {(!isShrunk || !isDesktop) && <span>{item.label}</span>}
                    </div>
                    {(!isShrunk || !isDesktop) && (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-6 mt-1 space-y-1">
                  {item.submenu.map((subItem, subIndex) => (
                    <Button
                      key={subIndex}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      {subItem.label}
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Button
                key={index}
                variant="ghost"
                className={cn(
                  "justify-start gap-2 transition-all duration-300 ease-in-out",
                  isShrunk && isDesktop
                    ? "h-12 w-12 justify-center p-0"
                    : "w-full",
                )}
                title={isShrunk && isDesktop ? item.label : undefined}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {(!isShrunk || !isDesktop) && (
                  <span className="transition-opacity duration-300 ease-in-out">
                    {item.label}
                  </span>
                )}
              </Button>
            ),
          )}
        </nav>
      </ScrollArea>
      <div
        className={cn(
          "border-t p-4 transition-all duration-300 ease-in-out",
          isShrunk && isDesktop && "flex flex-col items-center",
        )}
      >
        <div
          className={cn(
            "mb-2 flex items-center gap-2 transition-all duration-300 ease-in-out",
            isShrunk && isDesktop && "justify-center",
          )}
        >
          <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600" />
          {(!isShrunk || !isDesktop) && user && (
            <span className="text-sm font-medium transition-opacity duration-300 ease-in-out">
              {user.username} {/* Display username */}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 transition-all duration-300 ease-in-out",
            isShrunk && isDesktop && "h-12 w-12 justify-center p-0",
          )}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {(!isShrunk || !isDesktop) && (
            <span
              className="transition-opacity duration-300 ease-in-out"
              onClick={() => signOut()}
            >
              Logout
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
