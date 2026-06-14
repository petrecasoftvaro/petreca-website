# Especificações de Estilo — petreca.com

Referência de design system para uso em sessões do Claude Code. Qualquer alteração visual deve seguir este documento.

---

## Tipografia

| Função | Fonte | Variável CSS |
|---|---|---|
| Corpo e UI | DM Sans | `--font-dm-sans` → `font-sans` |
| Detalhes técnicos, datas, tags, código inline | JetBrains Mono | `--font-jb-mono` → `font-mono` |

Ambas carregadas via `next/font/google` em `app/layout.tsx`.

**Escala tipográfica:**
- Títulos de página: `text-3xl font-medium tracking-tight`
- Nome no hero: `text-4xl font-medium tracking-tight`
- Título de post: `text-3xl font-medium tracking-tight`
- Subtítulos de seção: `text-xs font-medium tracking-widest uppercase` (sempre em caixa alta)
- Corpo: `text-base leading-relaxed`
- Tags mono: `font-mono text-[10px] tracking-widest uppercase`
- Datas mono: `font-mono text-[10px]`
- Links de navegação: `font-mono text-xs`

---

## Paleta de Cores

### Acento principal
```
#B52535  — vermelho quente (wine/carmim)
```
Usado em: logo, tagline mono, links CTA, setas, tags de projeto, bordas de destaque, `← voltar`, blockquotes.

### Light mode
| Token | Valor | Uso |
|---|---|---|
| `--background` | `oklch(0.97 0.005 90)` | Fundo principal — off-white quente |
| `--foreground` | `oklch(0.10 0 0)` | Texto principal — near-black |
| `--muted-foreground` | `oklch(0.50 0.008 90)` | Textos secundários, datas |
| `--secondary` | `oklch(0.93 0.004 90)` | Fundo de cards/superfícies |
| `--border` | `oklch(0.87 0.004 90)` | Divisores e bordas |

### Dark mode
| Token | Valor | Uso |
|---|---|---|
| `--background` | `oklch(0.13 0 0)` | Fundo — near-black neutro |
| `--foreground` | `oklch(0.95 0.004 90)` | Texto principal — off-white |
| `--muted-foreground` | `oklch(0.60 0.004 90)` | Textos secundários |
| `--secondary` | `oklch(0.22 0 0)` | Superfícies elevadas |
| `--border` | `oklch(1 0 0 / 12%)` | Divisores |

O acento `#B52535` é **idêntico nos dois modos**.

---

## Layout

### Container padrão de conteúdo
Todas as páginas de conteúdo usam:
```tsx
<div className="w-full max-w-xl mx-auto px-4 pt-10 pb-16">
```

Não usar `max-w-6xl` para conteúdo editorial — esse valor é apenas para o container raiz da app (`layout.tsx`).

### Cabeçalho de página
```tsx
<div className="mb-10">
  <h1 className="text-3xl font-medium tracking-tight text-foreground mb-2">
    Título
  </h1>
  <p className="text-sm text-muted-foreground leading-relaxed">
    Subtítulo ou descrição curta.
  </p>
</div>
```

### Cabeçalho de seção (com link "ver todos")
```tsx
<div className="flex items-baseline justify-between mb-4 pb-3 border-b border-border">
  <span className="text-xs font-medium tracking-widest uppercase text-foreground">
    Nome da Seção
  </span>
  <Link href="/rota" className="font-mono text-xs" style={{ color: "#B52535" }}>
    ver todos →
  </Link>
</div>
```

---

## Componentes

### Lista editorial (posts, itens)
```tsx
<Link href={href} className="flex items-baseline justify-between py-4 border-b border-border group no-underline">
  <div>
    <p className="text-sm font-medium text-foreground group-hover:text-[#B52535] transition-colors mb-1">
      {title}
    </p>
    <p className="font-mono text-[10px] text-muted-foreground">{date}</p>
  </div>
  <span className="font-mono text-xs ml-4 flex-shrink-0" style={{ color: "#B52535" }}>→</span>
</Link>
```

### Card de projeto
```tsx
<Link href={href} className="block p-5 rounded-lg bg-secondary border border-border hover:border-[#B52535]/40 transition-colors no-underline group">
  <p className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: "#B52535" }}>
    {tag}
  </p>
  <p className="text-base font-medium text-foreground mb-2 group-hover:text-[#B52535] transition-colors">
    {name}
  </p>
  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
</Link>
```

### Link de voltar (topo de post)
```tsx
<Link href="/posts" className="font-mono text-xs no-underline" style={{ color: "#B52535" }}>
  ← Blog
</Link>
```

---

## Header / Navegação

- Fixo no topo, altura `64px` (`--header-height: 64px`)
- Fundo: `bg-background/80 backdrop-blur-[20px]`
- Sem borda visível (`border-b border-transparent`)
- Logo (SVG `PetrecaIcon`) à esquerda em `#B52535`
- Links à direita: **Blog · Projetos · Contato**
- Ícone `<Layers>` (lucide) abre dropdown com: toggle de tema + Login/Logout
- Mobile: hamburger com `Sheet` lateral

### Links de nav
```tsx
className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary no-underline"
```

---

## Hero (Homepage)

- Foto centralizada, dimensões `w-[374px] h-[467px]`, `object-cover object-top`
- Borda: `border-2 border-[#B52535] dark:border-white`
- `border-radius: rounded-lg`
- Nome: `text-4xl font-medium tracking-tight`
- Tagline: `font-mono text-xs tracking-widest` em `#B52535` — formato: `// texto`
- Bio: `text-base text-muted-foreground leading-relaxed max-w-md`
- CTAs: link primário com `border-bottom 1.5px solid #B52535`, link secundário em muted
- Redes sociais: `font-mono text-xs text-muted-foreground`

**Foto:** `/public/images/leandro-petreca2.jpg` (JPEG tratado pelo autor)

---

## Prose (conteúdo de post)

Renderizado via `react-markdown` com renders customizados em `PostContent.tsx`:

- `<p>`: `mb-5 leading-relaxed text-foreground/90`
- `<h2>`: `text-xl font-medium tracking-tight mt-10 mb-4`
- `<h3>`: `text-base font-medium mt-8 mb-3`
- `<a>`: cor `#B52535`, `underline-offset-4 decoration-dotted`
- `<blockquote>`: `border-l-2` em `#B52535`, texto em `italic text-muted-foreground`
- `<code>` inline: `font-mono text-sm bg-secondary px-1.5 py-0.5 rounded`
- Blocos de código: `react-syntax-highlighter` com tema `atomDark`

---

## Estrutura de Rotas

| Rota | Página | Visibilidade |
|---|---|---|
| `/` | Homepage | Pública |
| `/posts` | Lista de posts | Pública |
| `/posts/[slug]` | Post individual | Pública |
| `/projetos` | Lista de projetos | Pública |
| `/contato` | Formulário de contato | Pública |
| `/compra-consciente` | Ferramenta de compra | Pública |
| `/pedal` | Gerador de convite | Pública |
| `/jogos` | Match Colors | Pública |
| `/auth/*` | Auth0 | — |

Rotas públicas declaradas em `middleware.ts` no matcher regex.

---

## Tom de Fala

- **Profissional mas humano** — direto, sem jargão corporativo
- Bio: *"Desenvolvedor full-stack com olho para interfaces e obsessão por detalhes que fazem a diferença. Gosto de construir ferramentas que resolvem problemas reais. Fora do computador, estou em cima de uma bike explorando estradas que o Google Maps não conhece."*
- Tagline: `// desenvolvedor de software`
- Subtítulo do blog: *"Reflexões sobre tecnologia, desenvolvimento e os experimentos do caminho."*
- Subtítulo de projetos: *"Experimentos, ferramentas e jogos construídos nas horas vagas."*


---

## Decisões de Design (contexto para futuras sessões)

- A paleta quente (fundo off-white / near-black) com acento vinho foi escolhida em preferência ao verde e ao coral testados anteriormente.
- O dark mode usa borda **branca** na foto do hero (em vez do vinho), por contraste.
- Tipografia sem serifa geométrica (DM Sans) foi preferida ao estilo editorial com serifa (Playfair), mantendo detalhes em mono como personalidade técnica.
- O logo SVG original foi mantido (não substituído por texto).
- A navegação foi simplificada para 3 itens + ícone stack, removendo Jogos/Gerador Pedal/Compra Consciente do menu principal.
