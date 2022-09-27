//@todo: put in constants, get it from config
const DEFAULT_PAGE_SIZE = 10;
//this should work in react
const usePage = (
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE
) => {
  const limit = Number(pageSize);
  return { limit, offset: (page - 1) * limit };
};
export default usePage;
