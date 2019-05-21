#!/bin/bash
echo 'start deploy shell task'

npm run stop:pm2 && git pull && npm run start:pm2