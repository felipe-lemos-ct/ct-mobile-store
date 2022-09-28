import useLocale from './useLocale';
import useOrg from './ct/useCart';
//@todo: this is only when you have multiple browser tabs open
//  when coming back to this tab it'll refresh the cart in case
//  changes were made in another tab
// import addVisibilityChangeListener from './lib';
// import { cache } from '../src/apollo';

// addVisibilityChangeListener((status) => {
//   if (status) {
//     cache.evict({ id: 'activeCart' });
//     cache.gc();
//   }
// });

//Vue/app specific code
const useCart = () => {
  const { locale } = useLocale();
  return useOrg({
    locale,
  });
};
export default useCart;
