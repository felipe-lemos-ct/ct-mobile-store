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

const GET_CATEGORIES_RESULT = gql`
  query GetCategories(
    $locale: Locale!
    $where: String!
    $sort: [String!] = []
  ) {
    categories(sort: $sort, where: $where) {
      count
      total
      results {
        id
        slug(locale: $locale)
        name(locale: $locale)
        __typename
      }
      __typename
    }
  }
`;

const Menu = () => {
  const { loading, error, data } = useQuery(
    GET_CATEGORIES_RESULT,
    {
      variables: {
        sort: ['orderHint asc'],
        locale: 'en',
        where: 'parent is not defined',
      },
    }
  );

  let appPages = [];

  if (!loading && !error) {
    appPages = data.categories?.results.map(
      ({ name, slug, id }) => ({
        title: name,
        url: slug,
        id: id,
      })
    );
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
