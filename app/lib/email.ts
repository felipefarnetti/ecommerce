import nodemailer from "nodemailer";

type profile = { name: string; email: string };

interface EmailOptions {
  profile: profile;
  subject: "verification" | "forget-password" | "password-changed";
  linkUrl?: string;
}

const generateMailTransporter = () => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0a501c062cb0b0",
      pass: "3bf1c5361cb373",
    },
  });
  return transport;
};

const sendEmailVerificationLink = async (profile: profile, linkUrl: string) => {
  const transport = generateMailTransporter();

  await transport.sendMail({
    from: "felipefarnetti@gmail.com",
    to: profile.email,
    html: `
    <div style="background-color: #E0E7FF; padding-top: 30px; padding-bottom: 30px; text-align: center; justify-content: center; heigth: 600px">
    <h1 style="font-size: 24px; color: #3B82F6; margin-bottom: 16px;">Please verify your email</h1>
        <p style="text-align: center; margin-bottom: 14px;">Click on the link below to verify your email:</p>
        <a style="color: #2563EB; padding-bottom: 20px" href="${linkUrl}">Verify Email</a>
      </div>
    `,
  });
};

const sendForgetPasswordLink = async (profile: profile, linkUrl: string) => {
  const transport = generateMailTransporter();

  await transport.sendMail({
    from: "felipefarnetti@gmail.com",
    to: profile.email,
    html: `
    <div style="background-color: #E0E7FF; padding-top: 30px; padding-bottom: 30px; text-align: center; justify-content: center; heigth: 600px">
    <h1 style="font-size: 24px; color: #3B82F6; margin-bottom: 16px;">Forget Password</h1>
        <p style="text-align: center; margin-bottom: 14px;">Click on the link below to reset your password:</p>
        <a style="color: #2563EB; padding-bottom: 20px" href="${linkUrl}">Reset Password</a>
      </div>
    `,
  });
};

const sendUpdatePasswordConfirmation = async (profile: profile) => {
  const transport = generateMailTransporter();

  await transport.sendMail({
    from: "felipefarnetti@gmail.com",
    to: profile.email,
    html: `
    <div style="background-color: #E0E7FF; padding-top: 30px; padding-bottom: 30px; text-align: center; justify-content: center; heigth: 600px">
        <h1 style="font-size: 24px; color: #3B82F6; margin-bottom: 16px;">Password Changed</h1>
        <p style="text-align: center; margin-bottom: 14px;">Your password has been changed successfully.</p>
        <a style="color: #2563EB; padding-bottom: 20px" href="${process.env.SIGN_IN_URL}">Sign In</a>
      </div>
    `,
  });
};

export const sendEmail = (options: EmailOptions) => {
  const { profile, subject, linkUrl } = options;

  switch (subject) {
    case "verification":
      return sendEmailVerificationLink(profile, linkUrl!);
    case "forget-password":
      return sendForgetPasswordLink(profile, linkUrl!);
    case "password-changed":
      return sendUpdatePasswordConfirmation(profile);
  }
};
