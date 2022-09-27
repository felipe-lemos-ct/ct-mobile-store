import useLocale from './useLocale';
import useOrg from './ct/useCategories';
//vue specific useCategories
const useCategories = ({
  categorySlug = undefined,
  skip = false,
  rootOnly = false,
  sort = [],
}) => {
  const { locale } = useLocale();
  const { total, categories, loading, error } = useOrg({
    locale,
    categorySlug,
    rootOnly,
    sort,
    skip,
  });
  return { total, categories, loading, error };
};
export default useCategories;
