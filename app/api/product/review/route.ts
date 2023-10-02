import { ReviewRequestBody } from "@app/types";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { Types, isValidObjectId } from "mongoose";
import startDb from "@lib/db";
import ReviewModel from "@models/reviewModel";
import ProductModel from "@models/productModel";

export const POST = async (req: Request) => {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorizes request!" },
        { status: 401 }
      );
    }

    const { productId, comment, rating } =
      (await req.json()) as ReviewRequestBody;
    if (!isValidObjectId(productId)) {
      return NextResponse.json(
        { error: "Invalid product id!" },
        { status: 401 }
      );
    }

    if (rating <= 0 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating!" }, { status: 401 });
    }

    const userId = session.user.id;

    const data = {
      userId,
      rating,
      comment,
      product: productId,
    };

    await startDb();

    await ReviewModel.findOneAndUpdate({ userId, product: productId }, data, {
      upsert: true,
    });

    await updateProductRating(productId);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong, could not update review!" },
      { status: 401 }
    );
  }
};

const updateProductRating = async (productId: string) => {
  const [result] = await ReviewModel.aggregate([
    { $match: { product: new Types.ObjectId(productId) } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  if (result?.averageRating) {
    await ProductModel.findByIdAndUpdate(productId, {
      rating: result.averageRating,
    });
  }
};
