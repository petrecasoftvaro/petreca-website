"use client";
import distanceToNow from "@/lib/dateRalative";
import { Comment } from "@/types/blog";
import { useUser } from "@auth0/nextjs-auth0";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trash2 } from "lucide-react";

type CommentListProps = {
  readonly comments?: Comment[];
  readonly onDelete: (comment: Comment) => Promise<void>;
};

export default function CommentList({ comments, onDelete }: CommentListProps) {
  const { user } = useUser();

  return (
    <div className="bg-muted p-2.5 rounded-lg">
      {comments?.map((comment) => {
          const isAuthor = user && user.sub === comment.user.sub;
          const isAdmin =
            user && user.email === process.env.NEXT_PUBLIC_AUTH0_ADMIN_EMAIL;

          return (
            <div
              key={comment.created_at}
              className="border-b border-border mb-5 pb-3.5 px-2 last:border-b-0 last:mb-0"
            >
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-2 flex items-center justify-center">
                  <Avatar className="w-[50px] h-[50px]">
                    <AvatarImage
                      src={comment.user.picture}
                      alt={comment.user.name}
                    />
                    <AvatarFallback className="text-xs">
                      {comment.user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="col-span-10">
                  <p className="text-base text-foreground mb-2">{comment.text}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-muted-foreground">
                      {distanceToNow(comment.created_at)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Por: {comment.user.name}
                    </span>
                    {(isAdmin || isAuthor) && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-4"
                        onClick={() => onDelete(comment)}
                        aria-label="Deletar comentário"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
