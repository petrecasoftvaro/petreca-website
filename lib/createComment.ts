import { nanoid } from "nanoid";
import type { Comment } from "../types/blog";
import clientRedis from "./redis";
import { auth0 } from "./auth0";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import clearUrl from "./clearUrl";

export default async function createComments(req: NextRequest) {
  const session = await auth0.getSession();

  if (!session) {
    return new NextResponse("Error", {
      status: 401,
      statusText: "Not authenticated",
    });
  }

  const { text } = await req.json();
  const headersList = await headers();
  const referer = headersList.get("referer");

  if (!referer) {
    return new NextResponse("Erro", {
      status: 400,
      statusText: "Missing parameter.",
    });
  }
  const url = clearUrl(referer);
  if (!text) {
    return new NextResponse("Error", {
      status: 400,
      statusText: "Missing parameter.",
    });
  }

  if (!clientRedis) {
    return new NextResponse("Error", {
      status: 400,
      statusText: "Failed to connect to redis client.",
    });
  }

  try {
    const { name, picture, sub, email } = session.user;

    const comment: Comment = {
      id: nanoid(),
      created_at: Date.now(),
      url,
      text,
      user: {
        name: name || "Anonymous",
        picture:
          picture ||
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
        sub: sub || "anonymous",
        email: email || "",
      },
    };

    // write data
    await clientRedis.RPUSH(url, JSON.stringify(comment));

    return new NextResponse("Success!", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Erro", {
      status: 400,
      statusText: "Unexpected error occurred.",
    });
  }
}
