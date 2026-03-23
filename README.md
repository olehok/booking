# Booking App

Hotel search and booking UI with a small Express API and a localized frontend.

## Stack
- React 19, Vite 7
- Redux Toolkit, React Redux, Redux Thunk
- React Router
- Prop-types
- Ant Design
- Formik + Yup
- i18next
- Axios, Dayjs
- Sass, ESLint
- Express

## Requirements
- Node.js 18+
- npm

## Local setup
1. `npm i`
2. Create `.env`:
```
VITE_API_URL=http://localhost:3001
```
3. Optional server env (`server/.env`):
```
PORT=3001
HOST=0.0.0.0
CORS_ORIGIN=http://localhost:5173
```
4. `npm run dev` (runs client + server)

You can also run them separately:
- `npm run dev:client`
- `npm run dev:server`

## Scripts
- `npm run dev` - start client and server
- `npm run dev:client` - start Vite dev server
- `npm run dev:server` - start Express server
- `npm run build` - production build
- `npm run preview` - preview build
- `npm run lint` - lint
- `npm run lint:fix` - fix lint issues

## Environment variables
Client:
- `VITE_API_URL` - API base URL (example: `http://localhost:3001`)

Server:
- `PORT` - server port
- `HOST` - bind address
- `CORS_ORIGIN` - allowed origin(s). Use a single URL or a comma-separated list.

## API
- `GET /api/destinations` - list of destinations
- `GET /api/home` - featured hotels
- `GET /api/hotels/search?city=...&page=1&limit=10&sort=asc|desc&search=...`

## Deployment
- Frontend: GitHub Pages via `npm run deploy` (app expects `basename` = `/booking/`)
- Server: Render (set `CORS_ORIGIN` to the frontend URL and `VITE_API_URL` to the backend URL in `.env.production`)
