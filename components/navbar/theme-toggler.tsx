"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size={"sm"} variant={"ghost"}>
            <Sun className="h-5 w-5 scale-100 dark:scale-0" />
            <Moon className="absolute h-5 w-5 scale-0 dark:scale-100" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="space-x-2"
            onClick={() => setTheme("light")}
          >
            <Sun className="h-5 w-5" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="space-x-2"
            onClick={() => setTheme("dark")}
          >
            <Moon className="h-5 w-5" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="space-x-2"
            onClick={() => setTheme("system")}
          >
            <Laptop className="h-5 w-5" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ThemeToggler;
