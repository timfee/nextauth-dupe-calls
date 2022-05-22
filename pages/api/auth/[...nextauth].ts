import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '../../../prisma/client'

declare module 'next-auth' {
  interface Session {
    user: { id: string } & DefaultSession['user']
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
   session: ({ session, user, token }) => {
       console.info('\n\nSESSION Called:')
       console.info(session)
       console.info(user)
       console.info(token)
       console.info('------------\n\n')
       return { ...session }
    }},
  logger: {
    error(code, metadata) {
      console.error(code, metadata)
    },
    warn(code) {
      console.warn(code)
    },
    debug(code, metadata) {
      console.debug(code, metadata)
    },
  },
  callbacks: {
    /* Updating the account in the database. */
    // signIn: async ({ account }) => {
    //   await prisma.account.update({
    //     where: {
    //       provider_providerAccountId: {
    //         provider: account.provider,
    //         providerAccountId: account.providerAccountId,
    //       },
    //     },
    //     data: { ...account },
    //   })

    //   return true
    // },

    session: ({ session, user, token }) => {
      // console.info('\n\nSESSION Called:')
      // console.info(session)
      // console.info(user)
      // console.info(token)
      // console.info('------------\n\n')

      if (user && user.id) {
        session.user.id = user.id
      }
      return { ...session }
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.OAUTH_CLIENT_ID || '',
      clientSecret: process.env.OAUTH_CLIENT_SECRET || '',
    }),
  ],
}

export default NextAuth(authOptions)
