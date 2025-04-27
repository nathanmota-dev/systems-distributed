"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import api from "@/app/api/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DragAndDropImage from "@/components/drag-and-drop-image";

const formSchema = z.object({
    title: z.string().min(1, "Título obrigatório"),
    description: z.string().min(1, "Descrição obrigatória"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function AddCourse() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    async function onSubmit(data: FormSchemaType) {
        try {
            const teacherId = localStorage.getItem("teacherId");
            if (!teacherId) {
                setErrorMessage("Usuário não autenticado.");
                return;
            }

            if (!selectedFile) {
                setErrorMessage("Selecione uma imagem para o curso.");
                return;
            }

            // 1. Solicita a URL assinada para upload
            const presignResponse = await api.post("/courses/thumbnail", {
                fileName: selectedFile.name,
                fileType: selectedFile.type,
            });

            const { presignedUrl, key } = presignResponse.data;

            // 2. Faz o upload da imagem direto para o S3
            await fetch(presignedUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": selectedFile.type,
                },
                body: selectedFile,
            });

            // 3. Cria o curso enviando JSON puro
            await api.post("/courses", {
                title: data.title,
                description: data.description,
                teacherId,
                thumbnailUrl: key, // envia o nome da imagem salva
            });

            router.push("/dashboard"); // redireciona depois de criar
        } catch (error: any) {
            console.error(error);
            setErrorMessage(error.response?.data?.message || "Erro ao adicionar curso");
        }
    }

    return (
        <div className="min-h-[92vh] flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-lg">
                <CardContent className="p-6 space-y-6">
                    <h1 className="text-2xl font-bold text-center">Adicionar Novo Curso</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Título do Curso</Label>
                            <Input id="title" {...register("title")} />
                            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Input id="description" {...register("description")} />
                            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Imagem de Capa (Thumbnail)</Label>
                            <DragAndDropImage onSelectFile={(file: File | null) => setSelectedFile(file)} />
                        </div>

                        {errorMessage && <p className="text-sm text-red-500 text-center">{errorMessage}</p>}

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Adicionando..." : "Adicionar Curso"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}