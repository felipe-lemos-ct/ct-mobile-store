import { IonApp, IonContent } from "@ionic/react";
import DisplayProductList from "../components/presentation/ProductList/ProductList";

const Home = ({ catId }) => {
  if (catId !== 0) {
    return (
      <IonApp>
        <IonContent>
          <DisplayProductList id={catId} />
        </IonContent>
      </IonApp>
    );
  }
  return <IonContent>Home</IonContent>;
};

export default Home;
