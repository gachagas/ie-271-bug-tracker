import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
});
