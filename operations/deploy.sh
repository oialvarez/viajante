#!/bin/sh

function show_usage {
    echo "Deploy viajante app utility"
    echo "Usage: $0 dev|prod [port]"
    echo "Feature: [port], status: pending"
    exit 1
}

case "$1" in
    "dev")
        NODE_ENV=development
        PORT=3001
        ;;
    "prod")
        NODE_ENV=production
        PORT=3000
        ;;
    *)
        show_usage
        ;;
esac

#if [ "$*" == "" ]; then
#    show_usage
#fi

HOME=~
ENVIRONMENT=$1
FOLDER=$HOME/$ENVIRONMENT
cd $FOLDER

git pull

LOG_FILENAME=$HOME/logs/$ENVIRONMENT.log
NODE_ENV=$NODE_ENV PORT=$PORT node server.js &>$>$LOG_FILENAME &

echo "Server: started, logs:"$LOG_FILENAME
