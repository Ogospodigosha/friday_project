export const getActualPacksParams = (searchParams: URLSearchParams) => {
  return {
    user_id: searchParams.get('user_id') || undefined,
  }
}
