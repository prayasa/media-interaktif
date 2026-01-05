'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Materi", href: "/materi" },
    { name: "Tentang", href: "/tentang" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-zinc-100 h-16 flex items-center px-6 md:px-20 justify-between transition-all">
      <Link href="/" className="font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity">
        MediaInteraktif.
      </Link>
      
      {/* Menu Desktop */}
      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-blue-600",
              pathname === item.href ? "text-blue-600" : "text-zinc-500"
            )}
          >
            {item.name}
          </Link>
        ))}
        <Link href="/materi">
            <Button size="sm" variant="default">Mulai Belajar</Button>
        </Link>
      </div>

      {/* Mobile Menu (Sederhana) */}
      <div className="md:hidden flex gap-4 text-sm font-medium">
          {navItems.map((item) => (
             <Link key={item.href} href={item.href} className={pathname === item.href ? "text-blue-600" : "text-zinc-500"}>
               {item.name}
             </Link>
          ))}
      </div>
    </nav>
  );
}