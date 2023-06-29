"use client";
import { useState, useEffect, useContext } from "react";
import styles from "./Orders.module.css";
import { OrderDetails } from "@/utils/dataTypes";
import { fetch_user_orders_url } from "@/utils/routes";
import AuthContext from "../context/user-context";
import { useRouter } from "next/navigation";
import { Skeleton } from "@mui/material";
import OrderRectangle from "../components/OrdersComponents/OrderRectangle";

export const metadata = {
  title: "Orders",
  description: "See your orders here",
};

const Orders = () => {
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    try {
      const fetchOrders = async () => {
        setLoading(true);
        const response = await fetch(fetch_user_orders_url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.token}`,
          },
        });
        if (response.statusText === "Unauthorized") {
          setLoading(false);
          authCtx.setMessage("Please login to see your orders");
          authCtx.setSeverity("info");
          authCtx.setOpen(true);
          authCtx.logout();
          router.replace("/");
          return;
        }
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        // sort orders by date in descending order
        data.sort((a: OrderDetails, b: OrderDetails) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        setOrders(data);
        setLoading(false);
      };
      fetchOrders();
    } catch (err) {
      console.log(err);
      authCtx.setMessage("Something went wrong");
      authCtx.setSeverity("error");
      authCtx.setOpen(true);
    }
  }, [authCtx.token]);

  return (
    <>
      {loading ? (
        <div className={styles.skeletonContainer}>
          <Skeleton
            variant="rectangular"
            width={300}
            height={300}
            style={{ marginBottom: "1rem" }}
          />
          <Skeleton
            variant="rectangular"
            width={300}
            height={300}
            style={{ marginBottom: "1rem" }}
          />
          <Skeleton
            variant="rectangular"
            width={300}
            height={300}
            style={{ marginBottom: "1rem" }}
          />
        </div>
      ) : (
        <>
          <h2 className={styles.heading}>Your Orders</h2>
          <div className={styles.container}>
            {orders?.map((order, index) => (
              <OrderRectangle key={index} order={order} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Orders;
