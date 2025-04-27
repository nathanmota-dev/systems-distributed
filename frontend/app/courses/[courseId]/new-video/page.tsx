"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/app/api/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import DragAndDropVideo from "@/components/drag-and-drop-video";
import { Loader2 } from "lucide-react";

export default function NewVideoPage() {
    const { courseId } = useParams();
    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const uploaderId = localStorage.getItem("teacherId")!;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!file || !title) {
            setError("Título e vídeo são obrigatórios.");
            return;
        }

        setIsLoading(true);

        try {
            const presignRes = await api.post("/videos/presign", {
                title,
                fileType: file.type,
            });
            const { presignedUrl, key: s3Key } = presignRes.data;

            await fetch(presignedUrl, {
                method: "PUT",
                headers: { "Content-Type": file.type },
                body: file,
            });

            await api.post("/videos/confirm-upload", {
                title,
                description,
                s3Key,
                courseId,
                uploaderId,
            });

            router.push("/my-courses");
        } catch (err: any) {
            console.error(err);
            setError("Falha ao enviar vídeo.");
        } finally {
            setIsLoading(false); // 🔵 termina o loading
        }
    }

    return (
        <div className="min-h-[92vh] flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-lg">
                <CardContent className="p-6 space-y-6">
                    <h1 className="text-2xl font-bold text-center">Adicionar Novo Vídeo</h1>

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Título da Aula</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={isLoading} // 🔵 desativa inputs enquanto envia
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Vídeo</Label>
                            <DragAndDropVideo onSelectFile={setFile} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Descrição</Label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border rounded p-2 min-h-[100px]"
                                disabled={isLoading} // 🔵 desativa inputs enquanto envia
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="animate-spin size-5" />
                                    Enviando...
                                </div>
                            ) : (
                                "Enviar Vídeo"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}