import { OAuthStrategy, createClient } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const cookies = request.cookies;
  const res = NextResponse.next();

  if (cookies.get("refreshToken")) {
    return res;
  }

  const wixClient = createClient({
    auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
  });

  // const tokens = await wixClient.auth.generateVisitorTokens();
  // res.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
  //   maxAge: 60 * 60 * 24 * 30,
  // });

  try {
    const tokens = await wixClient.auth.generateVisitorTokens();
    res.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
      maxAge: 60 * 60 * 24 * 30,
    });
  } catch (error) {
    console.error("Error generating tokens:", error);
    // Optional: handle error response to the user
  }
  return res;
};