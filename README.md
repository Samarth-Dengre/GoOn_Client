# GoOn

GoOn is the perfect platform for your online shopping needs,
offering a unique and innovative approach to ecommerce. With
GoOn, we empower users to choose the shop from which they want to
shop, giving them the flexibility and freedom to explore a wide
range of options.

## Tech Stack

**Client:** NextJS(13.4), Typescript

**Server:** NodeJS, NestJS, MongoDB

**Server Repo**: https://github.com/Samarth-Dengre/GoOn_Server

## Running This project

Go in routes.ts and change host route to your server url.

To install all the packages run this command

```bash
    yarn install
```

add .env file and add a MongoDB url that is same as the url of MongoDB you are using for backend.

```bash
    DATABASE_URL=YOUR_URL
```

Now start the project using

```bash
    yarn dev
```

## Optimizations

1. Made most of the components as **Server** components.
2. For the search bar, used Fuse.js to search the storename.
