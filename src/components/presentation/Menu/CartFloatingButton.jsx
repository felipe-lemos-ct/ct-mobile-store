import React from 'react';
import { useEffect } from 'react';
import {
  IonBadge,
  IonItem,
  IonList,
  IonFabButton,
  IonIcon,
} from '@ionic/react';

import { cartOutline } from 'ionicons/icons';

import useCart from '../../../hooks/useCart';

function CartFloatingButton() {
  const { cart, loading, error } = useCart();
  useEffect(() => {
    if (cart === null) {
      console.log('Cart is Null');
    }
  }, [cart]);
  if (loading) {
    return 'Loading...';
  }
  if (error) {
    console.error(error);
    return 'Error';
  }
  if (cart) {
    console.log('return badge');
    const totalItems = cart.lineItems
      .map((item) => item.quantity)
      .reduce((a, b) => a + b);

    return (
      <IonFabButton href="/checkout">
        <IonIcon icon={cartOutline}></IonIcon>
        {totalItems}
      </IonFabButton>
    );
  } else {
    return (
      <IonList>
        <IonItem>
          <IonBadge></IonBadge>
        </IonItem>
      </IonList>
    );
  }
}

export default CartFloatingButton;
