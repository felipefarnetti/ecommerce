import { Document, Model, ObjectId, model, models } from "mongoose";
import { compare, genSalt, hash } from "bcrypt";
import { Schema } from "mongoose";

interface PasswordResetTokenDocument extends Document {
  user: ObjectId;
  token: string;
  createdAt: Date;
}

interface Method {
  compareToken(token: string): Promise<boolean>;
}

const passwordResetTokenSchema = new Schema<
  PasswordResetTokenDocument,
  {},
  Method
>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 24 * 60 * 60,
    },
  },
  {
    timestamps: true,
  }
);

// Hash the token before saving
passwordResetTokenSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("token")) {
      return next();
    }

    const salt = await genSalt(10);
    this.token = await hash(this.token, salt);
    next();
  } catch (error) {
    throw error;
  }
});

// Custom method to compare tokens using bcrypt
passwordResetTokenSchema.methods.compareToken = async function (
  candidateToken: string
): Promise<boolean> {
  try {
    const result = await compare(candidateToken, this.token);
    return result;
  } catch (error) {
    throw error;
  }
};

const PasswordResetToken =
  models.PasswordResetToken ||
  model("PasswordResetToken", passwordResetTokenSchema);
export default PasswordResetToken as Model<
  PasswordResetTokenDocument,
  {},
  Method
>;
