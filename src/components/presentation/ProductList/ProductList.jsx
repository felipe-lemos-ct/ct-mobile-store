import {
  IonSlides,
  IonSlide,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import { memo, useEffect } from 'react';
import useCartTools from '../../../hooks/useCartTools';
import useProducts from '../../../hooks/useProducts';

function ProductList() {
  const { products, loading, error } = useProducts();
  if (error) return <p>An error occurred</p>;
  //@todo: not sure why loading is false when no data is there
  if (loading || !products) return <p>Loading...</p>;

  const slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    innerHeight: 100,
  };
  //@todo: not sure why loading is false when no data is there
  if (!loading && !error && products) {
    return (
      <IonContent className="ion-padding" scroll-y="false">
        <IonSlides pager={true} options={slideOpts}>
          {products.map((product) => (
            <Product
              key={product.productId}
              product={product}
            />
          ))}
        </IonSlides>
      </IonContent>
    );
  }
}
const Product = memo(function Product({ product }) {
  const { addLine } = useCartTools();
  //@todo: make this a price component or a library function
  //  that takes price and converts to number
  //  but since price may have discount it is better to make this a
  //  component with the original price striked trough as in vue app
  function insertDecimal(num) {
    return (num / 100).toFixed(2);
  }
  const addToCart = () =>
    addLine(product.masterVariant.sku, 1);

  return (
    <IonSlide>
      <div className="slide">
        <IonCard>
          <img
            src={product.masterVariant?.images[0].url}
            alt="aa"
          ></img>
          <IonCardHeader>
            <IonCardTitle>{product.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {insertDecimal(
              product.masterVariant.scopedPrice.value
                .centAmount
            )}
            <button onClick={addToCart}>add to cart</button>
          </IonCardContent>
        </IonCard>
      </div>
    </IonSlide>
  );
});
export default ProductList;
