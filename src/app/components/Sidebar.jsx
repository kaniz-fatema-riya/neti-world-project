// /app/components/Sidebar.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu as MenuIcon,
  Layers,
  Users,
  Circle,
  ChevronRight,
} from "lucide-react";

/**
 * Sidebar component:
 * - Collapsible (collapse toggle at top)
 * - My Point (expandable) with Balance (nested expandable)
 * - User Point (single group)
 *
 * Tailwind required. lucide-react required: npm i lucide-react
 */

export default function Sidebar() {
  const pathname = usePathname();

  // collapsed: whole sidebar collapsed to icons-only
  const [collapsed, setCollapsed] = useState(false);

  // open groups (only used when not collapsed) — include purchase so it can open separately
  const [openGroups, setOpenGroups] = useState({
    myPoint: false,
    balance: false, // nested under myPoint
    purchase: false, // nested under myPoint (new)
  });

  // Toggle collapse
  function toggleCollapse() {
    setCollapsed((c) => !c);
  }

  // Toggle a group dropdown (works for myPoint, balance, purchase, etc.)
  function toggleGroup(key) {
    setOpenGroups((s) => ({ ...s, [key]: !s[key] }));
  }

  // structure exactly as requested
  const menus = [
    {
      key: "myPoint",
      label: "My Point",
      icon: <Layers size={16} />,
      items: [
        { label: "Startup", href: "/startup" },
        {
          label: "Balance",
          href: "/balance",
          children: [
            { label: "Wallet", href: "/balance/wallet" },
            { label: "Message", href: "/balance/message" },
          ],
        },
        {
          label: "Purchase",
          href: "/purchase",
          children: [
            { label: "General Product", href: "/purchase/general" },
            { label: "Offer Product", href: "/purchase/offer" },
          ],
        },
        { label: "Sell", href: "/sell" },
        { label: "Bank Account", href: "/bank-account" },
      ],
    },
    {
      key: "userPoint",
      label: "User Point",
      icon: <Users size={16} />,
      items: [{ label: "Users", href: "/user-point/users" }],
    },
  ];

  // open groups automatically if current pathname matches
  useEffect(() => {
    const newOpen = { myPoint: false, balance: false, purchase: false };

    // if the path starts with a menu/item href, open its parents
    if (pathname) {
      // My Point parent check: any myPoint item or its children match
      const myPointMatch = menus[0].items.some((it) => {
        if (it.children) {
          return it.children.some((c) => pathname.startsWith(c.href));
        }
        return it.href && pathname.startsWith(it.href);
      });
      newOpen.myPoint = myPointMatch;

      // Balance (nested) check:
      const balanceItem = menus[0].items.find((it) => it.label === "Balance");
      if (balanceItem?.children) {
        const balanceMatch = balanceItem.children.some((c) =>
          pathname.startsWith(c.href)
        );
        newOpen.balance = balanceMatch;
      }

      // Purchase (nested) check:
      const purchaseItem = menus[0].items.find((it) => it.label === "Purchase");
      if (purchaseItem?.children) {
        const purchaseMatch = purchaseItem.children.some((c) =>
          pathname.startsWith(c.href)
        );
        newOpen.purchase = purchaseMatch;
      }
    }

    setOpenGroups((prev) => ({ ...prev, ...newOpen }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // helper to check active link
  const isActive = (href) => {
    if (!pathname || !href) return false;
    return (
      pathname === href ||
      pathname.startsWith(href + "/") ||
      pathname.startsWith(href)
    );
  };

  return (
    <aside
      className={`flex  flex-col bg-white border-r border-slate-200 text-slate-700 transition-all duration-200 ${
        collapsed ? "w-20" : "w-64"
      }`}
      aria-label="Sidebar"
    >
      {/* Top logo + collapse btn */}
      <div className="flex items-center gap-2 px-2 py-3 bg-[#0e6ef8] text-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-9 rounded-md bg-white flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 12L12 3L21 12L12 21L3 12Z" fill="#0e6ef8" />
            </svg>
          </div>
          {!collapsed && <div className="font-semibold text-sm">NETIWORLD</div>}
        </div>

        <div className="ml-auto">
          <button
            aria-pressed={collapsed}
            onClick={toggleCollapse}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="p-1 rounded hover:bg-white/10"
          >
            <MenuIcon size={16} />
          </button>
        </div>
      </div>

      {/* Neti ID card */}
      <div className="px-2 py-3">
        <div
          className={`flex items-center gap-3 rounded-md p-2 ${
            collapsed ? "justify-center" : "bg-slate-50"
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold">
            N
          </div>

          {!collapsed && (
            <div className="flex-1">
              <div className="text-xs text-slate-500">Neti ID</div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">1000100315</div>
                <span className="inline-flex items-center gap-1 text-[11px] text-green-600">
                  <Circle size={9} /> Online
                </span>
              </div>
            </div>
          )}

          {!collapsed && (
            <div className="text-slate-400">
              <ChevronDown size={14} />
            </div>
          )}
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-1 py-2 overflow-auto">
        <ul className="space-y-1">
          {menus.map((group) => {
            const isMyPoint = group.key === "myPoint";
            const groupOpen = openGroups[group.key];

            return (
              <li key={group.key} className="px-1">
                {/* group header */}
                <div>
                  <button
                    onClick={() => {
                      // If collapsed, expand first (optional) — we keep collapse behavior: toggle collapsed separately
                      if (collapsed) return; // do nothing when collapsed
                      toggleGroup(group.key);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      !collapsed && groupOpen
                        ? "bg-slate-100"
                        : "hover:bg-slate-50"
                    }`}
                    aria-expanded={!!groupOpen}
                    aria-controls={`${group.key}-submenu`}
                    title={group.label}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-slate-600">{group.icon}</div>
                      {!collapsed && (
                        <span className="text-sm font-medium">
                          {group.label}
                        </span>
                      )}
                    </div>

                    {!collapsed && (
                      <div className="ml-auto text-slate-400">
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${
                            groupOpen ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </div>
                    )}
                  </button>
                </div>

                {/* group items */}
                {!collapsed && groupOpen && (
                  <div id={`${group.key}-submenu`} className="mt-1">
                    <ul className="space-y-0.5">
                      {group.items.map((item) => {
                        // if item has children (Balance, Purchase, etc.)
                        if (item.children) {
                          // derive a stable key for this nested group (lowercase, no spaces)
                          const childKey = item.label.toLowerCase().replace(/\s+/g, "");
                          const childOpen = openGroups[childKey];
                          const anyChildActive = item.children.some((c) =>
                            isActive(c.href)
                          );
                          return (
                            <li key={item.label} className="pl-6">
                              <div className="flex items-center justify-between px-2 py-1 rounded hover:bg-slate-50">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-sm ${
                                      anyChildActive
                                        ? "font-medium text-slate-700"
                                        : "text-slate-600"
                                    }`}
                                  >
                                    {item.label}
                                  </span>
                                </div>

                                <button
                                  onClick={() => toggleGroup(childKey)}
                                  className="text-slate-300 p-1 rounded hover:bg-slate-100"
                                  aria-expanded={!!childOpen}
                                  aria-controls={`${childKey}-submenu`}
                                  title={`Toggle ${item.label} submenu`}
                                >
                                  <ChevronRight
                                    size={14}
                                    className={childOpen ? "rotate-90 transform" : ""}
                                  />
                                </button>
                              </div>

                              {/* children */}
                              {childOpen && (
                                <ul
                                  id={`${childKey}-submenu`}
                                  className="mt-1 space-y-0.5"
                                >
                                  {item.children.map((c) => {
                                    const active = isActive(c.href);
                                    return (
                                      <li key={c.href} className="pl-3">
                                        <Link
                                          href={c.href}
                                          className={`flex items-center gap-2 px-3 py-1 rounded-l-md relative before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 ${
                                            active
                                              ? "bg-sky-600 text-white before:bg-sky-600"
                                              : "text-slate-600 hover:bg-slate-50 before:bg-transparent"
                                          }`}
                                        >
                                          <span className="text-sm">
                                            {c.label}
                                          </span>
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </li>
                          );
                        }

                        // regular single-level item
                        const active = isActive(item.href);
                        return (
                          <li key={item.href} className="pl-6">
                            <Link
                              href={item.href}
                              className={`flex items-center gap-2 px-3 py-2 rounded-l-md relative before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 ${
                                active
                                  ? "bg-sky-600 text-white before:bg-sky-600"
                                  : "text-slate-700 hover:bg-slate-50 before:bg-transparent"
                              }`}
                            >
                              <span className="text-sm">{item.label}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* footer */}
      <div className="px-3 pb-4">
        {!collapsed ? (
          <div className="text-xs text-slate-400">Powered by Eduman</div>
        ) : (
          <div className="text-xs text-slate-400 text-center">Eduman</div>
        )}
      </div>
    </aside>
  );
}
