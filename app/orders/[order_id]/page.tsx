"use client";
import { useEffect, useContext, useState } from "react";
import styles from "./OrderDetails.module.css";
import Summary from "../../components/OrdersComponents/Summary";
import AuthContext from "@/app/context/user-context";
import { OrderDetails } from "@/utils/dataTypes";
import { fetch_user_orders_url } from "@/utils/routes";
import { Skeleton } from "@mui/material";
import ItemContainer from "@/app/components/OrdersComponents/ItemContainer";
import Head from "next/head";

const OrderDetails = ({
  params,
}: {
  params: {
    order_id: string;
  };
}) => {
  const authCtx = useContext(AuthContext);
  const [order, setOrder] = useState<OrderDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const getOrder = async () => {
        const response = await fetch(
          `${fetch_user_orders_url}/${params.order_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authCtx.token}`,
            },
          }
        );
        if (response.statusText === "Unauthorized") {
          authCtx.setMessage("Please login to see your orders");
          authCtx.setSeverity("info");
          authCtx.setOpen(true);
          authCtx.logout();
          return;
        }
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setOrder(data);
        setIsLoading(false);
      };
      getOrder();
    } catch (err) {
      console.log(err);
      authCtx.setMessage("Something went wrong");
      authCtx.setSeverity("error");
      authCtx.setOpen(true);
    }
  }, [authCtx.token]);

  return (
    <>
      <Head>
        <title>Order Details</title>
        <meta name="description" content="Order Details" />
      </Head>

      <div className={styles.container}>
        {isLoading ? (
          <>
            <Skeleton variant="rectangular" width={800} height={200} />
            <Skeleton variant="rectangular" width={800} height={200} />
          </>
        ) : (
          order && (
            <>
              <div className={styles.orderItemsContainer}>
                {order.orderItems?.map((item, index: number) => (
                  <ItemContainer
                    key={index}
                    product={item.product}
                    quantity={item.quantity}
                    price={item.price}
                    seller={item.store}
                  />
                ))}
              </div>
              <div className={styles.summaryContainer}>
                <Summary
                  total={order.total}
                  createdAt={order.createdAt}
                  orderStatus={order.orderStatus}
                  modeOfPayment={order.modeOfPayment}
                  deliveryAddress={order.deliveryAddress}
                />
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default OrderDetails;
