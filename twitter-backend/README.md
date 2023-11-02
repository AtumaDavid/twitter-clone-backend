# Twitter Backend API With Express, Typescript and Prisma

**Using Passwordless Authentication**

**Dependencies**

- express
- @prisma/client (connect to prisma)
- jsonwebtoken

**Dev dependencies**

- ts-node
- nodemon
- @types/node
- @types/express
- prisma
- @types/jsonwebtoken

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

- `User Provides Email`: To log in, the user provides their email address through the "/login" page.
- `Create New User`: If the user is new (i.e., their email is not in the system), the backend creates a new user profile for them.
- `Generate Email Token`: The backend generates a unique email token for this login attempt and stores it in the database. This token is like a temporary key that proves the user's identity.
- `Send Email Token`: The email token is sent to the user's email address. This is typically done using a service like `AWS SES (Simple Email Service)`. The token is a one-time code that the user needs to verify their identity.
- `User Receives Token`: The user checks their email, receives the token, and copies it.
- `User Provides Token`: The user then pastes the token into the application.
- `Authentication Request`: The application sends a request to the "/authenticate" endpoint, including the user's email and the email token they copied from their email.
- `Backend Verification`: The backend checks if the email provided in the "/authenticate" request matches the one in the database and if the token is valid and hasn't expired.
- `Generate Long-Lived JWT Token`: If the email and token match and are valid, the backend generates a long-lived JWT (JSON Web Token) token. This token is like a digital key that proves the user's identity and grants them access to the application without needing a password.
- `Token Storage`: The long-lived JWT token is typically stored on the user's device. This can be done securely using techniques like HTTP cookies or local storage in web applications, or in the app's secure storage for mobile applications. The token is sent with each subsequent request to the server as a proof of the user's authenticated status.
- `Access to Resources`: With the long-lived JWT token, the user gains access to the application's resources, features, or data. They are considered authenticated and authorized based on the information contained in the token. For each request to protected resources, the token is sent as part of the request, and the server validates it to ensure that the user has the necessary permissions.
- `Token Refresh`: JWT tokens have an expiration time, so when the token nears its expiration, the client application (e.g., web browser or mobile app) can request a token refresh. This typically involves sending the existing token to a dedicated endpoint on the server. If the token is still valid, the server issues a new JWT token with a fresh expiration time, allowing the user to remain logged in without having to reauthenticate. If the token has expired, the user will be prompted to log in again.
- `Log Out`: Users can log out of the application by either explicitly logging out or allowing their token to expire. When they log out, their long-lived JWT token is invalidated, and they lose access to the application's protected resources.
- `Security Measures`: To enhance security, the system should implement measures to protect against token theft or abuse, such as using HTTPS to encrypt communication, securing the storage of tokens, and implementing rate limiting and other security features on authentication and token-related endpoints.
