#!/bin/bash
pm2 stop serve-data-prod & git pull & pm2 start --env production