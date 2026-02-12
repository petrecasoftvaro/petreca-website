'use client';
import Questions from '@/components/CompraConsiente/Questions';
import QuestionsFormV2 from '@/components/CompraConsiente/QuestionsFormV2';
import { calculatePoints } from '@/lib/Utils/wiselyBuy';
import { Inputs } from '@/types/wiselyBuy';
import React, { useEffect } from 'react'

const Page = () => {

  const [perUseCost, setPerUseCost] = React.useState<number>(0);
  const [pointsSum, setPointsSum] = React.useState<number>(0);
  const [totalAvailablePoints, setTotalAvailablePoints] =
    React.useState<number>(0);
  const [percentage, setPercentage] = React.useState<number>(0);
  const [range, setRange] = React.useState<number>(0);
  const [formResetHash, setFormResetHash] = React.useState(0);

  const resetForm = () => {
    setFormResetHash((prev) => prev + 1);
    setPerUseCost(0);
    setPointsSum(0);
    setTotalAvailablePoints(0);
  };

    useEffect(() => {
    const perc =
      totalAvailablePoints > 0 ? (100 / totalAvailablePoints) * pointsSum : 0;
    setPercentage(Math.round(perc));
    console.log(perc)
    setRange(perc > 75 ? 3 : perc > 50 ? 2 : perc > 0 && perc <= 50 ? 1 : 0);
  }, [pointsSum, totalAvailablePoints]);

  const handleSubmit = (data: Inputs) => {
    setPointsSum(0);
    setTotalAvailablePoints(0);

    Object.entries(data).forEach(([key, value]) => {
      const typeOfQuestion = Questions[key as keyof typeof Questions];
      if (typeOfQuestion.points > 0) {
        setTotalAvailablePoints((prev) => prev + typeOfQuestion.points);
      }
      if (key === "price") {
        const monthlyUsage = Number((data.timesUsing as string).replace(/\D/g, ""));
        const durability = Number((data.durability as string).replace(/\D/g, ""));
        const totalUsage = monthlyUsage * 12 * durability;
        const moneyValue = Number((value as string).replace(/\D/g, "")) / 100;
        console.log(moneyValue)
        console.log('monthlyUsage:', monthlyUsage, 'durability:', durability);
        const perUseCostValue = monthlyUsage > 0 && durability > 0
          ? moneyValue / totalUsage
          : 0;
        console.log('perUseCostValue:', perUseCostValue);
        setPerUseCost(perUseCostValue);
        return;
      } else if (key === "timesUsing") {
        return;
      } else if (
        typeOfQuestion.type === "boolean" ||
        typeOfQuestion.type === "feelingType"
      ) {
        const poit =
        calculatePoints(typeOfQuestion, value) || 0;
        console.log(`poit ${key}: ${poit} - value: ${value}`);
        setPointsSum((prev) => prev + poit);
      }
    });
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 mt-2">
      <h1 className="text-4xl font-bold mb-4 text-foreground">
        Compra Consciente
      </h1>
      

      <p className="mb-4 text-base text-foreground">
        Responda as perguntas e clique em "Analisar Compra" para ver o resultado.
      </p>

    <QuestionsFormV2 onSubmit={handleSubmit} resetForm={resetForm}  range={range} perUseCost={perUseCost} percentage={percentage} />

    </div>
  )
}

export default Page
