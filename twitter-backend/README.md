# Twitter Backend API With Express, Typescript and Prisma

**Using Passwordless Authentication**

**Dependencies**

- express
- @prisma/client (connect to prisma)

**Dev dependencies**

- ts-node
- nodemon
- @types/node
- @types/express
- prisma

**Routes**

`user routes`:

- Create
- Get one tweet
- List
- Update
- Delete

`Tweets routes`:

- Create
- Get one tweet
- List
- Delete

**Build a rest API with Express**

**Use Prisma to model and Interact with the database**

- initialize Prisma Schema: `npx prisma init --datasource-provider sqlite`
- Using sqlite for developement before moving to postgreSql or any other database.
- `npx prisma migrate dev --name "initial"` (after working on the the schema.prisma. "initial"-initial migration)
- `npx prisma studio`: to visualize database layer.
- install prisma client to connect to prisma: `npm install @prisma/client`

**Implement CRUD operations**

**Passwordless Authentication**
