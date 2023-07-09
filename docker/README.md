rsync -vaz --rsync-path="sudo rsync" --no-perms --no-owner --no-group --exclude '.git src/fe_eng/node_modules' . vunm@127.0.0.1:/home/vunm/eng

docker-compose up -d --build frontend
