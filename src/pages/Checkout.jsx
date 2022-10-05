import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonLabel,
  IonItem,
  IonInput,
} from '@ionic/react';
import { memo, useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useCart from '../hooks/useCart';
import useCartTools from '../hooks/useCartTools';
import useShippingMethods from '../hooks/useShippingMethods';

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

  const handleSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    e.preventDefault();
    const shippingValues = [];
    for (let [key, value] of formData.entries()) {
      shippingValues[key] = value;
    }
    setShipAddress(shippingValues);
  };

  const setShipAddress = useCallback((inputValues) => {
    const address = {
      firstName: inputValues.firstName,
      lastName: inputValues.secondName,
      streetName: inputValues.streetName,
      streetNumber: inputValues.streetNumber,
      postalCode: inputValues.postalCode,
      city: inputValues.city,
      phone: inputValues.phone,
      email: inputValues.email,
      country: inputValues.country,
    };
    setShippingAddress(address);
  });

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

          <IonCard className="ion-padding">
            <IonCardHeader>Shipping Address:</IonCardHeader>
            <IonCardContent>
              <form onSubmit={handleSubmit}>
                <IonItem>
                  <IonLabel position="floating">
                    First Name
                  </IonLabel>
                  <IonInput type="text" name="firstName" />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">
                    Second Name
                  </IonLabel>
                  <IonInput type="text" name="secondName" />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">
                    Street
                  </IonLabel>
                  <IonInput type="text" name="streetName" />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">
                    Number
                  </IonLabel>
                  <IonInput name="streetNumber" />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">
                    Postal Code
                  </IonLabel>
                  <IonInput name="postalCode" />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">
                    City
                  </IonLabel>
                  <IonInput name="city" />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">
                    Phone
                  </IonLabel>
                  <IonInput name="phone" />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">
                    E-mail
                  </IonLabel>
                  <IonInput name="email" />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">
                    Country
                  </IonLabel>
                  <IonInput name="country" />
                </IonItem>

                <IonButton
                  className="ion-margin-top"
                  type="submit"
                >
                  Update Shipping Address
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
          <IonButton onClick={createOrder}>
            check out
          </IonButton>
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
