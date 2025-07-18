import { useUser } from "@auth0/nextjs-auth0";
import { Box, Button, FormControl, TextareaAutosize, Typography } from "@mui/material";
import { redirect } from "next/navigation";

type CommentFormProps = {
  text: string;
  setText: (value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
};

export default function CommentForm({
  text,
  setText,
  onSubmit,
}: CommentFormProps) {
  const { user } = useUser();

  return (
    <FormControl sx={{width: '100%'}}>
      <form onSubmit={onSubmit}>
        <TextareaAutosize
          value={text}
          minRows={3}
          onChange={(e) => setText(e.target.value)}
          disabled={!user}
          placeholder={
            user ? "Mande seu comentario" : "Faça login para comentar"
          }
          style={{ width: '100%' }}
        />
        {user ? (
          <Box sx={{textAlign: "right"}}>
            <Button onClick={() => onSubmit} type="submit">
              Enviar
            </Button>
            <Button onClick={() => redirect("/auth/logout")}>Logout</Button>
          </Box>
        ) : (
          <Button onClick={() => redirect("/auth/login")}>Login</Button>
        )}
      </form>
    </FormControl>
  );

}
