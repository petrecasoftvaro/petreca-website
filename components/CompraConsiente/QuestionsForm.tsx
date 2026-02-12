"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Questions from "./Questions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NumericInput } from "@/components/ui/numeric-input";
import { Inputs } from "@/types/wiselyBuy";
import { titleCase } from "@/lib/Utils/commun";

type QuestionsFormProps = {
  onSubmit: SubmitHandler<Inputs>;
  resetForm: () => void;
  range: number;
  perUseCost: number;
  percentage: number;
};

const QuestionsForm: React.FC<QuestionsFormProps> = ({ onSubmit, resetForm, range, perUseCost, percentage }) => {
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  

  const defaultValues = Object.keys(Questions).reduce((acc, key) => {
    acc[key as keyof typeof Questions] = Questions[key as keyof typeof Questions].defaultValue;
    return acc;
  }, {} as Inputs);

  const feedBack = React.useMemo(() => {
    console.log("range", range);
    switch (range) {
      case 1:
        return (
          <div className="bg-destructive text-destructive-foreground p-4 rounded-lg">
            <p className="text-base mt-1">
              Caia fora, você não precisa comprar nada. Procure se distrair com
              outras coisas! 😉 
            </p>
          </div>
        );
      case 2:
        return (
          <div className="bg-yellow-500 text-yellow-950 p-4 rounded-lg">
            <p className="text-base mt-1">
              Melhor refletir mais, essa compra não parece um bom negócio! 🤔
            </p>
          </div>
        );
      case 3:
        return (
          <div className="bg-green-500 text-green-950 p-4 rounded-lg">
            <p className="text-base mt-1">
              Segundo nosso algoritmo, você vai fazer uma boa compra! 💰
            </p>
          </div>
        );
      default:
        return null;
    }
  }, [range]);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8">
          <div className="flex flex-col gap-4">
            {(Object.keys(Questions) as Array<keyof typeof Questions>).map(
              (key) => {
                const question = Questions[key];

                switch (question.type) {
                  case "string":
                    return (
                      <div key={key} className="space-y-2">
                        <Label htmlFor={key}>{question.title}</Label>
                        <Input
                          {...register(key, { required: question.required })}
                          id={key}
                        />
                      </div>
                    );

                  case "number":
                    return key === "price" ? (
                      <div key={key} className="space-y-2">
                        <Label htmlFor={key}>{question.title}</Label>
                        <NumericInput
                          {...register(key, { required: question.required })}
                          id={key}
                          decimalScale={2}
                          fixedDecimalScale
                          decimalSeparator=","
                          prefix="R$ "
                        />
                      </div>
                    ) : (
                      <div key={key} className="space-y-2">
                        <Label htmlFor={key}>{question.title}</Label>
                        <NumericInput
                          {...register(key, { required: question.required })}
                          id={key}
                          fixedDecimalScale
                          suffix={question.suffix || ""}
                        />
                      </div>
                    );
                  case "feelingType":
                    return (
                      <div key={key} className="space-y-2">
                        <Label htmlFor={key}>{question.title}</Label>
                        <Select
                          defaultValue="neutral"
                          value={watch(key) || "neutral"}
                          onValueChange={(value) => setValue(key, value)}
                        >
                          <SelectTrigger id={key}>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="good">Bem</SelectItem>
                            <SelectItem value="bad">Mal</SelectItem>
                            <SelectItem value="neutral">Neutro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    );

                  case "boolean":
                    return (
                      <div key={key} className="flex items-center space-x-2">
                        <Switch
                          {...register(key, { required: question.required })}
                          id={key}
                        />
                        <Label htmlFor={key} className="cursor-pointer">
                          {question.title}
                        </Label>
                      </div>
                    );
                  default:
                    return null;
                }
              }
            )}
            <Button className="mt-10" type="submit" variant="default">
              Analisar Compra
            </Button>
          </div>
        </div>
        <div className="md:col-span-4">
          <div className="flex flex-col gap-2 mb-2">
            {feedBack}
            <div className="p-4 bg-card rounded-lg">
              <h3 className="text-2xl font-bold mb-2 text-foreground">
                Resumo
              </h3>
              <p className="text-xs mb-2 text-muted-foreground">
                Nome
              </p>
              <h5 className="text-xl font-semibold mb-2 text-foreground">
                {titleCase(watch("name")?.toString())}
              </h5>
              
              <div className="flex flex-col gap-1 mt-2">
                <div>
                  <p className="text-xs mb-2 text-muted-foreground">
                    Custo total
                  </p>
                  <p className="text-base mt-1 text-foreground">
                    {watch("price") || "0,00"}
                  </p>
                </div>

                {perUseCost ? (
                  <div>
                    <p className="text-xs mb-2 text-muted-foreground">
                      Custo por uso
                    </p>
                    <p className="text-base mt-1 text-foreground">
                      R$ {perUseCost.toFixed(2)}
                    </p>
                  </div>
                ) : null}

                <p className="text-xs mb-2 text-muted-foreground">
                  Pontuação
                </p>
                <p className="text-base mt-1 text-foreground">
                  {percentage} de 100
                </p>
              </div>
            </div>
            <Button
              className="mt-10 w-full"
              type="submit"
              variant="default"
            >
              Analisar Compra
            </Button>

            <Button
              className="mt-10 w-full"
              type="button"
              variant="outline"
              onClick={() => {
                console.log(defaultValues);
                setValue("price", defaultValues.price);
                reset(defaultValues);
                resetForm();
              }}
            >
              Reset
            </Button>
            <p className="text-base mt-2 text-justify text-foreground">
              Desenvolvi esse sistema para ajudar as pessoas a tomarem decisões
              de compra mais conscientes, evitando compras por impulso. A ideia
              é que os usuários possam registrar seus desejos de compra e, após
              responder um questionario, dar maior visibilidade dos prós e
              contras. Assim, é possível refletir melhor se a compra é realmente
              conciente ou somente um impulso consumista.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default QuestionsForm;
