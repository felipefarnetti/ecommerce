import React from "react";

export default function SellingConditions() {
  return (
    <div className="bg-gray-300 text-black p-4 mt-5 rounded-lg text-justify">
      <h1 className="text-lg mb-2">Jewelry Selling Conditions</h1>

      <p className="text-sm">
        These are the selling conditions that apply to all jewelry sales made
        through our website. By placing an order, you agree to be bound by these
        conditions.
      </p>

      <h2 className="text-lg mb-2 mt-6">Contract Formation</h2>

      <p className="text-sm">
        A contract between you and us will be formed when we send you an order
        confirmation email. We may refuse to accept an order for any reason,
        including but not limited to:
      </p>

      <ul className="text-sm mt-4 space-y-2">
        <li className="ml-4 list-disc">The jewelry item is not in stock.</li>
        <li className="ml-4 list-disc">
          The payment information is not valid.
        </li>
        <li className="ml-4 list-disc">
          There is a suspected fraudulent transaction.
        </li>
      </ul>

      <h2 className="text-lg mb-2 mt-6">Payment</h2>

      <p className="text-sm">
        We accept all major credit cards and PayPal. Payment must be made in
        full before your jewelry order is shipped.
      </p>

      <h2 className="text-lg mb-2 mt-6">Shipping</h2>

      <p className="text-sm">
        We offer free shipping on all jewelry orders over $50. Orders under $50
        will be charged a flat shipping fee of $5. Jewelry orders are typically
        shipped within 1-2 business days.
      </p>

      <h2 className="text-lg mb-2 mt-6">Returns</h2>

      <p className="text-sm">
        We offer a 30-day return policy on all jewelry items. If you are not
        satisfied with your purchase for any reason, you can return it for a
        full refund. The jewelry item must be returned in its original packaging
        and in new condition.
      </p>

      <h2 className="text-lg mb-2 mt-6">Jewelry Insurance</h2>

      <p className="text-sm">
        All jewelry items purchased from our website are insured in transit. If
        your jewelry item is lost or damaged during shipping, we will replace it
        or refund your purchase price.
      </p>
    </div>
  );
}
