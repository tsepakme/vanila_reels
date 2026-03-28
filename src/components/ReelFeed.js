import { createReelItem } from './ReelItem.js'
import { createObserver } from '../utils/observer.js'

export function createReelFeed(reels) {
  const items = []
  let activeIndex = null
  let observer

  function setActive(index) {
    if (activeIndex === index) {
      return
    }
    activeIndex = index
    items.forEach((item, i) => {
      if (i === index) {
        item.play()
      } else {
        item.pause()
      }
    })
  }

  function handleVisibility({ index, isVisible }) {
    if (!isVisible) {
      return
    }
    setActive(index)
  }

  return {
    mount(container) {
      const el = document.createElement('div')
      el.className = 'feed'
      container.appendChild(el)

      observer = createObserver(handleVisibility)

      reels.forEach((src, i) => {
        const item = createReelItem(src, i)
        items.push(item)
        el.appendChild(item.el)
        observer.observe(item.el)
      })
    }
  }
}