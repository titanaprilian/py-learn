"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { RoleSelectionCard } from "./role-selection-card";
import { LoginForm } from "./login-form";

type Role = "Mahasiswa" | "Dosen";
type View = "role-selection" | "login";

export function AuthScreen() {
  const [view, setView] = useState<View>("role-selection");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setView("login");
  };

  const handleBack = () => {
    setView("role-selection");
    setSelectedRole(null);
  };

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
              <RoleSelectionCard
                key="role-selection"
                onSelect={handleRoleSelect}
              />
            ) : (
              selectedRole && (
                <LoginForm
                  key="login"
                  selectedRole={selectedRole}
                  onBack={handleBack}
                />
              )
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

