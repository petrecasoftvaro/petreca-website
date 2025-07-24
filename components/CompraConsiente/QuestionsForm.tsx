"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Questions from "./Questions";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import {
  FeelingType,
} from "@/types/wiselyBuy";
import { titleCase } from "@/lib/Utils/commun";
import { set } from "date-fns";
import { calculatePoints } from "@/lib/Utils/wiselyBuy";

type MapSchemaTypes = {
  string: string;
  number: number;
  boolean: boolean;
  feelingType: FeelingType;
};
type MapSchema<T extends Record<string, { type: keyof MapSchemaTypes }>> = {
  [K in keyof T]: MapSchemaTypes[T[K]["type"]];
};

type Inputs = MapSchema<typeof Questions>;

const QuestionsForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const theme = useTheme();
  const [perUseCost, setPerUseCost] = React.useState<number>(0);
  const [pointsSum, setPointsSum] = React.useState<number>(0);
  const [totalAvailablePoints, setTotalAvailablePoints] =
    React.useState<number>(0);
  const [percentage, setPercentage] = React.useState<number>(0);
  const [range, setRange] = React.useState<number>(0);

  const defaultValues = Object.keys(Questions).reduce((acc, key) => {
    acc[key as keyof typeof Questions] = Questions[key as keyof typeof Questions].defaultValue;
    return acc;
  }, {} as Inputs);

  useEffect(() => {
    const perc =
      totalAvailablePoints > 0 ? (100 / totalAvailablePoints) * pointsSum : 0;
    setPercentage(Math.round(perc));
    console.log(perc)
    setRange(perc > 75 ? 3 : perc > 50 ? 2 : perc > 0 && perc <= 50 ? 1 : 0);
  }, [pointsSum, totalAvailablePoints]);

  const feedBack = React.useMemo(() => {
    console.log("range", range);
    switch (range) {
      case 1:
        return (
          <Box
            sx={{
              backgroundColor: theme.palette.error.main,
              padding: 2,
              color: theme.palette.error.contrastText,
            }}
          >
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              Caia fora, você não precisa comprar nada. Procure se distrair com
              outras coisas! 😉 
            </Typography>
          </Box>
        );
      case 2:
        return (
          <Box
            sx={{
              backgroundColor: theme.palette.warning.main,
              padding: 2,
              color: theme.palette.warning.contrastText,
            }}
          >
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              Melhor refletir mais, essa compra não parece um bom negócio! 🤔
            </Typography>
          </Box>
        );
      case 3:
        return (
          <Box
            sx={{
              backgroundColor: theme.palette.success.main,
              padding: 2,
              color: theme.palette.success.contrastText,
            }}
          >
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              Segundo nosso algoritmo, você vai fazer uma boa compra! 💰
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  }, [range]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data", data);
    setPointsSum(0);
    setTotalAvailablePoints(0);
    Object.entries(data).forEach(([key, value]) => {
      const typeOfQuestion = Questions[key as keyof typeof Questions];
      if (typeOfQuestion.points > 0) {
        setTotalAvailablePoints((prev) => prev + typeOfQuestion.points);
      }
      if (key === "price") {
        const perUseCostValue = data.timesUsing
          ? Number((value as string).replace(/\D/g, "")) /
            Number((data.timesUsing as string).replace(/\D/g, ""))
          : Number(value);
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <FormGroup>
            <Stack spacing={4}>
              {(Object.keys(Questions) as Array<keyof typeof Questions>).map(
                (key) => {
                  const question = Questions[key];

                  switch (question.type) {
                    case "string":
                      return (
                        <TextField
                          {...register(key, { required: question.required })}
                          label={question.title}
                          variant="outlined"
                        />
                      );

                    case "number":
                      return key === "price" ? (
                        <NumericFormat
                          {...register(key, { required: question.required })}
                          customInput={TextField}                     
                          decimalScale={2}
                          fixedDecimalScale
                          decimalSeparator=","
                          prefix="R$ "
                          getInputRef={register(key).ref}
                          variant="outlined"
                          label={question.title}
                        />
                      ) : (
                        <NumericFormat
                          {...register(key, { required: question.required })}
                          customInput={TextField}
                          fixedDecimalScale
                          suffix=" x"
                          getInputRef={register(key).ref}
                          variant="outlined"
                          label={question.title}
                        />
                      );
                    case "feelingType":
                      return (
                        <FormControl fullWidth variant="outlined">
                          <InputLabel >
                            {question.title}
                          </InputLabel>
                          <Select                            
                            defaultValue={"neutral"}
                            value={watch(key) || ""}
                            label={question.title}
                            {...register(key, {
                              required: question.required,
                            })}
                          >
                            <MenuItem value={"good"}>Bem</MenuItem>
                            <MenuItem value={"bad"}>Mal</MenuItem>
                            <MenuItem value={"neutral"}>Neutro</MenuItem>
                          </Select>
                        </FormControl>
                      );

                    case "boolean":
                      return (
                        <FormControlLabel
                          control={<Switch />}
                          {...register(key, { required: question.required })}
                          label={question.title}
                        />
                      );
                    default:
                      return null;
                  }
                }
              )}
            </Stack>
          </FormGroup>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={2} sx={{ marginBottom: 2 }}>
            {feedBack}
            <Box sx={{ padding: 2, backgroundColor: "background.paper" }}>
              <Typography variant="h3" sx={{ marginBottom: 2 }}>
                Resumo
              </Typography>
              <Typography variant="caption" sx={{ marginBottom: 2 }}>
                Nome
              </Typography>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                {titleCase(watch("name")?.toString())}
              </Typography>
              
              <Stack spacing={1} sx={{ marginTop: 2 }}>
                <Box>
                  <Typography variant="caption" sx={{ marginBottom: 2 }}>
                    Custo total
                  </Typography>
                  <Typography variant="body1" sx={{ marginTop: 1 }}>
                    {watch("price") || "0,00"}
                  </Typography>
                </Box>

                {perUseCost ? (
                  <Box>
                    <Typography variant="caption" sx={{ marginBottom: 2 }}>
                      Custo por uso
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 1 }}>
                      R$ {perUseCost.toFixed(2)}
                    </Typography>
                  </Box>
                ) : null}

                <Typography variant="caption" sx={{ marginBottom: 2 }}>
                  Pontuação
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  {percentage} de 100
                </Typography>
              </Stack>
            </Box>
            <Button
              sx={{ marginTop: 10, width: "100%" }}
              type="submit"
              variant="contained"
            >
              Analisar Compra
            </Button>

            <Button
              sx={{ marginTop: 10, width: "100%" }}
              type="reset"
              variant="outlined"
              onClick={() => {
                console.log(defaultValues)
                setValue("price", defaultValues.price);
                reset(defaultValues);
              }}
            >
              Reset
            </Button>
            <Typography
              variant="body1"
              sx={{ marginTop: 2, textAlign: "justify" }}
            >
              Desenvolvi esse sistema para ajudar as pessoas a tomarem decisões
              de compra mais conscientes, evitando compras por impulso. A ideia
              é que os usuários possam registrar seus desejos de compra e, após
              responder um questionario, dar maior visibilidade dos prós e
              contras. Assim, é possível refletir melhor se a compra é realmente
              conciente ou somente um impulso consumista.1
              
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default QuestionsForm;
