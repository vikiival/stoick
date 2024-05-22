default := 'squid'
types := 'typegen'

process: build
	@node -r dotenv/config lib/main.js

serve:
	@npx squid-graphql-server

up *FLAGS:
  docker compose up {{FLAGS}}

upd:
	@just up -d

pull:
  docker compose pull

clear:
  docker compose rm -f
  rm -rf .data

down:
  docker compose down

build:
	npm run build

codegen:
	npx squid-typeorm-codegen

typegen TAG=types:
	npx squid-solana-typegen src/abi {{TAG}}.json

bug: down upd

reset: migrate

quickstart: migrate process

quick: wipe bug process

wipe:
  clear

prod TAG:
	gh pr create --base release-{{TAG}}

migrate:
	npx squid-typeorm-migration apply

update-db:
	npx squid-typeorm-migration generate

db: update-db migrate

test:
  npm run test:unit

improve TAG=default:
	npx sqd deploy -m {{TAG}}.yaml .

release TAG=default:
	npx sqd deploy -m {{TAG}}.yaml .

kill TAG:
	npx sqd squid:kill "sonick@{{TAG}}"

tail TAG:
	npx sqd squid logs sonick@{{TAG}} -f

brutal TAG=default:
	npx sqd deploy -r -m {{TAG}}.yaml .

update-deps:
	npx npm-check-updates -u

exec:
	docker exec -it synck-db-1 psql -U postgres -d squid

check: codegen build

kek: bug quick


archive-registry:
	npx squid-archive-registry -t evm

fmt:
	deno fmt --no-semicolons --single-quote src/mappings src/*.ts

