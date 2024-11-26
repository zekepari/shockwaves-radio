"use client";

import { useState, useTransition } from "react";
import { createHost } from "@/app/actions";
import { Host } from "@prisma/client";

interface CreateHostFormProps {
  onHostCreated: (newHost: Host) => void;
}

export default function CreateHostForm({ onHostCreated }: CreateHostFormProps) {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Host name cannot be empty.");
      return;
    }

    if (!imageFile) {
      setError("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", imageFile);

    startTransition(async () => {
      try {
        const newHost = await createHost(formData);

        if (!newHost) {
          setError("Failed to create the host. Please try again.");
          return;
        }

        setSuccess("Host created successfully!");
        setName("");
        setImageFile(null);

        if (onHostCreated) {
          onHostCreated(newHost);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
      <div>
        <label>Host Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label>Image Upload</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          required
          className="input input-bordered w-full p-2"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={isPending}
      >
        {isPending ? "Creating..." : "Create Host"}
      </button>
    </form>
  );
}
