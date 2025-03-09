# Puntospoint challenge
Aplicación en Nextjs 12 & React 18 + TypeScript, utilizando Material UI y TanStack React Query.
![2025-03-09 17-32-32](https://github.com/user-attachments/assets/030b5e21-5315-47c3-bce7-45bad5a68c3a)

Casos diseñados:
Clientes HOY
![hoy](https://github.com/user-attachments/assets/84205b0e-8adc-471c-a933-4778576b2753)

Clientes 7 dias
![clientes-7-dias](https://github.com/user-attachments/assets/d8187ef7-6e07-4207-8dcf-84e3938275af)

Clientes Cashback 7 dias
![clientes-cashback](https://github.com/user-attachments/assets/0d5cccc8-90ec-49d2-b3ff-9511598e2f70)

Clientes Dinero 7 dias
![clientes-dinero-7-dias](https://github.com/user-attachments/assets/f460e800-9179-4516-aaaf-aa1bbc865d20)

Transacciones Dinero
![transacciones-dinero](https://github.com/user-attachments/assets/f4153a9f-629d-4dcf-a91a-440adaf5a12e)

YTD-YTG
![ytd-ytg](https://github.com/user-attachments/assets/ad1bd52f-a801-4a59-811a-7e3aab69eb81)

Pulso
![pulso](https://github.com/user-attachments/assets/c48c7c43-0066-4c1a-8009-515c65cc0975)




## Correr Proyecto

Clonar repositorio

```bash
  git clone git@github.com:mauromamani/puntospoint-challenge.git dashboard
```

Acceder a la carpeta

```bash
  cd dashboard
```

Instalar dependencias

```bash
  # nodejs == 16
  npm install

  # nodejs > 16
  npm install --legacy-peer-deps
```

Correr tests unitarios

```bash
  npm run test
```

Correr tests E2E

```bash
  npm build
  npm start
  # En otra terminal
  npm run test:e2e
```

Iniciar

```bash
  npm run dev
```
## Uso de Google Analytics para métricas

![image](https://github.com/user-attachments/assets/95f4dc75-80af-469e-bf37-b721ea5a6d56)

Para mejorar la analítica de uso y comprender mejor el comportamiento de los usuarios dentro de la aplicación, se han implementado eventos en Google Analytics 4 (GA4). Estos eventos nos permiten identificar interacciones clave y optimizar la experiencia del usuario en función de los datos recopilados.

Link para ver analytics de los eventos:
https://analytics.google.com/analytics/web/?authuser=0#/p481460759/reports/explorer?params=_u..nav%3Dmaui%26_u.date00%3D20250309%26_u.date01%3D20250309&r=top-events&ruid=top-events,business-objectives,examine-user-behavior&collectionId=business-objectives

- filter: Se dispara cuando un usuario cambia un filtro. Esto nos ayuda a entender qué filtros son más utilizados y cómo los usuarios interactúan con la segmentación de datos.
- sub-filter: Similar al evento anterior, pero aplicado a cambios en subfiltros, lo que nos permite obtener un nivel más detallado de las preferencias del usuario.
- type-chart: Se activa cuando un usuario cambia el tipo de gráfico. Esto nos ayuda a analizar qué tipos de visualización son más efectivos o preferidos.
- export-table: Se genera cuando un usuario exporta una tabla de datos. Nos permite medir el interés en la exportación de información y su frecuencia.
- profile: Se dispara cuando un usuario abre el menú de perfil, ayudándonos a conocer la interacción con esta sección y evaluar la necesidad de mejoras en su accesibilidad o diseño.
## Estructura del proyecto


```
📦 
├─ .eslintrc.json
├─ .github
│  └─ workflows
│     └─ pipeline.yml
├─ .gitignore
├─ README.md
├─ __mock__
├─ __test__
├─ e2e
├─ jest.config.mjs
├─ jest.setup.ts
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ pages
│  ├─ _app.tsx
│  ├─ api
│  └─ index.tsx
├─ playwright.config.ts
├─ public
├─ src
│  ├─ core
│  │  ├─ ga4
│  │  └─ providers
│  ├─ modules
│  │  └─ dashboard
│  │     ├─ components
│  │     │  ├─ charts
│  │     │  ├─ filters
│  │     │  ├─ index.ts
│  │     │  ├─ sidebar
│  │     │  └─ tables
│  │     ├─ page.tsx
│  │     ├─ services
│  │     │  └─ queries
│  │     │     ├─ get-clientes-data
│  │     │     ├─ get-info-cards
│  │     │     ├─ get-pulso-data
│  │     │     ├─ get-transacciones-data
│  │     │     └─ index.ts
│  │     ├─ store
│  │     └─ utils
│  └─ shared
│     └─ components
│        ├─ icons
│        ├─ navbar
│        └─ ui
│           ├─ button
│           ├─ chip
│           ├─ index.ts
│           └─ table
├─ styles
├─ test-results
├─ tsconfig.json
└─ yarn.lock

```
