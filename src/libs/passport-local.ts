import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { usersService } from "../services/userService";
import { get } from "http";
import { NextFunction, RequestHandler } from "express";
import { User } from "@prisma/client";
import { addAbortListener } from "events";

interface TokenResponseDTO {
  auth: {
    token: string;
  };
  user: User;
}

export const localStrategyPassport = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const getUserFromEmail = await usersService.findUserByEmailAndPassword(
      email,
      password
    );

    if (!getUserFromEmail) {
      return done(null, false);
    } else {
      const token = await usersService.createUserToken(getUserFromEmail);
      const response = {
        auth: {
          token,
        },
        user: getUserFromEmail,
      };
      done(null, response);
    }
  }
);

export const localMiddleware: RequestHandler = async (req, res, next) => {
  const authProcess = passport.authenticate(
    "local",
    (err: any, auth: TokenResponseDTO) => {
      if (auth) {
        req.user = auth.user;
        req.authInfo = auth.auth.token;
        return next();
      }
      return res.status(401).json({ msg: "Unauthorized" });
    }
  );
  authProcess(req, res, next);
};
