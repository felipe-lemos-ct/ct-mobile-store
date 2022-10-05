import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
} from '@ionic/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import ProductList from '../components/presentation/ProductList/ProductList';
import useCategories from '../hooks/useCategories';
import CartFloatingButton from '../components/presentation/Menu/CartFloatingButton';

import './Page.css';

const Products = () => {
  const { categorySlug } = useParams();
  const [name, setName] = useState();
  const { categories, loading, error } = useCategories({
    categorySlug,
  });
  useEffect(() => {
    if (categories?.[0]?.name) {
      setName(categories[0].name);
    }
  }, [categories]);
  if (error) {
    console.error('had error:', error);
  }
  //@todo: error not handled
  return loading ? (
    'Loading...'
  ) : (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons v-slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonFab
          vertical="top"
          horizontal="end"
          slot="fixed"
        >
          <CartFloatingButton />
        </IonFab>
        <ProductList />
      </IonContent>
    </IonPage>
  );
};

export default Products;
