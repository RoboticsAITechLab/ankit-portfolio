# Production Portfolio Backend API

Layered, production-grade Node.js + Express + TypeScript backend application foundation.

## Prerequisites
- Node.js >= 20.x
- npm >= 10.x

## Installation & Setup
```bash
npm install
cp .env.example .env
```

## Available Scripts

### Development Server
Starts the API server with auto-reload on code changes:
```bash
npm run dev
```

### Type Checking
Runs TypeScript strict verification without emitting code:
```bash
npm run typecheck
```

### Build Production Bundle
Compiles TypeScript into JavaScript inside the `dist/` directory:
```bash
npm run build
```

### Production Start
Runs the production build from `dist/server.js`:
```bash
npm start
```

## API Endpoint Foundation
- Health Check: `GET /api/v1/health`
- API Versioning Prefix: `/api/v1`

## Architecture Status
- [x] TypeScript Strict Configuration
- [x] Express Application Bootstrap & Server Listener Separation
- [x] Validated Centralized Environment loader (`src/config`)
- [x] Global Security Headers (Helmet) & CORS Configuration
- [x] Request Body Limits & Parsing (1mb limit)
- [x] Centralized JSON Error Handler & 404 Middleware
- [x] Zod Validation & Authentication Middleware Architecture Extensions
- [x] Graceful Process Shutdown Handler
