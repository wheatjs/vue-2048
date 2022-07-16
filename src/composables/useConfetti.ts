import confetti from 'canvas-confetti'

export interface useFireworksOptions {
  duration?: number
  startVelocity?: number
  spread?: number
  ticks?: number
  zIndex?: number
}

export function useFireworks(options: useFireworksOptions = {}) {
  const {
    duration = 8 * 1000,
    startVelocity = 30,
    spread = 360,
    ticks = 60,
    zIndex = 100,
  } = options

  const play = () => {
    const animationEnd = Date.now() + duration

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0)
        return clearInterval(interval)

      const particleCount = 50 * (timeLeft / duration)
      confetti(Object.assign({}, { startVelocity, spread, ticks, zIndex }, { particleCount, origin: { x: 0.3, y: Math.random() - 0.2 } }))
      confetti(Object.assign({}, { startVelocity, spread, ticks, zIndex }, { particleCount, origin: { x: 0.7, y: Math.random() - 0.2 } }))
    }, 250)
  }

  return {
    play,
  }
}
