# ApiWorker is a util function to make API Requests.

Version: 0.01

How to use?

Notes:
Bearer Token is not essencial...
If you need declare more headers, exist extraHeaders props...

```shell
npm i apiWorker
```
or
```shel
yarn add apiWorker
```

You can separate your API CALLS, this method.

```js
import ApiWorker from 'apiworker'

const token =
  '5facda8cad3265b2ee2a225277c694f395ed478c68631600bb81a4835e91662f9645c645cdd97db935a4eb5547175d651ed6d1b576b4c962698be343259cee180212cf53aa77bf3ef175ee0d583c87a7a5c04d17d709c563fec05b2e4730d59772f3f3d9a949c93d2b909aadd84e6dd8a805e36f9361bd4321fa18255ed817e7'

// GET EXAMPLE REQUEST

export function getApiExample({
  onSuccess = (data: any) => {},
  onError = (data: any) => {}
}: {
  onSuccess: (data: any) => void,
  onError: (data: any) => void
}) {
  apiWorker({
    url: 'https://www.google.com/',
    method: 'GET',
    onSuccess,
    onError,
    bearer: token
  })
}

// POST EXAMPLE REQUEST

export function postApiExample({
  options,
  onSuccess = (data: any) => {},
  onError = (data: any) => {}
}: {
  onSuccess: (data: any) => void,
  onError: (data: any) => void
}) {
  apiWorker({
    url: 'https://www.google.com/',
    method: 'POST',
    body: options
    onSuccess,
    onError,
    bearer: token
  })
}

```

And using in your useEffect like this:

```js

import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState<any>()
  const payload = {
  name: "Leonardo",
  age: 18
}

  useEffect(() => {

    getApiExample({
        onSuccess: (data) => {
          setData(data)
        },
        onError: (err) => console.log(err)
    })


    postApiExample({
        options: payload ,
        onSuccess: (data) => {
          setData(data)
        },
        onError: (err) => console.log(err)
    })


  }, [])

  return (
    <div className="App"></div>
  )
}
```
