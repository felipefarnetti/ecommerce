import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import crypto from "crypto";

import EmailVerificationToken from "@models/emailVerificationToken";
import UserModel from "@models/userModel";
import { EmailVerifyRequest } from "@app/types";
import { sendEmail } from "@lib/email";
import startDb from "@lib/db";

export const POST = async (req: Request) => {
  try {
    const { userId, token } = (await req.json()) as EmailVerifyRequest;

    if (!isValidObjectId(userId || !token)) {
      return NextResponse.json(
        {
          error: "Invalid request, userId and token is required!",
        },
        { status: 401 }
      );
    }

    const verificationToken = await EmailVerificationToken.findOne({
      user: userId,
    });
    if (!verificationToken) {
      return NextResponse.json(
        {
          error: "Invalid token",
        },
        { status: 401 }
      );
    }

    const isMatched = await verificationToken.compareToken(token);
    if (!isMatched) {
      return NextResponse.json(
        {
          error: "Invalid request, token doesn't match",
        },
        { status: 401 }
      );
    }
    await UserModel.findByIdAndUpdate(userId, { verified: true });
    await EmailVerificationToken.findByIdAndDelete(verificationToken._id);

    return NextResponse.json(
      { message: "Your email is verified" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Could not verify your email, something went wrong!" },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    const userId = req.url.split("?userId=")[1];
    if (!isValidObjectId(userId))
      return NextResponse.json(
        { error: "Invalid request, user Id missing!" },
        { status: 401 }
      );
    await startDb();

    const user = await UserModel.findById(userId);
    if (!user)
      return NextResponse.json(
        { error: "Invalid request, user not found!" },
        { status: 401 }
      );

    if (user.verified)
      return NextResponse.json(
        { error: "Invalid request, user already verified!" },
        { status: 401 }
      );

    const token = crypto.randomBytes(36).toString("hex");
    await EmailVerificationToken.findOneAndDelete({ user: userId });
    await EmailVerificationToken.create({
      user: userId,
      token,
    });

    const verificationUrl = `${process.env.VERIFICATION_URL}?token=${token}&userId=${userId}`;

    await sendEmail({
      profile: { name: user.name, email: user.email },
      subject: "verification",
      linkUrl: verificationUrl,
    });

    return NextResponse.json(
      { message: "Please check your email" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Could not verify your email, something went wrong!" },
      { status: 500 }
    );
  }
};
