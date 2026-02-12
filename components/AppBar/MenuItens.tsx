'use client';
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import React from 'react'

const MenuItens = () => {
  return (
    <div className="flex items-center gap-1 ml-6">
      <Button variant="ghost" asChild>
        <Link href="/posts">Blog</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/jogos">Jogos</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/compra-consciente">Compra Consciente</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/pedal">Gerador Pedal</Link>
      </Button>
    </div>
  )
}

export default MenuItens
