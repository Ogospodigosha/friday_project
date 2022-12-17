import { instance } from '../../../api/instance'

export const packsApi = {
  getPacks() {
    return instance.get('cards/pack')
  },
}
