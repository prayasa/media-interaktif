import Hero3D from "@/components/Hero3D";
import MotionWrapper from "@/components/MotionWrapper";
import QuizSection from "@/components/QuizSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Layers, Zap, Bot } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto min-h-[calc(100vh-4rem)]">
        <MotionWrapper>
          <Badge variant="secondary" className="mb-4 px-4 py-1">Versi 1.0 • Next.js Edition</Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Belajar Coding <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Lebih Interaktif
            </span>
          </h1>
          <p className="text-zinc-500 text-lg mb-8 max-w-md">
            Platform pembelajaran modern dengan integrasi AI, animasi 3D, dan antarmuka yang responsif untuk pengalaman terbaik.
          </p>
          <div className="flex gap-4">
            <Link href="/materi">
              <Button size="lg" className="rounded-full px-8">
                Mulai Sekarang <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/tentang">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Lihat Demo
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
            <h2 className="text-3xl font-bold mb-4">Fitur Unggulan</h2>
            <p className="text-zinc-500">Didesain khusus untuk memukau pengguna.</p>
          </MotionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MotionWrapper delay={0.1} className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 hover:shadow-lg transition-all duration-300">
              <Zap className="w-10 h-10 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Super Cepat</h3>
              <p className="text-zinc-500">Dibangun di atas Next.js App Router untuk performa maksimal.</p>
            </MotionWrapper>
            <MotionWrapper delay={0.2} className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 hover:shadow-lg transition-all duration-300">
              <Bot className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">AI Assistant</h3>
              <p className="text-zinc-500">Tanya jawab materi 24/7 dengan integrasi Google Gemini AI.</p>
            </MotionWrapper>
            <MotionWrapper delay={0.3} className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 hover:shadow-lg transition-all duration-300">
              <Layers className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Materi Lengkap</h3>
              <p className="text-zinc-500">Struktur materi yang rapi dengan visualisasi modern.</p>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-20 px-6 md:px-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto text-center">
           <MotionWrapper className="mb-10">
              <h2 className="text-3xl font-bold">Uji Pemahamanmu</h2>
           </MotionWrapper>
           <MotionWrapper delay={0.2}>
              <QuizSection />
           </MotionWrapper>
        </div>
      </section>
    </main>
  );
}