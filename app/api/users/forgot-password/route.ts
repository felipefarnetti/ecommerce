import { NextResponse } from "next/server";
import crypto from "crypto";
import UserModel from "@models/userModel";
import startDb from "@lib/db";
import { ForgetPasswordRequest } from "@app/types";
import PasswordResetToken from "@models/passwordResetToken";
import { sendEmail } from "@lib/email";

export const POST = async (req: Request) => {
  try {
    const { email } = (await req.json()) as ForgetPasswordRequest;
    if (!email)
      return NextResponse.json({ error: "Invalid email!" }, { status: 401 });

    await startDb();

    const user = await UserModel.findOne({ email });
    if (!user)
      return NextResponse.json({ error: "User not found!" }, { status: 404 });

    // Generate the token and send the link to the given email

    ////// si ne marche en pas en bas faut changer
    // await PasswordResetToken.deleteOne({ user: user._id });

    await PasswordResetToken.findOneAndDelete({ user: user._id });

    const token = crypto.randomBytes(36).toString("hex");
    await PasswordResetToken.create({
      user: user._id,
      token,
    });

    // Send the link to the given email

    const resetPassLink = `${process.env.PASSWORD_RESET_URL}?token=${token}&userId=${user._id}`;

    await sendEmail({
      profile: { name: user.name, email: user.email },
      subject: "forget-password",
      linkUrl: resetPassLink,
    });

    return NextResponse.json({ message: "Please check your email." });
  } catch (error) {
    return NextResponse.json(
      { error: (error as any).message },
      { status: 500 }
    );
  }
};
