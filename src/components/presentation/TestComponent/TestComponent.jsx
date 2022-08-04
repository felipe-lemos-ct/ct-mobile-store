import { useQuery, gql } from "@apollo/client";

const GET_TEST_QUERY_RESULT = gql`
  query GetTestResult {
    products {
      offset
      count
      total
      exists
    }
  }
`;

function DisplayTestResult() {
  const { loading, error, data } = useQuery(GET_TEST_QUERY_RESULT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Query result: </h1>
      <h3>{data.products?.count}</h3>
    </div>
  );
}

export default DisplayTestResult;
