"use client";

import { useEffect, useState } from "react";
import CourseList from "./components/card-courses";
import SearchBar from "./components/search-bar";
import api from "./api/api";

interface Course {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  teacher: {
    name: string;
  };
  image: string;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await api.get<Omit<Course, "image">[]>("/courses");

        const coursesWithImage: Course[] = response.data.map((course) => ({
          ...course,
          image: "/placeholder.svg?height=200&width=400",
          createdAt: new Date(course.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        }));

        setCourses(coursesWithImage);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    }

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto mb-12">
        <SearchBar onSearch={setSearchTerm} />
      </div>
      <CourseList courses={filteredCourses} />
    </main>
  );
}