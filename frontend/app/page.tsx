"use client";

import { useEffect, useState } from "react";
import CourseList from "./components/card-courses";
import SearchBar from "./components/search-bar";
import api from "./api/api";

interface CourseFromApi {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  teacher: {
    name: string;
  };
  thumbnailUrl: string;
}

interface Course extends CourseFromApi {
  image: string;
  formattedDate: string;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCourses() {
      try {
        const { data } = await api.get<CourseFromApi[]>("/courses");
        
        const bucket = process.env.NEXT_PUBLIC_AWS_BUCKET;
        const region = process.env.NEXT_PUBLIC_AWS_REGION;
        const baseUrl = `https://${bucket}.s3.${region}.amazonaws.com`;

        const withImage: Course[] = data.map((c) => ({
          ...c,
          image: c.thumbnailUrl
            ? `${baseUrl}/${c.thumbnailUrl}`
            : "/placeholder.svg?height=200&width=400",
          formattedDate: new Date(c.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        }));

        setCourses(withImage);
      } catch (err) {
        console.error("Erro ao buscar cursos:", err);
      }
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
      <CourseList courses={filtered} />
    </main>
  );
}