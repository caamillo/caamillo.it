docker run  --name mongo \
            -p 27017:27017 \
            --env-file .env \
            -d prismagraphql/mongo-single-replica:5.0.3