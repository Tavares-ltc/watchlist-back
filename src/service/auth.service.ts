import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth_repository } from "../repositories/auth.repository.js";
import { conflictError } from "../errors/conflict.error.js";
import { unauthorizedError } from "../errors/unauthorized.error.js";

type SignupData = {
  name: string;
  email: string;
  password: string;
  image: string;
};

async function signup(userData: SignupData) {
  const { name, email, password, image } = userData;

  const encryptedPassword = bcrypt.hashSync(password, 10);
  const user = await auth_repository.getUserByEmail(email);

  if (user) {
    throw conflictError("Email already in use");
  }
  return await auth_repository.createUser(
    name,
    email,
    encryptedPassword,
    image
  );
}

async function signin(email: string, password: string) {
  const user = await auth_repository.getUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw unauthorizedError("Email or password is invalid");
  }
  const token = jwt.sign(
    {
      user_id: user.id,
    },
    process.env.TOKEN_SECRET
  );

  await auth_repository.sessionUpsert(user.id, token);

  const userData = { name: user.name, image: user.image, token: token };
  return userData;
}

const auth_service = {
  signup,
  signin,
};
export default auth_service;
