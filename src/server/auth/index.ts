import { cache } from 'react'

import NextAuth, { type NextAuthResult } from 'next-auth'

import { authConfig } from './config'

const result = NextAuth(authConfig)

// const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig)

const signIn: NextAuthResult['signIn'] = result.signIn
const signOut: NextAuthResult['signOut'] = result.signOut
const handlers: NextAuthResult['handlers'] = result.handlers

const auth = cache(result.auth)

export { auth, handlers, signIn, signOut }
