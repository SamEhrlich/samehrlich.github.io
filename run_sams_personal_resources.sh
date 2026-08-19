#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm not found. Please install Node.js/npm first."
  exit 1
fi

cd "${SCRIPT_DIR}"

if [[ ! -d node_modules ]]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Starting Sam's Personal Resources on http://localhost:3001"
npm run dev
