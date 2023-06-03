import { z } from "zod";
import { Role } from "@prisma/client";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
  }),

  addUser: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      console.log("HELLO");
      console.log("the inputted is", input);

      const newUser = await ctx.prisma.user.create({
        data: { name: "MyName", email: "ger2@email.com", password: "testword" },
      });

      return { success: true, message: newUser };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  addPracticeEntry: publicProcedure
    .input(
      z.object({
        name: z.string(),
        someNumber: z.number(),
        comment: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("input val");

      const newPracticeEntry = await ctx.prisma.practiceModel.create({
        data: {
          name: input.name,
          someNumber: input.someNumber,
          comment: input.comment,
        },
      });

      return { success: true, message: "Hello world", entry: newPracticeEntry };
    }),

  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        role: z.nativeEnum(Role),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newUser = await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          role: input.role,
        },
      });
      console.log("successfully created user");
      return { success: true, messagee: "Success", newUser: newUser };
    }),

  updateUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        password: z.string(),
        role: z.nativeEnum(Role),
      })
    )

    .mutation(async ({ ctx, input }) => {
      console.log(input);
      const deleteUser = await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          role: input.role,
        },
      });
      return { success: true, message: "deleted user", user: deleteUser };
    }),

  deleteUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("receiving");
      console.log(input);
      const deleteUser = await ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      });
      console.log("successfully deleted user");
      return { success: true, message: "deleted user", user: deleteUser };
    }),
});
