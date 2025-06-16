#!/bin/bash

set -e

cd ~/application

echo "Останавливаем старые контейнеры..."
docker-compose down

echo "Собираем контейнеры..."
docker-compose build backend frontend mongo nginx

echo "Запускаем контейнеры..."
docker-compose up -d

echo "Деплой завершён!"
