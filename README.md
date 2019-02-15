# Made with ❤️ in `country-name` Badges

![Made with love in India](https://madewithlove.now.sh/in?heart=true)

> A mircoservice for serving and listing the "Made with love in" badge.

Provides a quick and easy way to add the "Made with love in `country-name`" badge to show off your project's country of origin!

## About

I built this project primarily to understand how to implement small-scale and simple APIs, especially using [now.sh](https://now.sh) and it's serverless deployments.

Also, I believe this is a cute way to show where you are from or where you built your project.

## Usage

```
GET /list
GET /:countryCode

e.g. GET /in
    GET /gb?heart=true&flag=true
    GET /us?colorA=lightgreen&colorB=red&text=USA
```

### API

The code is essentially a wrapper around the [gh-badges](https://www.npmjs.com/package/gh-badges) library.

---

## License

Copyright (c) Mihir Chaturvedi. All rights reserved.

Licensed under the [MIT](LICENSE) License.
