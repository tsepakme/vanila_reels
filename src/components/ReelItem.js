export function createReelItem(src, index, handlers = {}) {
  const el = document.createElement('div')
  el.className = 'reel-item'

  const wrap = document.createElement('div')
  wrap.className = 'reel-wrap'

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

  const soundBtn = document.createElement('button')
  soundBtn.className = 'sound-btn'
  soundBtn.textContent = '🔇'
  soundBtn.addEventListener('click', (e) => {
    console.log('clicked sound btn')
    e.stopPropagation()
    handlers.onSoundToggle?.(index)
  })

  wrap.append(reel, soundBtn)
  el.appendChild(wrap)

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
    setMuted(value) {
      reel.muted = value
      soundBtn.textContent = value ? '🔇' : '🔊'
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