export function createReelItem(src, index) {
  const el = document.createElement('div')
  el.className = 'reel-item'

  const reel = document.createElement('video')
  reel.src = src
  reel.muted = true
  reel.loop = true
  reel.playsInline = true
  reel.preload = 'metadata'
  el.appendChild(reel)

  return {
    index,
    el,
    reel,
    play() {
      reel.play().catch(() => {})
    },
    pause() {
      reel.pause()
    }
  }
}