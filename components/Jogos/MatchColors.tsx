"use client";
import { shuffle } from "@/lib/Utils/game";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  SelectChangeEvent,
  Button,
  Typography,
} from "@mui/material";
import React, { use, useMemo } from "react";

const MatchColors = () => {
  const [dificulty, setDifficulty] = React.useState(3);
  const [template, setTemplate] = React.useState<
    Array<{ guess: number | null; number: number }>
  >([]);
  const [isValid, setIsValid] = React.useState(false);
  const [guesses, setGuesses] = React.useState<number[][]>([]);
  const [endGame, setEndGame] = React.useState(false);

  const handleDifficultyChange = (event: SelectChangeEvent<number>) => {
    setDifficulty(Number(event.target.value));
  };

  const shuffleGame = () => {
    const shuffleArray: number[] = shuffle(
      Array.from({ length: dificulty }, (_, i) => i)
    );
    const array: Array<{ guess: number | null; number: number }> = Array.from(
      { length: dificulty },
      (_, index) => {
        return { guess: null, number: shuffleArray[index] };
      }
    );
    console.log("array", array);
    setTemplate(array);
  };

  useMemo(() => {
    shuffleGame();
  }, [dificulty]);

  const handleBlockChange = (index: number, value: number) => {
    const taken = template.findIndex((item) => item.guess === value);

    setTemplate((prev) => {
      const newTemplate = [...prev];
      newTemplate[index] = { ...newTemplate[index], guess: value };
      if (taken !== -1 && taken !== index) {
        newTemplate[taken] = { ...newTemplate[taken], guess: null };
      }
      return newTemplate;
    });
  };

  const blocks = useMemo(() => {
    const blockSize = 10 / template.length;
    return Array.from({ length: template.length }, (_, index) => {
      const blockId = `bloco-${index}`;
      const guessColorRange = template[index].guess;
      const guessColor =
        guessColorRange !== null
          ? `hsl(${(guessColorRange + 1) * (360 / template.length)}, 50%, 50%)`
          : "transparent";

      setIsValid(template.every((item) => item.guess !== null));
      return (
        <Grid size={blockSize} key={index}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: guessColor,
            }}
          >
            <FormControl sx={{ width: "100%" }} variant="filled">
              <Select
                labelId={blockId}
                id={blockId}
                value={template[index].guess?.toString() || ""}
                onChange={(e) =>
                  handleBlockChange(index, Number(e.target.value))
                }
              >
                {template.map((item, itemIndex) => {
                  console.log("itemIndex", itemIndex);
                  console.log("template[itemIndex].guess", template[itemIndex].guess);
                  return (
                    <MenuItem key={itemIndex} value={itemIndex}>
                      <Box>
                        {template[itemIndex].guess == itemIndex 
                          ? `(${itemIndex + 1})`
                          : itemIndex + 1}
                      </Box>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      );
    });
  }, [template]);

  const handleGuess = () => {
    const guess = [...guesses, template.map((item) => item.guess!)];
    setGuesses(guess);
    const acertos = guess[guess.length - 1].filter(
      (item, index) => item === template[index].number
    ).length;
    if (acertos === template.length) {
      setEndGame(true);
    }
  };

  const handleRestart = () => {
    setEndGame(false);
    setGuesses([]);
    shuffleGame();
  };

  return (
    <Stack spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ width: "100%" }}>
            <FormControl variant="filled" sx={{ width: "100%" }}>
              <InputLabel id="dificuldade">Dificuldade</InputLabel>
              <Select
                labelId="dificuldade-label"
                id="dificuldade"
                value={dificulty}
                sx={{ width: "100%" }}
                onChange={(e) => handleDifficultyChange(e)}
              >
                <MenuItem value={3}>Muito Fácil</MenuItem>
                <MenuItem value={4}>Fácil</MenuItem>
                <MenuItem value={5}>Médio</MenuItem>
                <MenuItem value={6}>Difícil</MenuItem>
                <MenuItem value={7}>Muito Difícil</MenuItem>
                <MenuItem value={8}>Extremamente Difícil</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "background.paper",
          }}
        >
          {endGame ? (
            <Typography variant="body1" sx={{}}>
              {endGame &&
                `Você finalizou o jogo com ${guesses.length} tentativas`}
            </Typography>
          ) : (
            <> </>
          )}
        </Grid>
        <Grid
          size={{ xs: 12, md: 2 }}
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleRestart}
            sx={{ width: "100%" }}
          >
            Reiniciar
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ padding: 2, backgroundColor: "background.paper" }}>
        {guesses.map((guess, guessIndex) => (
          <Grid
            sx={{
              marginBottom: 2,
              backgroundColor: "background.paper",
              marginTop: 2,
            }}
            container
            spacing={{ xs: 1, md: 2 }}
            key={guessIndex}
            columns={12}
          >
            {guess.map((number, nIndex) => (
              <Grid size={10 / template.length} key={nIndex}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: `hsl(${
                      (number + 1) * (360 / template.length)
                    }, 50%, 50%)`,
                  }}
                >
                  {number + 1}
                </Box>
              </Grid>
            ))}
            <Grid size={2}>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                {
                  guess.filter((item, index) => item === template[index].number)
                    .length
                }{" "}
                Acertos
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
      <Grid container spacing={{ xs: 1, md: 2 }} columns={12}>
        {blocks}
        <Grid size={2} sx={{ display: "flex", justifyContent: "center" }}>
          {!endGame ? (
            <Button
              disabled={!isValid}
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
              onClick={handleGuess}
            >
              Confirmar
            </Button>
          ) : (
            <>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                Parabéns! Você acertou a sequência!
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default MatchColors;
