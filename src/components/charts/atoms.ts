import { atomWithStorage } from 'jotai/utils'

export const chartRangeAtom = atomWithStorage('chartRange', 7)

export const chartSelectValueLeftAtom = atomWithStorage('chartSelectValueLeft', 'morningWeight')
export const chartSelectValueRightAtom = atomWithStorage('chartSelectValueRight', '')

export const leftChartZoomAtom = atomWithStorage('leftChartZoom', 1)
export const rightChartZoomAtom = atomWithStorage('rightChartZoom', 1)
