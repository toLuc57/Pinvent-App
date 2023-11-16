import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { TbReceipt } from "react-icons/tb";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Product",
    icon: <TbReceipt />,
    childrens: [
      {
        title: "View",
        path: "/products",
      },
      {
        title: "Add Product",
        icon: <BiImageAdd />,
        path: "/add-product",
      },
    ],
  },
  {
    title: "Transaction",
    icon: <TbReceipt />,
    childrens: [
      {
        title: "View",
        path: "/transactions",
      },
      {
        title: "Add Transaction",
        path: "/add-transaction",
      },
    ],
  },
  {
    title: "Store",
    icon: <TbReceipt />,
    childrens: [
      {
        title: "View",
        path: "/stores",
      },
      {
        title: "Add Store",
        path: "/add-store",
      },
    ],
  },
  {
    title: "Staff",
    icon: <TbReceipt />,
    childrens: [
      {
        title: "View",
        path: "/staffs",
      },
      {
        title: "Add Staff",
        path: "/add-staff",
      },
    ],
  },
  {
    title: "Supplier",
    icon: <TbReceipt />,
    childrens: [
      {
        title: "View",
        path: "/suppliers",
      },
      {
        title: "Add Suppliers",
        path: "/add-supplier",
      },
    ],
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;
