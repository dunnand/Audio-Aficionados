// artworkManifest.js — Single source of truth for all album artwork.
//
// suggestedUrl: Cover Art Archive URL selected by Claude. Shown automatically.
// localFile:    Teacher-saved image in assets/artwork/. Used when verifiedByTeacher: true.
// Teacher can click any cover in Teacher Mode to replace it with alternatives.
//
// Key format: artist-album (lowercase, hyphens, no punctuation)

const artworkManifest = {

  // ── MY BLOODY VALENTINE ──────────────────────────────────────────────────
  "my-bloody-valentine-isnt-anything": {
    albumTitle: "Isn't Anything",
    artist: "My Bloody Valentine",
    year: 1988,
    localFile: "assets/artwork/my-bloody-valentine-isnt-anything.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "my-bloody-valentine-loveless": {
    albumTitle: "Loveless",
    artist: "My Bloody Valentine",
    year: 1991,
    suggestedUrl: "https://coverartarchive.org/release-group/cb76227e-3ac0-3002-9a10-615a5b73cc59/front",
    localFile: "assets/artwork/my-bloody-valentine-loveless.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "my-bloody-valentine-m-b-v": {
    albumTitle: "m b v",
    artist: "My Bloody Valentine",
    year: 2013,
    localFile: "assets/artwork/my-bloody-valentine-m-b-v.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── RADIOHEAD ─────────────────────────────────────────────────────────────
  "radiohead-pablo-honey": {
    albumTitle: "Pablo Honey",
    artist: "Radiohead",
    year: 1993,
    localFile: "assets/artwork/radiohead-pablo-honey.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "radiohead-the-bends": {
    albumTitle: "The Bends",
    artist: "Radiohead",
    year: 1995,
    localFile: "assets/artwork/radiohead-the-bends.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "radiohead-ok-computer": {
    albumTitle: "OK Computer",
    artist: "Radiohead",
    year: 1997,
    suggestedUrl: "https://coverartarchive.org/release-group/b1392450-e666-3926-a536-22c65f834433/front",
    localFile: "assets/artwork/radiohead-ok-computer.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "radiohead-kid-a": {
    albumTitle: "Kid A",
    artist: "Radiohead",
    year: 2000,
    suggestedUrl: "https://coverartarchive.org/release-group/e75c0549-ad55-39e3-8025-c72c5d4a3c5d/front",
    localFile: "assets/artwork/radiohead-kid-a.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "radiohead-amnesiac": {
    albumTitle: "Amnesiac",
    artist: "Radiohead",
    year: 2001,
    localFile: "assets/artwork/radiohead-amnesiac.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "radiohead-hail-to-the-thief": {
    albumTitle: "Hail to the Thief",
    artist: "Radiohead",
    year: 2003,
    localFile: "assets/artwork/radiohead-hail-to-the-thief.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "radiohead-in-rainbows": {
    albumTitle: "In Rainbows",
    artist: "Radiohead",
    year: 2007,
    localFile: "assets/artwork/radiohead-in-rainbows.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "radiohead-the-king-of-limbs": {
    albumTitle: "The King of Limbs",
    artist: "Radiohead",
    year: 2011,
    localFile: "assets/artwork/radiohead-the-king-of-limbs.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "radiohead-a-moon-shaped-pool": {
    albumTitle: "A Moon Shaped Pool",
    artist: "Radiohead",
    year: 2016,
    localFile: "assets/artwork/radiohead-a-moon-shaped-pool.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── PINK FLOYD ────────────────────────────────────────────────────────────
  "pink-floyd-the-piper-at-the-gates-of-dawn": {
    albumTitle: "The Piper at the Gates of Dawn",
    artist: "Pink Floyd",
    year: 1967,
    suggestedUrl: "https://coverartarchive.org/release-group/6792b6d1-4e65-3c3c-9d20-d08aa1dcfc60/front",
    localFile: "assets/artwork/pink-floyd-the-piper-at-the-gates-of-dawn.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "pink-floyd-a-saucerful-of-secrets": {
    albumTitle: "A Saucerful of Secrets",
    artist: "Pink Floyd",
    year: 1968,
    suggestedUrl: "https://coverartarchive.org/release-group/8a9caa40-b7c6-33eb-a13c-6c15f09b1c44/front",
    localFile: "assets/artwork/pink-floyd-a-saucerful-of-secrets.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "pink-floyd-atom-heart-mother": {
    albumTitle: "Atom Heart Mother",
    artist: "Pink Floyd",
    year: 1970,
    suggestedUrl: "https://coverartarchive.org/release-group/e2f503d7-5488-3fe1-b3ac-f236d9f1b44c/front",
    localFile: "assets/artwork/pink-floyd-atom-heart-mother.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "pink-floyd-meddle": {
    albumTitle: "Meddle",
    artist: "Pink Floyd",
    year: 1971,
    suggestedUrl: "https://coverartarchive.org/release-group/4e98c9b4-92f6-3049-b9da-a1088b623672/front",
    localFile: "assets/artwork/pink-floyd-meddle.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "pink-floyd-the-dark-side-of-the-moon": {
    albumTitle: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    year: 1973,
    suggestedUrl: "https://coverartarchive.org/release-group/f5093c06-23e3-404f-aeaa-40f72885ee3a/front",
    localFile: "assets/artwork/pink-floyd-the-dark-side-of-the-moon.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "pink-floyd-wish-you-were-here": {
    albumTitle: "Wish You Were Here",
    artist: "Pink Floyd",
    year: 1975,
    suggestedUrl: "https://coverartarchive.org/release-group/1a272023-10d3-38ee-bab3-317b55fcc21d/front",
    localFile: "assets/artwork/pink-floyd-wish-you-were-here.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "pink-floyd-animals": {
    albumTitle: "Animals",
    artist: "Pink Floyd",
    year: 1977,
    suggestedUrl: "https://coverartarchive.org/release-group/20c77fb4-1c9f-33c8-9d7e-c4977f11e847/front",
    localFile: "assets/artwork/pink-floyd-animals.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "pink-floyd-the-wall": {
    albumTitle: "The Wall",
    artist: "Pink Floyd",
    year: 1979,
    suggestedUrl: "https://coverartarchive.org/release-group/f2026101-945b-3d05-9ef4-aa718fc3feef/front",
    localFile: "assets/artwork/pink-floyd-the-wall.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "pink-floyd-the-final-cut": {
    albumTitle: "The Final Cut",
    artist: "Pink Floyd",
    year: 1983,
    suggestedUrl: "https://coverartarchive.org/release-group/e8b7e7a3-ef56-34a5-bedf-085783c9a076/front",
    localFile: "assets/artwork/pink-floyd-the-final-cut.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "pink-floyd-a-momentary-lapse-of-reason": {
    albumTitle: "A Momentary Lapse of Reason",
    artist: "Pink Floyd",
    year: 1987,
    suggestedUrl: "https://coverartarchive.org/release-group/4940b8aa-898b-3e60-9992-94e073bab6f6/front",
    localFile: "assets/artwork/pink-floyd-a-momentary-lapse-of-reason.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "pink-floyd-the-division-bell": {
    albumTitle: "The Division Bell",
    artist: "Pink Floyd",
    year: 1994,
    suggestedUrl: "https://coverartarchive.org/release-group/90878b63-f639-3c8b-aefb-190bdf3d1790/front",
    localFile: "assets/artwork/pink-floyd-the-division-bell.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── THE BEATLES ───────────────────────────────────────────────────────────
  "the-beatles-please-please-me": {
    albumTitle: "Please Please Me",
    artist: "The Beatles",
    year: 1963,
    localFile: "assets/artwork/the-beatles-please-please-me.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beatles-with-the-beatles": {
    albumTitle: "With the Beatles",
    artist: "The Beatles",
    year: 1963,
    localFile: "assets/artwork/the-beatles-with-the-beatles.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beatles-a-hard-days-night": {
    albumTitle: "A Hard Day's Night",
    artist: "The Beatles",
    year: 1964,
    localFile: "assets/artwork/the-beatles-a-hard-days-night.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beatles-beatles-for-sale": {
    albumTitle: "Beatles for Sale",
    artist: "The Beatles",
    year: 1964,
    localFile: "assets/artwork/the-beatles-beatles-for-sale.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beatles-help": {
    albumTitle: "Help!",
    artist: "The Beatles",
    year: 1965,
    localFile: "assets/artwork/the-beatles-help.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beatles-rubber-soul": {
    albumTitle: "Rubber Soul",
    artist: "The Beatles",
    year: 1965,
    localFile: "assets/artwork/the-beatles-rubber-soul.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beatles-revolver": {
    albumTitle: "Revolver",
    artist: "The Beatles",
    year: 1966,
    suggestedUrl: "https://coverartarchive.org/release-group/72d15666-99a7-321e-b1f3-a3f8c09dff9f/front",
    localFile: "assets/artwork/the-beatles-revolver.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beatles-sgt-peppers-lonely-hearts-club-band": {
    albumTitle: "Sgt. Pepper's Lonely Hearts Club Band",
    artist: "The Beatles",
    year: 1967,
    suggestedUrl: "https://coverartarchive.org/release-group/9f7a4c28-8fa2-3113-929c-c47a9f7982c3/front",
    localFile: "assets/artwork/the-beatles-sgt-peppers-lonely-hearts-club-band.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beatles-magical-mystery-tour": {
    albumTitle: "Magical Mystery Tour",
    artist: "The Beatles",
    year: 1967,
    localFile: "assets/artwork/the-beatles-magical-mystery-tour.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beatles-the-beatles": {
    albumTitle: "The Beatles",
    artist: "The Beatles",
    year: 1968,
    suggestedUrl: "https://coverartarchive.org/release-group/055be730-dcad-31bf-b550-45ba9c202aa3/front",
    localFile: "assets/artwork/the-beatles-the-beatles.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: "White Album"
  },
  "the-beatles-abbey-road": {
    albumTitle: "Abbey Road",
    artist: "The Beatles",
    year: 1969,
    suggestedUrl: "https://coverartarchive.org/release-group/9162580e-5df4-32de-80cc-f45a8d8a9b1d/front",
    localFile: "assets/artwork/the-beatles-abbey-road.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beatles-let-it-be": {
    albumTitle: "Let It Be",
    artist: "The Beatles",
    year: 1970,
    suggestedUrl: "https://coverartarchive.org/release-group/bff544a7-56e0-3ed6-9e0f-3b676cca9111/front",
    localFile: "assets/artwork/the-beatles-let-it-be.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── NIRVANA ───────────────────────────────────────────────────────────────
  "nirvana-bleach": {
    albumTitle: "Bleach",
    artist: "Nirvana",
    year: 1989,
    localFile: "assets/artwork/nirvana-bleach.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "nirvana-nevermind": {
    albumTitle: "Nevermind",
    artist: "Nirvana",
    year: 1991,
    suggestedUrl: "https://coverartarchive.org/release-group/1b022e01-4da6-387b-8658-8678046e4cef/front",
    localFile: "assets/artwork/nirvana-nevermind.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "nirvana-in-utero": {
    albumTitle: "In Utero",
    artist: "Nirvana",
    year: 1993,
    localFile: "assets/artwork/nirvana-in-utero.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "nirvana-mtv-unplugged-in-new-york": {
    albumTitle: "MTV Unplugged in New York",
    artist: "Nirvana",
    year: 1994,
    localFile: "assets/artwork/nirvana-mtv-unplugged-in-new-york.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── BOB DYLAN ─────────────────────────────────────────────────────────────
  "bob-dylan-bob-dylan": {
    albumTitle: "Bob Dylan",
    artist: "Bob Dylan",
    year: 1962,
    localFile: "assets/artwork/bob-dylan-bob-dylan.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-the-freewheelin-bob-dylan": {
    albumTitle: "The Freewheelin' Bob Dylan",
    artist: "Bob Dylan",
    year: 1963,
    localFile: "assets/artwork/bob-dylan-the-freewheelin-bob-dylan.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-the-times-they-are-a-changin": {
    albumTitle: "The Times They Are a-Changin'",
    artist: "Bob Dylan",
    year: 1964,
    localFile: "assets/artwork/bob-dylan-the-times-they-are-a-changin.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-another-side-of-bob-dylan": {
    albumTitle: "Another Side of Bob Dylan",
    artist: "Bob Dylan",
    year: 1964,
    localFile: "assets/artwork/bob-dylan-another-side-of-bob-dylan.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-bringing-it-all-back-home": {
    albumTitle: "Bringing It All Back Home",
    artist: "Bob Dylan",
    year: 1965,
    localFile: "assets/artwork/bob-dylan-bringing-it-all-back-home.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-highway-61-revisited": {
    albumTitle: "Highway 61 Revisited",
    artist: "Bob Dylan",
    year: 1965,
    suggestedUrl: "https://coverartarchive.org/release-group/fb48b1dc-412f-36aa-8820-1023c08c46c6/front",
    localFile: "assets/artwork/bob-dylan-highway-61-revisited.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-blonde-on-blonde": {
    albumTitle: "Blonde on Blonde",
    artist: "Bob Dylan",
    year: 1966,
    suggestedUrl: "https://coverartarchive.org/release-group/329fb554-2a81-3d8a-8e22-ec2c66810019/front",
    localFile: "assets/artwork/bob-dylan-blonde-on-blonde.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-john-wesley-harding": {
    albumTitle: "John Wesley Harding",
    artist: "Bob Dylan",
    year: 1967,
    localFile: "assets/artwork/bob-dylan-john-wesley-harding.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-nashville-skyline": {
    albumTitle: "Nashville Skyline",
    artist: "Bob Dylan",
    year: 1969,
    localFile: "assets/artwork/bob-dylan-nashville-skyline.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-new-morning": {
    albumTitle: "New Morning",
    artist: "Bob Dylan",
    year: 1970,
    localFile: "assets/artwork/bob-dylan-new-morning.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-planet-waves": {
    albumTitle: "Planet Waves",
    artist: "Bob Dylan",
    year: 1974,
    localFile: "assets/artwork/bob-dylan-planet-waves.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-blood-on-the-tracks": {
    albumTitle: "Blood on the Tracks",
    artist: "Bob Dylan",
    year: 1975,
    suggestedUrl: "https://coverartarchive.org/release-group/9c1b8072-eb1d-33d2-af8c-984d46e40902/front",
    localFile: "assets/artwork/bob-dylan-blood-on-the-tracks.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-desire": {
    albumTitle: "Desire",
    artist: "Bob Dylan",
    year: 1976,
    localFile: "assets/artwork/bob-dylan-desire.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-slow-train-coming": {
    albumTitle: "Slow Train Coming",
    artist: "Bob Dylan",
    year: 1979,
    localFile: "assets/artwork/bob-dylan-slow-train-coming.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-infidels": {
    albumTitle: "Infidels",
    artist: "Bob Dylan",
    year: 1983,
    localFile: "assets/artwork/bob-dylan-infidels.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-oh-mercy": {
    albumTitle: "Oh Mercy",
    artist: "Bob Dylan",
    year: 1989,
    localFile: "assets/artwork/bob-dylan-oh-mercy.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-time-out-of-mind": {
    albumTitle: "Time Out of Mind",
    artist: "Bob Dylan",
    year: 1997,
    localFile: "assets/artwork/bob-dylan-time-out-of-mind.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-love-and-theft": {
    albumTitle: "Love and Theft",
    artist: "Bob Dylan",
    year: 2001,
    localFile: "assets/artwork/bob-dylan-love-and-theft.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-modern-times": {
    albumTitle: "Modern Times",
    artist: "Bob Dylan",
    year: 2006,
    localFile: "assets/artwork/bob-dylan-modern-times.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-tempest": {
    albumTitle: "Tempest",
    artist: "Bob Dylan",
    year: 2012,
    localFile: "assets/artwork/bob-dylan-tempest.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bob-dylan-rough-and-rowdy-ways": {
    albumTitle: "Rough and Rowdy Ways",
    artist: "Bob Dylan",
    year: 2020,
    localFile: "assets/artwork/bob-dylan-rough-and-rowdy-ways.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── THE VELVET UNDERGROUND ────────────────────────────────────────────────
  "the-velvet-underground-the-velvet-underground-nico": {
    albumTitle: "The Velvet Underground & Nico",
    artist: "The Velvet Underground",
    year: 1967,
    suggestedUrl: "https://coverartarchive.org/release-group/5cbd9d7b-597a-3c5e-bfd1-c2b364215560/front",
    localFile: "assets/artwork/the-velvet-underground-the-velvet-underground-nico.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-velvet-underground-white-light-white-heat": {
    albumTitle: "White Light/White Heat",
    artist: "The Velvet Underground",
    year: 1968,
    localFile: "assets/artwork/the-velvet-underground-white-light-white-heat.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-velvet-underground-the-velvet-underground": {
    albumTitle: "The Velvet Underground",
    artist: "The Velvet Underground",
    year: 1969,
    localFile: "assets/artwork/the-velvet-underground-the-velvet-underground.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: "Self-titled third album"
  },
  "the-velvet-underground-loaded": {
    albumTitle: "Loaded",
    artist: "The Velvet Underground",
    year: 1970,
    localFile: "assets/artwork/the-velvet-underground-loaded.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── BRUCE SPRINGSTEEN ─────────────────────────────────────────────────────
  "bruce-springsteen-greetings-from-asbury-park-n-j": {
    albumTitle: "Greetings from Asbury Park, N.J.",
    artist: "Bruce Springsteen",
    year: 1973,
    localFile: "assets/artwork/bruce-springsteen-greetings-from-asbury-park-n-j.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-the-wild-the-innocent-the-e-street-shuffle": {
    albumTitle: "The Wild, the Innocent & the E Street Shuffle",
    artist: "Bruce Springsteen",
    year: 1973,
    localFile: "assets/artwork/bruce-springsteen-the-wild-the-innocent-the-e-street-shuffle.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-born-to-run": {
    albumTitle: "Born to Run",
    artist: "Bruce Springsteen",
    year: 1975,
    suggestedUrl: "https://coverartarchive.org/release-group/39b22944-7503-3937-8bba-09b17281cc6a/front",
    localFile: "assets/artwork/bruce-springsteen-born-to-run.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-darkness-on-the-edge-of-town": {
    albumTitle: "Darkness on the Edge of Town",
    artist: "Bruce Springsteen",
    year: 1978,
    localFile: "assets/artwork/bruce-springsteen-darkness-on-the-edge-of-town.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-the-river": {
    albumTitle: "The River",
    artist: "Bruce Springsteen",
    year: 1980,
    localFile: "assets/artwork/bruce-springsteen-the-river.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-nebraska": {
    albumTitle: "Nebraska",
    artist: "Bruce Springsteen",
    year: 1982,
    localFile: "assets/artwork/bruce-springsteen-nebraska.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-born-in-the-u-s-a": {
    albumTitle: "Born in the U.S.A.",
    artist: "Bruce Springsteen",
    year: 1984,
    localFile: "assets/artwork/bruce-springsteen-born-in-the-u-s-a.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-tunnel-of-love": {
    albumTitle: "Tunnel of Love",
    artist: "Bruce Springsteen",
    year: 1987,
    localFile: "assets/artwork/bruce-springsteen-tunnel-of-love.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-human-touch": {
    albumTitle: "Human Touch",
    artist: "Bruce Springsteen",
    year: 1992,
    localFile: "assets/artwork/bruce-springsteen-human-touch.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-lucky-town": {
    albumTitle: "Lucky Town",
    artist: "Bruce Springsteen",
    year: 1992,
    localFile: "assets/artwork/bruce-springsteen-lucky-town.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-the-ghost-of-tom-joad": {
    albumTitle: "The Ghost of Tom Joad",
    artist: "Bruce Springsteen",
    year: 1995,
    localFile: "assets/artwork/bruce-springsteen-the-ghost-of-tom-joad.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-the-rising": {
    albumTitle: "The Rising",
    artist: "Bruce Springsteen",
    year: 2002,
    localFile: "assets/artwork/bruce-springsteen-the-rising.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-devils-dust": {
    albumTitle: "Devils & Dust",
    artist: "Bruce Springsteen",
    year: 2005,
    localFile: "assets/artwork/bruce-springsteen-devils-dust.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-magic": {
    albumTitle: "Magic",
    artist: "Bruce Springsteen",
    year: 2007,
    localFile: "assets/artwork/bruce-springsteen-magic.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-working-on-a-dream": {
    albumTitle: "Working on a Dream",
    artist: "Bruce Springsteen",
    year: 2009,
    localFile: "assets/artwork/bruce-springsteen-working-on-a-dream.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-wrecking-ball": {
    albumTitle: "Wrecking Ball",
    artist: "Bruce Springsteen",
    year: 2012,
    localFile: "assets/artwork/bruce-springsteen-wrecking-ball.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-high-hopes": {
    albumTitle: "High Hopes",
    artist: "Bruce Springsteen",
    year: 2014,
    localFile: "assets/artwork/bruce-springsteen-high-hopes.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-western-stars": {
    albumTitle: "Western Stars",
    artist: "Bruce Springsteen",
    year: 2019,
    localFile: "assets/artwork/bruce-springsteen-western-stars.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-letter-to-you": {
    albumTitle: "Letter to You",
    artist: "Bruce Springsteen",
    year: 2020,
    localFile: "assets/artwork/bruce-springsteen-letter-to-you.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "bruce-springsteen-only-the-strong-survive": {
    albumTitle: "Only the Strong Survive",
    artist: "Bruce Springsteen",
    year: 2022,
    localFile: "assets/artwork/bruce-springsteen-only-the-strong-survive.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── THE ROLLING STONES ────────────────────────────────────────────────────
  "the-rolling-stones-the-rolling-stones": {
    albumTitle: "The Rolling Stones",
    artist: "The Rolling Stones",
    year: 1964,
    localFile: "assets/artwork/the-rolling-stones-the-rolling-stones.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: "Self-titled debut"
  },
  "the-rolling-stones-the-rolling-stones-no-2": {
    albumTitle: "The Rolling Stones No. 2",
    artist: "The Rolling Stones",
    year: 1965,
    localFile: "assets/artwork/the-rolling-stones-the-rolling-stones-no-2.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-out-of-our-heads": {
    albumTitle: "Out of Our Heads",
    artist: "The Rolling Stones",
    year: 1965,
    localFile: "assets/artwork/the-rolling-stones-out-of-our-heads.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-aftermath": {
    albumTitle: "Aftermath",
    artist: "The Rolling Stones",
    year: 1966,
    localFile: "assets/artwork/the-rolling-stones-aftermath.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-between-the-buttons": {
    albumTitle: "Between the Buttons",
    artist: "The Rolling Stones",
    year: 1967,
    localFile: "assets/artwork/the-rolling-stones-between-the-buttons.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-their-satanic-majesties-request": {
    albumTitle: "Their Satanic Majesties Request",
    artist: "The Rolling Stones",
    year: 1967,
    localFile: "assets/artwork/the-rolling-stones-their-satanic-majesties-request.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-beggars-banquet": {
    albumTitle: "Beggars Banquet",
    artist: "The Rolling Stones",
    year: 1968,
    localFile: "assets/artwork/the-rolling-stones-beggars-banquet.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-let-it-bleed": {
    albumTitle: "Let It Bleed",
    artist: "The Rolling Stones",
    year: 1969,
    localFile: "assets/artwork/the-rolling-stones-let-it-bleed.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-sticky-fingers": {
    albumTitle: "Sticky Fingers",
    artist: "The Rolling Stones",
    year: 1971,
    localFile: "assets/artwork/the-rolling-stones-sticky-fingers.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-exile-on-main-st": {
    albumTitle: "Exile on Main St.",
    artist: "The Rolling Stones",
    year: 1972,
    suggestedUrl: "https://coverartarchive.org/release-group/4838a3c9-fd2b-30a5-83eb-e32545b5d7fc/front",
    localFile: "assets/artwork/the-rolling-stones-exile-on-main-st.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-goats-head-soup": {
    albumTitle: "Goats Head Soup",
    artist: "The Rolling Stones",
    year: 1973,
    localFile: "assets/artwork/the-rolling-stones-goats-head-soup.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-its-only-rock-n-roll": {
    albumTitle: "It's Only Rock 'n Roll",
    artist: "The Rolling Stones",
    year: 1974,
    localFile: "assets/artwork/the-rolling-stones-its-only-rock-n-roll.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-black-and-blue": {
    albumTitle: "Black and Blue",
    artist: "The Rolling Stones",
    year: 1976,
    localFile: "assets/artwork/the-rolling-stones-black-and-blue.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-some-girls": {
    albumTitle: "Some Girls",
    artist: "The Rolling Stones",
    year: 1978,
    localFile: "assets/artwork/the-rolling-stones-some-girls.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-emotional-rescue": {
    albumTitle: "Emotional Rescue",
    artist: "The Rolling Stones",
    year: 1980,
    localFile: "assets/artwork/the-rolling-stones-emotional-rescue.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-tattoo-you": {
    albumTitle: "Tattoo You",
    artist: "The Rolling Stones",
    year: 1981,
    localFile: "assets/artwork/the-rolling-stones-tattoo-you.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-undercover": {
    albumTitle: "Undercover",
    artist: "The Rolling Stones",
    year: 1983,
    localFile: "assets/artwork/the-rolling-stones-undercover.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-dirty-work": {
    albumTitle: "Dirty Work",
    artist: "The Rolling Stones",
    year: 1986,
    localFile: "assets/artwork/the-rolling-stones-dirty-work.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-steel-wheels": {
    albumTitle: "Steel Wheels",
    artist: "The Rolling Stones",
    year: 1989,
    localFile: "assets/artwork/the-rolling-stones-steel-wheels.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-voodoo-lounge": {
    albumTitle: "Voodoo Lounge",
    artist: "The Rolling Stones",
    year: 1994,
    localFile: "assets/artwork/the-rolling-stones-voodoo-lounge.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-bridges-to-babylon": {
    albumTitle: "Bridges to Babylon",
    artist: "The Rolling Stones",
    year: 1997,
    localFile: "assets/artwork/the-rolling-stones-bridges-to-babylon.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-a-bigger-bang": {
    albumTitle: "A Bigger Bang",
    artist: "The Rolling Stones",
    year: 2005,
    localFile: "assets/artwork/the-rolling-stones-a-bigger-bang.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-rolling-stones-hackney-diamonds": {
    albumTitle: "Hackney Diamonds",
    artist: "The Rolling Stones",
    year: 2023,
    localFile: "assets/artwork/the-rolling-stones-hackney-diamonds.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── THE BEACH BOYS ────────────────────────────────────────────────────────
  "the-beach-boys-surfin-safari": {
    albumTitle: "Surfin' Safari",
    artist: "The Beach Boys",
    year: 1962,
    localFile: "assets/artwork/the-beach-boys-surfin-safari.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-surfin-u-s-a": {
    albumTitle: "Surfin' U.S.A.",
    artist: "The Beach Boys",
    year: 1963,
    localFile: "assets/artwork/the-beach-boys-surfin-u-s-a.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-surfer-girl": {
    albumTitle: "Surfer Girl",
    artist: "The Beach Boys",
    year: 1963,
    localFile: "assets/artwork/the-beach-boys-surfer-girl.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-little-deuce-coupe": {
    albumTitle: "Little Deuce Coupe",
    artist: "The Beach Boys",
    year: 1963,
    localFile: "assets/artwork/the-beach-boys-little-deuce-coupe.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-shut-down-volume-2": {
    albumTitle: "Shut Down Volume 2",
    artist: "The Beach Boys",
    year: 1964,
    localFile: "assets/artwork/the-beach-boys-shut-down-volume-2.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-all-summer-long": {
    albumTitle: "All Summer Long",
    artist: "The Beach Boys",
    year: 1964,
    localFile: "assets/artwork/the-beach-boys-all-summer-long.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-the-beach-boys-today": {
    albumTitle: "The Beach Boys Today!",
    artist: "The Beach Boys",
    year: 1965,
    localFile: "assets/artwork/the-beach-boys-the-beach-boys-today.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-summer-days-and-summer-nights": {
    albumTitle: "Summer Days (and Summer Nights!!)",
    artist: "The Beach Boys",
    year: 1965,
    localFile: "assets/artwork/the-beach-boys-summer-days-and-summer-nights.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-beach-boys-party": {
    albumTitle: "Beach Boys' Party!",
    artist: "The Beach Boys",
    year: 1965,
    localFile: "assets/artwork/the-beach-boys-beach-boys-party.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-pet-sounds": {
    albumTitle: "Pet Sounds",
    artist: "The Beach Boys",
    year: 1966,
    suggestedUrl: "https://coverartarchive.org/release-group/fdd96703-7b21-365e-bdea-38029fbeb84e/front",
    localFile: "assets/artwork/the-beach-boys-pet-sounds.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-smiley-smile": {
    albumTitle: "Smiley Smile",
    artist: "The Beach Boys",
    year: 1967,
    localFile: "assets/artwork/the-beach-boys-smiley-smile.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-wild-honey": {
    albumTitle: "Wild Honey",
    artist: "The Beach Boys",
    year: 1967,
    localFile: "assets/artwork/the-beach-boys-wild-honey.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-friends": {
    albumTitle: "Friends",
    artist: "The Beach Boys",
    year: 1968,
    localFile: "assets/artwork/the-beach-boys-friends.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-20-20": {
    albumTitle: "20/20",
    artist: "The Beach Boys",
    year: 1969,
    localFile: "assets/artwork/the-beach-boys-20-20.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-sunflower": {
    albumTitle: "Sunflower",
    artist: "The Beach Boys",
    year: 1970,
    localFile: "assets/artwork/the-beach-boys-sunflower.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-surfs-up": {
    albumTitle: "Surf's Up",
    artist: "The Beach Boys",
    year: 1971,
    localFile: "assets/artwork/the-beach-boys-surfs-up.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-carl-and-the-passions": {
    albumTitle: "Carl and the Passions",
    artist: "The Beach Boys",
    year: 1972,
    localFile: "assets/artwork/the-beach-boys-carl-and-the-passions.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-holland": {
    albumTitle: "Holland",
    artist: "The Beach Boys",
    year: 1973,
    localFile: "assets/artwork/the-beach-boys-holland.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-15-big-ones": {
    albumTitle: "15 Big Ones",
    artist: "The Beach Boys",
    year: 1976,
    localFile: "assets/artwork/the-beach-boys-15-big-ones.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-the-beach-boys-love-you": {
    albumTitle: "The Beach Boys Love You",
    artist: "The Beach Boys",
    year: 1977,
    localFile: "assets/artwork/the-beach-boys-the-beach-boys-love-you.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-m-i-u-album": {
    albumTitle: "M.I.U. Album",
    artist: "The Beach Boys",
    year: 1978,
    localFile: "assets/artwork/the-beach-boys-m-i-u-album.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-l-a-light-album": {
    albumTitle: "L.A. (Light Album)",
    artist: "The Beach Boys",
    year: 1979,
    localFile: "assets/artwork/the-beach-boys-l-a-light-album.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-keepin-the-summer-alive": {
    albumTitle: "Keepin' the Summer Alive",
    artist: "The Beach Boys",
    year: 1980,
    localFile: "assets/artwork/the-beach-boys-keepin-the-summer-alive.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-the-beach-boys": {
    albumTitle: "The Beach Boys",
    artist: "The Beach Boys",
    year: 1985,
    localFile: "assets/artwork/the-beach-boys-the-beach-boys.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: "Self-titled 1985 album"
  },
  "the-beach-boys-still-cruisin": {
    albumTitle: "Still Cruisin'",
    artist: "The Beach Boys",
    year: 1989,
    localFile: "assets/artwork/the-beach-boys-still-cruisin.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-summer-in-paradise": {
    albumTitle: "Summer in Paradise",
    artist: "The Beach Boys",
    year: 1992,
    localFile: "assets/artwork/the-beach-boys-summer-in-paradise.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "the-beach-boys-thats-why-god-made-the-radio": {
    albumTitle: "That's Why God Made the Radio",
    artist: "The Beach Boys",
    year: 2012,
    localFile: "assets/artwork/the-beach-boys-thats-why-god-made-the-radio.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── MARVIN GAYE ───────────────────────────────────────────────────────────
  "marvin-gaye-that-stubborn-kinda-fellow": {
    albumTitle: "That Stubborn Kinda Fellow",
    artist: "Marvin Gaye",
    year: 1963,
    localFile: "assets/artwork/marvin-gaye-that-stubborn-kinda-fellow.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "marvin-gaye-how-sweet-it-is-to-be-loved-by-you": {
    albumTitle: "How Sweet It Is to Be Loved by You",
    artist: "Marvin Gaye",
    year: 1964,
    localFile: "assets/artwork/marvin-gaye-how-sweet-it-is-to-be-loved-by-you.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "marvin-gaye-a-tribute-to-the-great-nat-king-cole": {
    albumTitle: "A Tribute to the Great Nat King Cole",
    artist: "Marvin Gaye",
    year: 1965,
    localFile: "assets/artwork/marvin-gaye-a-tribute-to-the-great-nat-king-cole.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "marvin-gaye-moods-of-marvin-gaye": {
    albumTitle: "Moods of Marvin Gaye",
    artist: "Marvin Gaye",
    year: 1966,
    localFile: "assets/artwork/marvin-gaye-moods-of-marvin-gaye.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "marvin-gaye-i-heard-it-through-the-grapevine": {
    albumTitle: "I Heard It Through the Grapevine",
    artist: "Marvin Gaye",
    year: 1968,
    localFile: "assets/artwork/marvin-gaye-i-heard-it-through-the-grapevine.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "marvin-gaye-m-p-g": {
    albumTitle: "M.P.G.",
    artist: "Marvin Gaye",
    year: 1969,
    localFile: "assets/artwork/marvin-gaye-m-p-g.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "marvin-gaye-thats-the-way-love-is": {
    albumTitle: "That's the Way Love Is",
    artist: "Marvin Gaye",
    year: 1969,
    localFile: "assets/artwork/marvin-gaye-thats-the-way-love-is.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "marvin-gaye-whats-going-on": {
    albumTitle: "What's Going On",
    artist: "Marvin Gaye",
    year: 1971,
    suggestedUrl: "https://coverartarchive.org/release-group/c1fa4d2c-ec62-37d5-b01d-6df7f8fd2c90/front",
    localFile: "assets/artwork/marvin-gaye-whats-going-on.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "marvin-gaye-lets-get-it-on": {
    albumTitle: "Let's Get It On",
    artist: "Marvin Gaye",
    year: 1973,
    localFile: "assets/artwork/marvin-gaye-lets-get-it-on.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "marvin-gaye-i-want-you": {
    albumTitle: "I Want You",
    artist: "Marvin Gaye",
    year: 1976,
    localFile: "assets/artwork/marvin-gaye-i-want-you.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "marvin-gaye-here-my-dear": {
    albumTitle: "Here, My Dear",
    artist: "Marvin Gaye",
    year: 1978,
    localFile: "assets/artwork/marvin-gaye-here-my-dear.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "marvin-gaye-in-our-lifetime": {
    albumTitle: "In Our Lifetime",
    artist: "Marvin Gaye",
    year: 1981,
    localFile: "assets/artwork/marvin-gaye-in-our-lifetime.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "marvin-gaye-midnight-love": {
    albumTitle: "Midnight Love",
    artist: "Marvin Gaye",
    year: 1982,
    localFile: "assets/artwork/marvin-gaye-midnight-love.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── FLEETWOOD MAC ─────────────────────────────────────────────────────────
  "fleetwood-mac-peter-greens-fleetwood-mac": {
    albumTitle: "Peter Green's Fleetwood Mac",
    artist: "Fleetwood Mac",
    year: 1968,
    localFile: "assets/artwork/fleetwood-mac-peter-greens-fleetwood-mac.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "fleetwood-mac-mr-wonderful": {
    albumTitle: "Mr. Wonderful",
    artist: "Fleetwood Mac",
    year: 1968,
    localFile: "assets/artwork/fleetwood-mac-mr-wonderful.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "fleetwood-mac-then-play-on": {
    albumTitle: "Then Play On",
    artist: "Fleetwood Mac",
    year: 1969,
    localFile: "assets/artwork/fleetwood-mac-then-play-on.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "fleetwood-mac-kiln-house": {
    albumTitle: "Kiln House",
    artist: "Fleetwood Mac",
    year: 1970,
    localFile: "assets/artwork/fleetwood-mac-kiln-house.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "fleetwood-mac-future-games": {
    albumTitle: "Future Games",
    artist: "Fleetwood Mac",
    year: 1971,
    localFile: "assets/artwork/fleetwood-mac-future-games.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "fleetwood-mac-bare-trees": {
    albumTitle: "Bare Trees",
    artist: "Fleetwood Mac",
    year: 1972,
    localFile: "assets/artwork/fleetwood-mac-bare-trees.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "fleetwood-mac-penguin": {
    albumTitle: "Penguin",
    artist: "Fleetwood Mac",
    year: 1973,
    localFile: "assets/artwork/fleetwood-mac-penguin.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "fleetwood-mac-mystery-to-me": {
    albumTitle: "Mystery to Me",
    artist: "Fleetwood Mac",
    year: 1973,
    localFile: "assets/artwork/fleetwood-mac-mystery-to-me.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "fleetwood-mac-heroes-are-hard-to-find": {
    albumTitle: "Heroes Are Hard to Find",
    artist: "Fleetwood Mac",
    year: 1974,
    localFile: "assets/artwork/fleetwood-mac-heroes-are-hard-to-find.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "fleetwood-mac-fleetwood-mac": {
    albumTitle: "Fleetwood Mac",
    artist: "Fleetwood Mac",
    year: 1975,
    localFile: "assets/artwork/fleetwood-mac-fleetwood-mac.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: "Self-titled 1975 album (Buckingham-Nicks era)"
  },
  "fleetwood-mac-rumours": {
    albumTitle: "Rumours",
    artist: "Fleetwood Mac",
    year: 1977,
    suggestedUrl: "https://coverartarchive.org/release-group/416bb5e5-c7d1-3977-8fd7-7c9daf6c2be6/front",
    localFile: "assets/artwork/fleetwood-mac-rumours.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "fleetwood-mac-tusk": {
    albumTitle: "Tusk",
    artist: "Fleetwood Mac",
    year: 1979,
    localFile: "assets/artwork/fleetwood-mac-tusk.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "fleetwood-mac-mirage": {
    albumTitle: "Mirage",
    artist: "Fleetwood Mac",
    year: 1982,
    localFile: "assets/artwork/fleetwood-mac-mirage.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "fleetwood-mac-tango-in-the-night": {
    albumTitle: "Tango in the Night",
    artist: "Fleetwood Mac",
    year: 1987,
    localFile: "assets/artwork/fleetwood-mac-tango-in-the-night.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "fleetwood-mac-behind-the-mask": {
    albumTitle: "Behind the Mask",
    artist: "Fleetwood Mac",
    year: 1990,
    localFile: "assets/artwork/fleetwood-mac-behind-the-mask.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "fleetwood-mac-time": {
    albumTitle: "Time",
    artist: "Fleetwood Mac",
    year: 1995,
    localFile: "assets/artwork/fleetwood-mac-time.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "fleetwood-mac-say-you-will": {
    albumTitle: "Say You Will",
    artist: "Fleetwood Mac",
    year: 2003,
    localFile: "assets/artwork/fleetwood-mac-say-you-will.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── DAVID BOWIE ───────────────────────────────────────────────────────────
  "david-bowie-space-oddity": {
    albumTitle: "Space Oddity",
    artist: "David Bowie",
    year: 1969,
    localFile: "assets/artwork/david-bowie-space-oddity.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-the-man-who-sold-the-world": {
    albumTitle: "The Man Who Sold the World",
    artist: "David Bowie",
    year: 1970,
    localFile: "assets/artwork/david-bowie-the-man-who-sold-the-world.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-hunky-dory": {
    albumTitle: "Hunky Dory",
    artist: "David Bowie",
    year: 1971,
    suggestedUrl: "https://coverartarchive.org/release-group/743b0b2e-a23a-3182-950e-232f8cb0dfb7/front",
    localFile: "assets/artwork/david-bowie-hunky-dory.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-the-rise-and-fall-of-ziggy-stardust-and-the-spiders-from-mars": {
    albumTitle: "The Rise and Fall of Ziggy Stardust and the Spiders from Mars",
    artist: "David Bowie",
    year: 1972,
    suggestedUrl: "https://coverartarchive.org/release-group/6c9ae3dd-32ad-472c-96be-69d0a3536261/front",
    localFile: "assets/artwork/david-bowie-the-rise-and-fall-of-ziggy-stardust-and-the-spiders-from-mars.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-aladdin-sane": {
    albumTitle: "Aladdin Sane",
    artist: "David Bowie",
    year: 1973,
    localFile: "assets/artwork/david-bowie-aladdin-sane.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-pin-ups": {
    albumTitle: "Pin Ups",
    artist: "David Bowie",
    year: 1973,
    localFile: "assets/artwork/david-bowie-pin-ups.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-diamond-dogs": {
    albumTitle: "Diamond Dogs",
    artist: "David Bowie",
    year: 1974,
    localFile: "assets/artwork/david-bowie-diamond-dogs.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-young-americans": {
    albumTitle: "Young Americans",
    artist: "David Bowie",
    year: 1975,
    localFile: "assets/artwork/david-bowie-young-americans.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-station-to-station": {
    albumTitle: "Station to Station",
    artist: "David Bowie",
    year: 1976,
    localFile: "assets/artwork/david-bowie-station-to-station.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-low": {
    albumTitle: "Low",
    artist: "David Bowie",
    year: 1977,
    localFile: "assets/artwork/david-bowie-low.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-heroes": {
    albumTitle: "Heroes",
    artist: "David Bowie",
    year: 1977,
    localFile: "assets/artwork/david-bowie-heroes.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-lodger": {
    albumTitle: "Lodger",
    artist: "David Bowie",
    year: 1979,
    localFile: "assets/artwork/david-bowie-lodger.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-scary-monsters-and-super-creeps": {
    albumTitle: "Scary Monsters (and Super Creeps)",
    artist: "David Bowie",
    year: 1980,
    localFile: "assets/artwork/david-bowie-scary-monsters-and-super-creeps.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-lets-dance": {
    albumTitle: "Let's Dance",
    artist: "David Bowie",
    year: 1983,
    localFile: "assets/artwork/david-bowie-lets-dance.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-tonight": {
    albumTitle: "Tonight",
    artist: "David Bowie",
    year: 1984,
    localFile: "assets/artwork/david-bowie-tonight.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-never-let-me-down": {
    albumTitle: "Never Let Me Down",
    artist: "David Bowie",
    year: 1987,
    localFile: "assets/artwork/david-bowie-never-let-me-down.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-black-tie-white-noise": {
    albumTitle: "Black Tie White Noise",
    artist: "David Bowie",
    year: 1993,
    localFile: "assets/artwork/david-bowie-black-tie-white-noise.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-outside": {
    albumTitle: "Outside",
    artist: "David Bowie",
    year: 1995,
    localFile: "assets/artwork/david-bowie-outside.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-earthling": {
    albumTitle: "Earthling",
    artist: "David Bowie",
    year: 1997,
    localFile: "assets/artwork/david-bowie-earthling.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-heathen": {
    albumTitle: "Heathen",
    artist: "David Bowie",
    year: 2002,
    localFile: "assets/artwork/david-bowie-heathen.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-reality": {
    albumTitle: "Reality",
    artist: "David Bowie",
    year: 2003,
    localFile: "assets/artwork/david-bowie-reality.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-the-next-day": {
    albumTitle: "The Next Day",
    artist: "David Bowie",
    year: 2013,
    localFile: "assets/artwork/david-bowie-the-next-day.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "david-bowie-blackstar": {
    albumTitle: "Blackstar",
    artist: "David Bowie",
    year: 2016,
    localFile: "assets/artwork/david-bowie-blackstar.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── LED ZEPPELIN ──────────────────────────────────────────────────────────
  "led-zeppelin-led-zeppelin": {
    albumTitle: "Led Zeppelin",
    artist: "Led Zeppelin",
    year: 1969,
    localFile: "assets/artwork/led-zeppelin-led-zeppelin.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: "Self-titled debut"
  },
  "led-zeppelin-led-zeppelin-ii": {
    albumTitle: "Led Zeppelin II",
    artist: "Led Zeppelin",
    year: 1969,
    localFile: "assets/artwork/led-zeppelin-led-zeppelin-ii.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "led-zeppelin-led-zeppelin-iii": {
    albumTitle: "Led Zeppelin III",
    artist: "Led Zeppelin",
    year: 1970,
    localFile: "assets/artwork/led-zeppelin-led-zeppelin-iii.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "led-zeppelin-led-zeppelin-iv": {
    albumTitle: "Led Zeppelin IV",
    artist: "Led Zeppelin",
    year: 1971,
    suggestedUrl: "https://coverartarchive.org/release-group/2e61da88-39e9-3473-81d2-c964cb394952/front",
    localFile: "assets/artwork/led-zeppelin-led-zeppelin-iv.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "led-zeppelin-houses-of-the-holy": {
    albumTitle: "Houses of the Holy",
    artist: "Led Zeppelin",
    year: 1973,
    localFile: "assets/artwork/led-zeppelin-houses-of-the-holy.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "led-zeppelin-physical-graffiti": {
    albumTitle: "Physical Graffiti",
    artist: "Led Zeppelin",
    year: 1975,
    localFile: "assets/artwork/led-zeppelin-physical-graffiti.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "led-zeppelin-presence": {
    albumTitle: "Presence",
    artist: "Led Zeppelin",
    year: 1976,
    localFile: "assets/artwork/led-zeppelin-presence.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "led-zeppelin-in-through-the-out-door": {
    albumTitle: "In Through the Out Door",
    artist: "Led Zeppelin",
    year: 1979,
    localFile: "assets/artwork/led-zeppelin-in-through-the-out-door.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "led-zeppelin-coda": {
    albumTitle: "Coda",
    artist: "Led Zeppelin",
    year: 1982,
    localFile: "assets/artwork/led-zeppelin-coda.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── VAN MORRISON ─────────────────────────────────────────────────────────
  "van-morrison-blowin-your-mind": {
    albumTitle: "Blowin' Your Mind!",
    artist: "Van Morrison",
    year: 1967,
    localFile: "assets/artwork/van-morrison-blowin-your-mind.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-astral-weeks": {
    albumTitle: "Astral Weeks",
    artist: "Van Morrison",
    year: 1968,
    suggestedUrl: "https://coverartarchive.org/release-group/7d568f14-d86e-3584-97d0-c1824599de04/front",
    localFile: "assets/artwork/van-morrison-astral-weeks.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-moondance": {
    albumTitle: "Moondance",
    artist: "Van Morrison",
    year: 1970,
    localFile: "assets/artwork/van-morrison-moondance.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-his-band-and-the-street-choir": {
    albumTitle: "His Band and the Street Choir",
    artist: "Van Morrison",
    year: 1970,
    localFile: "assets/artwork/van-morrison-his-band-and-the-street-choir.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-tupelo-honey": {
    albumTitle: "Tupelo Honey",
    artist: "Van Morrison",
    year: 1971,
    localFile: "assets/artwork/van-morrison-tupelo-honey.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-saint-dominics-preview": {
    albumTitle: "Saint Dominic's Preview",
    artist: "Van Morrison",
    year: 1972,
    localFile: "assets/artwork/van-morrison-saint-dominics-preview.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-hard-nose-the-highway": {
    albumTitle: "Hard Nose the Highway",
    artist: "Van Morrison",
    year: 1973,
    localFile: "assets/artwork/van-morrison-hard-nose-the-highway.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-veedon-fleece": {
    albumTitle: "Veedon Fleece",
    artist: "Van Morrison",
    year: 1974,
    localFile: "assets/artwork/van-morrison-veedon-fleece.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-a-period-of-transition": {
    albumTitle: "A Period of Transition",
    artist: "Van Morrison",
    year: 1977,
    localFile: "assets/artwork/van-morrison-a-period-of-transition.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-wavelength": {
    albumTitle: "Wavelength",
    artist: "Van Morrison",
    year: 1978,
    localFile: "assets/artwork/van-morrison-wavelength.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-into-the-music": {
    albumTitle: "Into the Music",
    artist: "Van Morrison",
    year: 1979,
    localFile: "assets/artwork/van-morrison-into-the-music.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-common-one": {
    albumTitle: "Common One",
    artist: "Van Morrison",
    year: 1980,
    localFile: "assets/artwork/van-morrison-common-one.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-beautiful-vision": {
    albumTitle: "Beautiful Vision",
    artist: "Van Morrison",
    year: 1982,
    localFile: "assets/artwork/van-morrison-beautiful-vision.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-no-guru-no-method-no-teacher": {
    albumTitle: "No Guru, No Method, No Teacher",
    artist: "Van Morrison",
    year: 1986,
    localFile: "assets/artwork/van-morrison-no-guru-no-method-no-teacher.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-avalon-sunset": {
    albumTitle: "Avalon Sunset",
    artist: "Van Morrison",
    year: 1989,
    localFile: "assets/artwork/van-morrison-avalon-sunset.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-enlightenment": {
    albumTitle: "Enlightenment",
    artist: "Van Morrison",
    year: 1990,
    localFile: "assets/artwork/van-morrison-enlightenment.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-too-long-in-exile": {
    albumTitle: "Too Long in Exile",
    artist: "Van Morrison",
    year: 1993,
    localFile: "assets/artwork/van-morrison-too-long-in-exile.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-days-like-this": {
    albumTitle: "Days Like This",
    artist: "Van Morrison",
    year: 1995,
    localFile: "assets/artwork/van-morrison-days-like-this.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-the-healing-game": {
    albumTitle: "The Healing Game",
    artist: "Van Morrison",
    year: 1997,
    localFile: "assets/artwork/van-morrison-the-healing-game.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-back-on-top": {
    albumTitle: "Back on Top",
    artist: "Van Morrison",
    year: 1999,
    localFile: "assets/artwork/van-morrison-back-on-top.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-down-the-road": {
    albumTitle: "Down the Road",
    artist: "Van Morrison",
    year: 2002,
    localFile: "assets/artwork/van-morrison-down-the-road.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-magic-time": {
    albumTitle: "Magic Time",
    artist: "Van Morrison",
    year: 2005,
    localFile: "assets/artwork/van-morrison-magic-time.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-keep-it-simple": {
    albumTitle: "Keep It Simple",
    artist: "Van Morrison",
    year: 2008,
    localFile: "assets/artwork/van-morrison-keep-it-simple.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-three-chords-and-the-truth": {
    albumTitle: "Three Chords and the Truth",
    artist: "Van Morrison",
    year: 2019,
    localFile: "assets/artwork/van-morrison-three-chords-and-the-truth.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "van-morrison-latest-record-project-volume-1": {
    albumTitle: "Latest Record Project: Volume 1",
    artist: "Van Morrison",
    year: 2021,
    localFile: "assets/artwork/van-morrison-latest-record-project-volume-1.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── TELEVISION ────────────────────────────────────────────────────────────
  "television-marquee-moon": {
    albumTitle: "Marquee Moon",
    artist: "Television",
    year: 1977,
    suggestedUrl: "https://coverartarchive.org/release-group/2b9f99d8-becf-3fc3-86a6-2bdd4cef93fe/front",
    localFile: "assets/artwork/television-marquee-moon.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "television-adventure": {
    albumTitle: "Adventure",
    artist: "Television",
    year: 1978,
    localFile: "assets/artwork/television-adventure.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "television-television": {
    albumTitle: "Television",
    artist: "Television",
    year: 1992,
    localFile: "assets/artwork/television-television.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: "Self-titled third album"
  },

  // ── DUSTY SPRINGFIELD ─────────────────────────────────────────────────────
  "dusty-springfield-dusty-in-memphis": {
    albumTitle: "Dusty in Memphis",
    artist: "Dusty Springfield",
    year: 1969,
    suggestedUrl: "https://coverartarchive.org/release-group/aac8700b-8f62-30fc-ac2a-23b6cb37e3c3/front",
    localFile: "assets/artwork/dusty-springfield-dusty-in-memphis.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── LOVE ──────────────────────────────────────────────────────────────────
  "love-forever-changes": {
    albumTitle: "Forever Changes",
    artist: "Love",
    year: 1967,
    suggestedUrl: "https://coverartarchive.org/release-group/c7035bc6-6101-326f-992c-401d451c1716/front",
    localFile: "assets/artwork/love-forever-changes.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── NEIL YOUNG ────────────────────────────────────────────────────────────
  "neil-young-harvest": {
    albumTitle: "Harvest",
    artist: "Neil Young",
    year: 1972,
    suggestedUrl: "https://coverartarchive.org/release-group/b25419cf-71bf-3a54-8cd4-2161c61056a0/front",
    localFile: "assets/artwork/neil-young-harvest.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── THE KINKS ─────────────────────────────────────────────────────────────
  "the-kinks-the-kinks-are-the-village-green-preservation-society": {
    albumTitle: "The Kinks Are the Village Green Preservation Society",
    artist: "The Kinks",
    year: 1968,
    suggestedUrl: "https://coverartarchive.org/release-group/4516a30e-939c-3b2b-a8ea-f94ae418d3a6/front",
    localFile: "assets/artwork/the-kinks-the-kinks-are-the-village-green-preservation-society.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── THE SMITHS ────────────────────────────────────────────────────────────
  "the-smiths-meat-is-murder": {
    albumTitle: "Meat Is Murder",
    artist: "The Smiths",
    year: 1985,
    suggestedUrl: "https://coverartarchive.org/release-group/0d56a04c-045a-37db-bcc3-6c7099e94f16/front",
    localFile: "assets/artwork/the-smiths-meat-is-murder.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── ABBA ──────────────────────────────────────────────────────────────────
  "abba-gold-greatest-hits": {
    albumTitle: "Gold: Greatest Hits",
    artist: "ABBA",
    year: 1992,
    suggestedUrl: "https://coverartarchive.org/release-group/b69d665a-3eee-39f3-b156-58b122232304/front",
    localFile: "assets/artwork/abba-gold-greatest-hits.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: "ABBA Gold: Greatest Hits — 33 1/3 series title"
  },

  // ── THE JIMI HENDRIX EXPERIENCE ───────────────────────────────────────────
  "the-jimi-hendrix-experience-electric-ladyland": {
    albumTitle: "Electric Ladyland",
    artist: "The Jimi Hendrix Experience",
    year: 1968,
    suggestedUrl: "https://coverartarchive.org/release-group/47ba2d59-5544-34a4-b108-dc08c0956298/front",
    localFile: "assets/artwork/the-jimi-hendrix-experience-electric-ladyland.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── JOY DIVISION ──────────────────────────────────────────────────────────
  "joy-division-unknown-pleasures": {
    albumTitle: "Unknown Pleasures",
    artist: "Joy Division",
    year: 1979,
    suggestedUrl: "https://coverartarchive.org/release-group/42352def-1aab-3000-b548-895ebd869cb6/front",
    localFile: "assets/artwork/joy-division-unknown-pleasures.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── PRINCE ────────────────────────────────────────────────────────────────
  "prince-sign-o-the-times": {
    albumTitle: "Sign 'O' the Times",
    artist: "Prince",
    year: 1987,
    suggestedUrl: "https://coverartarchive.org/release-group/90718403-7634-3786-84bf-2053a7bd4f4c/front",
    localFile: "assets/artwork/prince-sign-o-the-times.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── JAMES BROWN ───────────────────────────────────────────────────────────
  "james-brown-live-at-the-apollo": {
    albumTitle: "Live at the Apollo",
    artist: "James Brown",
    year: 1963,
    suggestedUrl: "https://coverartarchive.org/release-group/a2bad96f-a572-38f2-b362-5865dedc0d35/front",
    localFile: "assets/artwork/james-brown-live-at-the-apollo.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  // ── JETHRO TULL ───────────────────────────────────────────────────────────
  "jethro-tull-aqualung": {
    albumTitle: "Aqualung",
    artist: "Jethro Tull",
    year: 1971,
    suggestedUrl: "https://coverartarchive.org/release-group/204cc47e-2e1a-3877-8e1e-d14bfffd19aa/front",
    localFile: "assets/artwork/jethro-tull-aqualung.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "the-clash-london-calling": {
    albumTitle: "London Calling",
    artist: "The Clash",
    year: 1979,
    suggestedUrl: "https://coverartarchive.org/release-group/8d73e45e-7ca1-3cb4-ae28-6da76196c17c/front",
    localFile: "assets/artwork/the-clash-london-calling.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "joni-mitchell-blue": {
    albumTitle: "Blue",
    artist: "Joni Mitchell",
    year: 1971,
    suggestedUrl: "https://coverartarchive.org/release-group/42d725fb-a8b7-388c-8866-3b02789af326/front",
    localFile: "assets/artwork/joni-mitchell-blue.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "pixies-doolittle": {
    albumTitle: "Doolittle",
    artist: "Pixies",
    year: 1989,
    suggestedUrl: "https://coverartarchive.org/release-group/1aa41b19-5a72-341b-bd91-4cf61d1dab6b/front",
    localFile: "assets/artwork/pixies-doolittle.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "jeff-buckley-grace": {
    albumTitle: "Grace",
    artist: "Jeff Buckley",
    year: 1994,
    suggestedUrl: "https://coverartarchive.org/release-group/ea29c347-696f-3165-986d-7bad1394b178/front",
    localFile: "assets/artwork/jeff-buckley-grace.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "nick-drake-pink-moon": {
    albumTitle: "Pink Moon",
    artist: "Nick Drake",
    year: 1972,
    suggestedUrl: "https://coverartarchive.org/release-group/740ec10a-e887-38a6-a04d-fe2069c9e2a7/front",
    localFile: "assets/artwork/nick-drake-pink-moon.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "patti-smith-horses": {
    albumTitle: "Horses",
    artist: "Patti Smith",
    year: 1975,
    suggestedUrl: "https://coverartarchive.org/release-group/ff8f533c-3cb3-3877-9209-11f433edaad2/front",
    localFile: "assets/artwork/patti-smith-horses.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "neutral-milk-hotel-in-the-aeroplane-over-the-sea": {
    albumTitle: "In the Aeroplane Over the Sea",
    artist: "Neutral Milk Hotel",
    year: 1998,
    suggestedUrl: "https://coverartarchive.org/release-group/8f310800-045b-3e12-8268-50b3d33a2267/front",
    localFile: "assets/artwork/neutral-milk-hotel-in-the-aeroplane-over-the-sea.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

 
  "talking-heads-fear-of-music": {
    albumTitle: "Fear of Music",
    artist: "Talking Heads",
    year: 1979,
    suggestedUrl: "https://coverartarchive.org/release-group/f378dcb1-841b-3be1-9d96-779036562de1/front",
    localFile: "assets/artwork/talking-heads-fear-of-music.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

 
  "the-replacements-let-it-be": {
    albumTitle: "Let It Be",
    artist: "The Replacements",
    year: 1984,
    suggestedUrl: "https://coverartarchive.org/release-group/2c644807-3b5d-39d4-8c65-dec603bf3f3a/front",
    localFile: "assets/artwork/the-replacements-let-it-be.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "sonic-youth-daydream-nation": {
    albumTitle: "Daydream Nation",
    artist: "Sonic Youth",
    year: 1988,
    suggestedUrl: "https://coverartarchive.org/release-group/24769a99-8189-3d8c-947e-dbc8574dad5c/front",
    localFile: "assets/artwork/sonic-youth-daydream-nation.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "r-e-m-murmur": {
    albumTitle: "Murmur",
    artist: "R.E.M.",
    year: 1983,
    suggestedUrl: "https://coverartarchive.org/release-group/de790d3d-a35c-364c-a8fb-adfb73084a45/front",
    localFile: "assets/artwork/r-e-m-murmur.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "the-band-music-from-big-pink": {
    albumTitle: "Music from Big Pink",
    artist: "The Band",
    year: 1968,
    suggestedUrl: "https://coverartarchive.org/release-group/466fddac-8006-3e71-bbe7-7aa0f587aa88/front",
    localFile: "assets/artwork/the-band-music-from-big-pink.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "lcd-soundsystem-sound-of-silver": {
    albumTitle: "Sound of Silver",
    artist: "LCD Soundsystem",
    year: 2007,
    suggestedUrl: "https://coverartarchive.org/release-group/5cbcdd9f-4b7d-3b3c-b9f2-6b0e75971157/front",
    localFile: "assets/artwork/lcd-soundsystem-sound-of-silver.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "velvet-underground-and-nico": {
    albumTitle: "The Velvet Underground & Nico",
    artist: "The Velvet Underground",
    year: 1967,
    suggestedUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/92/93/39/9293397f-a707-237e-ec7e-0ca613a67e3c/06UMGIM04143.rgb.jpg/600x600bb.jpg",
    localFile: "assets/artwork/velvet-underground-and-nico.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "rolling-stones-exile-on-main-st": {
    albumTitle: "Exile on Main St.",
    artist: "The Rolling Stones",
    year: 1972,
    suggestedUrl: "https://coverartarchive.org/release-group/4838a3c9-fd2b-30a5-83eb-e32545b5d7fc/front",
    localFile: "assets/artwork/rolling-stones-exile-on-main-st.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },
  "public-enemy-it-takes-a-nation": {
    albumTitle: "It Takes a Nation of Millions to Hold Us Back",
    artist: "Public Enemy",
    year: 1988,
    suggestedUrl: "https://coverartarchive.org/release-group/01921d99-9d15-3fce-8734-46e58327cfb7/front",
    localFile: "assets/artwork/public-enemy-it-takes-a-nation.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

 
  "beastie-boys-pauls-boutique": {
    albumTitle: "Paul's Boutique",
    artist: "Beastie Boys",
    year: 1989,
    suggestedUrl: "https://coverartarchive.org/release-group/b534aa01-d621-31ba-9278-38a500e3cdca/front",
    localFile: "assets/artwork/beastie-boys-pauls-boutique.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "jimi-hendrix-electric-ladyland": {
    albumTitle: "Electric Ladyland",
    artist: "Jimi Hendrix",
    year: 1968,
    suggestedUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a6/b8/45/a6b84589-6ff7-a462-9ff9-170b724980d5/dj.wjkdwlks.jpg/600x600bb.jpg",
    localFile: "assets/artwork/jimi-hendrix-electric-ladyland.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "the-smiths-the-queen-is-dead": {
    albumTitle: "The Queen Is Dead",
    artist: "The Smiths",
    year: 1986,
    suggestedUrl: "https://coverartarchive.org/release-group/d8dde278-482c-3cc8-a530-fea70476f3a5/front",
    localFile: "assets/artwork/the-smiths-the-queen-is-dead.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "u2-achtung-baby": {
    albumTitle: "Achtung Baby",
    artist: "U2",
    year: 1991,
    suggestedUrl: "https://coverartarchive.org/release-group/744c7a1b-ac79-35c4-bd92-7e2c6a24c8d8/front",
    localFile: "assets/artwork/u2-achtung-baby.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "dj-shadow-endtroducing": {
    albumTitle: "Endtroducing.....",
    artist: "DJ Shadow",
    year: 1996,
    suggestedUrl: "https://coverartarchive.org/release-group/4b2186f5-ff00-3227-ae11-783ba93e1089/front",
    localFile: "assets/artwork/dj-shadow-endtroducing.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "the-flaming-lips-the-soft-bulletin": {
    albumTitle: "The Soft Bulletin",
    artist: "The Flaming Lips",
    year: 1999,
    suggestedUrl: "https://coverartarchive.org/release-group/1a021034-95d1-3a2d-bdca-73b25e455e49/front",
    localFile: "assets/artwork/the-flaming-lips-the-soft-bulletin.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "kendrick-lamar-to-pimp-a-butterfly": {
    albumTitle: "To Pimp a Butterfly",
    artist: "Kendrick Lamar",
    year: 2015,
    suggestedUrl: "https://coverartarchive.org/release-group/d9103c72-3807-4378-9ce7-b6f3e8fdd547/front",
    localFile: "assets/artwork/kendrick-lamar-to-pimp-a-butterfly.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  },

  "captain-beefheart-trout-mask-replica": {
    albumTitle: "Trout Mask Replica",
    artist: "Captain Beefheart & His Magic Band",
    year: 1969,
    suggestedUrl: "https://coverartarchive.org/release-group/e6a580bd-5d29-3acd-a959-0bfab002ee6f/front",
    localFile: "assets/artwork/captain-beefheart-trout-mask-replica.jpg",
    verifiedByTeacher: false,
    verificationStatus: "needs-review",
    notes: ""
  }

};
