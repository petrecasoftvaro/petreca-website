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
import React, { useEffect, useRef } from "react";
import { Star, Flame, Heart, Zap, Diamond, Moon, Leaf, Sun } from "lucide-react";

const ICONS = [Star, Flame, Heart, Zap, Diamond, Moon, Leaf, Sun];

const hsl = (index: number, total: number) =>
  `hsl(${(index + 1) * (360 / total)}, 55%, 52%)`;

type DragSource = { type: "chip" | "slot"; index: number };

const MatchColors = () => {
  const [dificulty, setDifficulty] = React.useState(3);
  const [template, setTemplate] = React.useState<
    Array<{ guess: number | null; number: number }>
  >([]);
  const [guesses, setGuesses] = React.useState<number[][]>([]);
  const [endGame, setEndGame] = React.useState(false);
  const [dragOver, setDragOver] = React.useState<number | null>(null);

  const dragSource = useRef<DragSource | null>(null);
  const touchGhost = useRef<HTMLDivElement | null>(null);

  const shuffleGame = React.useCallback(() => {
    const shuffled: number[] = shuffle(
      Array.from({ length: dificulty }, (_, i) => i)
    );
    setTemplate(
      Array.from({ length: dificulty }, (_, i) => ({
        guess: null,
        number: shuffled[i],
      }))
    );
  }, [dificulty]);

  useEffect(() => {
    shuffleGame();
  }, [shuffleGame]);

  const handleRestart = () => {
    setEndGame(false);
    setGuesses([]);
    shuffleGame();
  };

  const dropOnSlot = (slotIndex: number) => {
    const src = dragSource.current;
    if (!src) return;

    setTemplate((prev) => {
      const next = [...prev];
      if (src.type === "chip") {
        const chipIdx = src.index;
        const alreadyAt = next.findIndex((t) => t.guess === chipIdx);
        if (alreadyAt !== -1) next[alreadyAt] = { ...next[alreadyAt], guess: null };
        next[slotIndex] = { ...next[slotIndex], guess: chipIdx };
      } else {
        const fromIdx = src.index;
        if (fromIdx === slotIndex) return prev;
        const fromGuess = next[fromIdx].guess;
        const toGuess = next[slotIndex].guess;
        next[fromIdx] = { ...next[fromIdx], guess: toGuess };
        next[slotIndex] = { ...next[slotIndex], guess: fromGuess };
      }
      return next;
    });

    dragSource.current = null;
    setDragOver(null);
  };

  const handleGuess = () => {
    const current = template.map((t) => t.guess!);
    const next = [...guesses, current];
    setGuesses(next);
    if (current.filter((v, i) => v === template[i].number).length === dificulty) {
      setEndGame(true);
    }
  };

  const createGhost = (color: string, x: number, y: number) => {
    const ghost = document.createElement("div");
    ghost.style.cssText = `
      position:fixed; width:48px; height:48px; border-radius:8px;
      background:${color}; opacity:0.85; pointer-events:none;
      left:${x - 24}px; top:${y - 24}px; z-index:9999;
      transition: transform 0.05s;
    `;
    document.body.appendChild(ghost);
    touchGhost.current = ghost;
  };

  const moveGhost = (x: number, y: number) => {
    if (touchGhost.current) {
      touchGhost.current.style.left = `${x - 24}px`;
      touchGhost.current.style.top = `${y - 24}px`;
    }
  };

  const removeGhost = () => {
    touchGhost.current?.remove();
    touchGhost.current = null;
  };

  const getSlotAtPoint = (x: number, y: number): number | null => {
    const els = document.elementsFromPoint(x, y);
    for (const el of els) {
      const idx = (el as HTMLElement).dataset.slotIndex;
      if (idx !== undefined) return Number(idx);
    }
    return null;
  };

  const isValid = template.length > 0 && template.every((t) => t.guess !== null);
  const colStyle = { gridTemplateColumns: `repeat(${dificulty}, 1fr)` };

  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-end gap-4">
        <div className="space-y-2">
          <Label htmlFor="dificuldade">Dificuldade</Label>
          <Select
            value={dificulty.toString()}
            onValueChange={(v) => setDifficulty(Number(v))}
          >
            <SelectTrigger id="dificuldade" className="w-48">
              <SelectValue />
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
        <Button variant="outline" onClick={handleRestart} className="self-end">
          Reiniciar
        </Button>
        {endGame && (
          <p className="text-sm text-muted-foreground">
            Parabéns! {guesses.length} tentativa{guesses.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: dificulty }, (_, i) => {
          const used = template.some((t) => t.guess === i);
          const color = hsl(i, dificulty);
          return (
            <div
              key={i}
              draggable={!used}
              className="rounded-md select-none flex items-center justify-center"
              style={{
                width: 48, height: 48,
                background: color,
                opacity: used ? 0.25 : 1,
                cursor: used ? "default" : "grab",
                touchAction: "none",
              }}
              onDragStart={() => { dragSource.current = { type: "chip", index: i }; }}
              onDragEnd={() => { dragSource.current = null; setDragOver(null); }}
              onTouchStart={(e) => {
                if (used) return;
                dragSource.current = { type: "chip", index: i };
                const t = e.touches[0];
                createGhost(color, t.clientX, t.clientY);
              }}
              onTouchMove={(e) => {
                e.preventDefault();
                moveGhost(e.touches[0].clientX, e.touches[0].clientY);
              }}
              onTouchEnd={(e) => {
                removeGhost();
                const t = e.changedTouches[0];
                const slotIdx = getSlotAtPoint(t.clientX, t.clientY);
                if (slotIdx !== null) dropOnSlot(slotIdx);
                else dragSource.current = null;
              }}
            >
              {React.createElement(ICONS[i % ICONS.length], {
                size: 20,
                color: "rgba(255,255,255,0.85)",
                strokeWidth: 1.5,
                style: { pointerEvents: "none" },
              })}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        Arraste os cards para os slots abaixo
      </p>

      <div className="grid gap-2" style={colStyle}>
        {template.map((item, i) => {
          const filled = item.guess !== null;
          const color = filled ? hsl(item.guess!, dificulty) : undefined;
          const isOver = dragOver === i;
          return (
            <div
              key={i}
              data-slot-index={i}
              draggable={filled}
              className="rounded-md select-none flex items-center justify-center"
              style={{
                height: 72,
                background: isOver
                  ? "var(--color-border-secondary)"
                  : color ?? "transparent",
                border: filled && !isOver ? "none" : `2px dashed ${isOver ? "var(--color-border-primary)" : "var(--color-border)"}`,
                cursor: filled ? "grab" : "default",
                position: "relative",
                transition: "background 0.1s",
                touchAction: "none",
              }}
              onDragStart={() => {
                if (!filled) return;
                dragSource.current = { type: "slot", index: i };
              }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(i); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={() => dropOnSlot(i)}
              onDragEnd={() => { dragSource.current = null; setDragOver(null); }}
              onTouchStart={(e) => {
                if (!filled) return;
                dragSource.current = { type: "slot", index: i };
                const t = e.touches[0];
                createGhost(color!, t.clientX, t.clientY);
              }}
              onTouchMove={(e) => {
                e.preventDefault();
                moveGhost(e.touches[0].clientX, e.touches[0].clientY);
              }}
              onTouchEnd={(e) => {
                removeGhost();
                const t = e.changedTouches[0];
                const slotIdx = getSlotAtPoint(t.clientX, t.clientY);
                if (slotIdx !== null) dropOnSlot(slotIdx);
                else dragSource.current = null;
              }}
            >
              {filled && React.createElement(ICONS[item.guess! % ICONS.length], {
                size: 28,
                color: "rgba(255,255,255,0.85)",
                strokeWidth: 1.5,
                style: { pointerEvents: "none" },
              })}
            </div>
          );
        })}
      </div>

      <Button
        disabled={!isValid || endGame}
        variant="default"
        className="w-full"
        onClick={handleGuess}
      >
        Confirmar
      </Button>

      {guesses.length > 0 && (
        <div className="flex flex-col gap-2">
          {[...guesses].reverse().map((guess, gi) => {
            const hits = guess.filter((v, i) => v === template[i].number).length;
            const isLatest = gi === 0;
            return (
              <div
                key={gi}
                className="flex items-center gap-2 rounded-md"
                style={isLatest ? {
                  border: "2px solid var(--color-brand)",
                  borderRadius: 8,
                  padding: "6px 8px",
                } : {
                  padding: "6px 8px",
                }}
              >
                <div className="grid gap-1 flex-1" style={colStyle}>
                  {guess.map((colorIdx, ci) => (
                    <div
                      key={ci}
                      className="rounded-sm flex items-center justify-center text-xs font-medium"
                      style={{
                        height: 32,
                        background: hsl(colorIdx, dificulty),
                        color: "rgba(255,255,255,0.85)",
                      }}
                    >
                      {colorIdx + 1}
                    </div>
                  ))}
                </div>
                <span
                  className="w-20 shrink-0 text-right"
                  style={isLatest ? {
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--color-text-primary)",
                  } : {
                    fontSize: 12,
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  {hits}/{dificulty} acertos
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MatchColors;
