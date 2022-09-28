import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import './Menu.css';

import { useQuery, gql } from '@apollo/client';
import useCategories from '../../../hooks/useCategories';

const Menu = () => {
  const { categories, loading, error } = useCategories({
    rootOnly: true,
  });
  let appPages = [];
  //@todo: somehow loading is false when there is no data
  if (!loading && !error && categories) {
    appPages = categories.map(({ name, slug, id }) => ({
      title: name,
      url: slug,
      id: id,
    }));
  }
  const location = useLocation();
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="store-menu">
          <IonListHeader>Menu</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url
                      ? 'selected'
                      : ''
                  }
                  routerLink={`/products/${appPage.url}`}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
