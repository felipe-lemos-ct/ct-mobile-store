import { IonApp, IonContent } from "@ionic/react";
import DisplayProductList from "../components/presentation/ProductList/ProductList";

const Home = () => {
  return (
    <IonApp>
      <IonContent>
        <DisplayProductList />
      </IonContent>
    </IonApp>
  );
};

export default Home;
