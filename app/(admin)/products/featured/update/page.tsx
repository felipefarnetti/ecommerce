import FeaturedProductForm from "@/app/components/FeaturedProductForm";
import startDb from "@lib/db";
import FeaturedProductModel from "@models/featuredProduct";
import { isValidObjectId } from "mongoose";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: { id: string };
}

const fetchFeaturedProduct = async (id: string) => {
  if (!isValidObjectId(id)) return redirect("/404");
  await startDb();
  const product = await FeaturedProductModel.findById(id);
  if (!product) return redirect("/404");

  const { _id, title, banner, link, linkTitle } = product;
  return {
    id: product._id.toString(),
    title,
    banner: banner.url,
    link,
    linkTitle,
  };
};

export default async function UpdateFeaturedProduct({ searchParams }: Props) {
  const { id } = searchParams;
  const product = await fetchFeaturedProduct(id);
  return (
    <div>
      <FeaturedProductForm initialValue={product} />
    </div>
  );
}
