import Image from "next/image";
import Link from "next/link";

interface Course {
    id: string;
    title: string;
    description: string;
    formattedDate: string;
    teacher: { name: string };
    image: string;
}

interface MyCoursesListProps {
    courses: Course[];
}

export default function MyCoursesList({ courses }: MyCoursesListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
                <Link
                    key={course.id}
                    href={`/courses/${course.id}/new-video`}
                    className="block"
                >
                    <div className="bg-white dark:bg-gray-900 border … rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative h-48 w-full">
                            <Image
                                src={course.image}
                                alt={course.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {course.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                                {course.description}
                            </p>
                            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        Professor: {course.teacher.name}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {course.formattedDate}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
