# Copilot / Agent Instructions for this workspace ✅

Kurz, konkret und handlungsorientiert — so sollen Agenten hier arbeiten.

## Projektüberblick (Big picture) 🔧
- Dieses Repo enthält mehrere **standalone Vue/Vite Apps** (z. B. `event-booking/`, `admin-module/`). Jeder Ordner ist eine kleine App mit eigener `package.json`.
- Konvention: **Vite + Vue 3** SFCs mit **<script setup>** und Composition API. `src/components/`, `src/composables/`, `src/services/` sind die häufigen Grenzen.
- Viele Apps nutzen **Tailwind** via `@tailwindcss/vite` und das Alias `@` → `src` (siehe `vite.config*.js/ts`).

## Wichtige Workflows & Befehle ▶️
- Allgemein: für eine App `cd <app-folder>` und dann `npm install` und `npm run dev`.
- Für `event-booking` lokal API-mock starten: `npm run server` (setzt `json-server --watch db.json --port 3001 --delay 3000`):
  - Port **3001** und `--delay 3000` sind bewusst gesetzt (simulierte Latenz). Tests sollten die Verzögerung berücksichtigen (optimistische UI-Updates).
- Lint/Format: `npm run lint` (z. B. in `event-booking` setzt ESLint `--fix`).
- TypeScript-Apps (z. B. `admin-module`): Build enthält `vue-tsc -b && vite build` — Types müssen vor dem Build geprüft werden.

## Daten- & Integrationspunkte 🔗
- Mock-API in `event-booking/db.json` mit Endpunkten `/events` und `/bookings`.
- Service-Schicht: `src/services/data-service.js` verwendet `serverURL = 'http://localhost:3001'` und `fetch` direkt.
  - WICHTIG: `handleRegistration` macht **optimistische UI-Updates** (`status: 'pending'`), dann POST, Rollback bei Fehler.
  - `handleCancellation` nutzt `status: 'cancelling'` vor DELETE.
- Wenn du API-Schema änderst: aktualisiere `db.json`, passe `data-service.js` und UI-Komponenten an.

## Codekonventionen & Patterns 🧭
- Composition API / composables: zentrale state-Logik lebt in `src/composables/` (z. B. `useBookings.js`). Preferiere composables für wiederverwendbare state-Logik.
- Services halten Fetch-/API-Logik (z. B. `src/services/data-service.js`). Behalte Optimistic-update-Struktur bei (push pending, replace on success, rollback on error).
- Aliasing: Importe mit `@/...` sind üblich (siehe `vite.config*.js/ts`). Achte auf Konsistenz in Imports.
- UI-Verhalten: Alerts werden an mehreren Stellen direkt verwendet (z. B. in `useBookings.js`). Sei vorsichtig beim Refactoring von UX-Fehlerfällen.

## PR-Checks / Test-Checklist ✅
- Start `npm run server` (falls vorhanden) und `npm run dev` in der App; verifiziere Haupt-UX-Flows (z. B. Registrierung/Cancel bei `event-booking`).
- Lint ausführen und Fehler beheben (`npm run lint`).
- Für TS-Projekte: `vue-tsc -b` läuft fehlerfrei.
- Manuell prüfen: Optimistic UI rollbacks auf fehlerhafte API-Antworten.

## Beispiele (konkrete Referenzen) 📌
- Optimistic booking: `event-booking/src/services/data-service.js#handleRegistration`
- Composable usage: `event-booking/src/composables/useBookings.js`
- Vite alias: `event-booking/vite.config.js` (`'@': fileURLToPath(new URL('./src', import.meta.url))`)
- Mock data: `event-booking/db.json` (structures `events` and `bookings`)

## Was ein Agent vermeiden sollte ❗
- API-Port/Delay ohne Rückfrage ändern (UI-Tests hängen von `3001` und Delay ab).
- Starke Rewrites von Optimistic-update-Flows ohne manuelle Verifikation.
- Automatische Bumps/formatting-only PRs, die app-lokale Lints oder builds nicht prüfen.

---

Wenn Inhalte fehlen oder du Beispiel-Workflows (z. B. für ein anderes Unterprojekt) möchtest, sag mir, welche App ich priorisieren soll — ich passe die Anleitung an. ✨