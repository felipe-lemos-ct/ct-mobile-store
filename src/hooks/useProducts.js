import useLocale from './useLocale';
import useLocation from './useLocation';
import useCurrency from './useCurrency';
import useOrg from './ct/useProducts';
import usePaging from './usePaging';
import useSearch from './useSearch';
// import useCustomerTools from './useCustomerTools';
import useSelectedChannel from './useSelectedChannel';
import { useParams } from 'react-router';
const ALL = 'all'; //route to all products (@todo: put in constants)
//vue specific useProducts
export const useSorts = () => {
  //@todo: sort can come from route query
  //  for example http://url/paht?sort=newest
  const sorts = ['lastModifiedAt desc'];
  const setSort = (sort) =>
    //@todo: change sort router query
    sort;
  return { sorts, setSort };
};

const useProducts = ({ expand } = {}) => {
  const { categorySlug } = useParams();
  //@todo: no login feature yet, is this going to be stored
  //  in local storage?
  const { customer } = { customer: null };
  const { locale } = useLocale();
  const { location } = useLocation();
  const currency = useCurrency();
  const customerGroup =
    customer?.customerGroupRef?.customerGroupId;
  //@todo: get this from route
  const sku = undefined;
  //@todo: get this from route
  const page = 1;
  const { limit, offset } = usePaging(page);
  const { sorts, setSort } = useSorts();
  const { search } = useSearch();
  const { channel } = useSelectedChannel();
  const { total, products, loading, error, categoryError } =
    useOrg({
      search,
      limit,
      offset,
      locale,
      currency,
      sorts,
      country: location,
      categorySlug,
      sku,
      channel,
      expand,
      customerGroup,
    });
  return {
    total,
    products,
    loading,
    error,
    categoryError,
    sorts,
    setSort,
  };
};
export default useProducts;
