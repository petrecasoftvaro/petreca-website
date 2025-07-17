import distanceToNow from '@/lib/dateRalative';
import { Comment } from '@/types/blog';
import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';

type CommentListProps = {
  comments?: Comment[] | undefined;
  onDelete: (comment: Comment) => Promise<void>;
};

export default function CommentList({ comments, onDelete }: CommentListProps) {
  const { user } = useUser();

  return (
    <div className="space-y-6 mt-10">
      {comments &&
        comments.map((comment) => {
          const isAuthor = user && user.sub === comment.user.sub;
          const isAdmin =
            user && user.email === process.env.NEXT_PUBLIC_AUTH0_ADMIN_EMAIL;

          return (
            <div key={comment.created_at} className="flex space-x-4">
              <div className="flex-shrink-0">
                <Image
                  src={comment.user.picture}
                  alt={comment.user.name}
                  width={40}
                  height={40}
                ></Image>
            
              </div>

              <div className="flex-grow">
                <div className="flex space-x-2">
                  <b>{comment.user.name}</b>
                  <time className="text-gray-400">
                    {distanceToNow(comment.created_at)}
                  </time>
                  {(isAdmin || isAuthor) && (
                    <button
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => onDelete(comment)}
                      aria-label="Close"
                    >
                      x
                    </button>
                  )}
                </div>

                <div>{comment.text}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
}