export const getCardsSearchParams = (searchParams: URLSearchParams) => {
  const params = Object.fromEntries(searchParams)

  return {
    cardsPack_id: params.cardsPack_id,
    cardQuestion: params.cardQuestion || undefined,
    min: +params.min || undefined,
    max: +params.max || undefined,
    sortCards: params.sortCards || undefined,
    page: +params.page || undefined,
    pageCount: +params.pageCount || 5,
  }
}
