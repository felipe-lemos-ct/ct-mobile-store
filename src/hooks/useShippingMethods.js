import useLocale from './useLocale';
import useOrg from './ct/useShippingMethods';

const useShippingMethods = (cartId) => {
  const { locale } = useLocale();
  const { total, shippingMethods, loading, error } = useOrg(
    {
      locale,
      id: cartId,
    }
  );
  return {
    total,
    shippingMethods,
    loading,
    error,
  };
};
export default useShippingMethods;
