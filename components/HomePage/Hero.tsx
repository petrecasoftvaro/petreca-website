import { Box, Container, IconButton, Typography } from "@mui/material";
import { GitHub, LinkedIn, Instagram } from "@mui/icons-material";
import Image from "next/image";

export default function Hero() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: { xs: 8, sm: 10 },
        pb: { xs: 8, sm: 12 },
      }}
    >
      <Image
        src="/images/leandro.jpeg"
        alt="Imagem de Leandro Petreca"
        width={300}
        height={300}
        loading="lazy"
        style={{
          borderRadius: "50%",
          marginBottom: "1rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      ></Image>

      <Typography gutterBottom variant="h1" component="div">
        Seja bem vindo
      </Typography>

      <Typography variant="body1" component="div" sx={{ textAlign: "center" }}>
        Olá, eu sou Leandro Petreca, um desenvolvedor apaixonado por criar
        experiências digitais incríveis. Neste blog, compartilho minhas
        descobertas, aprendizados e insights sobre desenvolvimento web,
        tecnologia e muito mais.
      </Typography>
      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <IconButton
          target="blank"
          aria-label="GitHub"
          href="https://github.com/petrecasoftvaro"
        >
          <GitHub />
        </IconButton>
        <IconButton
          target="blank"
          aria-label="Instagram"
          href="https://www.instagram.com/kurt_jonnes"
        >
          <Instagram />
        </IconButton>

        <IconButton
          target="blank"
          aria-label="LinkedIn"
          href="https://www.linkedin.com/in/leandropetreca"
        >
          <LinkedIn />
        </IconButton>
      </Box>
    </Container>
  );
}
