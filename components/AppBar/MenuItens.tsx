'use client';
import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const MenuItens = () => {
  return (
    <div>
      <Link href="/posts" passHref>
        <Button
          variant="text"
          color="info"
          size="medium"
          sx={{ minWidth: 0 }}
        >
          Blog
        </Button>
      </Link>
      <Link href="/jogos" passHref>
        <Button
          variant="text"
          color="info"
          size="medium"
          sx={{ minWidth: 0 }}
        >
          Jogos
        </Button>
      </Link>
      <Link href="/compra-consciente" passHref>
        <Button
          variant="text"
          color="info"
          size="medium"
          sx={{ minWidth: 0 }}
        >
          Compra Consciente
        </Button>
      </Link>
    </div>
  )
}

export default MenuItens
