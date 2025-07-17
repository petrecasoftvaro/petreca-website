import { NextRequest } from "next/server";
import createComments from "@/lib/createComment";
import deleteComments from "@/lib/deleteComment";
import fetchComment from "@/lib/fetchComment";

export async function POST(req: NextRequest) {
  return createComments(req);
}
export async function GET() {
  return fetchComment();
}

export async function DELETE(req: NextRequest) {
  return deleteComments(req);
}
