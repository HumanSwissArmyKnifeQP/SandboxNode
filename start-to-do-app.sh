#!/bin/bash
# mintty "C:\Program Files\MongoDB\Server\3.6\bin\mongod" --dbpath "C:\data\todoapp" &
mintty "C:\Program Files\MongoDB\Server\3.6\bin\mongod" --config ./mongod.todoapp.conf &
mintty npm start &