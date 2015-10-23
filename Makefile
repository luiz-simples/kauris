DB_USER=kauris
DB_PASS=ZwTXVyzKO80qwYzA
DB_HOST=$(DB_USER)-db
DB_CONT=$(DB_USER)-db
DB_VOLM=$(PWD)/../db
DB_DATA=/var/pg/$(DB_USER)

CN_PROD=$(DB_USER)-prod
CN_DEV=$(DB_USER)-dev

run-db-postgres:
	mkdir -p $(DB_VOLM)/postgres && \
	( ( docker stop ${DB_CONT} && docker rm ${DB_CONT} ) || echo "Container not found: ${DB_CONT}" ) && \
	docker pull postgres:9.4 && \
	docker run \
		-e PGDATA=$(DB_DATA) \
		-e POSTGRES_USER=$(DB_USER) \
		-e POSTGRES_PASSWORD=$(DB_PASS) \
		-v $(DB_VOLM)/postgres:$(DB_DATA) \
		--dns=8.8.8.8 \
	  --name $(DB_CONT) \
		-d \
		postgres:9.4

run-dev:
	( ( docker stop ${CN_DEV} && docker rm ${CN_DEV} ) || echo "Container not found: ${CN_DEV}" ) && \
	make run-db-postgres && \
	cp -Rf docker/development ${PWD}/Dockerfile && \
	docker build --rm -t kauris-dev . && \
	rm -Rf ${PWD}/Dockerfile && \
	docker run \
		-v ${HOME}/.gitconfig:/kauris/.gitconfig \
		-v ${HOME}/.ssh:/kauris/.ssh \
		-v ${PWD}:/kauris/sys \
		-w /kauris/sys \
		-h dev \
		--link $(DB_CONT):$(DB_HOST) \
		--dns=8.8.8.8 \
		--name ${CN_DEV} \
		--rm \
		-it \
		kauris-dev

run-cordova:
	( ( docker stop ${CN_DEV} && docker rm ${CN_DEV} ) || echo "Container not found: ${CN_DEV}" ) && \
	make run-db-postgres && \
	cp -Rf ${PWD}/docker/cordova ${PWD}/Dockerfile && \
	docker build --rm -t cordova-dev . && \
	rm -Rf ${PWD}/Dockerfile && \
	docker run \
		-v ${HOME}/.gitconfig:/root/.gitconfig \
		-v ${HOME}/.ssh:/root/.ssh \
		-v ${PWD}:/cordova/sys \
		-w /cordova/sys \
		-h dev \
		--link $(DB_CONT):$(DB_HOST) \
		--dns=8.8.8.8 \
		--name ${CN_DEV} \
		--rm \
		-it \
		cordova-dev
