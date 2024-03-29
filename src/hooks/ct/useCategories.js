import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

//@todo: we will worry about importing the partials
//  when the cart route is done
const createQuery = (where) => gql`
    query categories($locale: Locale! ${
      where ? ', $where: String!' : ''
    }, $sort: [String!] = []) {
      categories(sort: $sort${
        where ? ', where: $where' : ''
      }) {
        count
        total
        results {
          id
          slug(locale: $locale)
          name(locale: $locale)
        }
      }
    }
  `;
const createWhere = (categorySlug, rootOnly, locale) => {
  const where = [
    categorySlug && locale
      ? `slug(${locale}="${categorySlug}")`
      : false,
    rootOnly ? 'parent is not defined' : false,
  ].filter((x) => x);
  return where.length ? where.join(' and ') : null;
};
//this is the React api useQuery(query,options)
// https://www.apollographql.com/docs/react/api/react/hooks/#function-signature
const useCategories = ({
  locale,
  categorySlug,
  rootOnly,
  sort,
  skip,
}) => {
  const [categories, setCategories] = useState();
  const [total, setTotal] = useState();
  const [where, setWhere] = useState(
    createWhere(categorySlug, rootOnly, locale)
  );
  const [skipQuery, setSkipQuery] = useState(true);
  const [query, setQuery] = useState(createQuery(where));
  useEffect(() => {
    const _where = createWhere(
      categorySlug,
      rootOnly,
      locale
    );
    setWhere(_where);
    setQuery(createQuery(_where));
  }, [categorySlug, rootOnly, locale]);
  useEffect(
    () => setSkipQuery(skip || (categorySlug && !where)),
    [skip, categorySlug, where]
  );
  const { loading, error } = useQuery(query, {
    variables: {
      locale,
      where,
      sort,
    },
    onCompleted: (data) => {
      if (!data) {
        return;
      }
      setCategories(data.categories.results);
      setTotal(data.categories.total);
    },
    skip: skipQuery,
  });
  return { total, categories, loading, error };
};
export default useCategories;
