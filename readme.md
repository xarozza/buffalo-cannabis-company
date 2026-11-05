# Buffalo Cannabis Company

A modern cannabis dispensary website for Buffalo Cannabis Company, built with React, TypeScript, and Vite.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- pnpm
- GitHub Pages

## Project Structure

```text
Buffalo-Cannabis-Co/
├── artifacts/
│   ├── buffalo-cannabis-company/   # Main website
│   ├── api-server/                 # Backend/API
│   └── mockup-sandbox/             # Development sandbox
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages deployment
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- pnpm

Install dependencies:

```bash
pnpm install
```

### Run Locally

From the project root:

```powershell
$env:PORT = "5000"
$env:BASE_PATH = "/"
pnpm --filter @workspace/buffalo-cannabis-company dev
```

The development server will be available at the URL shown in the terminal.

### Build for Production

For GitHub Pages, use:

```powershell
$env:PORT = "5000"
$env:BASE_PATH = "/buffalo-cannabis-company/"
pnpm --filter @workspace/buffalo-cannabis-company build
```

The production files are generated in:

```text
artifacts/buffalo-cannabis-company/dist/public
```

## Deployment

The website is automatically deployed to GitHub Pages whenever changes are pushed to the `main` branch.

GitHub Actions workflow:

```text
.github/workflows/deploy.yml
```

The live website is:

**https://xarozza.github.io/buffalo-cannabis-company/**

### Deployment Flow

```text
git push
   ↓
GitHub Actions
   ↓
pnpm install
   ↓
Vite production build
   ↓
GitHub Pages artifact
   ↓
Live website
```

## Environment Variables

The Vite configuration expects:

| Variable | Description |
|---|---|
| `PORT` | Development/build server port |
| `BASE_PATH` | Base URL path for the application |

For GitHub Pages:

```text
PORT=5000
BASE_PATH=/buffalo-cannabis-company/
```

## Development

The main frontend application is located at:

```text
artifacts/buffalo-cannabis-company
```

To work specifically on the frontend:

```bash
cd artifacts/buffalo-cannabis-company
```

Then use the project's pnpm scripts as needed.

## GitHub Pages

This project uses GitHub Actions rather than the traditional `gh-pages` branch deployment.

GitHub repository:

**https://github.com/xarozza/buffalo-cannabis-company**

GitHub Pages must be configured to use:

```text
Source: GitHub Actions
```

## Important Notes

- GitHub Pages hosts the frontend as a static website.
- The `api-server` is not deployed by GitHub Pages.
- Client-side routing is supported through the generated `404.html`.
- The repository uses **pnpm**; do not use npm or yarn for dependency installation.

## License

This project is private/proprietary to the owner. Reuse not allowed. Public only for the sake of publicly deploying for free.