import MatchColors from "@/components/Jogos/MatchColors";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

export default function Contact() {
  return (
    <Container sx={{ width: "100%", paddingLeft: 0 }}>
      <Stack spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
        <Typography variant="h2" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          Jogo de acerto
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          O objetivo deste jogo é tentar descobrir a sequência correta de cores. A cada tentativa você recebe um feedback de quantas cores estão na posição correta.
        </Typography>
        <MatchColors />
      </Stack>
    </Container>
  );
}
