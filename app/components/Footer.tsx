import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className="bg-gradient-to-r from-blue-300 to-pink-100 text-black p-4 mt-5 rounded-lg">
      <div className="container mx-auto text-center">
        <p className="text-sm" style={{ marginBottom: 7 }}>
          <Link className="text-lg" href="/contact">
            Contact us
          </Link>
        </p>
        <p className="text-sm" style={{ marginBottom: 5, marginTop: 5 }}>
          <Link className="text-sm mr-4 md:text-lg" href="/refund-policy">
            15-Day Refund Policy
          </Link>
          |
          <Link className="text-sm ml-4 md:text-lg" href="/selling-conditions">
            Selling Conditions
          </Link>
        </p>
        <p className="text-sm" style={{ marginBottom: 5 }}>
          <span className="flex items-center justify-center mb-2">
            Accepted credit cards :
            <FontAwesomeIcon
              className="h-10 md:h-12 w-auto ml-4 text-green-700"
              icon={faCcVisa}
            />
            <FontAwesomeIcon
              className="h-10 md:h-12 w-auto ml-4 text-red-600"
              icon={faCcMastercard}
            />
            <FontAwesomeIcon
              className="h-10 md:h-12 w-auto ml-4 text-blue-600"
              icon={faCcAmex}
            />
          </span>
        </p>
        <p> Shipping within 48 hours</p>
      </div>
    </div>
  );
}
