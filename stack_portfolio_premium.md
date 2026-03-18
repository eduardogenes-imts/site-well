# Stack Oficial do Projeto -- Portfólio Premium (Awwwards Style)

## Visão Geral

Documento que define **toda a stack tecnológica oficial** do projeto.\
Não alterar durante o desenvolvimento.

------------------------------------------------------------------------

## 🧱 Base

-   Next.js (App Router)
-   TypeScript

------------------------------------------------------------------------

## 🎨 Estilização

Escolher apenas uma opção:

### Opção A (recomendada)

-   SCSS (Sass)

### Opção B

-   Tailwind CSS

------------------------------------------------------------------------

## 🎬 Animação (Core)

-   GSAP
-   ScrollTrigger

------------------------------------------------------------------------

## 🧠 Scroll

-   Lenis

------------------------------------------------------------------------

## 🖼️ Imagens

-   next/image

------------------------------------------------------------------------

## 📦 CMS (fase futura)

-   Sanity (recomendado) ou
-   JSON mock inicial

------------------------------------------------------------------------

## ⚡ Performance

-   Lazy loading
-   Code splitting (Next.js)
-   Dynamic imports

------------------------------------------------------------------------

## 📁 Estrutura sugerida

    src/
     ├── app/
     ├── components/
     ├── lib/
     ├── styles/

------------------------------------------------------------------------

## 📦 Instalação

### Base

    npm install gsap @studio-freight/lenis sass

### Tailwind (se usar)

    npm install tailwindcss postcss autoprefixer

------------------------------------------------------------------------

## 🧠 Boas práticas obrigatórias

### Animação

-   usar transform e opacity
-   evitar top/left

### Performance

-   evitar reflow
-   limitar animações simultâneas

------------------------------------------------------------------------

## 🔧 Setup GSAP

``` javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default gsap;
```

------------------------------------------------------------------------

## 🔧 Integração Lenis + GSAP

``` javascript
lenis.on("scroll", ScrollTrigger.update);
```

------------------------------------------------------------------------

## ❌ NÃO USAR

-   Framer Motion
-   Locomotive Scroll
-   jQuery

------------------------------------------------------------------------

## 🧾 Stack Final

-   Next.js
-   TypeScript
-   SCSS ou Tailwind
-   GSAP + ScrollTrigger
-   Lenis
-   next/image
-   Sanity (opcional)

------------------------------------------------------------------------

## 📌 Regra final

Stack fechada.\
Não trocar ferramentas no meio do projeto.

------------------------------------------------------------------------

## Resumo

Dominar: - Layout (CSS) - Motion (GSAP) - Scroll (Lenis) - Performance
