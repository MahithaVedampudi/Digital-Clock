<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital World Clock</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1 class="title">Digital World Clock</h1>
            <p class="subtitle">Explore time zones around the globe</p>
        </header>

        <!-- Background Selector -->
        <div class="background-selector">
            <button class="bg-btn" id="bgBtn">🎨</button>
            <div class="bg-options" id="bgOptions">
                <h3>Choose Background</h3>
                <div class="bg-grid">
                    <div class="bg-option active" data-bg="gradient1">
                        <div class="bg-preview bg-gradient1"></div>
                        <span>Starry Night</span>
                    </div>
                    <div class="bg-option" data-bg="gradient2">
                        <div class="bg-preview bg-gradient2"></div>
                        <span>Mountains</span>
                    </div>
                    <div class="bg-option" data-bg="gradient3">
                        <div class="bg-preview bg-gradient3"></div>
                        <span>Forest</span>
                    </div>
                    <div class="bg-option" data-bg="gradient4">
                        <div class="bg-preview bg-gradient4"></div>
                        <span>Galaxy</span>
                    </div>
                    <div class="bg-option" data-bg="gradient5">
                        <div class="bg-preview bg-gradient5"></div>
                        <span>Sky Clouds</span>
                    </div>
                    <div class="bg-option" data-bg="gradient6">
                        <div class="bg-preview bg-gradient6"></div>
                        <span>Sunset Rails</span>
                    </div>
                </div>
            </div>
        </div>

        <main class="main-content">
            <!-- Primary Clock Display -->
            <div class="primary-clock">
                <div class="clock-display">
                    <div class="time" id="primaryTime">00:00:00</div>
                    <div class="timezone" id="primaryTimezone">Local Time</div>
                    <div class="date" id="primaryDate">Monday, January 1, 2024</div>
                </div>
            </div>

            <!-- World Map Section -->
            <div class="world-map-container">
                <h2 class="section-title">World Time Zones</h2>
                <div class="map-wrapper">
                    <svg class="world-map" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
                        <!-- Ocean background -->
                        <rect width="1000" height="500" fill="url(#oceanGradient)"/>
                        
                        <!-- Gradient definitions -->
                        <defs>
                            <radialGradient id="oceanGradient" cx="50%" cy="50%">
                                <stop offset="0%" style="stop-color:#1e3c72;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#2a5298;stop-opacity:1" />
                            </radialGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                <feMerge> 
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        
                        <!-- North America -->
                        <path class="continent" data-timezone="America/Los_Angeles" data-name="Los Angeles" 
                              d="M80,120 L180,110 L190,140 L185,180 L160,200 L120,210 L90,190 L75,160 Z"/>
                        <path class="continent" data-timezone="America/New_York" data-name="New York" 
                              d="M200,130 L280,125 L290,155 L285,185 L260,205 L220,210 L195,190 L190,160 Z"/>
                        
                        <!-- South America -->
                        <path class="continent" data-timezone="America/Sao_Paulo" data-name="São Paulo" 
                              d="M220,280 L280,275 L290,320 L285,360 L260,380 L230,375 L210,340 L205,300 Z"/>
                        
                        <!-- Europe -->
                        <path class="continent" data-timezone="Europe/London" data-name="London" 
                              d="M420,120 L460,115 L470,140 L465,165 L450,175 L430,170 L415,150 Z"/>
                        <path class="continent" data-timezone="Europe/Paris" data-name="Paris" 
                              d="M470,125 L510,120 L520,145 L515,170 L500,180 L480,175 L465,155 Z"/>
                        
                        <!-- Africa -->
                        <path class="continent" data-timezone="Africa/Cairo" data-name="Cairo" 
                              d="M480,200 L540,195 L550,240 L545,290 L520,320 L490,315 L475,280 L470,240 Z"/>
                        
                        <!-- Asia -->
                        <path class="continent" data-timezone="Asia/Dubai" data-name="Dubai" 
                              d="M580,180 L620,175 L630,200 L625,225 L610,235 L590,230 L575,210 Z"/>
                        
                        <!-- India -->
                        <path class="continent" data-timezone="Asia/Kolkata" data-name="Mumbai" 
                              d="M650,200 L690,195 L700,230 L695,260 L680,270 L660,265 L645,240 Z"/>
                        
                        <!-- China -->
                        <path class="continent" data-timezone="Asia/Shanghai" data-name="Shanghai" 
                              d="M720,160 L780,155 L790,185 L785,215 L770,225 L740,220 L715,195 Z"/>
                        
                        <!-- Japan -->
                        <path class="continent" data-timezone="Asia/Tokyo" data-name="Tokyo" 
                              d="M820,170 L850,165 L860,185 L855,205 L845,215 L825,210 L815,190 Z"/>
                        
                        <!-- Australia -->
                        <path class="continent" data-timezone="Australia/Sydney" data-name="Sydney" 
                              d="M750,350 L820,345 L830,375 L825,395 L800,405 L770,400 L745,380 Z"/>
                        
                        <!-- Decorative elements -->
                        <circle cx="100" cy="100" r="2" fill="#FFD700" opacity="0.8">
                            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="900" cy="80" r="2" fill="#FFD700" opacity="0.6">
                            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="500" cy="400" r="1.5" fill="#FFD700" opacity="0.7">
                            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.5s" repeatCount="indefinite"/>
                        </circle>
                    </svg>
                    
                    <!-- Hover Clock Display -->
                    <div class="hover-clock" id="hoverClock">
                        <div class="hover-time" id="hoverTime">00:00:00</div>
                        <div class="hover-location" id="hoverLocation">Location</div>
                        <div class="hover-date" id="hoverDate">Date</div>
                    </div>
                </div>
            </div>

            <!-- Quick Access Timezone Cards -->
            <div class="timezone-grid">
                <div class="timezone-card" data-timezone="America/New_York">
                    <div class="card-header">
                        <h3>New York</h3>
                        <span class="flag">🇺🇸</span>
                    </div>
                    <div class="card-time" id="ny-time">00:00:00</div>
                    <div class="card-date" id="ny-date">Date</div>
                </div>
                
                <div class="timezone-card" data-timezone="Europe/London">
                    <div class="card-header">
                        <h3>London</h3>
                        <span class="flag">🇬🇧</span>
                    </div>
                    <div class="card-time" id="london-time">00:00:00</div>
                    <div class="card-date" id="london-date">Date</div>
                </div>
                
                <div class="timezone-card" data-timezone="Asia/Tokyo">
                    <div class="card-header">
                        <h3>Tokyo</h3>
                        <span class="flag">🇯🇵</span>
                    </div>
                    <div class="card-time" id="tokyo-time">00:00:00</div>
                    <div class="card-date" id="tokyo-date">Date</div>
                </div>
                
                <div class="timezone-card" data-timezone="Asia/Kolkata">
                    <div class="card-header">
                        <h3>Mumbai</h3>
                        <span class="flag">🇮🇳</span>
                    </div>
                    <div class="card-time" id="mumbai-time">00:00:00</div>
                    <div class="card-date" id="mumbai-date">Date</div>
                </div>
                
                <div class="timezone-card" data-timezone="Australia/Sydney">
                    <div class="card-header">
                        <h3>Sydney</h3>
                        <span class="flag">🇦🇺</span>
                    </div>
                    <div class="card-time" id="sydney-time">00:00:00</div>
                    <div class="card-date" id="sydney-date">Date</div>
                </div>
            </div>
        </main>
    </div>

    <script src="script.js"></script>
</body>
</html>
