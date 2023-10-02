import OrderModel from "@models/orderModel";
import startDb from "@lib/db";
import React from "react";

const fetchOrders = async () => {
  await startDb();

  const orders = await OrderModel.find().sort("-createdAt").limit(5);
  console.log(orders);
};

export default async function Orders() {
  await fetchOrders();
  return <div>Orders</div>;
}
