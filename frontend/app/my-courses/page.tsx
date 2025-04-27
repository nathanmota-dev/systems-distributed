"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import SearchBar from "../components/search-bar";
import MyCoursesList from "../components/my-courses-list";
import api from "@/app/api/api";

interface CourseFromApi {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    teacherId: string;
    teacher: { name: string };
    thumbnailUrl: string;
}

interface Course extends CourseFromApi {
    image: string;
    formattedDate: string;
}

export default function MyCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchMyCourses() {
            const teacherId = localStorage.getItem("teacherId");
            if (!teacherId) {
                router.push("/auth/teacher/login");
                return;
            }
            const { data } = await api.get<CourseFromApi[]>("/courses");
            const bucket = process.env.NEXT_PUBLIC_AWS_BUCKET!;
            const region = process.env.NEXT_PUBLIC_AWS_REGION!;
            const baseUrl = `https://${bucket}.s3.${region}.amazonaws.com`;

            const myCourses = data
                .filter((c) => c.teacherId === teacherId)
                .map((c) => ({
                    ...c,
                    image: c.thumbnailUrl
                        ? `${baseUrl}/${c.thumbnailUrl}`
                        : "/placeholder.svg",
                    formattedDate: new Date(c.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    }),
                }));

            setCourses(myCourses);
        }

        fetchMyCourses();
    }, [router]);

    const filtered = courses.filter((c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                <SearchBar onSearch={setSearchTerm} />
                <Button onClick={() => router.push("/new-course")}>+ Novo Curso</Button>
            </div>
            <MyCoursesList courses={filtered} />
        </main>
    );
}
