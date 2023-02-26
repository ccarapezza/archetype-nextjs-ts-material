
import type { Adapter } from "next-auth/adapters"
import Account from "../models/Account";
import Session from "../models/Session";
import User from "../models/User"

/** @return { import("next-auth/adapters").Adapter } */
function CustomAdapter(options = {}): Adapter {
    return {
      async createUser(user) {
        let newUser = new User();
        newUser.id = "1234";
        newUser.email = user.email;
        newUser.emailVerified = user.emailVerified;
        newUser.name = user.name;
        newUser.image = user.image;
        return newUser;
      },
      async getUser(id) {
        return null;
      },
      async getUserByEmail(email) {
        return null;
      },
      async getUserByAccount({ providerAccountId, provider }) {
        return null;
      },
      async updateUser(user) {
        let updatedUser = new User();
        updatedUser.id = "1234";
        updatedUser.email = user.email!;
        updatedUser.emailVerified = user.emailVerified!;
        updatedUser.name = user.name;
        updatedUser.image = user.image;
        return updatedUser;
      },
      async deleteUser(userId) {
        return null;
      },
      async linkAccount(account) {
        return null;
      },
      async unlinkAccount({ providerAccountId, provider }) {
        let account = new Account();
        account.providerAccountId = providerAccountId;
        account.provider = provider;
        return account;
      },
      async createSession({ sessionToken, userId, expires }) {
        let session = new Session();
        session.sessionToken = sessionToken;
        session.userId = userId;
        session.expires = expires;
        return session;
      },
      async getSessionAndUser(sessionToken) {
        return null;
      },
      async updateSession({ sessionToken }) {
        return null;
      },
      async deleteSession(sessionToken) {
        return null;
      },
      async createVerificationToken({ identifier, expires, token }) {
        return null;
      },
      async useVerificationToken({ identifier, token }) {
        return null;
      },
    }
  }