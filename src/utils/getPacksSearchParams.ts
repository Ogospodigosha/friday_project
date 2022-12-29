export const getPacksSearchParams = (searchParams: URLSearchParams) => {
  const params = Object.fromEntries(searchParams)

  return {
    min: +params.min || undefined,
    max: +params.max || undefined,
    sortPacks: params.sortPacks || undefined,
    page: +params.page || undefined,
    pageCount: +params.pageCount || 5,
    packName: params.packName || undefined,
    user_id: params.user_id || undefined,
  }
}
