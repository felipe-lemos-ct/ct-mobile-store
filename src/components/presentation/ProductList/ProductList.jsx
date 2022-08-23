import { useQuery, gql } from "@apollo/client";
import {
  IonSlides,
  IonSlide,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";

const GET_TEST_QUERY_RESULT = gql`
  query GetTestResult {
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
              subTreeValues: ["b658cd32-a4b3-4f65-89b9-0bd1794917db"]
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

function DisplayProductList() {
  const { loading, error, data } = useQuery(GET_TEST_QUERY_RESULT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const index = 3;
  const imgsrc =
    data.productProjectionSearch?.results[index].masterVariant.images[0].url;
  const alt = data.productProjectionSearch?.results[index].name;

  const slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  return (
    <IonContent fullscreen class="ion-padding" scroll-y="false">
      <IonSlides pager={true} options={slideOpts}>
        <IonSlide>
          <div class="slide">
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
            </IonCard>
          </div>
        </IonSlide>
        <IonSlide>
          <div class="slide">
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
            </IonCard>
          </div>
        </IonSlide>
        <IonSlide>
          <div class="slide">
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
            </IonCard>
          </div>
        </IonSlide>
      </IonSlides>
    </IonContent>
  );
}

/**
 * 

    <div>
      <h1>First product:</h1>
      <img src={imgsrc} alt={alt}></img>
      <h3>{alt}</h3>
    </div>
 */

export default DisplayProductList;
