import mongoose, { Schema, Model } from "mongoose";
import categories from "@utils/categories";

export interface NewProduct {
  title: string;
  description: string;
  bulletPoints?: string[];
  thumbnail: { url: string; id: string };
  images?: { url: string; id: string }[];
  quantity: number;
  category: string;
  price: {
    base: number;
    discounted: number;
  };
}

// Step 1: Define the TypeScript interface for the document
interface ProductDocument extends NewProduct {
  // Define a virtual property for 'sale'
  sale: number;
}

// Step 2: Create the Mongoose schema
const productSchema = new Schema<ProductDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bulletPoints: { type: [String] },
    thumbnail: {
      type: Object,
      required: true,
      url: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        id: {
          type: String,
          required: true,
        },
      },
    ],
    price: {
      base: {
        type: Number,
        required: true,
      },
      discounted: {
        type: Number,
        required: true,
      },
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [...categories],
      required: true,
    },
  },
  { timestamps: true }
);

// Step 3: Define a virtual property 'sale'
productSchema.virtual("sale").get(function (this: ProductDocument) {
  return Math.round(
    ((this.price.base - this.price.discounted) / this.price.base) * 100
  );
});

// Step 4: Export the model, creating it if it doesn't exist

const ProductModel =
  mongoose.models.Product ||
  mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel as Model<ProductDocument>;
