/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import {
  FiShoppingBag,
  FiShoppingCart,
  FiLayers,
  FiTag,
  FiUmbrella,
  FiBookOpen,
} from "react-icons/fi";
import {
  AiOutlineShoppingCart,
  AiOutlineProject,
  AiOutlineDashboard,
} from "react-icons/ai";
import {
  BsKanban,
  BsBarChart,
  BsBoxSeam,
  BsCurrencyDollar,
  BsShield,
  BsChatLeft,
  BsShopWindow,
} from "react-icons/bs";
import { BiColorFill } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";
import { RiContactsLine, RiStockLine } from "react-icons/ri";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { GiLouvrePyramid } from "react-icons/gi";
import { GrLocation } from "react-icons/gr";

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "ecommerce",
        path: "/",
        icon: <AiOutlineDashboard />,
      },
    ],
  },
  {
    title: "Committment",
    links: [
      {
        name: "food menu",
        path: "/menu",
        icon: <FiShoppingBag />,
      },
    ],
  },
  {
    title: "Orders",
    links: [
      {
        name: "internal",
        path: "/internal-orders",
        icon: <FiShoppingCart />,
      },
      {
        name: "external",
        path: "/orders",
        icon: <BsShopWindow />,
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        name: "brands",
        path: "/brands",
        icon: <FiUmbrella />,
      },
      {
        name: "categories",
        path: "/categories",
        icon: <FiLayers />,
      },
      {
        name: "classifications",
        path: "/classifications",
        icon: <FiBookOpen />,
      },
      {
        name: "tags",
        path: "/tags",
        icon: <FiTag />,
      },
      {
        name: "products",
        path: "/products",
        icon: <AiOutlineProject />,
      },
    ],
  },
  {
    title: "Admin",
    links: [
      {
        name: "modules",
        path: "/modules",
        icon: <AiOutlineShoppingCart />,
      },
      {
        name: "employees",
        path: "/employees",
        icon: <IoMdContacts />,
      },
      {
        name: "roles",
        path: "/roles",
        icon: <BiColorFill />,
      },
    ],
  },
];
