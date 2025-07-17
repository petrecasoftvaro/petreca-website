
import clearUrl from "./clearUrl";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Comment } from "@/types/blog";
import clientRedis from "./redis";

export default async function fetchComment() {
  const headersList = await headers();
  const referer = headersList.get("referer");
  if (!referer) {

    return new NextResponse('Erro', {
      status: 400,
      statusText: 'Missing parameter.',
    });
  }

  const url = clearUrl(referer);
  if (!clientRedis) {
    return new NextResponse("Erro", {
      status: 500,
      statusText: 'Failed to connect to redis.',
    });
    
  }
  
  try {
    // get data
    const rawComments = await clientRedis.LRANGE(url, 0, -1);
    let comments: Comment[] = [];
    if (Array.isArray(rawComments)) {
      comments = rawComments
        .filter((c): c is string => typeof c === "string")
        .map((c: string) => {
          const comment: Comment = JSON.parse(c);
          comment.user.email = '';
          return comment;
        });
    }
    

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.log(error)
    return new NextResponse('Erro', {
      status: 400,
      statusText: 'Unexpected error occurred.',
    });
   
  }
}
