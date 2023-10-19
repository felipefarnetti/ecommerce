"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import {
  Squares2X2Icon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  SparklesIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import SignOutButton from "@components/SignOutButton";

interface Props {
  children: ReactNode;
}

const AdminSidebar = ({ children }: Props) => {
  return (
    <div className="flex">
      <div className="flex flex-col justify-between bg-cyan-600 h-screen sticky top-0 w-36 p-4">
        <ul className="space-y-4 text-white">
          <li>
            <Link
              className="font-semibold text-lg text-white"
              href="/dashboard"
            >
              Ecommerce
            </Link>
          </li>
          <li>
            <Link className="flex items-center space-x-1" href="/dashboard">
              <Squares2X2Icon className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <hr className="w-full " />
          </li>
          <li>
            <Link className="flex items-center space-x-1" href="/products">
              <ShoppingCartIcon className="w-4 h-4" />
              <span>Products</span>
            </Link>
            <hr className="w-full " />
          </li>
          <li>
            <Link
              className="flex items-center space-x-1"
              href="/products/featured/add"
            >
              <SparklesIcon className="w-4 h-4" />
              <span>Featured</span>
            </Link>
            <hr className="w-full " />
          </li>
          <li>
            <Link className="flex items-center space-x-1" href="/sales">
              <CurrencyDollarIcon className="w-4 h-4" />
              <span>Sales</span>
            </Link>
            <hr className="w-full " />
          </li>
          <li>
            <Link className="flex items-center space-x-1" href="/orders">
              <ShoppingBagIcon className="h-4 w-4" />
              <span>Orders</span>
            </Link>
            <hr className="w-full mb-10 " />
          </li>
          <li>
            <SignOutButton>
              <div className="cursor-pointer">Logout</div>
            </SignOutButton>
          </li>
          <li>
            <Link className="cursor-pointer" href="/">
              <button className="w-16 h-8 mt-4 text-black bg-white border-black border rounded-md">
                Return
              </button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="max-w-screen-xl mx-auto flex-1 p-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminSidebar;

// "use client";

// import Link from "next/link";
// import React, { ReactNode, useState } from "react";
// import {
//   Squares2X2Icon,
//   CurrencyDollarIcon,
//   ShoppingCartIcon,
//   SparklesIcon,
//   ShoppingBagIcon,
// } from "@heroicons/react/24/outline";
// import SignOutButton from "@components/SignOutButton";

// interface Props {
//   children: ReactNode;
// }

// const AdminSidebar = ({ children }: Props) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="flex">
//       <div
//         className={`${
//           sidebarOpen ? "w-42" : "w-1"
//         } flex flex-col justify-between bg-cyan-600 h-screen sticky top-0 p-4 transition-all ease-in-out duration-300`}
//       >
//         {sidebarOpen ? (
//           <ul className="space-y-4 text-white">
//             <li>
//               <Link
//                 className="font-semibold text-lg text-white"
//                 href="/dashboard"
//               >
//                 Backoffice
//               </Link>
//             </li>
//             <li>
//               <Link className="flex items-center space-x-1" href="/dashboard">
//                 <Squares2X2Icon className="w-4 h-4" />
//                 <span>Dashboard</span>
//               </Link>
//               <hr className="w-full " />
//             </li>
//             <li>
//               <Link className="flex items-center space-x-1" href="/products">
//                 <ShoppingCartIcon className="w-4 h-4" />
//                 <span>Products</span>
//               </Link>
//               <hr className="w-full " />
//             </li>
//             <li>
//               <Link
//                 className="flex items-center space-x-1"
//                 href="/products/featured/add"
//               >
//                 <SparklesIcon className="w-4 h-4" />
//                 <span>Featured</span>
//               </Link>
//               <hr className="w-full " />
//             </li>
//             <li>
//               <Link className="flex items-center space-x-1" href="/sales">
//                 <CurrencyDollarIcon className="w-4 h-4" />
//                 <span>Sales</span>
//               </Link>
//               <hr className="w-full " />
//             </li>
//             <li>
//               <Link className="flex items-center space-x-1" href="/orders">
//                 <ShoppingBagIcon className="h-4 w-4" />
//                 <span>Orders</span>
//               </Link>
//               <hr className="w-full " />
//             </li>
//           </ul>
//         ) : null}

//         <div
//           className="text-white text-2xl cursor-pointer"
//           onClick={toggleSidebar}
//         >
//           {sidebarOpen ? (
//             // Show the arrow icon when the sidebar is open
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 inline"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           ) : (
//             // Show the hamburger icon when the sidebar is closed
//             <span>☰</span>
//           )}
//         </div>

//         <div>
//           <SignOutButton>
//             <div className="cursor-pointer text-black mb-2">Logout</div>
//           </SignOutButton>
//           <Link className="cursor-pointer text-black mb-2" href="/">
//             Return
//           </Link>
//         </div>
//       </div>
//       <div className="max-w-screen-xl mx-auto flex-1 p-4 overflow-y-auto">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;
