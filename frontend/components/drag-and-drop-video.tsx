"use client";

import { AlertCircleIcon, UploadIcon, XIcon } from "lucide-react";
import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface DragAndDropVideoProps {
    onSelectFile?: (file: File | null) => void;
}

export default function DragAndDropVideo({ onSelectFile }: DragAndDropVideoProps) {
    const maxSizeMB = 20;
    const maxSize = maxSizeMB * 1024 * 1024;
    const maxFiles = 1;

    const [
        { files, isDragging, errors },
        {
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            removeFile,
            clearFiles,
            getInputProps,
        },
    ] = useFileUpload({
        accept: "video/mp4,video/webm,video/ogg", // aceita apenas formatos de vídeo comuns
        maxSize,
        multiple: false,
        maxFiles,
    });

    useEffect(() => {
        if (onSelectFile) {
            onSelectFile(files.length > 0 ? (files[0].file as File) : null);
        }
    }, [files, onSelectFile]);

    return (
        <div className="flex flex-col gap-2">
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-dragging={isDragging || undefined}
                data-files={files.length > 0 || undefined}
                className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
            >
                <input
                    {...getInputProps()}
                    className="sr-only"
                    aria-label="Upload video file"
                />
                <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                    <div className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border">
                        <UploadIcon className="size-4 opacity-60" />
                    </div>
                    <p className="mb-1.5 text-sm font-medium">Arraste seu vídeo aqui</p>
                    <p className="text-muted-foreground text-xs">
                        MP4, WEBM ou OGG (max. {maxSizeMB}MB)
                    </p>
                    <Button type="button" variant="outline" className="mt-4" onClick={openFileDialog}>
                        <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
                        Selecionar vídeo
                    </Button>
                </div>
            </div>

            {/* Exibição de erros */}
            {errors.length > 0 && (
                <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
                    <AlertCircleIcon className="size-3 shrink-0" />
                    <span>{errors[0]}</span>
                </div>
            )}

            {/* Lista de arquivos */}
            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="bg-accent aspect-square shrink-0 rounded flex items-center justify-center p-2">
                                    🎥
                                </div>
                                <div className="flex min-w-0 flex-col gap-0.5">
                                    <p className="truncate text-[13px] font-medium">
                                        {file.file.name}
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                        {formatBytes(file.file.size)}
                                    </p>
                                </div>
                            </div>

                            <Button
                                size="icon"
                                variant="ghost"
                                className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                                onClick={() => removeFile(file.id)}
                                aria-label="Remove file"
                            >
                                <XIcon aria-hidden="true" />
                            </Button>
                        </div>
                    ))}

                    {files.length > 1 && (
                        <div>
                            <Button size="sm" variant="outline" onClick={clearFiles}>
                                Remover todos vídeos
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
