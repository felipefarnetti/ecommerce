import { NextResponse, NextRequest } from "next/server";
const nodemailer = require("nodemailer");

// Handles POST requests to /api

export async function POST(request: NextRequest) {
  const username = process.env.MAILTRAP_USERNAME;
  const password = process.env.MAILTRAP_PASSWORD;
  const myEmail = process.env.PERSONAL_EMAIL;
  const host = process.env.HOST_EMAIL;
  const port = process.env.PORT_EMAIL;

  // console.log("dealing with request");

  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // create transporter object
  const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    const mail = await transporter.sendMail({
      from: myEmail,
      to: email,
      replyTo: email,
      subject: `Website activity from ${email}`,
      html: `
      <table style="width: 100%; border-collapse: collapse;">
      <tbody>
        <tr>
          <td style="width: 20%; padding: 5px; border: 1px solid #ccc;">Nom :</td>
          <td style="width: 80%; padding: 5px; border: 1px solid #ccc;">${name}</td>
        </tr>
        <tr>
          <td style="width: 20%; padding: 5px; border: 1px solid #ccc;">Email :</td>
          <td style="width: 80%; padding: 5px; border: 1px solid #ccc;">${email}</td>
        </tr>
        <tr>
          <td style="width: 20%; padding: 5px; border: 1px solid #ccc;">Message :</td>
          <td style="width: 80%; padding: 5px; border: 1px solid #ccc;">${message}</td>
        </tr>
      </tbody>
    </table>
            `,
    });

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: "COULD NOT SEND MESSAGE" }, { status: 500 });
  }
}
