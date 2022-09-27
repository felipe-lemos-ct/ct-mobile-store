import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
//import ExploreContainer from "../components/presentation/Menu/ExploreContainer";
import ProductList from '../components/presentation/ProductList/ProductList';
import useCategories from '../hooks/useCategories';

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
        <ProductList />
      </IonContent>
    </IonPage>
  );
};

export default Products;
