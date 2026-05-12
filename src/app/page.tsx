import Link from "next/link";
import { GraduationCap } from "lucide-react";

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
            <Link
              href="/register?role=student"
              className="flex-1 flex flex-col items-center gap-8 px-4 py-16 rounded-lg border-2 border-transparent bg-white shadow-sm transition-all duration-200 hover:border-[#142175] hover:bg-[#e4e1e9] hover:shadow-md group text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#dfe0ff] flex items-center justify-center text-[#142175] group-hover:bg-[#142175] group-hover:text-white transition-colors">
                <GraduationCap className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-[#1b1b21]">
                  Saya Seorang Mahasiswa
                </h3>
                <p className="text-[#454651] mt-1">
                  Akses Materi, Quiz, dan Nilai Anda
                </p>
              </div>
            </Link>

            <Link
              href="/register?role=lecturer"
              className="flex-1 flex flex-col items-center gap-8 px-4 py-16 rounded-lg border-2 border-transparent bg-white shadow-sm transition-all duration-200 hover:border-[#006b5f] hover:bg-[#e4e1e9] hover:shadow-md group text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#76f4e0] flex items-center justify-center text-[#006b5f] group-hover:bg-[#006b5f] group-hover:text-white transition-colors">
                <svg
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4 6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6zm2 2v10h12V8H6zm9 2l4 2.5v-5L15 8z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-[#1b1b21]">
                  Saya Seorang Dosen
                </h3>
                <p className="text-[#454651] mt-1">
                  Kelola Materi, Quiz, dan Nilai Mahasiswa.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

