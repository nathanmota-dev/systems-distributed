"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "../components/search-bar";
import api from "@/app/api/api";
import StudentCoursesList from "../components/student-courses-list";

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

export default function StudentCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchCourses() {
            const { data } = await api.get<CourseFromApi[]>("/courses");
            const bucket = process.env.NEXT_PUBLIC_AWS_BUCKET!;
            const region = process.env.NEXT_PUBLIC_AWS_REGION!;
            const baseUrl = `https://${bucket}.s3.${region}.amazonaws.com`;

            const allCourses = data.map((c) => ({
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

            setCourses(allCourses);
        }

        fetchCourses();
    }, []);

    const filtered = courses.filter((c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-xl mx-auto mb-12">
                <SearchBar onSearch={setSearchTerm} />
            </div>
            <StudentCoursesList courses={filtered} />
        </main>
    );
}
