export function slideInOut() {
  const res = document.getElementsByClassName(
    'main-content'
  )
  const body = res[0]
  console.log(body)
  if (!body) return
  body.animate(
    [
      {
        opacity: 1,
        transform: 'translate(0, 0)',
      },
      {
        opacity: 0,
        transform: 'translate(-100px, 0)',
      },
    ],
    {
      duration: 400,
      easing: 'ease',
      fill: 'forwards',
      pseudoElement: '::view-transition-old(root)',
    }
  )

  body.animate(
    [
      {
        opacity: 0,
        transform: 'translate(100px, 0)',
      },
      {
        opacity: 1,
        transform: 'translate(0, 0)',
      },
    ],
    {
      duration: 400,
      easing: 'ease',
      fill: 'forwards',
      pseudoElement: '::view-transition-new(root)',
    }
  )
}
