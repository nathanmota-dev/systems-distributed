"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import api from "@/app/api/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(1, "Senha obrigatória"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function LoginTeacher() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function onSubmit(data: FormSchemaType) {
        try {
            await api.post("/auth/teacher/login", data);
            router.push("/dashboard");
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Erro ao entrar");
        }
    }

    return (
        <div className="min-h-[92vh] flex items-center justify-center p-4 relative">
            <Image
                src="/professor.png"
                alt="Professor"
                fill
                className="object-cover -z-20"
                quality={80}
                priority
            />
            <div className="fixed inset-0 bg-black/50 -z-10" />

            <Card className="w-full max-w-md shadow-lg">
                <CardContent className="p-6 space-y-6">
                    <h1 className="text-2xl font-bold text-center">Login Professor</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...register("email")} />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" type="password" {...register("password")} />
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        {errorMessage && <p className="text-sm text-red-500 text-center">{errorMessage}</p>}

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Entrando..." : "Entrar"}
                        </Button>
                    </form>

                    <p className="text-center text-sm mt-4">
                        Não tem uma conta?{" "}
                        <Link href="/register/teacher" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Cadastrar
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
