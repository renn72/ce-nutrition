import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'

export const impersonatedUserAtom = atomWithStorage('impersonatedUser', {
	name: '',
	id: '',
})

export const isNavbarOpenAtom = atom(true)
export const isFooterOpenAtom = atom(true)

export const isAllPlansAtom = atom(false)
export const isAllRecipesAtom = atom(false)

export const isAllPlansCreateUserAtom = atom(false)

export const firstTimeAtom = atom(true)
