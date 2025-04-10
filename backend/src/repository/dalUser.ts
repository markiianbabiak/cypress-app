import User, { UserModel } from "../models/User";
import bcrypt from "bcrypt";
import { FilterQuery } from "mongoose";

export const findByUserID = async (userID: string) => {
  try {
    const user: UserModel | null = await User.findOne({ userID: userID });
    return user;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

export const findByUserIDs = async (
  userIDs: string[],
  filter?: FilterQuery<UserModel>
) => {
  try {
    const users: UserModel[] = await User.find({
      userID: { $in: userIDs },
      ...filter,
    });
    return users;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

export const findByUsername = async (username: string) => {
  try {
    const user: UserModel | null = await User.findOne({ username });
    return user;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

export const findByEmail = async (email: string) => {
  try {
    const user: UserModel | null = await User.findOne({ email });
    return user;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

export const create = async (user: UserModel) => {
  try {
    const hashedPassword = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10)
    );
    user.password = hashedPassword;

    const savedUser = await User.create(user);
    return savedUser;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

export const update = async (id: string, user: Partial<UserModel>) => {
  try {
    const updated = await User.findOneAndUpdate({ userID: id }, user, {
      new: true,
    });
    return updated;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

export const findByPasswordResetToken = async (
  token: string
): Promise<UserModel | null> => {
  try {
    const user: UserModel | null = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }, // Check that token is not expired
    });
    return user;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

export const updatePassword = async (
  userID: string,
  newPassword: string
): Promise<UserModel | null> => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password

    const updatedUser = await User.findOneAndUpdate(
      { userID },
      {
        password: hashedPassword,
        // resetPasswordToken: null, // Clear the token
        // resetPasswordExpires: null, // Clear the expiration
      },
      { new: true } // Return the updated document
    );

    return updatedUser;
  } catch (err) {
    throw new Error(JSON.stringify(err, null, " "));
  }
};

const dalUser = {
  findByUserID,
  findByUserIDs,
  findByUsername,
  findByEmail,
  create,
  update,
  findByPasswordResetToken,
  updatePassword,
};

export default dalUser;
