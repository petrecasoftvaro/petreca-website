"use client";
import { shuffle } from "@/lib/Utils/game";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useMemo, useEffect } from "react";

const MatchColors = () => {
  const [dificulty, setDifficulty] = React.useState(3);
  const [template, setTemplate] = React.useState<
    Array<{ guess: number | null; number: number }>
  >([]);
  const [isValid, setIsValid] = React.useState(false);
  const [guesses, setGuesses] = React.useState<number[][]>([]);
  const [endGame, setEndGame] = React.useState(false);

  const handleDifficultyChange = (value: string) => {
    setDifficulty(Number(value));
  };

  const shuffleGame = React.useCallback(() => {
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
  }, [dificulty]);

  useEffect(() => {
    shuffleGame();
  }, [shuffleGame]);

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
        <div key={index} className={`col-span-${Math.round(blockSize)}`}>
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: guessColor }}
          >
            <Select
              value={template[index].guess?.toString() || ""}
              onValueChange={(value) =>
                handleBlockChange(index, Number(value))
              }
            >
              <SelectTrigger className="w-full" id={blockId}>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                {template.map((item, itemIndex) => {
                  return (
                    <SelectItem key={itemIndex} value={itemIndex.toString()}>
                      {template[itemIndex].guess == itemIndex 
                        ? `(${itemIndex + 1})`
                        : itemIndex + 1}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
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
    <div className="flex flex-col gap-4 mt-2 mb-2">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4">
          <div className="w-full space-y-2">
            <Label htmlFor="dificuldade">Dificuldade</Label>
            <Select
              value={dificulty.toString()}
              onValueChange={handleDifficultyChange}
            >
              <SelectTrigger id="dificuldade" className="w-full">
                <SelectValue placeholder="Selecione a dificuldade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">Muito Fácil</SelectItem>
                <SelectItem value="4">Fácil</SelectItem>
                <SelectItem value="5">Médio</SelectItem>
                <SelectItem value="6">Difícil</SelectItem>
                <SelectItem value="7">Muito Difícil</SelectItem>
                <SelectItem value="8">Extremamente Difícil</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="md:col-span-6 flex justify-center items-center bg-card">
          {endGame && (
            <p className="text-base text-foreground">
              Você finalizou o jogo com {guesses.length} tentativas
            </p>
          )}
        </div>
        <div className="md:col-span-2 flex justify-start">
          <Button
            variant="default"
            onClick={handleRestart}
            className="w-full"
          >
            Reiniciar
          </Button>
        </div>
      </div>

      <div className="p-4 bg-card rounded-lg">
        {guesses.map((guess, guessIndex) => (
          <div
            key={guessIndex}
            className="mb-4 mt-4 bg-card grid grid-cols-12 gap-1 md:gap-2"
          >
            {guess.map((number, nIndex) => (
              <div
                key={nIndex}
                className="col-span-1"
                style={{
                  backgroundColor: `hsl(${
                    (number + 1) * (360 / template.length)
                  }, 50%, 50%)`,
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-foreground">
                  {number + 1}
                </div>
              </div>
            ))}
            <div className="col-span-2">
              <p className="text-base text-center text-foreground">
                {
                  guess.filter((item, index) => item === template[index].number)
                    .length
                }{" "}
                Acertos
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-1 md:gap-2">
        {blocks}
        <div className="col-span-2 flex justify-center">
          {!endGame ? (
            <Button
              disabled={!isValid}
              variant="default"
              className="w-full"
              onClick={handleGuess}
            >
              Confirmar
            </Button>
          ) : (
            <p className="text-base text-center text-foreground">
              Parabéns! Você acertou a sequência!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchColors;
