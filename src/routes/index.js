/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import { lazy } from "react";

const Login = lazy(() => import("../views/auth/Login"));
const Modules = lazy(() => import("../views/modules/Modules"));
const Ecommerce = lazy(() => import("../pages/Ecommerce"));
const Roles = lazy(() => import("../views/modules/Roles"));
const Employees = lazy(() => import("../views/modules/Employees"));
const Tags = lazy(() => import("../views/modules/Tags"));
const Categories = lazy(() => import("../views/modules/Categories"));
const Brand = lazy(() => import("../views/modules/Brand"));
const Classifications = lazy(() => import("../views/modules/Classifications"));
const Products = lazy(() => import("../views/modules/Products"));
const Product = lazy(() => import("../views/modules/Product"));
const Menu = lazy(() => import("../views/modules/Menu"));
const Checkout = lazy(() => import("../views/modules/Checkout"));
const InternalOrders = lazy(() => import("../views/modules/InternalOrders"));
const OrderDetails = lazy(() => import("../views/modules/OrderDetails"));
const Orders = lazy(() => import("../views/modules/Orders"));

export const routes = {
  guest: [
    {
      name: "Login",
      component: <Login />,
      path: "/auth/login",
    },
  ],
  protected: [
    {
      name: "Dashboard",
      component: <Ecommerce />,
      path: "/",
    },
    {
      name: "Modules",
      component: <Modules />,
      path: "/modules",
    },
    {
      name: "Roles",
      component: <Roles />,
      path: "/roles",
    },
    {
      name: "Employees",
      component: <Employees />,
      path: "/employees",
    },
    {
      name: "Tags",
      component: <Tags />,
      path: "/tags",
    },
    {
      name: "Categories",
      component: <Categories />,
      path: "/categories",
    },
    {
      name: "Brands",
      component: <Brand />,
      path: "/brands",
    },
    {
      name: "Classifications",
      component: <Classifications />,
      path: "/classifications",
    },
    {
      name: "Products",
      component: <Products />,
      path: "/products",
    },
    {
      name: "Product Details",
      component: <Product />,
      path: "/products/:id",
    },
    {
      name: "Create Product",
      component: <Product />,
      path: "/products/create",
    },
    {
      name: "Food Menu",
      component: <Menu />,
      path: "/menu",
    },
    {
      name: "Checkout",
      component: <Checkout />,
      path: "/checkout",
    },
    {
      name: "Internal Orders",
      component: <InternalOrders />,
      path: "/internal-orders",
    },
    {
      name: "External Order Summary",
      component: <OrderDetails />,
      path: "/internal-orders/:id",
    },
    {
      name: "Orders",
      component: <Orders />,
      path: "/orders",
    },
  ],
};
