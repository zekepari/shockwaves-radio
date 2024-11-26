"use server";

import prisma from "@/prisma";
import path from "path";
import fs from "fs/promises";
import { auth } from "@/auth";
import { isStaff } from "@/lib/Staff";

export async function getHosts() {
    try {
      const hosts = await prisma.host.findMany({
        include: {
          _count: {
            select: { shows: true }
          }
        }
      });
      return hosts;
    } catch (error) {
      console.error("Failed to fetch hosts:", error);
      throw new Error("Failed to fetch hosts");
    }
  }
  
  export async function createHost(formData: FormData) {
    const session = await auth();

    if (!isStaff(session?.user?.id)) {
      return
    }

    const name = formData.get("name")?.toString();
    const image = formData.get("image") as File;
  
    // Validate input
    if (!name || !image) {
      throw new Error("Name and image are required.");
    }
  
    try {
      const uploadDir = path.join(process.cwd(), "public/uploads");
  
      await fs.mkdir(uploadDir, { recursive: true });
  
      const fileName = `${Date.now()}-${image.name}`;
      const filePath = path.join(uploadDir, fileName);
  
      const arrayBuffer = await image.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(arrayBuffer));
  
      const imageUrl = `/uploads/${fileName}`;
  
      const host = await prisma.host.create({
        data: {
          name,
          imageUrl,
        },
      });
  
      return host;
    } catch (error) {
      console.error("Failed to create host:", error);
      throw new Error("Failed to create host. Please try again later.");
    }
  }

export async function createShow(data: {
name: string;
hostId: string;
startTime: string;
endTime: string;
}) {
  const session = await auth();

  if (!isStaff(session?.user?.id)) {
    return
  }
  
const { name, hostId, startTime, endTime } = data;

if (!name || !hostId || !startTime || !endTime) {
    throw new Error("All fields are required");
}

const start = new Date(startTime);
const end = new Date(endTime);

if (start >= end) {
    throw new Error("Start time must be before end time");
}

try {
    const show = await prisma.show.create({
    data: {
        name,
        startTime: start,
        endTime: end,
        host: {
          connect: {
              id: hostId,
          },
        },
    },
    include: {
        host: true
    }
    });

    return {
      ...show,
      startTime: show.startTime.toISOString(),
      endTime: show.endTime.toISOString(),
    };
} catch (error) {
    console.error("Error creating show:", error);
    throw new Error("Failed to create show");
}
}

export async function getShows() {
  try {
    const now = new Date();
    const shows = await prisma.show.findMany({
      where: {
        startTime: {
          gt: now,
        },
      },
      orderBy: {
        startTime: "asc"
      },
      include: {
        host: true
      },
    });
    return shows.map((show) => ({
      ...show,
      startTime: show.startTime.toISOString(),
      endTime: show.endTime.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching shows:", error);
    throw new Error("Failed to fetch shows");
  }
}
