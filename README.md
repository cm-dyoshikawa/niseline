# Linely

Linely is inspired by [LocalStack](https://github.com/localstack/localstack). Goal of this tool is to create a mock service for [LINE](https://line.me/ja/).

## Setup

### Docker

```bash
docker run -d -p 3000:3000 dyoshikawa/linely:latest
curl http://localhost:3000/debug/ping
# => {"ping":"pong"}
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3'
services:
  linely:
    image: dyoshikawa/linely:latest
    ports:
      - 3000:3000
```

```bash
docker compose up -d
curl http://localhost:3000/debug/ping
# => {"ping":"pong"}
```

## Usage

```bash
curl --request POST \
  --url http://localhost:3000/debug/users \
  --header 'content-type: application/json' \
  --data '{"id": "FOO_ID","name": "Foo","picture": "http://example.com/foo.jpg","email": "foo@example.com"}'
# => null

curl -v -X POST 'http://localhost:3000/oauth2/v2.1/verify' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'id_token=FOO_ID' \
  --data-urlencode 'client_id=1234567890'
# => {"iss":"https://example.com","sub":"FOO_ID","aud":"1234567890","exp":1504169092,"iat":1504263657,"nonce":"0987654asdf","amr":["pwd"],"name":"Foo","picture":"http://example.com/foo.jpg","email":"foo@example.com"}
```

## Features

### Login API

- [ ] [Issue access token](https://developers.line.biz/ja/reference/line-login/#issue-access-token)
- [x] [Verify access token](https://developers.line.biz/ja/reference/line-login/#verify-access-token)
- [ ] [Refresh access token](https://developers.line.biz/ja/reference/line-login/#refresh-access-token)
- [ ] [Revoke access token](https://developers.line.biz/ja/reference/line-login/#revoke-access-token)
- [x] [Verify ID token](https://developers.line.biz/ja/reference/line-login/#verify-id-token)
- [x] [Get user profile](https://developers.line.biz/ja/reference/line-login/#get-user-profile)
- [x] [Get friendship status](https://developers.line.biz/ja/reference/line-login/#get-friendship-status)

### Messaging API

- TODO
  - https://developers.line.biz/ja/reference/messaging-api/
