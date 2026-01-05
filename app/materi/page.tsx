import MotionWrapper from "@/components/MotionWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Code2, Database, Terminal } from "lucide-react";
import Link from "next/link";

const modules = [
  {
    title: "Dasar HTML & CSS",
    desc: "Pelajari struktur dasar web dan cara mempercantik tampilannya.",
    icon: <Code2 className="w-8 h-8 text-orange-500" />,
    level: "Pemula"
  },
  {
    title: "JavaScript Modern",
    desc: "Membuat web menjadi interaktif dengan logika pemrograman.",
    icon: <Terminal className="w-8 h-8 text-yellow-500" />,
    level: "Menengah"
  },
  {
    title: "React & Next.js",
    desc: "Membangun aplikasi web modern dengan framework terpopuler.",
    icon: <Database className="w-8 h-8 text-blue-500" />,
    level: "Lanjutan"
  }
];

export default function MateriPage() {
  return (
    <div className="pt-32 pb-20 px-6 md:px-20 max-w-7xl mx-auto">
      <MotionWrapper>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Daftar Materi</h1>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Pilih topik yang ingin kamu pelajari. Semua materi disusun secara terstruktur untuk memudahkan pemahaman.
          </p>
        </div>
      </MotionWrapper>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((item, i) => (
          <MotionWrapper key={i} delay={i * 0.1}>
            <Card className="h-full hover:shadow-lg transition-all border-zinc-200">
              <CardHeader>
                <div className="mb-4 p-3 bg-zinc-50 w-fit rounded-xl border border-zinc-100">
                  {item.icon}
                </div>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <span className="text-xs font-medium px-2 py-1 bg-zinc-100 rounded-full text-zinc-600">
                        {item.level}
                    </span>
                </div>
                <CardDescription className="mt-2">{item.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="#">
                    <Button className="w-full" variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" /> Pelajari
                    </Button>
                </Link>
              </CardContent>
            </Card>
          </MotionWrapper>
        ))}
      </div>
    </div>
  );
}