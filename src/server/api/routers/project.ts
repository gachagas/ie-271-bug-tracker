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
            tickets: {
              include: {
                project: { select: { name: true } },
                developer: { select: { name: true } },
              },
            },
          },
        });

        return { data: getProjectsAndDevelopers };
      } catch {
        return { data: [] };
      }
    }),

  getDeveloperProject: publicProcedure
    .input(
      z.object({
        developerId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const getDeveloperProject = await ctx.prisma.project.findMany({
        where: { developers: { some: { id: input.developerId } } },
        include: {
          tickets: {
            include: {
              project: { select: { name: true } },
              developer: { select: { name: true } },
            },
          },
        },
      });

      return { data: getDeveloperProject };
    }),

  projectManagerProjects: publicProcedure
    .input(z.object({ projectManagerId: z.string() }))
    .query(async ({ ctx, input }) => {
      const getUserUniqueProjects = await ctx.prisma.project.findMany({
        where: { projectManagerId: input.projectManagerId },
      });

      return { data: getUserUniqueProjects };
    }),
});
