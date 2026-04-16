const gifStages = [
    "im-about-to-cry-kate-sharma.gif",                  // 0 normal
    "squirrel-carrie-bradshaw.gif",    // 1 confused
    "that-is-not-what-we-are-doing-kate-sharma.gif",                           // 2 pleading
    "i-didnt-know-you-wanted-me-to-cry-uncomfortable.gif",          // 3 sad
    "anya-spy-x-family-anime-anya-crying.gif",                     // 4 sadder
    "ruby-hoshino-anime.gif",                           // 5 devastated
    "dior-christiandior.gif", // 6 very devastated
    "squirrel-carrie-bradshaw.gif" // 7 crying runaway
]

const noMessages = [
    "Absolutely not, FUCK OFF!",
    "Okay, dramatic much?",
    "Anna bls... 🥺",
    "Bruh, cmon!!!",
    "I have an intereview tomo, and NO you're not my procrastination! (emotional blackmail #1 😈)",
    "Ok, Im gonna run away and disappear from your life! (emotional blackmail #2)",
    "I'm gonna KILL MYSELF and will nominate you as Vian's guardian (emotional blackmail #3 🤕)",
    "BITCH! Don't do this to me... bbblleeeezzzeeeeeeaaahhhh",
    "Well, catch me if you can! ehehehehe "
]

const yesTeasePokes = [
    "WOWWW! fr? C'mon I need some tough love. GIBBBB!",
    "go on, spank me... uhhh I mean hit no... just once 👀",
    "Damn, I don't deserve you.. 🙁 ",
]

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

let yesTeasedCount = 0

let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

initFloatingLyrics()

// Autoplay: audio starts muted (bypasses browser policy), unmute immediately
music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    // Fallback: unmute on first interaction
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

function toggleMusic() {
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

function handleYesClick() {
    if (!runawayEnabled) {
        // Tease her to try No first
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }
    window.location.href = 'yes.html'
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
    noClickCount++

    // Cycle through guilt-trip messages
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    // Grow the Yes button bigger each time
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // Shrink No button to contrast
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // Swap cat GIF through stages
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // Runaway starts at click 5
    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX + margin / 2
    const randomY = Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
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
