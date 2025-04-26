"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
    return (
        <div className="min-h-[92vh] flex items-center justify-center p-4 relative">   
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
                <Card className="flex-1 shadow-lg text-center flex flex-col justify-center">
                    <CardContent className="p-6 space-y-6">
                        <h2 className="text-xl font-bold">Sou Professor</h2>
                        <Link href="/login/teacher">
                            <Button className="w-full">Login Professor</Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="flex-1 shadow-lg text-center flex flex-col justify-center">
                    <CardContent className="p-6 space-y-6">
                        <h2 className="text-xl font-bold">Sou Aluno</h2>
                        <Link href="/login/student">
                            <Button className="w-full">Login Aluno</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}