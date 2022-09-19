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
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import { manOutline, womanOutline, manSharp, womanSharp } from "ionicons/icons";
import { addIcons } from "ionicons";
import "./Menu.css";

addIcons({
  searchProducts: "public/assets/icon/search-product-icon.svg",
});

const appPages = [
  {
    title: "New",
    url: "/page/Products",
  },
  {
    title: "Products",
    url: "/page/Products",
    iosIcon: manOutline,
    mdIcon: manSharp,
  },
  {
    title: "Women",
    url: "/page/Women",
    iosIcon: womanOutline,
    mdIcon: womanSharp,
  },
];

const Menu = () => {
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
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
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
