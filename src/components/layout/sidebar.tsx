"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, TrendingUp, PieChart, Menu, Calculator, Search, Wallet, Bookmark, Filter, GraduationCap, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useMarket } from "@/context/market-context";

const navItems = [
    { href: "/", label: "Overview", icon: LayoutDashboard },
    { href: "/watchlist", label: "Watchlist", icon: Bookmark },
    { href: "/predictions", label: "Predictions", icon: TrendingUp },
    { href: "/portfolio", label: "Portfolio", icon: PieChart },
    { href: "/advisor", label: "Advisor", icon: Calculator },
    { href: "/screener", label: "Screener", icon: Filter },
    { href: "/backtest", label: "Backtest Lab", icon: TrendingUp },
    { href: "/analysis", label: "Analysis", icon: Search },
    { href: "/teacher", label: "Teacher", icon: GraduationCap },
    { href: "/admin/dashboard", label: "Telemetry", icon: Server },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { walletBalance, currencySymbol } = useMarket();

    return (
        <aside
            className={cn(
                "flex flex-col h-screen bg-card border-r border-border transition-all duration-300",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            <div className="p-6 flex items-center justify-between">
                {!isCollapsed && (
                    <Link href="/" className="flex items-center">
                        <img src="/logo.png" alt="Vyulax Logo" className="h-[43px] w-auto object-contain" />
                    </Link>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            <nav className="flex-1 px-4 gap-2 flex flex-col pt-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-white/5"
                                    : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                            {!isCollapsed && <span className="font-medium">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border space-y-2">
                <div
                    className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 cursor-default",
                        isCollapsed && "justify-center px-0"
                    )}
                >
                    <Wallet className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                        <div className="overflow-hidden flex-1">
                            <p className="text-[10px] uppercase font-bold opacity-70">Wallet Balance</p>
                            <p className="font-bold text-white truncate">{currencySymbol}{walletBalance.toLocaleString()}</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
