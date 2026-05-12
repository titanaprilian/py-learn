import Link from "next/link";
import { GraduationCap } from "lucide-react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen grid md:grid-cols-2">
      <section className="bg-[#142175] text-white p-8 md:p-16 flex flex-col justify-center items-center text-center md:items-start md:text-left">
        <div className="max-w-md space-y-8">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-12 h-12" />
            <h1 className="text-5xl font-bold leading-tight">PyLearn</h1>
          </div>
          <h2 className="text-2xl font-semibold leading-tight">
            Buka Potensi Belajar Python Anda
          </h2>
          <p className="text-xl leading-relaxed">
            Alami perjalanan pendidikan pemrograman Python yang mulus dengan
            platform pembelajaran komprehensif kami yang dirancang untuk
            menghubungkan siswa dan pendidik.
          </p>
        </div>
      </section>

      <section className="bg-[#fbf8ff] p-4 md:p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full space-y-8">
          <div className="text-center">
            <p className="text-[#454651] mt-2">
              Selamat datang di sistem manajemen pembelajaran Anda. Silakan
              pilih peran Anda untuk melanjutkan.
            </p>
          </div>

          <div className="flex flex-row gap-4 py-4">
            <Link href="/register?role=student" className="flex-1">
              <Card className="flex flex-col items-center gap-8 py-16 cursor-pointer transition-all duration-200 hover:border-[#142175] hover:shadow-md group">
                <CardContent className="p-0">
                  <div className="w-20 h-20 rounded-full bg-[#dfe0ff] flex items-center justify-center text-[#142175] group-hover:bg-[#142175] group-hover:text-white transition-colors">
                    <GraduationCap className="w-10 h-10" />
                  </div>
                </CardContent>
                <CardTitle className="text-2xl text-center text-[#1b1b21]">
                  Saya Seorang Mahasiswa
                </CardTitle>
                <CardDescription className="text-center text-[#454651]">
                  Akses Materi, Quiz, dan Nilai Anda
                </CardDescription>
              </Card>
            </Link>

            <Link href="/register?role=lecturer" className="flex-1">
              <Card className="flex flex-col items-center gap-8 py-16 cursor-pointer transition-all duration-200 hover:border-[#006b5f] hover:shadow-md group">
                <CardContent className="p-0">
                  <div className="w-20 h-20 rounded-full bg-[#76f4e0] flex items-center justify-center text-[#006b5f] group-hover:bg-[#006b5f] group-hover:text-white transition-colors">
                    <svg
                      className="w-10 h-10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4 6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6zm2 2v10h12V8H6zm9 2l4 2.5v-5L15 8z" />
                    </svg>
                  </div>
                </CardContent>
                <CardTitle className="text-2xl text-center text-[#1b1b21]">
                  Saya Seorang Dosen
                </CardTitle>
                <CardDescription className="text-center text-[#454651]">
                  Kelola Materi, Quiz, dan Nilai Mahasiswa.
                </CardDescription>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}