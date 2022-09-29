import useLocation from './useLocation';
import config from '../mobile.config';
const currencyFromConfig = (location) =>
  config.formats.number[location]?.currency?.currency;
const useCurrency = () => {
  const { location } = useLocation();
  return currencyFromConfig(location);
};
export default useCurrency;
