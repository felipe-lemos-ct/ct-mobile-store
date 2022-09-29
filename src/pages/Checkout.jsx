import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { memo, useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
//import ExploreContainer from "../components/presentation/Menu/ExploreContainer";
import useCart from '../hooks/useCart';
import useCartTools from '../hooks/useCartTools';
import useShippingMethods from '../hooks/useShippingMethods';

import './Page.css';

const Checkout = () => {
  const name = 'Cart';
  const { cart, loading, error } = useCart();
  const {
    createMyOrderFromCart,
    setShippingMethod,
    setShippingAddress,
    setBillingAddress,
    removeLineItem,
    removeDiscount,
    applyDiscount,
  } = useCartTools();
  const createOrder = useCallback(() => {
    createMyOrderFromCart({ method: 'paypal', cart });
  });
  useEffect(() => {
    if (cart === null) {
      console.log('redirect to order list...');
    }
  }, [cart]);
  if (loading) {
    return 'Loading...';
  }
  if (error) {
    console.error(error);
    return 'Error';
  }
  //@todo: loading is false but cart is not set???
  if (!loading && cart) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{name}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <button onClick={createOrder}>check out</button>
          <pre>{JSON.stringify(cart, undefined, 2)}</pre>
          <ShippingMethods cart={cart} />
        </IonContent>
      </IonPage>
    );
  }
  return '???';
};
const getPrice = (shippingMethod, totalPrice) => {
  const rate = (shippingMethod?.zoneRates || [])
    .flatMap(({ shippingRates }) => shippingRates)
    .find(({ isMatching }) => isMatching);
  return totalPrice.centAmount >
    (rate?.freeAbove?.centAmount || Infinity)
    ? null
    : rate?.price;
};
const ShippingMethods = memo(function ShippingMethods({
  cart,
}) {
  const [methods, setMethods] = useState();
  const { shippingMethods } = useShippingMethods(
    cart.cartId
  );
  useEffect(() => {
    if (shippingMethods) {
      setMethods(
        shippingMethods.map((shippingMethod) => ({
          ...shippingMethod,
          price: getPrice(shippingMethod, cart.totalPrice),
        }))
      );
    }
  }, [cart.totalPrice, shippingMethods]);
  useEffect(() => {
    if (methods) {
      console.log('methods:', methods);
    }
  }, [methods]);
  return 'methods here';
});

export default Checkout;
