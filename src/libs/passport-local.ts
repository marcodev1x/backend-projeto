import { Strategy as LocalStrategy } from "passport-local";

export const localStrategy = new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
});
