"use client";

import { useState } from "react";
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

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: Users, label: "Users" },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help" },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden transition-all duration-300 md:flex",
          isShrunk ? "w-16" : "w-64",
        )}
      >
        <SidebarContent isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
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
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent isShrunk={false} setIsShrunk={() => {}} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

function SidebarContent({ isShrunk, setIsShrunk }: any) {
  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-gray-100/40 dark:bg-gray-800/40",
        isShrunk ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        {!isShrunk && <h2 className="text-lg font-semibold">Sidebar</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsShrunk(!isShrunk)}
          className={cn("ml-auto", isShrunk && "ml-0")}
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
          className={cn("flex flex-col gap-2 p-2", isShrunk && "items-center")}
        >
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                "justify-start gap-2",
                isShrunk ? "h-12 w-12 justify-center p-0" : "w-full",
              )}
              title={isShrunk ? item.label : undefined}
            >
              <item.icon className="h-4 w-4" />
              {!isShrunk && item.label}
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <div
        className={cn("border-t p-4", isShrunk && "flex flex-col items-center")}
      >
        <div
          className={cn(
            "mb-2 flex items-center gap-2",
            isShrunk && "justify-center",
          )}
        >
          <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600" />
          {!isShrunk && <span className="text-sm font-medium">John Doe</span>}
        </div>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2",
            isShrunk && "h-12 w-12 justify-center p-0",
          )}
        >
          <LogOut className="h-4 w-4" />
          {!isShrunk && "Logout"}
        </Button>
      </div>
    </div>
  );
}
