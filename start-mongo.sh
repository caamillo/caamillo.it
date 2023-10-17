docker run  --name mongo \
            -p 27017:27017 \
            --env-file .env \
            --volume ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro \
            -d prismagraphql/mongo-single-replica:5.0.3