#!/bin/sh
set -eu

PROJECT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
PYTHON_BIN=${PYTHON_BIN:-python3}

cd "$PROJECT_DIR"
"$PYTHON_BIN" -m venv .supertonic-venv
.supertonic-venv/bin/python -m pip install 'supertonic[serve]==1.3.1'
.supertonic-venv/bin/supertonic download
echo "Supertonic 3 hazır. Uygulamayı node server.mjs ile başlatabilirsiniz."
