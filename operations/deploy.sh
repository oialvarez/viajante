#!/bin/sh

function show_usage {
    echo "Deploy viajante app utility"
    echo "Usage: $0 dev|test|prod [port]"
    echo "Feature: [port], status: pending"
    exit 1
}

case "$1" in
    "dev")
        NODE_ENV="development"
        ;;
    "test")
        NODE_ENV=$1
        ;;
    "prod")
        NODE_ENV="production"
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

LOG_FILENAME=$HOME/logs/$ENVIRONMENT.log
node server.js &>$>$LOG_FILENAME &

echo "Server: started, logs:"$LOG_FILENAME


