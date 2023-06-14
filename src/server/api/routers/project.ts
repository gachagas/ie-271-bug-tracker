import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.project.findMany({
      include: {
        projectManager: true,
      },
    });
  }),

  createProject: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        projectManagerId: z.string(),
      })
    )

    .mutation(async ({ ctx, input }) => {
      const newProject = await ctx.prisma.project.create({
        data: {
          name: input.name,
          description: input.description,
          projectManager: {
            connect: { id: input.projectManagerId },
          },
        },
      });
      return { success: true, message: "success", newProject: newProject };
    }),

  getUsersProjectsAndDevelopers: publicProcedure
    .input(
      z.object({
        projectManagerId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const getProjectsAndDevelopers = await ctx.prisma.project.findMany({
          where: { projectManagerId: input.projectManagerId },
          include: {
            projectManager: true,
            developers: true,
            tickets: true,
          },
        });

        return { data: getProjectsAndDevelopers };
      } catch {
        return { data: [] };
      }
    }),
});
