import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";

const Header = () => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle className="ion-padding">This is a header.</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
