export function createObserver(callback) {
  function handle(entries) {
    entries.forEach((el) => {
      const parent = el.target.parentNode
      const index = [...parent.children].indexOf(el.target)
      callback({index, isVisible: el.isIntersecting})
    })
  }

  const observer = new IntersectionObserver(handle,{threshold: 0.7})

  return {
    observe(el) {
      observer.observe(el)
    },
    unobserve(el) {
      observer.unobserve(el)
    },
    disconnect() {
      observer.disconnect()
    }
  }
}