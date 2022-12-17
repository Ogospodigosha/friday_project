import { instance } from '../../../api/instance'

import { PackType } from './packs-reducer'

export const packsApi = {
  getPacks() {
    return instance.get('cards/pack')
  },
  cratePack(data: createDataType) {
    return instance.post('cards/pack', data)
  },
  deletePack(id: string) {
    return instance.delete('cards/pack', { params: { id: id } })
  },
}
//types
export type createDataType = {
  cardsPack: {
    name?: string
    private?: boolean
  }
}
type ResponseDataCreateType = {
  newCardsPack: PackType
}
