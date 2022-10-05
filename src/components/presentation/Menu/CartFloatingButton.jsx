import React from 'react';
import { useEffect } from 'react';
import {
  IonBadge,
  IonItem,
  IonList,
  IonFab,
  IonFabButton,
  IonContent,
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
      <IonContent>
        <IonFab v-slot="end">
          <IonFabButton href="/checkout">
            <IonIcon icon={cartOutline}></IonIcon>
            {totalItems}
          </IonFabButton>
        </IonFab>
      </IonContent>
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
