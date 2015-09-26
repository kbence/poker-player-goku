#!/bin/bash

PORT=1234 node player_service.js &
PID=$!

trap "kill -TERM $PID" EXIT

sleep 1

for i in $(seq 1 100); do
  json="$(node test_player.js)"
  curl -s -d 'action=bet_request&game_state='"$json" http://localhost:1234/
  echo -n ' ';
done
