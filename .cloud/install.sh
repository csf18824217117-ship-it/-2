#!/usr/bin/env bash
set -euo pipefail
cd /workspace/-2
export npm_config_cache=/workspace/.cache/npm
npm ci
npm run build
