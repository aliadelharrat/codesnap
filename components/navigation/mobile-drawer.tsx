"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ModeToggle } from "../mode-toggle";

type MobileDrawerPrps = {
  logo: React.ReactNode;
  dashboard: React.ReactNode;
  newSnippet: React.ReactNode;
  logIn: React.ReactNode;
  children: React.ReactNode;
  isAuthenticated: boolean;
};

export function MobileDrawer({
  logo,
  dashboard,
  newSnippet,
  logIn,
  children,
  isAuthenticated = false,
}: MobileDrawerPrps) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" size={"sm"}>
          <Menu className="!size-5" /> <span>Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full">
        <div>
          <DrawerHeader>
            <div className="flex items-center justify-between">
              <DrawerTitle>
                <DrawerClose asChild>{logo}</DrawerClose>
              </DrawerTitle>

              <DrawerClose asChild>
                <Button variant="outline" size={"icon"}>
                  <X className="size-5" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="flex flex-col items-center space-y-6 px-5">
            {isAuthenticated && (
              <>
                <div className="flex gap-6 items-center">
                  <ModeToggle />
                  {children}
                </div>

                <DrawerClose asChild>{dashboard}</DrawerClose>
                <DrawerClose asChild>{newSnippet}</DrawerClose>
              </>
            )}

            <DrawerClose asChild>{!isAuthenticated && logIn}</DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
