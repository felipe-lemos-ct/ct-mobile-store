import React from 'react';
import { useEffect } from 'react';
import {
  IonBadge,
  IonItem,
  IonList,
  IonFab,
  IonFabButton,
  IonContent,
} from '@ionic/react';
import useCart from '../../../hooks/useCart';
function CartFloatingButton() {
  const { cart, loading, error } = useCart();
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
  if (cart) {
    console.log('return badge');
    return (
      <IonContent>
        <IonFab slot="fixed">
          <IonFabButton>
            {cart.lineItems?.length}
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
