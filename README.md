# NiseLine

![NiseLine](https://github.com/cm-dyoshikawa/niseline/blob/main/niseline-logo.png)

NiseLine is inspired by [LocalStack](https://github.com/localstack/localstack). Goal of this tool is to create a mock service for [LINE](https://line.me/ja/).

## Getting Started

Launch NiseLine server.

```bash
docker run -d -p 3000:3000 dyoshikawa/niseline:latest
```

And install NiseLiff SDK.

```bash
npm i @niseline/niseliff
```

Use NiseLiff sdk in your client app!

```tsx
import { buildNiseliff } from '@niseline/niseliff'
import React from 'react'
import ReactDOM from 'react-dom'

declare global {
  interface Window {
    liff: Liff
  }
}

window.liff = buildNiseliff({
  liffId: 'DUMMY_LIFF_ID',
})

window.liff
  .init({
    liffId: 'DUMMY_LIFF_ID',
  })
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>Your client app</React.StrictMode>,
      document.getElementById('root')
    )
  })
```

## NiseLiff SDK

### Setup

```bash
npm i @niseline/niseliff
```

### Usage

```ts
// /path/to/config.ts

export const env: 'local' | 'development' | 'staging' | 'production' = 'local'
```

```ts
// /path/to/liff.ts

import * as config from '/path/to/config'
import realLiff from '@line/liff'
import { buildNiseliff } from '@niseline/niseliff'

const liff =
  config.env === 'local' ? buildNiseliff({ liffId: 'DUMMY_LIFF_ID' }) : realLiff
export default liff
```

```tsx
// /path/to/index.tsx

import liff from '/path/to/liff'
import React from 'react'
import ReactDOM from 'react-dom'

liff.init({ liffId: 'DUMMY_LIFF_ID' }).then(() => {
  ReactDOM.render(
    <React.StrictMode>Your client app</React.StrictMode>,
    document.getElementById('root')
  )
})
```

### Features

- [x] [Ready](https://developers.line.biz/ja/reference/liff/#ready)
- [x] [Id](https://developers.line.biz/ja/reference/liff/#id)
- [x] [Initialize liff app](https://developers.line.biz/ja/reference/liff/#initialize-liff-app)
- [x] [Get os](https://developers.line.biz/ja/reference/liff/#get-os)
- [x] [Get language](https://developers.line.biz/ja/reference/liff/#get-language)
- [x] [Get version](https://developers.line.biz/ja/reference/liff/#get-version)
- [x] [Get line version](https://developers.line.biz/ja/reference/liff/#get-line-version)
- [x] [Is in client](https://developers.line.biz/ja/reference/liff/#is-in-client)
- [x] [Is logged in](https://developers.line.biz/ja/reference/liff/#is-logged-in)
- [x] [Is api available](https://developers.line.biz/ja/reference/liff/#is-api-available)
- [x] [Login](https://developers.line.biz/ja/reference/liff/#login)
- [x] [Logout](https://developers.line.biz/ja/reference/liff/#logout)
- [x] [Get access token](https://developers.line.biz/ja/reference/liff/#get-access-token)
- [x] [Get ID token](https://developers.line.biz/ja/reference/liff/#get-id-token)
- [x] [Get decoded ID token](https://developers.line.biz/ja/reference/liff/#get-decoded-id-token)
- [x] [Get context](https://developers.line.biz/ja/reference/liff/#get-context)
- [x] [Get profile](https://developers.line.biz/ja/reference/liff/#get-profile)
- [x] [Get friendship](https://developers.line.biz/ja/reference/liff/#get-friendship)
- [x] [Permission query](https://developers.line.biz/ja/reference/liff/#permission-query)
- [x] [Permission request all](https://developers.line.biz/ja/reference/liff/#permission-request-all)
- [x] [Permanent link create url by](https://developers.line.biz/ja/reference/liff/#permanent-link-create-url-by)
- [x] [Permanent link create url](https://developers.line.biz/ja/reference/liff/#permanent-link-create-url)
- [x] [Permanent link set extra query param](https://developers.line.biz/ja/reference/liff/#permanent-linke-set-extra-query-param)
- [x] [Send messages](https://developers.line.biz/ja/reference/liff/#send-messages)
- [x] [Open window](https://developers.line.biz/ja/reference/liff/#open-window)
- [x] [Share target picker](https://developers.line.biz/ja/reference/liff/#share-target-picker)
- [x] [Scan code v2](https://developers.line.biz/ja/reference/liff/#scan-code-v2)
- [x] [Scan code](https://developers.line.biz/ja/reference/liff/#scan-code)
- [x] [Close window](https://developers.line.biz/ja/reference/liff/#close-window)
- [x] [Init plugins](https://developers.line.biz/ja/reference/liff/#init-plugins)
- [ ] [Bluetooth get availability](https://developers.line.biz/ja/reference/liff/#bluetooth-get-availability)
- [ ] [Bluetooth request device](https://developers.line.biz/ja/reference/liff/#bluetooth-request-device)
- [ ] [Bluetooth referring device](https://developers.line.biz/ja/reference/liff/#bluetooth-referring-device)

## NiseLine Server

### Setup

#### Docker

```bash
docker run -d -p 3000:3000 dyoshikawa/niseline:latest
curl http://localhost:3000/niseline/api/ping
# => {"ping":"pong"}
```

#### Docker Compose

```yaml
# docker-compose.yml
version: '3'
services:
  niseline:
    image: dyoshikawa/niseline:latest
    ports:
      - 3000:3000
```

```bash
docker compose up -d
curl http://localhost:3000/niseline/api/ping
# => {"ping":"pong"}
```

### Usage

```bash
curl --request POST \
  --url http://localhost:3000/niseline/api/users \
  --header 'content-type: application/json' \
  --data '{"id": "FOO_ID","name": "Foo","picture": "http://example.com/foo.jpg","email": "foo@example.com"}'
# => null

curl -v -X POST 'http://localhost:3000/oauth2/v2.1/verify' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'id_token=FOO_ID' \
  --data-urlencode 'client_id=1234567890'
# => {"iss":"https://example.com","sub":"FOO_ID","aud":"1234567890","exp":1504169092,"iat":1504263657,"nonce":"0987654asdf","amr":["pwd"],"name":"Foo","picture":"http://example.com/foo.jpg","email":"foo@example.com"}
```

### Features

#### Login API

- [ ] [Issue access token](https://developers.line.biz/ja/reference/line-login/#issue-access-token)
- [x] [Verify access token](https://developers.line.biz/ja/reference/line-login/#verify-access-token)
- [ ] [Refresh access token](https://developers.line.biz/ja/reference/line-login/#refresh-access-token)
- [ ] [Revoke access token](https://developers.line.biz/ja/reference/line-login/#revoke-access-token)
- [x] [Verify ID token](https://developers.line.biz/ja/reference/line-login/#verify-id-token)
- [x] [Get user profile](https://developers.line.biz/ja/reference/line-login/#get-user-profile)
- [x] [Get friendship status](https://developers.line.biz/ja/reference/line-login/#get-friendship-status)

#### Messaging API

- [x] [Send reply message](https://developers.line.biz/ja/reference/messaging-api/#send-reply-message)
- [x] [Send push message](https://developers.line.biz/ja/reference/messaging-api/#send-push-message)
- [ ] [Send multicast message](https://developers.line.biz/ja/reference/messaging-api/#send-multicast-message)
- [ ] [Send narrowcast message](https://developers.line.biz/ja/reference/messaging-api/#send-narrowcast-message)
- [ ] [Get narrowcast progress status](https://developers.line.biz/ja/reference/messaging-api/#get-narrowcast-progress-status)
- [ ] [Send broadcast message](https://developers.line.biz/ja/reference/messaging-api/#send-broadcast-message)
- [ ] [Get content](https://developers.line.biz/ja/reference/messaging-api/#get-content)
- [ ] [Get quota](https://developers.line.biz/ja/reference/messaging-api/#get-quota)
- [ ] [Get consumption](https://developers.line.biz/ja/reference/messaging-api/#get-consumption)
- [ ] [Get number of reply messages](https://developers.line.biz/ja/reference/messaging-api/#get-number-of-reply-messages)
- [ ] [Get number of push messages](https://developers.line.biz/ja/reference/messaging-api/#get-number-of-push-messages)
- [ ] [Get number of multicast messages](https://developers.line.biz/ja/reference/messaging-api/#get-number-of-multicast-messages)
- [ ] [Get number of broadcast messages](https://developers.line.biz/ja/reference/messaging-api/#get-number-of-broadcast-messages)
- [ ] [Retry api request](https://developers.line.biz/ja/reference/messaging-api/#retry-api-request)
