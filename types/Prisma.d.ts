import { Prisma } from "@prisma/client"

export type ShowWithHost = Prisma.ShowGetPayload<{
    include: { host: true }
}>

export type HostWithShowCount = Prisma.HostGetPayload<{
    include: {
        _count: {
            select: { shows: true }
        }
    }
}>