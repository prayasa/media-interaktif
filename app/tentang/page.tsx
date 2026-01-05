import MotionWrapper from "@/components/MotionWrapper";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";

export default function TentangPage() {
  return (
    <div className="pt-32 pb-20 px-6 md:px-20 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <MotionWrapper>
          <div className="aspect-square bg-zinc-100 rounded-3xl overflow-hidden relative border border-zinc-200">
             {/* Placeholder Image - Anda bisa mengganti src dengan gambar tim Anda */}
             <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
                <span className="text-6xl font-bold opacity-20">TEAM</span>
             </div>
          </div>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <h1 className="text-4xl font-bold mb-6">Tentang Kami</h1>
          <p className="text-zinc-500 text-lg mb-6 leading-relaxed">
            MediaInteraktif adalah proyek open-source yang bertujuan untuk mendemokrasikan pendidikan teknologi di Indonesia. 
            Kami percaya bahwa belajar coding harus menyenangkan, interaktif, dan dapat diakses oleh siapa saja.
          </p>
          <p className="text-zinc-500 text-lg mb-8 leading-relaxed">
            Dibangun menggunakan teknologi terkini seperti Next.js 14, Tailwind CSS, dan integrasi AI Google Gemini untuk membantu siswa belajar lebih cepat.
          </p>

          <div className="flex gap-4">
            <Button variant="outline" size="icon">
              <Github className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Linkedin className="w-5 h-5" />
            </Button>
          </div>
        </MotionWrapper>
      </div>
    </div>
  );
}