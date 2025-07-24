import QuestionsForm from '@/components/CompraConsiente/QuestionsForm'
import { Container, Typography } from '@mui/material'
import React from 'react'

const Page = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h1" gutterBottom>
        Compra Consciente
      </Typography>
      


      <Typography sx={{marginBottom: 4}} variant="body1" gutterBottom>
        Responda as perguntas e clique em "Analisar Compra" para ver o resultado.
      </Typography>

    <QuestionsForm />

      
    </Container>
  )
}

export default Page
