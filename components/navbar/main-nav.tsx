"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

function MainNav() {
  const pathname = usePathname();
  const params = useParams();

  console.log({ pathname, params });

  const routes = [
    {
      href: `/${params?.storeid}`,
      label: "Overview",
      active: pathname === `/${params?.storeid}`,
    },
    {
      href: `/${params?.storeid}/billboards`,
      label: "Billboard",
      active: pathname === `/${params?.storeid}/billboards`,
    },
    {
      href: `/${params?.storeid}/categories`,
      label: "Categories",
      active: pathname === `/${params?.storeid}/categories`,
    },
    {
      href: `/${params?.storeid}/sizes`,
      label: "Sizes",
      active: pathname === `/${params?.storeid}/sizes`,
    },
    {
      href: `/${params?.storeid}/colors`,
      label: "Colors",
      active: pathname === `/${params?.storeid}/colors`,
    },
    {
      href: `/${params?.storeid}/products`,
      label: "Products",
      active: pathname === `/${params?.storeid}/products`,
    },
    {
      href: `/${params?.storeid}/orders`,
      label: "Orders",
      active: pathname === `/${params?.storeid}/orders`,
    },
    {
      href: `/${params?.storeid}/settings`,
      label: "Settings",
      active: pathname === `/${params?.storeid}/settings`,
    },
  ];
  return (
    <nav className="space-x-4 lg:space-x-6 items-center flex">
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "text-sm",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

export default MainNav;
