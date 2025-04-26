import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

interface SearchBarProps {
    onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Pesquisar cursos..."
                className="pl-10 py-6 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus-visible:ring-primary focus-visible:border-primary"
                onChange={handleChange}
            />
        </div>
    );
}
