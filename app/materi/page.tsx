'use client';

import MotionWrapper from "@/components/MotionWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, ExternalLink, BookOpen } from "lucide-react";
import Link from "next/link";

// Kita generate 14 materi secara otomatis agar kodenya rapi
const materials = Array.from({ length: 14 }, (_, i) => {
  const meeting = i + 1;
  return {
    id: meeting,
    title: `Pertemuan ${meeting}`,
    desc: `Arsip materi dan bahan ajar Sistem Media Interaktif (SMI) untuk minggu ke-${meeting}.`,
    // Link sesuai format repository
    link: `https://ciptomx.com/apps/materi/smi/${meeting}/`
  };
});

export default function MateriPage() {
  return (
    <div className="pt-32 pb-20 px-6 md:px-20 max-w-7xl mx-auto min-h-screen">
      <MotionWrapper>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Materi Sistem Media Interaktif</h1>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Akses langsung ke repositori materi pembelajaran. Terdiri dari 14 pertemuan lengkap mulai dari pengantar hingga evaluasi akhir.
          </p>
        </div>
      </MotionWrapper>

      {/* Grid Layout: 1 kolom di HP, 2 di Tablet, 3 di Desktop, 4 di Layar Lebar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {materials.map((item, index) => (
          <MotionWrapper key={item.id} delay={index * 0.05}>
            <Card className="h-full hover:shadow-lg transition-all border-zinc-200 group bg-white">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-3 bg-blue-50 w-fit rounded-xl border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FolderOpen className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-zinc-100 rounded-full text-zinc-600 border border-zinc-200">
                    Modul {item.id}
                  </span>
                </div>
                <CardTitle className="text-lg">
                    {item.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs mt-1">
                  {item.desc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Menggunakan a href biasa untuk link eksternal agar lebih aman membuka tab baru */}
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full gap-2" variant="outline">
                      Buka Folder <ExternalLink className="w-3 h-3" />
                    </Button>
                </a>
              </CardContent>
            </Card>
          </MotionWrapper>
        ))}
      </div>
      
      {/* Tambahan Info di Bawah */}
      <MotionWrapper delay={0.5} className="mt-12 text-center">
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 max-w-2xl mx-auto">
             <BookOpen className="w-8 h-8 text-zinc-400 mx-auto mb-3" />
             <p className="text-sm text-zinc-500">
                Semua materi bersumber dari repositori resmi <strong>ciptomx.com</strong>. <br/>
                Pastikan Anda terhubung ke internet untuk mengunduh file.
             </p>
        </div>
      </MotionWrapper>
    </div>
  );
}