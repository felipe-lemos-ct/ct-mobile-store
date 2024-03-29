import { Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonSplitPane,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Menu from './components/presentation/Menu/Menu';
import Page from './pages/Page';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import CartFloatingButton from './components/presentation/Menu/CartFloatingButton';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App = () => {
  //@TODO: Router isn't working properly, need to check
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Page />
            </Route>
            <Route
              path="/products/:categorySlug"
              exact={true}
            >
              <Products />
              <CartFloatingButton />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
