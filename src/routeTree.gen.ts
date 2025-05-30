/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootIndexImport } from './routes/(root)/index'
import { Route as rootRoute } from './routes/__root'
import { Route as AccountSettingsIndexImport } from './routes/account/settings/index'
import { Route as ChatIndexImport } from './routes/chat/index'
import { Route as DashboardIndexImport } from './routes/dashboard/index'
import { Route as ForgotPasswordIndexImport } from './routes/forgot-password/index'
import { Route as LogoutIndexImport } from './routes/logout/index'
import { Route as ResetPasswordIndexImport } from './routes/reset-password/index'
import { Route as SigninIndexImport } from './routes/signin/index'
import { Route as SignupIndexImport } from './routes/signup/index'

// Create/Update Routes

const SignupIndexRoute = SignupIndexImport.update({
  id: '/signup/',
  path: '/signup/',
  getParentRoute: () => rootRoute,
} as any)

const SigninIndexRoute = SigninIndexImport.update({
  id: '/signin/',
  path: '/signin/',
  getParentRoute: () => rootRoute,
} as any)

const ResetPasswordIndexRoute = ResetPasswordIndexImport.update({
  id: '/reset-password/',
  path: '/reset-password/',
  getParentRoute: () => rootRoute,
} as any)

const LogoutIndexRoute = LogoutIndexImport.update({
  id: '/logout/',
  path: '/logout/',
  getParentRoute: () => rootRoute,
} as any)

const ForgotPasswordIndexRoute = ForgotPasswordIndexImport.update({
  id: '/forgot-password/',
  path: '/forgot-password/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/dashboard/',
  path: '/dashboard/',
  getParentRoute: () => rootRoute,
} as any)

const ChatIndexRoute = ChatIndexImport.update({
  id: '/chat/',
  path: '/chat/',
  getParentRoute: () => rootRoute,
} as any)

const rootIndexRoute = rootIndexImport.update({
  id: '/(root)/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AccountSettingsIndexRoute = AccountSettingsIndexImport.update({
  id: '/account/settings/',
  path: '/account/settings/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/(root)/': {
      id: '/(root)/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof rootIndexImport
      parentRoute: typeof rootRoute
    }
    '/chat/': {
      id: '/chat/'
      path: '/chat'
      fullPath: '/chat'
      preLoaderRoute: typeof ChatIndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof rootRoute
    }
    '/forgot-password/': {
      id: '/forgot-password/'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof ForgotPasswordIndexImport
      parentRoute: typeof rootRoute
    }
    '/logout/': {
      id: '/logout/'
      path: '/logout'
      fullPath: '/logout'
      preLoaderRoute: typeof LogoutIndexImport
      parentRoute: typeof rootRoute
    }
    '/reset-password/': {
      id: '/reset-password/'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof ResetPasswordIndexImport
      parentRoute: typeof rootRoute
    }
    '/signin/': {
      id: '/signin/'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof SigninIndexImport
      parentRoute: typeof rootRoute
    }
    '/signup/': {
      id: '/signup/'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupIndexImport
      parentRoute: typeof rootRoute
    }
    '/account/settings/': {
      id: '/account/settings/'
      path: '/account/settings'
      fullPath: '/account/settings'
      preLoaderRoute: typeof AccountSettingsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof rootIndexRoute
  '/chat': typeof ChatIndexRoute
  '/dashboard': typeof DashboardIndexRoute
  '/forgot-password': typeof ForgotPasswordIndexRoute
  '/logout': typeof LogoutIndexRoute
  '/reset-password': typeof ResetPasswordIndexRoute
  '/signin': typeof SigninIndexRoute
  '/signup': typeof SignupIndexRoute
  '/account/settings': typeof AccountSettingsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof rootIndexRoute
  '/chat': typeof ChatIndexRoute
  '/dashboard': typeof DashboardIndexRoute
  '/forgot-password': typeof ForgotPasswordIndexRoute
  '/logout': typeof LogoutIndexRoute
  '/reset-password': typeof ResetPasswordIndexRoute
  '/signin': typeof SigninIndexRoute
  '/signup': typeof SignupIndexRoute
  '/account/settings': typeof AccountSettingsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/(root)/': typeof rootIndexRoute
  '/chat/': typeof ChatIndexRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/forgot-password/': typeof ForgotPasswordIndexRoute
  '/logout/': typeof LogoutIndexRoute
  '/reset-password/': typeof ResetPasswordIndexRoute
  '/signin/': typeof SigninIndexRoute
  '/signup/': typeof SignupIndexRoute
  '/account/settings/': typeof AccountSettingsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/chat'
    | '/dashboard'
    | '/forgot-password'
    | '/logout'
    | '/reset-password'
    | '/signin'
    | '/signup'
    | '/account/settings'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/chat'
    | '/dashboard'
    | '/forgot-password'
    | '/logout'
    | '/reset-password'
    | '/signin'
    | '/signup'
    | '/account/settings'
  id:
    | '__root__'
    | '/(root)/'
    | '/chat/'
    | '/dashboard/'
    | '/forgot-password/'
    | '/logout/'
    | '/reset-password/'
    | '/signin/'
    | '/signup/'
    | '/account/settings/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  rootIndexRoute: typeof rootIndexRoute
  ChatIndexRoute: typeof ChatIndexRoute
  DashboardIndexRoute: typeof DashboardIndexRoute
  ForgotPasswordIndexRoute: typeof ForgotPasswordIndexRoute
  LogoutIndexRoute: typeof LogoutIndexRoute
  ResetPasswordIndexRoute: typeof ResetPasswordIndexRoute
  SigninIndexRoute: typeof SigninIndexRoute
  SignupIndexRoute: typeof SignupIndexRoute
  AccountSettingsIndexRoute: typeof AccountSettingsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  rootIndexRoute: rootIndexRoute,
  ChatIndexRoute: ChatIndexRoute,
  DashboardIndexRoute: DashboardIndexRoute,
  ForgotPasswordIndexRoute: ForgotPasswordIndexRoute,
  LogoutIndexRoute: LogoutIndexRoute,
  ResetPasswordIndexRoute: ResetPasswordIndexRoute,
  SigninIndexRoute: SigninIndexRoute,
  SignupIndexRoute: SignupIndexRoute,
  AccountSettingsIndexRoute: AccountSettingsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/(root)/",
        "/chat/",
        "/dashboard/",
        "/forgot-password/",
        "/logout/",
        "/reset-password/",
        "/signin/",
        "/signup/",
        "/account/settings/"
      ]
    },
    "/(root)/": {
      "filePath": "(root)/index.tsx"
    },
    "/chat/": {
      "filePath": "chat/index.tsx"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx"
    },
    "/forgot-password/": {
      "filePath": "forgot-password/index.tsx"
    },
    "/logout/": {
      "filePath": "logout/index.tsx"
    },
    "/reset-password/": {
      "filePath": "reset-password/index.tsx"
    },
    "/signin/": {
      "filePath": "signin/index.tsx"
    },
    "/signup/": {
      "filePath": "signup/index.tsx"
    },
    "/account/settings/": {
      "filePath": "account/settings/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
