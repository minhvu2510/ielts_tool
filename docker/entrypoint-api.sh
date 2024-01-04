#!/bin/sh
set -eu
#docker exec -it mongodb bash -c "mongorestore -d mvp /mvp"
exec python3 main.py
echo "second statement" > /file1.txt
