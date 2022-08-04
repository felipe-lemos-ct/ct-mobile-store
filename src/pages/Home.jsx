import { IonApp, IonContent } from "@ionic/react";
import Header from "../components/presentation/Header/Header";
import DisplayTestResult from "../components/presentation/TestComponent/TestComponent";

const Home = () => {
  return (
    <IonApp>
      <IonContent>
        <DisplayTestResult />
      </IonContent>
      <Header />
    </IonApp>
  );
};

export default Home;
