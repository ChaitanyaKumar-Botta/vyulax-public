"use client";

import { Bell, User, LogOut } from "lucide-react";
import { MarketSwitcher } from "./market-switcher";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { SearchBox } from "@/components/ui/search-box";

export function Header() {
    const { data: session } = useSession();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    return (
        <header className="h-16 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-8 flex-1">
                <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
                    <img src="/logo.png" alt="Vyulax Logo" className="h-[43px] w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]" />
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {/* Links moved to Sidebar to reduce clutter as per user request */}
                </nav>

                <div className="relative w-full max-w-sm hidden lg:block">
                    <SearchBox />
                    <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-muted-foreground font-sans pointer-events-none">
                        /
                    </kbd>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <MarketSwitcher />

                <div className="relative">
                    <button
                        className="relative w-10 h-10 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
                        onClick={() => alert("No new notifications")}
                    >
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background" />
                    </button>
                    {/* Placeholder: Tooltip or Popover can be added here */}
                </div>

                {session?.user ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-medium shadow-lg hover:shadow-primary/25 transition-all"
                        >
                            {session.user.name?.[0] || "U"}
                        </button>

                        {isUserMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl py-1 animate-in fade-in zoom-in-95 duration-200">
                                <div className="px-4 py-2 border-b border-white/10">
                                    <p className="text-sm font-medium text-white truncate">{session.user.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </header>
    );
}
