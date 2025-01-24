import { Prisma, User } from "@prisma/client";
import { db } from "../utils/Prisma";
import { connect } from "http2";
import { use } from "passport";
import bcrypt from "bcrypt";
import { hash } from "crypto";
import { get } from "http";

export const usersService = {
  createUsers: async (data: Prisma.UserCreateInput) => {
    const saltCoust = 10;
    const hashPasswordReg = async (password: string): Promise<string> => {
      const salt = await bcrypt.genSalt(saltCoust);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    };

    if (data.password) {
      const passwordHashed = await hashPasswordReg(data.password).then(
        (hash) => {
          return hash;
        }
      );
      try {
        const registerUser = await db.user.create({
          data: {
            nome: data.nome,
            password: String(passwordHashed),
            email: data.email,
            age: data.age,
          },
        });
        return registerUser;
      } catch (err) {
        console.error(err);
      }
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
        select: {
          id: true,
          nome: true,
          email: true,
          age: true,
        },
      });
      return userGetted;
    } catch (err) {
      console.error(err);
    }
  },

  getUserPassword: async (email: string) => {
    try {
      const getPassword = await db.user.findUnique({
        where: {
          email: email,
        },
        select: {
          password: true,
        },
      });
      return getPassword;
    } catch (err) {
      console.error(err);
    }
  },

  findUserByEmailAndPassword: async (email: string, password: string) => {
    const findUser = await usersService.findUniqueUser(email);
    const getUserPassword = await usersService.getUserPassword(email);

    if (!findUser) return false;

    if (!getUserPassword) return false;

    const isPasswordOk = await bcrypt.compare(
      password,
      getUserPassword.password
    );

    if (!isPasswordOk) return false;

    return findUser;
  },

  createUserToken: async (user: User) => {
    return `Bearer ${user.nome}02930129021idowskmdiwqekd90231i49021i398`;
  },
};
