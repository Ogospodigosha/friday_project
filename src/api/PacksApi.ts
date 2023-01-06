import { instance } from './instance'

export const packsApi = {
  getPacks(params: ParamsForGetPacks) {
    return instance.get('cards/pack', {
      params: { ...params },
    })
  },
  cratePack(data: createDataType) {
    return instance.post('cards/pack', data)
  },
  deletePack(id: string) {
    return instance.delete('cards/pack', { params: { id: id } })
  },
  editPack(data: editDataType) {
    return instance.put('cards/pack', data)
  },
}
export type ParamsForGetPacks = {
  user_id?: string
  page?: number
  pageCount?: number
  sortPacks?: string
  packName?: string
  min?: number
  max?: number
}

export type createDataType = {
  cardsPack: {
    name?: string
    private?: boolean
    deckCover?: string
  }
}
export type editDataType = {
  cardsPack: {
    name?: string
    _id: string
    deckCover: string
  }
}
