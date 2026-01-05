import Hero3D from "@/components/Hero3D";
import MotionWrapper from "@/components/MotionWrapper";
import QuizSection from "@/components/QuizSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Layers, MonitorPlay, FolderGit2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto min-h-[calc(100vh-4rem)]">
        <MotionWrapper>
          <Badge variant="secondary" className="mb-4 px-4 py-1">Semester Ganjil • 2024/2025</Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            Sistem Media <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Interaktif (SMI)
            </span>
          </h1>
          <p className="text-zinc-500 text-lg mb-8 max-w-md">
            Portal pembelajaran terpusat untuk mata kuliah Sistem Media Interaktif. Akses 14 modul pertemuan, kuis, dan referensi dalam satu platform modern.
          </p>
          <div className="flex gap-4">
            <Link href="/materi">
              <Button size="lg" className="rounded-full px-8">
                Lihat Materi <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/tentang">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Tentang Kuliah
              </Button>
            </Link>
          </div>
        </MotionWrapper>

        {/* 3D Object Area */}
        <MotionWrapper delay={0.2} className="h-full w-full flex items-center justify-center">
           <Hero3D />
        </MotionWrapper>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <MotionWrapper className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Cakupan Pembelajaran</h2>
            <p className="text-zinc-500">Materi disusun secara sistematis untuk pemahaman mendalam.</p>
          </MotionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MotionWrapper delay={0.1} className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 hover:shadow-lg transition-all duration-300">
              <MonitorPlay className="w-10 h-10 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Multimedia</h3>
              <p className="text-zinc-500">Memahami konsep dasar integrasi teks, audio, video, dan animasi.</p>
            </MotionWrapper>
            <MotionWrapper delay={0.2} className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 hover:shadow-lg transition-all duration-300">
              <FolderGit2 className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">14 Modul Lengkap</h3>
              <p className="text-zinc-500">Tersedia arsip lengkap dari Pertemuan 1 hingga Pertemuan 14.</p>
            </MotionWrapper>
            <MotionWrapper delay={0.3} className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 hover:shadow-lg transition-all duration-300">
              <Layers className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Interaktivitas</h3>
              <p className="text-zinc-500">Belajar merancang antarmuka pengguna (UI/UX) yang responsif.</p>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-20 px-6 md:px-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto text-center">
           <MotionWrapper className="mb-10">
              <h2 className="text-3xl font-bold">Uji Pemahaman SMI</h2>
              <p className="text-zinc-500 mt-2">Seberapa jauh kamu memahami konsep media interaktif?</p>
           </MotionWrapper>
           <MotionWrapper delay={0.2}>
              <QuizSection />
           </MotionWrapper>
        </div>
      </section>
    </main>
  );
}