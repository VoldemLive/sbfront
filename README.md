# SomniVerse AI — Frontend

A React application for private dream journaling and AI-assisted interpretation.

SomniVerse combines an authenticated journal, search and dashboard workflows, and structured AI interpretations presented through Jungian and Freudian perspectives.

## Features

- Account registration and sign-in
- Protected application routes
- Create, edit, search, and soft-delete dream entries
- Dream details and interpretation views
- Dashboard and journal navigation
- Persisted client session
- Responsive landing and application interfaces
- Toast-based feedback and loading states

## Stack

- React 18 and Vite
- React Router
- Zustand
- Axios
- Tailwind CSS and Flowbite
- SomniVerse Rails API

The related backend lives in [VoldemLive/SomniVerceAIAPI](https://github.com/VoldemLive/SomniVerceAIAPI).

## Run locally

```bash
npm install
npm run dev
```

Create a local environment file with the API base URL expected by `src/API/api.js`. Do not commit tokens or production credentials.

## Build

```bash
npm run build
npm run preview
```

## Status

This repository is a product prototype and portfolio code sample. It is not presented as a medical or clinical interpretation service.
