import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const EMAIL_TOKEN_EXPIRATION_IN_MINUTES = 10;
const AUTHENTICATION_EXPIRATION_HOURS = 12;
const JWT_SECRET = "SUPER SECRET";

const authRouter = Router();
const prisma = new PrismaClient();

// Generate a random 8 digit number as the email token
function generateEmailToken(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

function generateAuthToken(tokenId: number): string {
  const jwtPayload = { tokenId };
  return jwt.sign(jwtPayload, JWT_SECRET, {
    algorithm: "HS256",
    noTimestamp: true,
  });
}

//Create user if it doesnt exist
// Generate emailToken and send to their email
authRouter.post("/login", async (req, res) => {
  const { email } = req.body;

  //generate token
  const emailToken = generateEmailToken();
  const expiration = new Date(
    new Date().getTime() + EMAIL_TOKEN_EXPIRATION_IN_MINUTES * 60 * 1000
  );

  try {
    const createdToken = await prisma.token.create({
      data: {
        type: "EMAIL",
        emailToken,
        expiration,
        user: {
          connectOrCreate: {
            where: { email }, //check if user exists
            create: { email }, //create new user
          },
        },
      },
    });
    console.log(createdToken);

    //send email token to user email

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "could not continue with the authentication" });
  }
});

// Validate email token
// Generate a long-lived JWT Token
authRouter.post("/authenticate", async (req, res) => {
  const { email, emailToken } = req.body; //---loginin with email and emailToken in "/auth/authenticate"
  //   console.log(email, emailToken);

  const dbEmailToken = await prisma.token.findUnique({
    where: {
      emailToken,
    },
    include: {
      user: true,
    },
  });
  //   console.log(dbEmailToken);

  //   check if toekn exist and is valid.
  if (!dbEmailToken || !dbEmailToken.valid) {
    return res.sendStatus(401);
  }

  //   if token is expired.
  if (dbEmailToken.expiration < new Date()) {
    return res.status(401).json({ error: "Token expired" });
  }

  // if email does not match where token was sent to.
  if (dbEmailToken?.user?.email != email) {
    return res.sendStatus(401);
  }

  //   Here we validate that the user is the owner of the email

  // generate an API token
  const expiration = new Date(
    new Date().getTime() + AUTHENTICATION_EXPIRATION_HOURS * 60 * 60 * 1000
  );

  const apiToken = await prisma.token.create({
    data: {
      type: "API",
      expiration,
      user: {
        connect: {
          email,
        },
      },
    },
  });

  //   invalidate email token
  await prisma.token.update({
    where: { id: dbEmailToken.id },
    data: { valid: false },
  });

  //   generate the JWT token
  const authToken = generateAuthToken(apiToken.id);

  res.json({ authToken });
});

export default authRouter;
