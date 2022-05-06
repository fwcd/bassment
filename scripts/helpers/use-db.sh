source "$(dirname $BASH_SOURCE)/../../.env"

if [ -z "$DATABASE_URL" ]; then
  echo "Please set the DATABASE_URL!"
  exit 1
fi

echo "Using database at $DATABASE_URL."
