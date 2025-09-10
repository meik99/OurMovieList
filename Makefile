.PHONY: db
db:
	docker run \
        --name ourmovielist \
        -p 5432:5432 \
        -e POSTGRES_PASSWORD=password \
        -e POSTGRES_USER=ourmovielist \
        -e POSTGRES_DB=ourmovielist -d \
        postgres || docker start ourmovielist
