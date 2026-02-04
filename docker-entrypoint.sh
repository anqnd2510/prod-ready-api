#!/bin/sh
set -e

echo "⏳ Waiting for database to be ready..."
until wget --spider --quiet --tries=1 --timeout=1 http://postgres:5432 2>/dev/null || nc -z postgres 5432; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "✅ Database is ready!"

echo "🔄 Running database migrations..."
npx prisma migrate deploy

echo "🚀 Starting application..."
exec node dist/src/main
