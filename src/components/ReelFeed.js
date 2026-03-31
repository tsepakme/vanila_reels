import { createReelItem } from './ReelItem.js'
import { createObserver } from '../utils/observer.js'

export function createReelFeed(reels) {
  const items = []
  let activeIndex = null
  let observer
  let soundMuted = true

  function switchSound() {
    items.forEach((item, i) => {
      const active = (i === activeIndex)
      const isMuted = !active || soundMuted
      item.setMuted(isMuted)
    })
  }

  function playVideo() {
    items.forEach((item, i) => {
      const active = (i === activeIndex)
      if (active) {
        if (!item.userPaused) {
          item.play()
        } else {
          item.pause()
        }
      } else {
        item.pause()
        item.clearUserPause()
      }
    })
    switchSound()
  }

  function setActive(index) {
    if (activeIndex === index) {
      return
    }
    activeIndex = index
    playVideo()
  }

  function handleVisibility({ index, isVisible }) {
    if (!isVisible) {
      return
    }
    setActive(index)
  }

  function onVideoTap(index) {
    if (activeIndex === null) {
      activeIndex = index
    } else if (index !== activeIndex) {
      return
    }
    items[index].togglePlayFromUser()
    playVideo()
  }

  function onSoundToggle() {
    if (activeIndex === null) {
      return
    }

    soundMuted = !soundMuted
    switchSound()

    const item = items[activeIndex]
    if (!item.userPaused) {
      item.play()
    }
  }

  function onKeyDown(e) {
    if (e.code === 'Space' || e.code === 'KeyK') {
      e.preventDefault()

      if (activeIndex === null) {
        return
      }

      items[activeIndex].togglePlayFromUser()
      playVideo()
    }

    if (e.code === 'KeyM') {
      e.preventDefault()
      onSoundToggle()
    }
  }

  return {
    mount(container) {
      const el = document.createElement('div')
      el.className = 'feed'
      container.appendChild(el)
      document.addEventListener('keydown', onKeyDown)

      observer = createObserver(handleVisibility)

      reels.forEach((src, i) => {
        const item = createReelItem(src, i, {
          onVideoTap,
          onSoundToggle,
        })
        items.push(item)
        el.appendChild(item.el)
        observer.observe(item.el)
      })
    },
    destroy() {
      document.removeEventListener('keydown', onKeyDown)
    }
  }
}