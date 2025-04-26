import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toogle"

export default function Navbar() {
    return (
        <nav className="py-4 px-6">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link href="/" className="flex items-center">
                        <span className="text-xl font-bold">
                            <span className="text-[#3b82f6]">Edu</span>Stream
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/login">
                        <Button>
                            Login
                        </Button>
                    </Link>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}