import { IonApp, IonContent } from "@ionic/react";
import Header from "../components/presentation/Header/Header";
import DisplayLocations from "../components/presentation/DisplayLocations/DisplayLocations";

const Home = () => {
  return (
    <IonApp>
      <IonContent>
        <DisplayLocations />
      </IonContent>
      <Header />
    </IonApp>
  );
};

export default Home;
