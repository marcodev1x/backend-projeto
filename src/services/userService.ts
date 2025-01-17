import { Prisma } from "@prisma/client";
import { db } from "../utils/Prisma";
import { connect } from "http2";

export const usersService = {
  createUsers: async (data: Prisma.UserCreateInput) => {
    try {
      const registerUser = await db.user.create({
        data: {
          nome: data.nome,
          email: data.email,
          age: data.age,
        },
      });
      return registerUser;
    } catch (err) {
      console.error(err);
    }
  },
  getUsers: async () => {
    try {
      const getUsers = await db.user.findMany({
        select: {
          id: true,
          nome: true,
          email: true,
          age: true,
        },
      });
      return getUsers;
    } catch (err) {
      console.error(err);
    }
  },
  findUniqueUser: async (email: string) => {
    try {
      const userGetted = await db.user.findUnique({
        where: {
          email: email,
        },
      });
      return userGetted;
    } catch (err) {
      console.error(err);
    }
  },
};
