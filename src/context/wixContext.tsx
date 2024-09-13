"use client"

import { createClient, OAuthStrategy } from "@wix/sdk";
import {products, categories} from "@wix/stores"
import Cookies from "js-cookie";

const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}")

const myWixClient = createClient({
    modules: {
      products,
    //   currentCart
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken, accessToken: {value: "", expiresAt: 0},
      },
    }),
  });
  
