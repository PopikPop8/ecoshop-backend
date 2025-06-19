FROM denoland/deno:latest

WORKDIR /app

COPY . .

RUN deno cache app.ts

CMD ["run", "--allow-net", "app.ts"]
