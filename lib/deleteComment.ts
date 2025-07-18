import clientRedis from "./redis";
import { auth0 } from "./auth0";
import clearUrl from "./clearUrl";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import type { Comment } from "../types/blog";

export default async function deleteComments(req: NextRequest) {
  const session = await auth0.getSession();

  if (!session) {
    return new NextResponse("Error 1", {
      status: 401,
      statusText: "Not authenticated",
    });
  }

  const headersList = await headers();
  const referer = headersList.get("referer");

  if (!referer) {
    return new NextResponse("Erro 2 ", {
      status: 400,
      statusText: "Missing parameter.",
    });
  }

  const url = clearUrl(referer);
  const { comment }: { url: string; comment: Comment } = await req.json();

  if (!comment) {
    return new NextResponse("Error 3", {
      status: 400,
      statusText: "Missing parameter.",
    });
  }

  if (!clientRedis) {
    return new NextResponse("Error 4", {
      status: 400,
      statusText: "Failed to connect to redis client.",
    });
  }

  try {
    const { email, sub, name } = session.user;
    if (!name) {
      return new NextResponse("Error 5", {
        status: 400,
        statusText: "Missing parameter.",
      });
    }
    comment.user.email = email || "";

    const isAdmin = process.env.NEXT_PUBLIC_AUTH0_ADMIN_EMAIL === email;
    const isAuthor = sub === comment.user.sub;

    if (!isAdmin || !isAuthor) {
      return new NextResponse("Error 6", {
        status: 400,
        statusText: "Need authorization.",
      });
    }

    // delete
    await clientRedis.LREM(url, 0, JSON.stringify(comment));

    return new NextResponse("Success", {
      status: 200,
      statusText: "Success",
    });
  } catch (err) {
    console.error(err);
    return new NextResponse("Error 7", {
      status: 500,
      statusText: "Unexpected error occurred.",
    });
  }
}
