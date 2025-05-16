import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'

export const impersonatedUserAtom = atomWithStorage('impersonatedUser', {
  name: '',
  id: '',
})

export const isNavbarOpenAtom = atom(true)
export const isFooterOpenAtom = atom(true)
