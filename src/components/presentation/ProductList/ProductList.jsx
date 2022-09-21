import { useQuery, gql } from "@apollo/client";
import {
  IonSlides,
  IonSlide,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonCardContent,
} from "@ionic/react";

//"b658cd32-a4b3-4f65-89b9-0bd1794917db"
const GET_PRODUCTS_RESULT = gql`
  query GetProducts($catId: String!) {
    productProjectionSearch(
      locale: "en"
      text: ""
      limit: 10
      offset: 0
      sorts: ""
      priceSelector: {
        currency: "EUR"
        country: "DE"
        channel: null
        customerGroup: null
      }
      filters: [
        {
          model: {
            range: {
              path: "variants.scopedPrice.value.centAmount"
              ranges: [{ from: "0", to: "1000000000000" }]
            }
          }
        }
        {
          model: {
            tree: {
              path: "categories.id"
              rootValues: []
              subTreeValues: [$catId]
            }
          }
        }
      ]
    ) {
      total
      results {
        productId: id
        name(locale: "en")
        slug(locale: "en")
        masterVariant {
          variantId: id
          sku
          images {
            url
            __typename
          }
          attributesRaw {
            name
            value
            __typename
          }
          scopedPrice {
            value {
              currencyCode
              centAmount
              fractionDigits
              __typename
            }
            discounted {
              discount {
                name(locale: "en")
                __typename
              }
              value {
                currencyCode
                centAmount
                fractionDigits
                __typename
              }
              __typename
            }
            country
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

function DisplayProductList({ id }) {
  console.log(id);
  const catId = id;

  const { loading, error, data } = useQuery(GET_PRODUCTS_RESULT, {
    variables: {
      catId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    innerHeight: 100,
  };

  function insertDecimal(num) {
    return (num / 100).toFixed(2);
  }
  if (!loading && !error) {
    return (
      <IonContent className="ion-padding" scroll-y="false">
        <IonSlides pager={true} options={slideOpts}>
          <IonSlide>
            <div className="slide">
              <IonCard>
                <img
                  src={
                    data.productProjectionSearch?.results[0].masterVariant
                      .images[0].url
                  }
                  alt="aa"
                ></img>
                <IonCardHeader>
                  <IonCardTitle>
                    {data.productProjectionSearch?.results[0].name}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {insertDecimal(
                    data.productProjectionSearch?.results[0].masterVariant
                      .scopedPrice.value.centAmount
                  )}
                </IonCardContent>
              </IonCard>
            </div>
          </IonSlide>
          <IonSlide>
            <div className="slide">
              <IonCard>
                <img
                  src={
                    data.productProjectionSearch?.results[1].masterVariant
                      .images[0].url
                  }
                  alt="aa"
                ></img>
                <IonCardHeader>
                  <IonCardTitle>
                    {data.productProjectionSearch?.results[1].name}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {insertDecimal(
                    data.productProjectionSearch?.results[1].masterVariant
                      .scopedPrice.value.centAmount
                  )}
                </IonCardContent>
              </IonCard>
            </div>
          </IonSlide>
          <IonSlide>
            <div className="slide">
              <IonCard>
                <img
                  src={
                    data.productProjectionSearch?.results[2].masterVariant
                      .images[0].url
                  }
                  alt="aa"
                ></img>
                <IonCardHeader>
                  <IonCardTitle>
                    {data.productProjectionSearch?.results[2].name}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {insertDecimal(
                    data.productProjectionSearch?.results[2].masterVariant
                      .scopedPrice.value.centAmount
                  )}
                </IonCardContent>
              </IonCard>
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
    );
  }
}

export default DisplayProductList;
