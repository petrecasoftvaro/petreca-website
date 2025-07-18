import distanceToNow from "@/lib/dateRalative";
import { Comment } from "@/types/blog";
import { useUser } from "@auth0/nextjs-auth0";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Image from "next/image";

type CommentListProps = {
  comments?: Comment[] | undefined;
  onDelete: (comment: Comment) => Promise<void>;
};

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: (theme.vars || theme).palette.grey[700],
  padding: 10,
  borderRadius: (theme.vars || theme).shape.borderRadius,
}));

const CommentLineBox = styled("div")(({ theme }) => ({
  borderBottomColor: (theme.vars || theme).palette.grey[600],
  borderBottomWidth: 1,
  marginBottom: 20,
  padding: "14px 8px",

  borderBottomStyle: "solid",
}));

export default function CommentList({ comments, onDelete }: CommentListProps) {
  const { user } = useUser();

  return (
    <StyledBox>
      {comments &&
        comments.map((comment) => {
          const isAuthor = user && user.sub === comment.user.sub;
          const isAdmin =
            user && user.email === process.env.NEXT_PUBLIC_AUTH0_ADMIN_EMAIL;

          return (
            <CommentLineBox key={comment.created_at}>
              <Grid container spacing={2}>
                <Grid
                  size={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box
                    sx={{
                      borderRadius: "50%",
                      width: 50,
                      height: 50,
                      backgroundColor: "AppWorkspace",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={comment.user.picture}
                      alt={comment.user.name}
                      sizes="(max-width: 50px) 100vw, 50px"
                      objectFit="cover"
                      fill
                    ></Image>
                  </Box>
                </Grid>
                <Grid size={10}>
                  <Typography variant="body1">{comment.text}</Typography>
                  <Box>
                    <Typography variant="caption">
                      {distanceToNow(comment.created_at)}
                    </Typography>
                    <Typography variant="caption" sx={{ marginLeft: 2 }}>
                      Por: {comment.user.name}
                    </Typography>
                    {(isAdmin || isAuthor) && (
                      <IconButton
                        type="reset"
                        sx={{ height: 26, width: 26, marginLeft: 4 }}
                        onClick={() => onDelete(comment)}
                      >
                        <Delete sx={{ fontSize: 18 }} />
                      </IconButton>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </CommentLineBox>
          );
        })}
    </StyledBox>
  );
}
