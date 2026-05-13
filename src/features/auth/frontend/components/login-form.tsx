"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginInput,
} from "@/features/auth/backend/validations/auth.validation";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, User, Lock } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { login } from "@/features/auth/backend/actions/auth.action";

type Role = "Mahasiswa" | "Dosen";

interface LoginFormProps {
  selectedRole: Role;
  onBack: () => void;
}

export function LoginForm({ selectedRole, onBack }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const { execute: loginAction, isPending: isLoggingIn } = useAction(login, {
    onSuccess: (result) => {
      const data = result.data;
      if (data && "error" in data) {
        setLoginError(data.error);
      } else if (data && "success" in data) {
        router.push("/dashboard");
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: selectedRole,
    },
  });

  const onSubmit = (data: LoginInput) => {
    setLoginError(null);
    loginAction({
      identifier: data.identifier,
      password: data.password,
      role: data.role,
    });
  };

  const roleTitle = selectedRole;
  const identifierLabel = selectedRole === "Mahasiswa" ? "NIM" : "NIK";
  const identifierPlaceholder =
    selectedRole === "Mahasiswa" ? "Masukkan NIM Anda" : "Masukkan NIK Anda";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Button
        variant="ghost"
        onClick={onBack}
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="hidden" {...register("role")} value={selectedRole} />

            <div className="space-y-2">
              <Label htmlFor="identifier" className="text-gray-500">
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
              <Label htmlFor="password" className="text-gray-500">
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
  );
}

