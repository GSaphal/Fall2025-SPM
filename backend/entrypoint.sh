#!/bin/bash

# Wait for the database to be ready
echo "Waiting for the database..."
while ! python -c "import socket; s = socket.socket(socket.AF_INET, socket.SOCK_STREAM); s.settimeout(1); result = s.connect_ex(('db', 5432)); s.close(); exit(result)"; do
  sleep 0.1
done
echo "Database is ready!"

# Run database migrations (if any)
# flask db upgrade

# Start the Flask application
exec flask run --host=0.0.0.0