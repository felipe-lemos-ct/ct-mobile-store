import { IonApp, IonContent } from "@ionic/react";
import DisplayProductList from "../components/presentation/ProductList/ProductList";
import { SlidesExample } from "../components/presentation/ProductSlides/ProductSlides";

const Home = () => {
  return (
    <IonApp>
      <IonContent>
        <DisplayProductList />
        <SlidesExample />
      </IonContent>
    </IonApp>
  );
};

export default Home;
