import { FeelingType, QuestionsType } from '@/types/wiselyBuy';

const Questions: QuestionsType = {
  name: {type: 'string' as const, required: true, title: 'O que é?', points: 0, defaultValue: ''},
  price: {type: 'number' as const, required: true, title: 'Quanto custa?', points: 0, defaultValue: '' },
  timesUsing: {type: 'number' as const, required: false, title: 'Quantas vezes vai usar no mês?', points: 0, defaultValue: '' },
  isImpulse: {type: 'boolean' as const, required: false, title: ' É uma compra planejada?', points: 1, defaultValue: false },
  isNeeded: {type: 'boolean' as const, required: false, title: 'Consigo viver sem isso?', points: -1, defaultValue: false },
  isOftenNeeded: {type: 'boolean' as const, required: false, title: 'Vai ser útil com frequência ?', points: 3, defaultValue: false },
  thereIsSomethingSimilar: {type: 'boolean' as const, required: false, title: 'Tenho algo parecido que já cumpre essa função?', points: -2, defaultValue: false },
  canIpay: {type: 'boolean' as const, required: false, title: 'Posso pagar sem comprometer o orçamento?', points: 1, defaultValue: false },
  insideBudget: {type: 'boolean' as const, required: false, title: 'O valor está dentro da minha margem de gastos pessoais?', points: 1, defaultValue: false },
  willGenerateFutureCosts: {type: 'boolean' as const, required: false, title: 'Vai me gerar custos futuros (manutenção, acessórios, energia etc.)?', points: -1, defaultValue: false },
  stillWantIn30Days: {type: 'boolean' as const, required: false, title: 'Ainda vou querer isso daqui a 30 dias?', points: 1, defaultValue: false },
  tenMinutesLater: {type: 'feelingType' as const, required: false, title: 'Como vou me sentir com essa compra em 10 minutos?', points: 1, defaultValue: 'neutral' },
  tenMonthsLater: {type: 'feelingType' as const, required: false, title: 'Como vou me sentir com essa compra em 10 meses?', points: 1, defaultValue: 'neutral' },
  tenYearsLater: {type: 'feelingType' as const, required: false, title: 'Como vou me sentir com essa compra em 10 anos?', points: 1, defaultValue: 'neutral' },
  // costPerUse: {type: 'string' as const, required: false, title: 'Qual o custo por uso estimado? (valor ÷ nº de usos)', points: 1, defaultValue: ''},
  isWorthIt: {type: 'boolean' as const, required: false, title: 'O benefício que isso traz é maior que o valor pago?', points: 2, defaultValue: false },
  hasCheaperOptions: {type: 'boolean' as const, required: false, title: 'Tem versões mais baratas, usadas ou emprestáveis?', points: -1, defaultValue: false },
  betterSolution: {type: 'boolean' as const, required: false, title: 'Existe uma solução melhor para o mesmo problema?', points: 1, defaultValue: false },
} 



export default Questions;