"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowLeft, Eye, EyeOff, User, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { login } from "@/features/auth/backend/actions/auth.action";

type Role = "student" | "lecturer";
type View = "role-selection" | "login";

const loginSchema = z.object({
  identifier: z.string().min(1, "NIM/NIK is required"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["student", "lecturer"]),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Home() {
  const [view, setView] = useState<View>("role-selection");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const { execute: loginAction, isPending: isLoggingIn } = useAction(login, {
    onSuccess: (result) => {
      const data = result.data;
      if (data?.error) {
        setLoginError(data.error);
      } else if (data?.success) {
        router.push("/dashboard");
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: selectedRole || "student",
    },
  });

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setView("login");
    setLoginError(null);
  };

  const handleBack = () => {
    setView("role-selection");
    setSelectedRole(null);
    setLoginError(null);
  };

  const onSubmit = (data: LoginFormData) => {
    setLoginError(null);
    loginAction({
      identifier: data.identifier,
      password: data.password,
      role: data.role,
    });
  };

  const roleTitle = selectedRole === "student" ? "Mahasiswa" : "Dosen";
  const identifierLabel = selectedRole === "student" ? "NIM" : "NIK";
  const identifierPlaceholder =
    selectedRole === "student"
      ? "Masukkan NIM Anda"
      : "Masukkan NIK Anda";

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
          <AnimatePresence mode="wait">
            {view === "role-selection" ? (
              <motion.div
                key="role-selection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <p className="text-[#454651] mt-2">
                    Selamat datang di sistem manajemen pembelajaran Anda. Silakan
                    pilih peran Anda untuk melanjutkan.
                  </p>
                </div>

                <div className="flex flex-row gap-4 py-4">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => handleRoleSelect("student")}
                  >
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
                  </div>

                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => handleRoleSelect("lecturer")}
                  >
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
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="flex items-center gap-2 pl-0 text-[#454651] hover:text-[#142175] hover:pl-0 hover:bg-transparent cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </Button>

                <Card className="py-4">
                  <CardContent className="p-6 space-y-5">
                    <CardTitle className="text-2xl text-center text-[#1b1b21]">
                      Login sebagai {roleTitle}
                    </CardTitle>

                    {loginError && (
                      <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                        {loginError}
                      </div>
                    )}

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <input
                        type="hidden"
                        {...register("role")}
                        value={selectedRole || "student"}
                      />

                      <div className="space-y-2">
                        <Label
                          htmlFor="identifier"
                          className="text-gray-500"
                        >
                          {identifierLabel}
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="identifier"
                            type="text"
                            placeholder={identifierPlaceholder}
                            className="border-gray-300 focus:border-[#142175] focus:ring-[#142175] pl-10"
                            {...register("identifier")}
                          />
                        </div>
                        {errors.identifier && (
                          <p className="text-sm text-red-500">
                            {errors.identifier.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="password"
                          className="text-gray-500"
                        >
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Masukkan password Anda"
                            className="border-gray-300 focus:border-[#142175] focus:ring-[#142175] pl-10 pr-10"
                            {...register("password")}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#454651] hover:text-[#142175]"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-sm text-red-500">
                            {errors.password.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full bg-[#142175] hover:bg-[#142175]/90 cursor-pointer disabled:opacity-50"
                      >
                        {isLoggingIn ? "Memasuki..." : "Masuk"}
                      </Button>
                    </form>

                    <div className="text-center">
                      <Link
                        href="/forgot-password"
                        className="text-sm text-[#454651] hover:text-[#142175] underline"
                      >
                        Lupa Password?
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}