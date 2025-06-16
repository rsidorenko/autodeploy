#!/bin/bash

set -e

git clone https://github.com/rsidorenko/autodeploy.git application

cd ~/application

echo "Останавливаем старые контейнеры..."
docker-compose down

echo "Собираем контейнеры..."
docker-compose build backend frontend mongo nginx

echo "Запускаем контейнеры..."
docker-compose up -d

echo "Деплой завершён!"

cd ..
rm -rf application
