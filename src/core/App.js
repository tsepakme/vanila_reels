import { createReelFeed } from '../components/ReelFeed.js'
import { reels } from '../../reels/reels.js'

export function App() {
  const container = document.getElementById('root')
  const feed = createReelFeed(reels)
  feed.mount(container)
}