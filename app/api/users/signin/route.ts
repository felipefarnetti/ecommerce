import startDb from "@lib/db";
import UserModel from "@models/userModel";
import { SignInCredentials } from "@app/types";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { email, password } = (await req.json()) as SignInCredentials;

  if (!email || !password)
    return NextResponse.json({
      error: "Invalid request, email or password missing!",
    });

  await startDb();

  // Convert the provided email to lowercase (or uppercase)
  const lowerCaseEmail = email.toLowerCase();

  // Find the user using the lowercase email
  const user = await UserModel.findOne({ email: lowerCaseEmail });
  if (!user)
    return NextResponse.json({
      error: "Email or password mismatch!",
    });

  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch)
    return NextResponse.json({
      error: "Email or password mismatch!",
    });

  return NextResponse.json({
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
      avatar: user.avatar?.url,
    },
  });
};
