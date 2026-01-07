import MotionWrapper from "@/components/MotionWrapper";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin } from "lucide-react";
import Image from "next/image"; // Import wajib untuk gambar

export default function TentangPage() {
  return (
    <div className="pt-32 pb-20 px-6 md:px-20 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Bagian Gambar (Sudah Direvisi) */}
        <MotionWrapper>
          <div className="aspect-square bg-zinc-100 rounded-3xl overflow-hidden relative border border-zinc-200 shadow-lg">
             {/* Pastikan file 'team-smi.jpg' sudah ada di dalam folder 'public'.
                Next.js akan memanggilnya dengan path '/' 
             */}
             <Image 
               src="/team-smi.png"
               alt="Tim Media Interaktif"
               fill
               className="object-cover"
               priority
             />
          </div>
        </MotionWrapper>

        {/* Bagian Teks Tetap Sesuai */}
        <MotionWrapper delay={0.2}>
          <h1 className="text-4xl font-bold mb-6">Tentang Kami</h1>
          <p className="text-zinc-500 text-lg mb-6 leading-relaxed">
            MediaInteraktif adalah proyek open-source yang bertujuan untuk mendemokrasikan pendidikan teknologi di Indonesia. 
            Kami percaya bahwa belajar coding harus menyenangkan, interaktif, dan dapat diakses oleh siapa saja.
          </p>
          <p className="text-zinc-500 text-lg mb-8 leading-relaxed">
            Dibangun menggunakan teknologi terkini seperti Next.js 14, Tailwind CSS, dan integrasi AI Google Gemini untuk membantu mahasiswa belajar lebih cepat.
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