export function formulaOne({
  chin,
  cheek,
  lowerAbdominal,
  pectoral,
  biceps,
  triceps,
  subscapular,
  midAxillary,
  suprailiac,
  umbilical,
  lowerBack,
  quadriceps,
  hamstrings,
  medialCalf,
  knee,
  shoulder,
  bodyWeight,
}: {
  chin: number
  cheek: number
  lowerAbdominal: number
  pectoral: number
  biceps: number
  triceps: number
  subscapular: number
  midAxillary: number
  suprailiac: number
  umbilical: number
  lowerBack: number
  quadriceps: number
  hamstrings: number
  medialCalf: number
  knee: number
  shoulder: number
  bodyWeight: number
}) {
  const one = 0.8
  const two = 0.7
  const three = 1
  const four = 1
  const five = 1.2
  const six = 1.3
  const seven = 1
  const eight = 1
  const nine = 1
  const ten = 1
  const eleven = 1
  const twelve = 1
  const thirteen = 1.8
  const fourteen = 1.4
  const fifteen = 1.4
  const sixteen = 1

  const _bodyFat =
    one * chin +
    two * cheek +
    three * lowerAbdominal +
    four * pectoral +
    five * biceps +
    six * triceps +
    seven * subscapular +
    eight * midAxillary +
    nine * suprailiac +
    ten * umbilical +
    eleven * lowerBack +
    twelve * quadriceps +
    thirteen * hamstrings +
    fourteen * medialCalf +
    fifteen * knee +
    sixteen * shoulder

  let bodyFat = -3 + 0.250 * Math.pow(_bodyFat, 0.80)
  let leanMass = bodyWeight * (1 - bodyFat / 100)

  return {
    bodyFat,
    leanMass,
  }
}
