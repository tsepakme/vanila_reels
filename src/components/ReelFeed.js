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
          console.log('played')
        } else {
          item.pause()
          console.log('paused')
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
    console.log('active switched')
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
    console.log('tap')
    
    if (activeIndex === null) {
      activeIndex = index
    } else if (index !== activeIndex) {
      return
    }
    items[index].togglePlayFromUser()
    playVideo()
  }

  function onSoundToggle(index) {
    if (activeIndex === null || index !== activeIndex) {
      return
    }
    
    soundMuted = !soundMuted
    switchSound()

    const item = items[activeIndex]
    if (!item.userPaused) {
      item.play()
    }
  }

  return {
    mount(container) {
      const el = document.createElement('div')
      el.className = 'feed'
      container.appendChild(el)

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
  }
}