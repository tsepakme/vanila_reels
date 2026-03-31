export function createReelItem(src, index, handlers = {}) {
  const el = document.createElement('div')
  el.className = 'reel-item'

  const reel = document.createElement('video')
  reel.classList.add('reel-video')
  reel.src = src
  reel.muted = true
  reel.loop = true
  reel.playsInline = true
  reel.preload = 'metadata'
  reel.addEventListener('click', (e) => {
    e.stopPropagation()
    handlers.onVideoTap?.(index)
  })
  el.appendChild(reel)

  let userPaused = false

  return {
    index,
    el,
    reel,
    get userPaused() {
      return userPaused
    },
    play() {
      reel.play().catch(() => {})
    },
    pause() {
      reel.pause()
    },
    togglePlayFromUser() {
      if (reel.paused) {
        userPaused = false
        reel.play().catch(() => {})
      } else {
        userPaused = true
        reel.pause()
      }
    },
    clearUserPause() {
      userPaused = false
    },
  }
}