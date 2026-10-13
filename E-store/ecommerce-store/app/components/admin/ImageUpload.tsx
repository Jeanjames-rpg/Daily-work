"use client";

import { useRef, useState } from "react";


type ImageUploadProps = {
    value: string;
    onChange: (image: string) => void;
    label: string;
};

export default function ImageUpload({
    value,
    onChange,
    label,
}: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) return;

        setError("");

        if (file.size > 5 * 1024 * 1024) {
            setError("Image must be smaller than 5 MB.");
            event.target.value = "";
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        setUploading(true);

        try{
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Image upload failed.");
            }

            onChange(data.image);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Image upload failed."
            );
        } finally {
            URL.revokeObjectURL(previewUrl);
            setUploading(false);

            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    }
    
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium">{label}</label>

            {value && (
                <img
                    src={value}
                    alt={label}
                    className="h-32 w-32 rounded-lg border object-cover"
                />
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                disabled={uploading}
                className="
                    block w-full cursor-pointer rounded-xl
                    border border-gray-200 bg-white
                    text-sm text-gray-600 shadow-sm
                    transition
                    file:mr-4 file:cursor-pointer
                    file:rounded-l-xl file:border-0
                    file:bg-blue-50 file:px-5 file:py-3
                    file:text-sm file:font-semibold
                    file:text-blue-700
                    hover:border-blue-400
                    hover:file:bg-blue-100
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            />

            {uploading && (
                <p className="text-sm text-blue-600">Uploading image...</p>
            )}

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

        </div>
    );

}