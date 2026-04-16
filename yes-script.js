let musicPlaying = false
const floatingLyrics = [
    "Highs and lows",
    "I put you through a lot, I know",
    "Highs and lows",
    "Still, you never let me go",
    "I took your care for granted, wooof!",
    "Didn't see the weight you carried",
    "You were breaking, I wasn't there (rawwwr 🙁)",
    "Missed what mattered.... your mom, your stress",
    "Said I'd show up, but I didn't",
    "Left you alone when it counted",
    "Didn't mean to use you, but I did",
    "I see it now... I'm sorry.. BRUH seriously!",
    "Don't let me go, don't let me go",
    "I put you through a lot, I know",
    "Bitch! Don't let me go, don't let me go",
    "I put you through a lot, I know",
    "Awwoooooooooooo!",
]

window.addEventListener('load', () => {
    initFloatingLyrics()
    launchConfetti()

    // Autoplay music (works since user clicked Yes to get here)
    const music = document.getElementById('bg-music')
    music.volume = 0.3
    music.play().catch(() => {})
    musicPlaying = true
    document.getElementById('music-toggle').textContent = '🔊'
})

function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00']
    const duration = 6000
    const end = Date.now() + duration

    // Initial big burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    // Continuous side cannons
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })
    }, 300)
}

function toggleMusic() {
    const music = document.getElementById('bg-music')
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

function initFloatingLyrics() {
    const layer = document.querySelector('.hearts-bg')
    if (!layer) return

    const lyricCount = 14
    for (let i = 0; i < lyricCount; i++) {
        const line = document.createElement('span')
        line.className = 'lyric-line'
        line.textContent = floatingLyrics[i % floatingLyrics.length]
        line.style.left = `${Math.random() * 100}%`
        line.style.animationDuration = `${10 + Math.random() * 10}s`
        line.style.animationDelay = `${Math.random() * 8}s`
        line.style.fontSize = `${0.9 + Math.random() * 0.35}rem`
        layer.appendChild(line)
    }
}
