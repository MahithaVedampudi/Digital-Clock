class WorldClock {
  constructor() {
    this.timezones = {
      "America/New_York": "ny",
      "Europe/London": "london",
      "Asia/Tokyo": "tokyo",
      "Asia/Kolkata": "mumbai",
      "Australia/Sydney": "sydney",
    }

    this.init()
  }

  init() {
    this.setupMapInteractions()
    this.setupBackgroundSelector()
    this.startClocks()
  }

  setupMapInteractions() {
    const continents = document.querySelectorAll(".continent")
    const hoverClock = document.getElementById("hoverClock")

    continents.forEach((continent) => {
      continent.addEventListener("mouseenter", (e) => {
        const timezone = e.target.dataset.timezone
        const name = e.target.dataset.name
        this.showHoverClock(e, timezone, name)
      })

      continent.addEventListener("mousemove", (e) => {
        this.updateHoverClockPosition(e)
      })

      continent.addEventListener("mouseleave", () => {
        hoverClock.classList.remove("show")
      })

      continent.addEventListener("click", (e) => {
        const timezone = e.target.dataset.timezone
        this.setPrimaryTimezone(timezone)
      })
    })
  }

  showHoverClock(event, timezone, name) {
    const hoverClock = document.getElementById("hoverClock")
    const hoverTime = document.getElementById("hoverTime")
    const hoverLocation = document.getElementById("hoverLocation")
    const hoverDate = document.getElementById("hoverDate")

    const time = this.getFormattedTime(timezone)
    const date = this.getFormattedDate(timezone)

    hoverTime.textContent = time
    hoverLocation.textContent = name
    hoverDate.textContent = date

    this.updateHoverClockPosition(event)
    hoverClock.classList.add("show")
  }

  updateHoverClockPosition(event) {
    const hoverClock = document.getElementById("hoverClock")
    const rect = event.target.closest(".map-wrapper").getBoundingClientRect()

    const x = event.clientX - rect.left + 15
    const y = event.clientY - rect.top - 15

    hoverClock.style.left = `${x}px`
    hoverClock.style.top = `${y}px`
  }

  setPrimaryTimezone(timezone) {
    const primaryTime = document.getElementById("primaryTime")
    const primaryTimezone = document.getElementById("primaryTimezone")
    const primaryDate = document.getElementById("primaryDate")

    const time = this.getFormattedTime(timezone)
    const date = this.getFormattedDate(timezone)
    const timezoneName = timezone.split("/")[1].replace("_", " ")

    primaryTime.textContent = time
    primaryTimezone.textContent = timezoneName
    primaryDate.textContent = date

    // Add animation effect
    primaryTime.style.transform = "scale(1.1)"
    setTimeout(() => {
      primaryTime.style.transform = "scale(1)"
    }, 200)
  }

  startClocks() {
    this.updateAllClocks()

    // Update every 100ms for smooth display
    setInterval(() => {
      this.updateAllClocks()
    }, 100)
  }

  updateAllClocks() {
    // Update primary clock (local time by default)
    this.updatePrimaryClock()

    // Update timezone cards
    Object.entries(this.timezones).forEach(([timezone, prefix]) => {
      this.updateTimezoneCard(timezone, prefix)
    })
  }

  updatePrimaryClock() {
    const primaryTime = document.getElementById("primaryTime")
    const primaryDate = document.getElementById("primaryDate")

    if (!primaryTime.dataset.timezone) {
      const time = this.getFormattedTime()
      const date = this.getFormattedDate()

      primaryTime.textContent = time
      primaryDate.textContent = date
    }
  }

  updateTimezoneCard(timezone, prefix) {
    const timeElement = document.getElementById(`${prefix}-time`)
    const dateElement = document.getElementById(`${prefix}-date`)

    if (timeElement && dateElement) {
      const time = this.getFormattedTime(timezone)
      const date = this.getFormattedDate(timezone)

      timeElement.textContent = time
      dateElement.textContent = date
    }
  }

  getFormattedTime(timezone = null) {
    const now = new Date()

    // Create a date object for the specific timezone
    let timeInZone
    if (timezone) {
      timeInZone = new Date(now.toLocaleString("en-US", { timeZone: timezone }))
    } else {
      timeInZone = now
    }

    // Get components
    const hours = timeInZone.getHours().toString().padStart(2, "0")
    const minutes = timeInZone.getMinutes().toString().padStart(2, "0")
    const seconds = timeInZone.getSeconds().toString().padStart(2, "0")

    // Return in HH:MM:SS format
    return `${hours}:${minutes}:${seconds}`
  }

  getFormattedDate(timezone = null) {
    const now = new Date()
    const options = {
      timeZone: timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }

    return now.toLocaleDateString("en-US", options)
  }

  setupBackgroundSelector() {
    const bgBtn = document.getElementById("bgBtn")
    const bgOptions = document.getElementById("bgOptions")
    const bgOptionElements = document.querySelectorAll(".bg-option")

    bgBtn.addEventListener("click", () => {
      bgOptions.classList.toggle("show")
    })

    // Close background selector when clicking outside
    document.addEventListener("click", (e) => {
      if (!bgBtn.contains(e.target) && !bgOptions.contains(e.target)) {
        bgOptions.classList.remove("show")
      }
    })

    // Handle background selection
    bgOptionElements.forEach((option) => {
      option.addEventListener("click", () => {
        const bgType = option.dataset.bg
        this.changeBackground(bgType)

        // Update active state
        bgOptionElements.forEach((opt) => opt.classList.remove("active"))
        option.classList.add("active")

        // Close selector
        bgOptions.classList.remove("show")
      })
    })
  }

  changeBackground(bgType) {
    const gradients = {
      gradient1: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        linear-gradient(135deg, #667eea 0%, #764ba2 100%),
        url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="stars" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.5" fill="white" opacity="0.8"/><circle cx="5" cy="5" r="0.3" fill="white" opacity="0.6"/><circle cx="15" cy="15" r="0.2" fill="white" opacity="0.4"/></pattern></defs><rect width="100" height="100" fill="url(%23stars)"/></svg>')
      `,
      gradient2: `
        linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%),
        url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="mountains" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><polygon points="0,100 20,60 40,80 60,40 80,70 100,30 100,100" fill="%23667eea" opacity="0.8"/><polygon points="0,100 15,70 35,85 55,50 75,75 95,40 100,100" fill="%23764ba2" opacity="0.6"/></pattern></defs><rect width="100" height="100" fill="url(%23mountains)"/></svg>'),
        linear-gradient(to bottom, #87CEEB 0%, #98D8E8 50%, #B0E0E6 100%)
      `,
      gradient3: `
        linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%),
        url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="forest" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse"><circle cx="10" cy="40" r="8" fill="%2327ae60" opacity="0.7"/><circle cx="25" cy="35" r="10" fill="%232ecc71" opacity="0.8"/><circle cx="40" cy="38" r="7" fill="%2316a085" opacity="0.6"/><rect x="8" y="40" width="2" height="10" fill="%238B4513"/><rect x="23" y="35" width="3" height="15" fill="%238B4513"/><rect x="38" y="38" width="2" height="12" fill="%238B4513"/></pattern></defs><rect width="100" height="100" fill="url(%23forest)"/></svg>'),
        linear-gradient(to bottom, #87CEEB 0%, #90EE90 100%)
      `,
      gradient4: `
        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%),
        url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="galaxy" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="white" opacity="0.9"><animate attributeName="opacity" values="0.9;0.3;0.9" dur="3s" repeatCount="indefinite"/></circle><circle cx="80" cy="30" r="0.5" fill="white" opacity="0.7"><animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite"/></circle><circle cx="60" cy="70" r="1.5" fill="white" opacity="0.8"><animate attributeName="opacity" values="0.8;0.4;0.8" dur="4s" repeatCount="indefinite"/></circle><circle cx="30" cy="80" r="0.8" fill="white" opacity="0.6"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite"/></circle></pattern></defs><rect width="100" height="100" fill="url(%23galaxy)"/></svg>'),
        linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)
      `,
      gradient5: `
        linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%),
        url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="clouds" x="0" y="0" width="100" height="50" patternUnits="userSpaceOnUse"><ellipse cx="20" cy="25" rx="15" ry="8" fill="white" opacity="0.3"/><ellipse cx="60" cy="20" rx="20" ry="10" fill="white" opacity="0.2"/><ellipse cx="85" cy="30" rx="12" ry="6" fill="white" opacity="0.25"/></pattern></defs><rect width="100" height="100" fill="url(%23clouds)"/></svg>'),
        linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 50%, #87CEFA 100%)
      `,
      gradient6: `
        linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%),
        url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="train" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><rect x="10" y="70" width="80" height="4" fill="%23654321"/><rect x="15" y="72" width="3" height="8" fill="%23654321"/><rect x="25" y="72" width="3" height="8" fill="%23654321"/><rect x="35" y="72" width="3" height="8" fill="%23654321"/><rect x="45" y="72" width="3" height="8" fill="%23654321"/><rect x="55" y="72" width="3" height="8" fill="%23654321"/><rect x="65" y="72" width="3" height="8" fill="%23654321"/><rect x="75" y="72" width="3" height="8" fill="%23654321"/><rect x="85" y="72" width="3" height="8" fill="%23654321"/></pattern></defs><rect width="100" height="100" fill="url(%23train)"/></svg>'),
        linear-gradient(to bottom, #FFB347 0%, #FF8C69 50%, #FF6347 100%)
      `,
    }

    document.body.style.background = gradients[bgType]

    // Save preference
    localStorage.setItem("selectedBackground", bgType)
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  const worldClock = new WorldClock()

  // Load saved background
  const savedBg = localStorage.getItem("selectedBackground")
  if (savedBg) {
    worldClock.changeBackground(savedBg)
    document.querySelector(`[data-bg="${savedBg}"]`).classList.add("active")
    document.querySelector('[data-bg="gradient1"]').classList.remove("active")
  }

  // Add loading animation
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 1s ease"
    document.body.style.opacity = "1"
  }, 100)

  console.log("🕐 Digital World Clock initialized successfully!")
})
