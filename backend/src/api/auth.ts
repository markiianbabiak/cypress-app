import { Router, Request, Response, RequestHandler } from "express";
import dalUser from "../repository/dalUser";
import bcrypt from "bcrypt";
import { addHours, getJWTSecret, userToToken } from "../utils/auth";
import { sign, verify } from "jsonwebtoken";
import { UserModel } from "../models/User";

const router = Router();

const getByUserIdHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const user = await dalUser.findByUserID(id);

  if (!user) {
    res.sendStatus(404);
  }

  res.status(200).send(user);
};

router.get("/:id", getByUserIdHandler);

const loginHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).end("Email and password are required.");
    return;
  }

  const foundUser = await dalUser.findByEmail(email);
  if (!foundUser) {
    res.status(404).end("Invalid email. Please try again.");
    return;
  }

  const isValidPassword =
    foundUser && (await bcrypt.compare(password, foundUser.password));
  if (!isValidPassword) {
    res.status(403).end("Invalid password. Please try again.");
    return;
  }

  const user = userToToken(foundUser!);
  const token = sign(user, getJWTSecret(), { expiresIn: "5h" });
  const expiresAt = addHours(5);

  res.status(200).send({ token, user, expiresAt });
  return;
};

router.post("/login", loginHandler);

const registerHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const body = req.body;

  const exists = await dalUser.findByEmail(body.email);
  if (exists) {
    res.status(400).send({ message: "Email already in use." });
    return;
  }

  const savedUser = await dalUser.create(body);

  const user = userToToken(savedUser);
  const token = sign(user, getJWTSecret(), { expiresIn: "5h" });
  const expiresAt = addHours(5);

  res.status(200).send({ token, user, expiresAt });
};

router.post("/register", registerHandler);

const updateHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userID = req.params.userID;
  const user: Partial<UserModel> = req.body;

  if (user.password) {
    const savedUser = await dalUser.updatePassword(userID, user.password);
    res.status(200).send({ savedUser });
  } else {
    const savedUser = await dalUser.update(userID, user);
    res.status(200).send({ savedUser });
  }
};
router.post("/:userID", updateHandler);

const passwordCheckHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userID = req.params.userID;
  const { password } = req.body;

  const foundUser = await dalUser.findByUserID(userID);

  const isValidPassword =
    foundUser && (await bcrypt.compare(password, foundUser.password));
  if (!isValidPassword) {
    res.status(403).end("Invalid password. Please try again.");
    return;
  } else {
    res.status(200).send(true);
  }
};

router.post("/checkPassword/:userID", passwordCheckHandler);

export default router;
