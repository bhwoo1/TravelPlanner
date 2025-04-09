"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

function Navigator() {
  const pathname = usePathname();
  const routes = useMemo(() => {
    return [
      {
        icon: <></>,
        label: "검색",
        isActive: pathname === "/",
        href: "/",
      },
      {
        icon: <></>,
        label: "추천 여행지",
        isActive: pathname === "/recommend",
        href: "/recommend",
      },
    ];
  }, [pathname]);

  return (
    <div className={`w-full flex flex-row justify-end gap-24 p-8`}>
      {routes.map((route) => {
        return (
          <Link key={route.label} href={route.href}>
            <div
              className={`transition-transform text-[20px] flex flex-row gap-2 hover:scale-110 items-center font-bold p-2 ${
                route.isActive && "text-blue-400"
              }`}
            >
              {route.icon}
              <span>{route.label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Navigator;
