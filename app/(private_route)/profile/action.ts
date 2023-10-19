"use server";

import startDb from "@lib/db";
import { UserProfileToUpdate } from "@app/types";
import UserModel from "@models/userModel";

export const UpdateUserProfile = async (info: UserProfileToUpdate) => {
  try {
    await startDb();
    await UserModel.findByIdAndUpdate(info.id, {
      name: info.name,
      avatar: info.avatar,
    });
  } catch (error) {
    // console.log("Error while updating the user");

    throw error;
  }
};
