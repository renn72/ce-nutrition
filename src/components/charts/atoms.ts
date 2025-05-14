import { atomWithStorage } from 'jotai/utils'

export const chartRangeAtom = atomWithStorage('chartRange', 7)

export const chartSelectValueLeftAtom = atomWithStorage('chartSelectValueLeft', 'bodyWeight')
export const chartSelectValueRightAtom = atomWithStorage('chartSelectValueRight', '')
