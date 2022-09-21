import { IonApp, IonContent } from "@ionic/react";
import DisplayProductList from "../components/presentation/ProductList/ProductList";

const Home = ({ catId }) => {
  return (
    <IonApp>
      <IonContent>
        <DisplayProductList id={catId} />
      </IonContent>
    </IonApp>
  );
};

export default Home;
