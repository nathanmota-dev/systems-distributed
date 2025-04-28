"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/app/api/api";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Video {
    id: string;
    title: string;
    description: string;
    s3Url: string;
    status: string;
    createdAt: string;
}

export default function CourseVideosPage() {
    const { courseId } = useParams();
    const router = useRouter();
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchVideos() {
            try {
                const { data } = await api.get<Video[]>(`/videos/by-course/${courseId}`);
                setVideos(data);
            } catch (err) {
                console.error("Erro ao buscar vídeos:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchVideos();
    }, [courseId]);

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Aulas do Curso</h1>
                <Button variant="outline" onClick={() => router.back()}>
                    Voltar
                </Button>
            </div>

            {loading ? (
                <p className="text-center text-gray-600 dark:text-gray-300">Carregando aulas...</p>
            ) : videos.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-300">Nenhuma aula encontrada.</p>
            ) : (
                <Accordion type="single" collapsible className="space-y-4">
                    {videos.map((video) => (
                        <AccordionItem key={video.id} value={video.id}>
                            <Card>
                                <AccordionTrigger className="p-4 no-underline hover:no-underline">
                                    <div className="flex flex-col text-left">
                                        <h2 className="text-lg font-bold">{video.title}</h2>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{video.description}</p>
                                        <p className="text-gray-400 text-xs">
                                            Enviado em:{" "}
                                            {new Date(video.createdAt).toLocaleDateString("pt-BR", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <CardContent className="p-4">
                                        <video controls className="w-full rounded-lg">
                                            <source src={video.s3Url} type="video/mp4" />
                                            Seu navegador não suporta o elemento de vídeo.
                                        </video>
                                    </CardContent>
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </main>
    );
}
