import startDb from "@lib/db";
import { UpdatePasswordRequest } from "@app/types";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import PasswordResetToken from "@models/passwordResetToken";
import UserModel from "@models/userModel";
import { sendEmail } from "@lib/email";

export const POST = async (req: Request) => {
  try {
    const { password, token, userId } =
      (await req.json()) as UpdatePasswordRequest;
    if (!password || !token || !isValidObjectId(userId))
      return NextResponse.json({ error: "Invalid request!" }, { status: 401 });

    await startDb();

    const resetToken = await PasswordResetToken.findOne({ user: userId });
    if (!resetToken)
      return NextResponse.json(
        { error: "Unauthorized request!" },
        { status: 401 }
      );

    const matched = await resetToken.compareToken(token);
    if (!matched)
      return NextResponse.json(
        { error: "Unauthorized request!" },
        { status: 401 }
      );

    const user = await UserModel.findById(userId);
    if (!user)
      return NextResponse.json({ error: "User not found!" }, { status: 404 });

    const isMatched = await user.comparePassword(password);
    if (isMatched) {
      return NextResponse.json(
        { error: "New password must be different" },
        { status: 401 }
      );
    }

    user.password = password;
    await user.save();

    await PasswordResetToken.findByIdAndDelete(resetToken._id);

    await sendEmail({
      profile: { name: user.name, email: user.email },
      subject: "password-changed",
    });

    return NextResponse.json({ message: "Your password is now changed." });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not update password, something went wrong!" },
      { status: 500 }
    );
  }
};
