import { env } from '@/env'
import { db } from '@/server/db'
import {
  account,
  session,
  user,
  verificationToken,
} from '@/server/db/schema/user'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { compare } from 'bcryptjs'
import { type DefaultSession, type NextAuthConfig } from 'next-auth'
import { type Adapter } from 'next-auth/adapters'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import Resend from 'next-auth/providers/resend'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      name: string
      email: string
      isTrainer: boolean
      isCreator: boolean
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user']
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    signIn: async ({ user, account, email }) => {
      if (!user) return false
      console.log('user', user, account, email)
      const dbUser = await db.query.user.findFirst({
        where: (u, { eq }) => eq(u.email, user.email?.toLowerCase() as string),
        columns: {
          id: true,
        },
      })
      if (dbUser) return true
      return false
    },
    session: async ({ session, token }) => {
      if (session.user && token.uid) {
        const dbUser = await db.query.user.findFirst({
          // @ts-ignore
          where: (user, { eq }) => eq(user.id, token.uid),
          columns: {
            id: true,
            isTrainer: true,
            isCreator: true,
          },
        })
        if (dbUser) {
          session.user = {
            ...session.user,
            id: dbUser.id,
            isTrainer: dbUser.isTrainer || false,
            isCreator: dbUser.isCreator || false,
          }
        }
      }
      return {
        ...session,
      }
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
  adapter: DrizzleAdapter(db, {
    usersTable: user,
    accountsTable: account,
    sessionsTable: session,
    verificationTokensTable: verificationToken,
  }) as Adapter,
  providers: [
    Resend({
      // If your environment variable is named differently than default
      apiKey: env.EMAIL_SERVER_PASSWORD,
      from: env.EMAIL_FROM,
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) return null
        const maybeUser = await db.query.user.findFirst({
          where: (user, { eq }) =>
            eq(user.email, credentials.username as string),
        })

        if (!maybeUser) throw new Error('user not found')
        if (!maybeUser.password) throw new Error('invalid password')
        if (maybeUser.isFake) throw new Error('invalid credentials')

        const isValid = await compare(
          credentials.password as string,
          maybeUser.password,
        )
        if (maybeUser && isValid) {
          return {
            id: maybeUser.id,
            email: maybeUser.email,
            name: maybeUser.firstName + ' ' + maybeUser.lastName,
            isCreator: maybeUser.isCreator,
          }
        } else {
          throw new Error('invalid password')
        }
      },
    }),
  ],
} satisfies NextAuthConfig
