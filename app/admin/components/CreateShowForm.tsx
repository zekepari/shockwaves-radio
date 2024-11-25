"use client";

import { useState, useTransition } from "react";
import { createShow } from "@/app/actions";
import { Show, Host } from "@prisma/client";
import { ShowWithHost } from "@/types/Prisma";

interface CreateShowFormProps {
  onShowCreated: (newShow: ShowWithHost) => void;
  hosts: Host[];
}

export default function CreateShowForm({ onShowCreated, hosts }: CreateShowFormProps) {
  const [name, setName] = useState("");
  const [hostId, setHostId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const validateForm = () => {
    if (!name || !hostId || !startTime || !endTime) {
      return "All fields are required.";
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "Invalid date or time.";
    }

    if (start >= end) {
      return "Start time must be before end time.";
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
  
    startTransition(async () => {
      try {
        const showData = {
          name,
          hostId,
          startTime,
          endTime,
        };
        const newShow = await createShow(showData);
  
        const formattedShow = {
          ...newShow,
          startTime: new Date(newShow.startTime),
          endTime: new Date(newShow.endTime),
        };
  
        setSuccess("Show created successfully!");
        setName("");
        setHostId("");
        setStartTime("");
        setEndTime("");
  
        if (onShowCreated) {
          onShowCreated(formattedShow);
        }
      } catch (err: any) {
        setError(err.message || "Failed to create show.");
      }
    });
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
      <div>
        <label>Show Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label>Host</label>
        <select
          value={hostId}
          onChange={(e) => setHostId(e.target.value)}
          required
          className="input input-bordered w-full"
        >
          <option value="" disabled>
            Select a host
          </option>
          {hosts.map((host) => (
            <option key={host.id} value={host.id}>
              {host.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label>End Time</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          className="input input-bordered w-full"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={isPending}
      >
        {isPending ? "Creating..." : "Create Show"}
      </button>
    </form>
  );
}
