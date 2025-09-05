# Design Workflow

- Activa el playground: `/?playground=1`
- Itera componentes en `src/Playground.tsx` (usa cards, botones, badges).
- Tokens de color y tema en `src/index.css` (@theme + :root.dark).
- No usar estilos inline; usa utilidades Tailwind y clases utilitarias del proyecto.
- Cuando algo quede final, pásalo a `src/components` o `src/sections`.

## Envs
Copia `.env.example` a `.env` y ajusta `VITE_API_BASE` cuando tengas backend.

## Flags
`src/lib/featureFlags.ts` para encender/apagar features (inquiry, trace).
