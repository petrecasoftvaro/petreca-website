"use client"
import { useForm, Controller } from "react-hook-form";
import {
    Field,
    FieldLabel,
  } from "@/components/ui/field"
  import {
    Input
  } from "@/components/ui/input"
import { Calendar24 } from "../Comment/Calendar24";
import { useMemo, useState } from "react";
import { NumericInput } from "../ui/numeric-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { WhatsappIcon } from "../ui/social-icons";

const START_POINTS_STORAGE_KEY = "pedal-start-points"
const DEFAULT_START_POINTS = [
    "Posto Santa Marta",
    "Rodoviaria",
    "Praça do ciclista"
]
const DEFAULT_BICYCLISTS = [
    "Beça",
    "Daiane",
    "Diego",
    "Elida",
    "Guina",
    "Henrique",
    "J. Martins",
    "Leandro",
    "Márcia",
    "Patricia",
    "Uka",
    "Valdir",
    "Viviane",
    "VK",
]

interface IFormInput {
    dateTime: Date,
    startPoint: string,
    distance: number | null,
    elevation: number | null,
    destiny: string | null,
    route: string | null
  }

export default function Pedal() {
    const nextSaturday = new Date()
    nextSaturday.setDate(nextSaturday.getDate() + ((6 - nextSaturday.getDay()) % 7))
    nextSaturday.setHours(6, 30, 0, 0)
    const { control, watch, setValue } = useForm<IFormInput>({
        defaultValues: {
            dateTime: nextSaturday,
            startPoint: "",
            distance: null,
            elevation: null,
            destiny: null,
            route: null
        }
    })

    const dateTime = watch('dateTime')
    const startPoint = watch('startPoint')
    const distance = watch('distance')
    const elevation = watch('elevation')
    const destiny = watch('destiny')
    const route = watch('route')

    const [startPointList, setStartPointList] = useLocalStorage<string[]>(
        START_POINTS_STORAGE_KEY,
        DEFAULT_START_POINTS
    )
    const [newStartPoint, setNewStartPoint] = useState("")
    const [selectedBicyclists, setSelectedBicyclists] = useState<string[]>([])

    const toggleBicyclist = (name: string) => {
        setSelectedBicyclists((prev) =>
            prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
        )
    }

    const addStartPoint = () => {
        const trimmed = newStartPoint.trim()
        if (!trimmed || startPointList.includes(trimmed)) return
        const next = [...startPointList, trimmed]
        setStartPointList(next)
        setValue("startPoint", trimmed)
        setNewStartPoint("")
    }

    const formatDate = (date: Date | undefined) =>
        date?.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "America/Sao_Paulo",
        })

    const formatTime = (date: Date | undefined) =>
        date?.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "America/Sao_Paulo",
        })

    const composedMessageText = useMemo(() => {
        const participants = selectedBicyclists
            .map((name, index) => `${index + 1} - ${name}`)
            .join("\n")
        return `PEDAL LONGÃO DE SÁBADO 🚴‍♂

📅 *Data:* ${formatDate(dateTime)}
📍 *Local Partida:* ${startPoint || ""}
⏰ *Horário:* ${formatTime(dateTime)}
📏 *Distância:* ${distance || 0} Km
⛰ *Altimetria:* ${elevation || 0} m
🏁 *Destino:* ${destiny || ""}
🛤 *Trajeto:* ${route || ""}

Todos estão convidados

✅ Participantes Confirmados:

${participants}`
    }, [dateTime, startPoint, distance, elevation, destiny, route, selectedBicyclists])

    const composedMessage = useMemo(() => (
        <div className="space-y-2">
            <p className="font-semibold">PEDAL LONGÃO DE SÁBADO 🚴‍♂</p>
            <div className="space-y-1">
                <p>📅 *Data:* {formatDate(dateTime)}</p>
                <p>⏰ *Horário:* {formatTime(dateTime)}</p>
                <p>📍 *Local Partida:* {startPoint}</p>
                <p>📏 *Distância:* {distance} Km</p>
                <p>⛰ *Altimetria:* {elevation} m</p>
                <p>🏁 *Destino:* {destiny}</p>
                <p>🛤 *Trajeto:* {route}</p>
            </div>
            <p>Todos estão convidados</p>
            <p>✅ Participantes Confirmados:</p>
            <div className="flex flex-col gap-1 pt-2">
                {selectedBicyclists.map((name, index) => (
                    <p key={index} className="text-sm">{index + 1} - {name}</p>
                ))}
            </div>
        </div>
    ), [dateTime, startPoint, distance, elevation, destiny, route, selectedBicyclists])

    return (
        <div>
                
            <Field className="my-10">
                <Controller
                    name={'dateTime'}
                    control={control}
                    render={({ field }) => (
                        <Calendar24 onChange={field.onChange} value={field.value} />
                    )}/>
                                        
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
                <Field> 
                    <FieldLabel htmlFor="startPoint">Local de Partida</FieldLabel>
                    <Controller
                        name={'startPoint'}
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value ?? ''}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Preencha o local de partida" />
                                </SelectTrigger>
                                <SelectContent>
                                    {startPointList.map((item) => (
                                        <SelectItem key={item} value={item}>{item}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}/>
                </Field>
                <Field>
                    <FieldLabel htmlFor="newStartPoint">Adicionar novo local</FieldLabel>
                    <div className="flex gap-2">
                        <Input
                            id="newStartPoint"
                            placeholder="Nome do local..."
                            value={newStartPoint}
                            onChange={(e) => setNewStartPoint(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault()
                                    addStartPoint()
                                }
                            }}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addStartPoint}
                            disabled={!newStartPoint.trim()}
                        >
                            Adicionar
                        </Button>
                    </div>
                </Field>
            </div>
            

            <Field className="my-10">
                <FieldLabel htmlFor="distance">Distância (Km)</FieldLabel>
                <Controller
                    name={'distance'}
                    control={control}
                    render={({ field }) => (
                        <NumericInput value={field.value as number | null} onValueChange={(values) => {
                            field.onChange(values.value);
                        }} />
                    )}/>
            </Field>

            <Field className="my-10">
                <FieldLabel htmlFor="elevation">Altimetria (m)</FieldLabel>
                <Controller
                    name={'elevation'}
                    control={control}
                    render={({ field }) => (
                        <NumericInput value={field.value as number | null} onValueChange={(values) => {
                            field.onChange(values.value);
                        }} />
                    )}/>
            </Field>

            <Field className="my-10">
                <FieldLabel htmlFor="destiny">Destino</FieldLabel>
                <Controller
                    name={'destiny'}
                    control={control}
                    render={({ field }) => (
                        <Input
                            placeholder="Preencha o destino"
                            {...field}
                            value={field.value ?? ''}
                        />
                    )}/>
            </Field>

            <Field className="my-10">
                <FieldLabel htmlFor="route">Trajeto</FieldLabel>
                <Controller
                    name={'route'}
                    control={control}
                    render={({ field }) => (
                        <Input
                            placeholder="Preencha o trajeto"
                            {...field}
                            value={field.value ?? ''}
                        />
                    )}/>
            </Field>

            <Field className="my-10">
                <FieldLabel htmlFor="bicyclists">Participantes <i>(em ordem alfabética)</i></FieldLabel>
                <div className="grid grid-cols-3 md:grid-cols-8 gap-4 pt-2">
                    {DEFAULT_BICYCLISTS.map((name) => (
                        <label
                            key={name}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={selectedBicyclists.includes(name)}
                                onChange={() => toggleBicyclist(name)}
                                className="h-4 w-4 rounded border-input accent-primary"
                            />
                            <span className="text-sm">{name}</span>
                        </label>
                    ))}
                </div>
            </Field>

            <div className="flex my-10 space-y-4 border border-input rounded-md p-4">
                {composedMessage}
            </div>

            <div className="flex gap-2 justify-center">    
                <Button type="button" variant="outline" onClick={() => {
                    window.open(`https://wa.me/?text=${encodeURIComponent(composedMessageText)}`, '_blank')
                }}>
                <WhatsappIcon /> Enviar por WhatsApp
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                    navigator.clipboard.writeText(composedMessageText)
                }}>
                    Copiar texto
                </Button>
            </div>

        </div>
    )
}
