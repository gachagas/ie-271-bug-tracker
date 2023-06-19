import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TicketType, TicketStatus, TicketPriority } from "@prisma/client";

export const ticketRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.ticket.findMany({});
  }),

  getUserTickets: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const getUserTickets = await ctx.prisma.ticket.findMany({
        where: { submitterId: input.userId },
        include: {
          project: true,
        },
      });

      return { data: getUserTickets };
    }),

  createTicket: publicProcedure
    .input(
      z.object({
        description: z.string(),
        type: z.nativeEnum(TicketType),
        priority: z.nativeEnum(TicketPriority),
        submitterId: z.string(),
        projectId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newTicket = await ctx.prisma.ticket.create({
        data: {
          description: input.description,
          type: input.type,
          status: TicketStatus.OPEN,
          priority: input.priority,
          submitter: {
            connect: { id: input.submitterId },
          },
          project: {
            connect: { id: input.projectId },
          },
        },
      });

      return { data: newTicket };
    }),
});
