'use client';
import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center relative">
      {/* Fallback loading atau placeholder */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-indigo-100 rounded-3xl -z-10 animate-pulse" />
      
      {/* Ganti URL scene di bawah dengan URL dari project Spline kamu sendiri jika ada */}
      {/* Jika error di local dev, pastikan koneksi internet stabil karena meload aset 3D */}
      <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" /> 
      
      {/* Overlay gradient agar menyatu dengan background */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
    </div>
  );
}