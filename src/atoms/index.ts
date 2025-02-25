import { atomWithStorage } from 'jotai/utils'

export const impersonatedUserAtom = atomWithStorage('impersonatedUser', {
  name: '',
  id: '',
})
