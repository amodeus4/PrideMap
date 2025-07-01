// Global variables
let map;
let currentFilter = 'all';
let currentView = 'list'; // 'list' or 'detail'
let currentEvent = null;
let isMobile = window.innerWidth <= 768;
let mobileViewMode = 'list'; // 'list' or 'map' for mobile

// Mobile view state
let isDragging = false;
let startY, startBottom;

const events = [
    {
        id: 1,
        name: "Strapped x Carabiner: Street Party",
        venue: "Signature Brew",
        address: "Railway Arch 340, Acton Mews, Haggerston, London, E8 4EA",
        time: "18:00-21:00",
        date: "Jul 4",
        price: "Free",
        type: "party",
        tags: ["Lesbian", "Food", "Astrology", "Workshops"],
        description: "DYKE PRIDE STREET PARTY\n4/7\n\nBefore we kick off your pride celebrations with the cxntiest collab club night the London dyke scene has ever had, get those wife pleasers on because we're throwing you a summer sun street party!\n\nSTRAPPED x CARABINER: Dyke Pride Street Party\nFriday 4 July\n6-9pm | @signaturebrewe8\nNo booking required - free entry\n\nFeaturing:\n❤️‍🔥 An all-dyke run makers market & food pop ups\n❤️‍🔥 Tarot, astrology and workshops from @slut.social @collectiveofpleasure @materialgrrrlz (details to be announced soon)\n❤️‍🔥 An advocacy corner to meet and chat with queer activists\n❤️‍🔥 Pints and music in the sun with your fellow dyk3s before the pure chaos of Pride weekend - with a solo goers meeting point\n\nTickets are still available (although over half the tix gone already !) for our Dyke Pride party starting at 9pm and featuring some of the best performers and DJs on the scene. Expect slaggy pop, R&B and cxnty dance.\n\nDyke Pride is a celebration of dyke culture, chaos and love. A pride party that centres trans+ people, POC and a dancefloor where you can feel empowered, free and sexy in a space that is made for us, by us.\n\nDyke Pride (both street party & after-party) is a space for queer women, trans and non-binary people.\n\nSignature Brew is wheelchair accessible throughout, with gender-neutral accessible toilets. There will be an access co-ordinator available throughout the evening.",
        image: "images/strapped2.png",
        ticket_link:"",
        website_link: "https://www.instagram.com/strapped.events/?hl=en",
        coordinates: null,
        generes: [],
        age: "18+",
        sellingFast: false
    },
    {
        id: 2,
        name: "Strapped x Carabiner: After Party",
        venue: "Signature Brew",
        address: "Railway Arch 340, Acton Mews, Haggerston, London, E8 4EA",
        time: "21:00-2:00",
        date: "Jul 4",
        price: "Waitlist",
        type: "party",
        tags: ["Lesbian","Trans", "POC", "Non-Binary"],
        description: "GET READY FOR THE DYK3 PRIDE PARTY OF YOUR DREAMS, HONEY!\n\nTwo of London's hottest parties are joining forces to bring you the ultimate lezzie collab 🫦\n\n❤️‍🔥 STRAPPED x CARABINER: Dyke Pride\n❤️‍🔥 Friday 4 July\n❤️‍🔥 9pm - 2am\n\nDyk3 Pride is a celebration of dyk3 culture, chaos and love. A pride party that centres a safer space for trans+ people, POC, and a dancefloor where you can feel empowered, free and sexy in a space that is made for us, by us.\n\nKick off your pride weekend with us at our fave East London venue @signaturebrewe8 in Haggerston, and BEST BELIEVE we'll be bringing you the most incredible performers and collectives on London's dyk3 scene\n\nMusic will be an absolute priority. We'll be showcasing 3 amazing DJ's - think slaggy pop, R&B and cxnty dance.\n\nKeep your eyes peeled for performers and DJ announcements over the next few days. And if you've ever been to a STRAPPED or CARABINER party before, you KNOW you're in for a night of dyke delights 🎆\n\nExpect lots more surprise announcements!\n\n****\n\nNow more than ever, community has got to be not just a cute buzzword but a way of life. There's no pride in gen0cide and f*ck pinkwashing corporations who slap a rainbow on their logo for a month and call it a day. Pride is an event that so often leaves the most marginalised members of the queer community on the sidelines - so at Dyk3 Pride we want to centre and showcase those queers with love and joy 💜\n\nDyke Pride is a party for queer women, trans and non-binary people.\n\nSignature Brew is wheelchair accessible throughout, with gender neutral accessible toilets. There will be an access coordinator available throughout the evening.\n\n💫💫💫",
        image: "images/strapped.png",
        website_link: "https://www.instagram.com/strapped.events/?hl=en",
        ticket_link: "https://dice.fm/partner/537-media/event/g526aa-strapped-x-carabiner-dyke-pride-4th-jul-signature-brew-haggerston-london-tickets?dice_id=6172401&dice_channel=web&dice_tags=organic&dice_campaign=537+Media&dice_feature=mio_marketing&fbclid=PAZXh0bgNhZW0CMTEAAaf4HCtfgUaAwUGnZ7nH0t0Ej5sAX_qtz-xBypSuttMNO0AdRqSWktIy_j84qA_aem_ng_qjAGmgsMlFwplmrdUzA&_branch_match_id=1287494257629300288&utm_source=web&utm_campaign=537+Media&utm_medium=mio_marketing&_branch_referrer=H4sIAAAAAAAAAw3JSQ6CMBQA0Nu4E5qAQ0yI%2BRIEF6ARCYRNQ2nLWIZSg7Dw7Pq2r1RqmE663lZdo9EqZxoXukMINYyM52xvnjnJ24paD0iTEpEiKNMY2f7LAci46dmKF1EGc%2BR26aHzkEJOvZsgwaNat5%2FLMoRvpfzgjoA%2BxzBu1G3B9dEcAWdM4K7AYw2uKCa%2Fvc5DKySNVth8JeNMyurfRPbzxKRll7IX7AcqM4EArgAAAA%3D%3D",
        coordinates: null,
        generes: [],
        age: "18+",
        sellingFast: false
    },
    {
        id: 3,
        name: "Popola: Pride Edition",
        venue: "The Jam Jar",
        address: "The Old Malt House, Little Ann St, BS2 9EB",
        time: "22:00-4:00",
        date: "Jul 12",
        price: "£0-12",
        type: "party",
        tags: ["QTIPOC","Queer"],
        description: "",
        image: "images/popola.png",
        website_link: "Amores\n\nVery excited to announce our Twerk Temple Pride Extra Special Edition on 12th July at the beloved Jam Jar\n\nBringing our Twerk Temple decolonising sanctuary where diasporic queens, QPOC babes, and allies come together to honour heritage and celebrate culture. Where Latinx and Afro-Caribbean culture comes alive through reggaeton, soca, dancehall, salsa, afrobeats, and moreee\n\nExpect a night of joyful, anti-colonial resistance as incredible DJs, go-go perras, and performers take you on a caliente journey of self-expression, liberation, and pure ancestral fire\n\nMusic by:\n\n- Girl on Girl DJ Collective - Fierce queer non-binary collective celebrating sexuality through art and movement, crafting sacred spaces for authentic self-expression.\n\n- DJ Ivicore - Explosive Venezuelan force delivering electrifying Latinx and Caribbean fire with her signature Elektro Afro Perreo sound.\n\n- DJ Cheza - Multi-dimensional artivist weaving soca, dembow, amapiano, jungle, dubstep, and garage into transcendent underground liberation.\n\nLimited free tickets for our QPOC babes\nEarly bird tickets start at £5\n\nNos vemos",
        ticket_link: "https://www.headfirstbristol.co.uk/whats-on/jam-jar/sat-12-jul-popola-extra-special-pride-edition-132095#e132095",
        coordinates: null,
        generes: ["Afrobeats", "Raggaeton", "Electro", "Salsa", "Dancehall"],
        age: "18+",
        sellingFast: false
    },

    {
        id: 39,
        name: "La camionera Pride After Party",
        venue: "La Camionera",
        address: "243 Well Street,  London,  E9 6RG",
        time: "10:00-22:00",
        date: "Jul 5",
        price: "£10",
        type: "social",
        tags: ["Lesbian", "FLINTA", "Karaoke", "Music"],
        description: "ADONIS PRIDE! \nSATURDAY 5TH OF JULY@ THE CAUSE \nTICKET DOESN'T GUARANTEE ENTRY, RIGHT OF ADMISSION RESERVED. \nDOORS OPEN 10AM - 17:30",
        website_link: "https://www.lacamionera.com/?fbclid=PAZXh0bgNhZW0CMTEAAac1EPzQ0lCkVw6J1KVwB_DtF4FyQmcrWp7utxVE1o7gIh-lgBNwFqvgy080ig_aem_ZKmz-W_S2f3plzY8RLgDRg",
        image: "images/lacami2.png",
        ticket_link: "https://www.outsavvy.com/event/28500/party-after-pride-la-cam-3",
        coordinates: null,
        age: "18+",
        sellingFast: true
    },

    {
        id: 4,
        name: "HOWL Pride",
        venue: "Hackney Wick",
        address: "Hackney Wick, London E9",
        time: "14:00-18:00",
        date: "Jul 5",
        price: "£26-40",
        type: "party",
        tags: ["Queer", "Festival", "Workshops", "Stalls"],
        description: "HOWL PRIDE is back BIGGER than ever!\n\nEscape corporate pride with your beloved babes in East London, no questionable bank sponsored floats in sight, we are going XXXL for a day to night multi-venue party.\n\nMore dance floors, more artists, more performances. As always our infamous darkroom for all genders and sexualities will be making it's return.\n\n-------------------------------------------------------------------------------------------\n\nCommunity Tickets / Unemployed/Low-waged tickets:\n\nOur community are suffering and experiencing hardships on many fronts - because of this we are committed to holding back tickets for those in need as everyone deserves to celebrate together.\n\nReach out to our social channels and join our Whatsapp community where we will will be offering resources and low cost tickets for all HOWL events.",
        image: "images/howl.png",
        website_link: "https://www.instagram.com/howlworldwide/?hl=en",
        ticket_link: "https://ra.co/events/2156157",
        coordinates: null,
        generes: ["Techno", "Bass", "House"],
        age: "18+",
        sellingFast: false
    },
    {
        id: 5,
        name: "JUNK: Pride",
        venue: "Low Profile Studios",
        address: "94 Vale Rd, Harringay Warehouse District, London N4 1PT",
        time: "22:00-05:00",
        date: "Jul 5",
        price: "£12",
        type: "party",
        tags: ["Queer"],
        description: "We are back this Pride! bringing you an immersive industrial experience of sweat, smoke, and sound.\n\nWhere the Power Tools meet the Power Bottoms. get ready to enter the JUNK FACTORY! queer nightlife is reengineered.\n\ncome sweat in the steelworks with a production line-up including Jeanie Crystal, Cassine, Fullenglish, Kurtis Lincoln (live), Goff and one very special ladeh we are keeping on the hush!\n\nCome join the night shift of your wet dreams.\n\nDress the part - you tradie tart: boiler suits, leather, mesh, metal, high-vis, harnesses — whatever your version of industrial looks like, bring your grease, gears and gag refelexes.\n\nclank – clack – cunt\n\nsee you there and don't be late x",
        image: "images/junk.png",
        website_link: "https://www.instagram.com/clubjunk/?hl=en",
        ticket_link: "https://ra.co/events/2176933",
        coordinates: null,
        generes: ["Techno", "House"],
        age: "18+",
        sellingFast: false
    },

    {
        id: 6,
        name: "UNFOLD CII",
        venue: "Fold",
        address: "Gillian House, Stephenson St, London E16 4SA",
        time: "14:00-23:59",
        date: "Jul 6",
        price: "£15-20",
        type: "party",
        tags: ["Queer"],
        description: "A day of joy, a celebration of love; UNFOLD returns on Sunday 6th July.\n\nDoors open at 14:00. As always, the line-up is unannounced and tickets are only available on the door.\n\nEntrance is not guaranteed and is at the sole discretion of our Entrance Team.\n\nDress to sweat.\n\nNO RACISM, NO SEXISM, NO HOMOPHOBIA, NO TRANSPHOBIA, NO ABLEISM.\n\nFold operates a strict 21+ and ID check at the door policy.\n\nYour ticket does not guarantee entry to FOLD; admission is at the sole discretion of our Entrance Team. Please respect their decision.\n\nPhysical ID is mandatory.\n\nClosest transport:\n- Star Lane\n- Canning town",
        image: "images/fold.png",
        website_link: "",
        ticket_link: "https://ra.co/events/2200339",
        coordinates: null,
        generes: ["Techno"],
        age: "21+",
        sellingFast: false
    },
    

    {
        id: 7,
        name: "Uhaul Dyke Rescue",
        venue: "Signature brew",
        address: "Signature Brew, Blackhorse Rd, E17 5QJ",
        time: "13:00-01:00",
        date: "Jul 5",
        price: "£10",
        type: "social",
        tags: ["Football", "Lesbian", "Queer"],
        description: "📣 PRIDE IS COMING HOME 📣\n\nSaturday 5th July sees our biggest party yet as we celebrate Pride in London - and England and Wales launching their tournament campaigns ⚽️🏟️🏆\n\nWe've got a 12 hour spectacular festival for y'all at Signature Brew Blackhorse Road with some of our favourite promoters and football collectives – Uhaul Dyke Rescue, Match of the Gay, Purple Pool as well as our indoor cinema where you can catch the incredible queer short footy films Solers United and We'll Go Down in History (Truk United FC) 🎞️⚽️\n\nYou'll be well fed by The Deaf Chefs + 7 Bone Burger food trucks 🍔 and well watered by all the Signature Brew bars plus Uhaul will be pulling up with their Mobile Dyke Bar 🚚 - they'll be knocking out frozen margaritas 🍹with a side serving of arm wrestling 💪\n\nAfter nightfall, they'll be hosting a DJ takeover in the Brewhall with Rescue icons Harietta and Daisy Gadd on the decks 🪩\n\nPlease DM us with any Qs and requirements - @signaturebrewbh Blackhorse Road is an accessible site with accessible toilets.",
        image: "images/uhaul.png",
        website_link: "https://www.instagram.com/uhaul.dyke.rescue/?hl=en",
        ticket_link: "https://www.tickettailor.com/events/ballerfc/1690980?fbclid=PAZXh0bgNhZW0CMTEAAad0P2IkCyJovW4pWJdFrrb1ehCi5jezdR93xUc7CntUmgXX0H38zrloQDVWYw_aem_sULMts2WJOUvSl11swfOLA",
        coordinates: null,
        generes: [],
        age: "18+",
        sellingFast: false
    },
    {
        id: 8,
        name: "GAYNS Presents: roadrunner",
        venue: "Potters Fields Park",
        address: "Tooley Street London SE1 2UD",
        time: "10:00-12:30",
        date: "Jul 5",
        price: "Free",
        type: "social",
        tags: ["Running Club", "Queer"],
        description: `Join our free Saturday queer run club – <strong>gayns roadrunner</strong>! Whether you're a seasoned runner or just starting out, we've got you, boo. Our run club is inclusive and open to all levels.<br><br>
We meet every Saturday at More London Place (London Bridge Station overlooking Tower Bridge) from 9:30am. We kick off the run at 10am and arrive at The Ministry in Elephant & Castle around 45 minutes later for a social.<br><br>
We meet on this patch of grass on the map <a href="https://www.google.com/maps/place/Potters+Fields+Park/@51.5043692,-0.0801188,17z/data=!4m6!3m5!1s0x487603458c0ed97d:0x5a5acabbe5506060!8m2!3d51.5041452!4d-0.0783269!16s%2Fm%2F012dsd54?entry=tts&g_ep=EgoyMDI0MDkxMS4wKgBIAVAD" target="_blank">HERE</a>.<br><br>
<strong>The 7k route:</strong> We head across Tower Bridge to start, run along the Thames to Waterloo Bridge, cross the bridge, head toward Blackfriars Bridge, and then take a right towards E&C. You can find the route <a href="https://www.strava.com/routes/3257415780539092614?_branch_match_id=1315684561249060249&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXLy4pSixL1EssKNDLyczL1q9yyzcMyHHyrfBNAgBlgS7mIwAAAA%3D%3D" target="_blank">here on Strava</a>.<br><br>
We have 3 pace groups: 4:30, 5:30 & 6:30 minutes per km, plus a back sweep who makes sure they are always the last person in the pack.<br><br>
There is no bag drop, so please travel light.<br><br>
You <strong>MUST</strong> purchase a roadrunner ticket to gain entry to the social at The Ministry, which is a private members club.<br><br>
<a href="https://chat.whatsapp.com/KRPD6cqshnZEGqIK4ePEci" target="_blank">Click here to join our WhatsApp group</a>.<br>
Find us easily, stay in touch, and meet your new running friends!`,
        image: "images/gayns.png",
        website_link: "https://www.instagram.com/getgayns/?hl=en",
        ticket_link: "https://www.eventbrite.co.uk/e/gayns-presents-roadrunner-tickets-1006397912247?aff=erelexpmlt&_gl=1*bedhrn*_up*MQ..*_ga*NTA1MjcwODkzLjE3NTA2MDM2OTU.*_ga_TQVES5V6SH*czE3NTA2MDM2OTUkajYwJGwwJGgw",
        coordinates: null
    },
    {
        id: 9,
        name: "Homoelectric: Pride Party",
        venue: "Metropolis",
        address: "234 Cambridge Heath Road, Bethnal Green, London E2 9NN",
        time: "22:00-4:00",
        date: "Jul 5",
        price: "£6-11.50",
        type: "party",
        tags: ["Gay", "Lesbian", "Queer", "Trans"],
        description: "Homoelectric are delighted to announce the full line up for their July holiday in London. With Bestley, Harry Gay, Gina Breeze, Jamie Bull, Jonjo Jury, Kath McDermott, Laura Jackson and Seb Odyssey all stuffed into their suitcases for the month, we are in for some TREATS every Saturday this July \n\nIncoming London. Manchester's own Homoelectric are packing their suitcases and setting sail for the Big Smoke, as the fam move outta their Mancunian gutter and into Bethnal Green's Metropolis for a month-long summer holiday in July. \n\nThe Manchester underground queer collective will be hosting the first ever Metropolis month-long residency since the transformed East London str!p club's inception — and they will be raising hell across every Saturday in July. Alongside the flags and the dirty outfits, they have stuffed their suitcases with an extended Mancunian crew and will be bringing their dysfunctional disco on tour. \n\nThey will be bringing you four non-stop exotic discos for homos, lesbos, don't knows, kings, queens, trans, pans, queers and their straight peers. That's four raves for the late-night disenfranchised, the refuse-to-be-categorised, and for the dirty ba3tars3 who know that music is LIFE. So that's six hours of music, melodrama, and muck, every Saturday in July. + over 12 DJs including their Homoelectric residents and Homoelectric regulars to be revealed on the line-up as they go… \n\nInto the music melting pot each week, they will throw a hot sweaty homo-made mix of disco, house, techno, garage, sleaze and dirty basslines with no pomp, no snobbery and no pretension! Sexual orientation and music genres are irrelevant on the Homoelectric dancefloors. \n\nRemember the motto: love is the message, music is the life, Homoelectric is for the late night disenfranchised. A Queer party for all. \n\nThis is going to be a vacation to remember. See you at the Villa (aka Metropolis) this July!",
        image: "images/homoelectric.png",
        website_link: "https://www.instagram.com/homoelectric/?hl=en",
        ticket_link: "https://ra.co/events/2140155",
        coordinates: null,
        generes: ["Disco", "House", "Techno", "Garage"],
        age: "18+",
        sellingFast: false
    },
    {
        id: 10,
        name: "Daslton Superstore Pride 2025",
        venue: "Dalston Superstore",
        address: "117 Kingsland High Street, London, E8 2PB",
        time: "22:00-4:00",
        date: "Jul 5",
        price: "£8-10",
        type: "party",
        tags: ["Queer"],
        description: "Escape commercial chaos & get down to the underground… Your favourite superstar DJs pump the dancefloor all the way thru to 4am for SUPERSTORE PRIDE!!!! \n\nIn the lazerpit it's body heaters & floor fillers from 4 adored nightlife babes: \nASHTREY / PERRINHA / ROSS ANDERSON B2B RAUL BOTELLA Plus pure queer chaos on the top deck from RYAN LOVELL, RAKS & MIKE MENACE!! Lending their sensual dancefloor stylings are MARCELLO LUCIO & MISSAVERI!!!",
        image: "images/dalston.png",
        website_link: "https://www.instagram.com/dsuperstore/?hl=en",
        ticket_link: "https://www.outsavvy.com/event/28257/pride-2025-at-dalston-superstore-",
        coordinates: null,
        generes: ["House", "Techno", "Pop"],
        age: "18+",
        sellingFast: false
    },
    {
        id: 11,
        name: "Trans Pride",
        venue: "Dalston Superstore",
        address: "117 Kingsland High Street, London, E8 2PB",
        time: "22:00-4:00",
        date: "Jul 26",
        price: "£8-10",
        type: "party",
        tags: ["Trans", "Queer"],
        description: "Dalston Superstore proudly presents our annual TRANS PRIDE after party on Saturday 26th of July 2025.",
        image: "images/dalston2.png",
        website_link: "https://www.instagram.com/dsuperstore/?hl=en",
        ticket_link: "https://dalstonsuperstore.com/event/trans-pride-2025/",
        coordinates: null,
        generes: ["House", "Techno", "Pop"],
        age: "18+",
        sellingFast: false
    },
    {
        id: 12,
        name: "t'ARTopia",
        venue: "VFD Dalston",
        address: "66 Stoke Newington Road,  London,  N16 7XB",
        time: "19:00-22:00",
        date: "Jul 10",
        price: "£8-9",
        type: "social",
        tags: ["Queer","Drag", "Comedy", "Poetry", "Cabaret", "Music"],
        description: "Join us in t'ARTopia for a queer-curated night of drag, comedy, poetry, cabaret and music from some of our most delicious t'ARTs.\n\nWe have invited some of our favourite performers to entertain you all, at a night that will be nothing short of t'ARTopian.\n\nWe will be raising money for gender affirming surgery funds with this evening's raffle, so come with a couple of quid, win art and raise money for good causes!\n\nLet's get mouth-watering\n\nSchedule:\n7:15pm -  Doors Open\n7:30pm - Start\n10:00pm - End\n\nt'ART is a queer-led arts and lit collective, that creates space (on the page and in real life) for marginalised voices.",
        image: "images/artopia.png",
        website_link: "https://www.vfdalston.com",
        ticket_link: "https://www.outsavvy.com/event/28072/tartopia",
        coordinates: null,
        age: "18+",
        sellingFast: false
    },
    {
        id: 13,
        name: "Self-Tie workshop",
        venue: "Signature Brew",
        address: "Railway Arch 340, Acton Mews, Haggerston, London, E8 4EA",
        time: "19:00-20:00",
        date: "Jul 4",
        price: "£11.22",
        type: "workshop",
        tags: ["Shibari", "Beginner-Friendly"],
        description: "Rope Self-Tie Workshop with Slut Social & Skool 4 Sluts!\n\nIn this workshop you will learn the basics of how to start self tying and a simple chest harness that can be used in play or as a fashion accessory to an outfit.\n\nNo prior experience or knowledge of rope is required for this workshop.\n\nRope will be provided for the workshop. You are welcome to bring your own rope If you prefer or if you would like to wear your harness after the workshop.\n\nTaught by Lois, who has been practicing shibari for 5 years and specifically focuses on self tying and femme lesbian focused ties between people. Lois studied ballet, contortion and gymnastics for many years and brings her knowledge of anatomy to her style of tying.\n\n******\n\nThe workshop will take place as part of STRAPPED / CARABINER Dyke Pride Street Party on Friday 4th July.\n\nThe workshop will run from 7.30 - 8.30pm, inside the venue\n\nSignature Brew is fully wheelchair accessible throughout, with accessible gender neutral toilets",
        image: "images/selftie.png",
        website_link: "https://www.instagram.com/strapped.events/?hl=en",
        ticket_link: "https://dice.fm/event/xepbxe-self-tie-workshop-with-slut-social-skool-4-sluts-4th-jul-signature-brew-haggerston-london-tickets",
        coordinates: null,
        age: "18+",
        sellingFast: false
    },

    {
        id: 14,
        name: "RIPOSTE - HOT QUEER DAY RAVE & clothes swap",
        venue: "The Cause",
        address: "60 Dock Road, London, E16 1YZ",
        time: "14:00-23:00",
        date: "Jul 13",
        price: "£16-19",
        type: "party",
        tags: ["Rave", "Playroom", "Clothes Swap", "Art"],
        description: "HOT HOT LINE UP \n2 DANCEFLOORS\n1 PLAYROOM\nPERFORMANCES\nHUGE CLOTHES SWAP:Bring something & leave with something!",
        image: "images/reposte.png",
        website_link: "https://www.instagram.com/riposte.london",
        ticket_link: "https://ra.co/events/2175793",
        coordinates: null,
        age: "18+",
        generes: ["Techno", "House"],
        sellingFast: false
    },
    

    {
        id: 15,
        name: "Maiden Voyage",
        venue: "Burgess Park",
        address: "Albany Road, Burgess Park, SE5 0AL",
        time: "12:00-22:00",
        date: "Aug 9",
        price: "£66",
        type: "party",
        tags: ["Festival", "Queer"],
        description: "Four stages and distinct stage hosts representing the city's vibrant dance scene, capturing the essence of London's underground and showcasing it in a unique outdoor setting. High energy, uncompromising sound & production and a diverse, cutting-edge lineup.\n\nA long-time champion of London's sound and dancefloors, Azealia Banks returns to London to headline the PXSSY PALACE mainstage at Maiden Voyage Festival after her run of sold out shows last year. This has been 10 years in the making for PXSSY PALACE.\n\nAlongside PXSSY PALACE, FOLD return to host the UNFOLD stage. Last year, we saw UNFOLD residents James Newmarch, Voicedrone and more deliver an exceptional day's programming, with a special guest appearance. Expect more of the same this year.\n\nAdonis join the party, best described by The Face magazine:\n'hypnotising techno and house beats, a bevy of bare-skin bodies romping through the night in a glimmering sheen of sweat'.\n\nTickets on sale Thursday 27th Feb, sign up to the presale via the link in our IG bio.\n\nLast entry 6pm.",
        image: "images/maiden.png",
        website_link: "https://www.instagram.com/maidenvoyagefestival/?hl=en",
        ticket_link: "https://ra.co/events/2048272?fbclid=PAZXh0bgNhZW0CMTEAAadDT-2KPUQplrzpnI4E8uPhllcaqMfOoE9Cxu7Lq9t-42SSXM0QkOAhMqRPTg_aem_C1jA8EFvYjkT9SrFNOou4w",
        coordinates: null,
        generes: ["Techno", "Afrobeats", "House", "Pop", "Bass"],
        age: "18+",
        sellingFast: true
    },
    {
        id: 16,
        name: "SISU x FLAW: DJ Workshop",
        venue: "Gut level",
        address: "32-34 Chapel Walk, Sheffield, S1 2PD",
        time: "15:00-18:00",
        date: "Jul 5",
        price: "Free",
        type: "workshop",
        tags: ["Queer", "Gay", "Non-Binary", "Lesbian"],
        description: "This special collab session with SISU & FLAW includes:\n\nCDJ tutorials\nHow to create a set\nHow to download music\nRekordbox tutorials\nAny experience level is welcome!!! So please don't feel put off from coming down if you've never mixed music before.\n\nThere are 12 slots available for this session. Please sign up below to confirm your spot.\n\nThis session is free but you need to have a ticket for the party in the evening - info here and tickets here.",
        image: "images/gutlevel.png",
        website_link: "https://www.instagram.com/workingclassicsrecs/?hl=en",
        ticket_link: "https://gutlevel.co.uk/whatson/flawxsisu?fbclid=PAQ0xDSwK9I2dleHRuA2FlbQIxMAABp5caQIknyoc7Qcu-Eal3WRgW2zSkVMw4hr03kQbicMSnGDSR-naSnIM4TmKp_aem_24S-I3hWxGFPJ3u3jCwF6A",
        coordinates: null,
        age: "18+",
        sellingFast: false
    },
    {
        id: 17,
        name: "Working Classics",
        venue: "Gut level",
        address: "32-34 Chapel Walk, Sheffield, S1 2PD",
        time: "21:00-02:00",
        date: "Jul 5",
        price: "£8-10",
        type: "party",
        tags: ["Queer", "Gay", "Non-Binary", "Lesbian"],
        description: "Working Classics X Gut Level\n\nCalling all gals, gays & theys, we're slithering down Snake Pass to Sheffield's smuttiest venue Gut Level on July 5th for a night of dark, hot & sexy euphoria!\n\nWe are delighted to welcome Manchester's very own Aiden Francis to the helm for this one! Known for his dynamic mixing style and vibrant energy, the High Hoops resident builds immersive and transformative DJ sets, full of groove and sensuality, that pulse with the energy of the turn of the millennium. Operating within the world of progressive sounds, he effortlessly weaves together ethereal trance, sultry house, electro & tribal sounds in a way that is uniquely his own. Aiden has built a reputation on the underground circuit, cutting his teeth at Manchester's iconic queer parties, he's since performed at legendary venues across the UK and Europe, including the White Hotel, CLUB RAUM, Macadam, OXI, the Warehouse Project & Boiler Room. As a prolific producer, Aiden's music bridges the gap between golden-era dance music & contemporary innovation, with his tracks landing on respected imprints Raidiant Records, Duality Trax, Neptune Discs, Goddezz & more. Aiden knows how to take dancers on a spiritual journey and we can't wait to jet off into the cosmos with him !\n\nJoining him for the ride is Working Classics residents Shauna & Bron (plus one more special guest TBA)..\n\nQueensway alumni (and one of Ireland's best exports after Taytos) Bron has been making waves on the Liverpool scene with their eclectic and hi NRG sets that blend of queer progressive house, lush girly R&B vocal samples & crying in the club heaters. We can't wait to welcome them to Gut Level for their first show outside of Liverpool!\n\nWorking Classics boss & SISU resident Shauna loves the hypnotic & cosmic realm of 4X4. Her trippy & transcendental selections have earned her support slots with the likes of I. JORDAN, PLANNINGTOROCK, Kettama & more. Shauna's own productions frequently pay homage to queer pioneers & innovators, drawing on samples from across our history and weaving them into her own productions to bring together the past, present & future of queer culture\n\nWe're also collaborating with Sisu and Flaw to bring you a DJ Workshop 15:00-18:00 before the party, open to any queer people, women & gender minorities. To sign up, please fill in the form on the Gut Level website (head to their 'What's On' section & find the Flaw X Sisu event)\n\nPlease note the capacity of the workshop is limited to 12 so everyone can get a chance at mixing!\n\nGut Level is a limited capacity sexy sweat-fest so act fast if you want to cum\n\nNo one turned away for lack of funds, email shaunurgh@gmail.com\n\nGut Level is a members-only club so attendees will need to pay their £2 yearly membership to come",
        image: "images/gutlevel.png",
        website_link: "https://www.instagram.com/workingclassicsrecs/?hl=en",
        ticket_link: "https://ra.co/events/2174991",
        coordinates: null,
        generes: ["Progressive House", "Trance"],
        age: "18+",
        sellingFast: false
    },
    {
        id: 18,
        name: "Queer Game Club",
        venue: "The Green House",
        address: "244-254 Cambridge Heath Road, London, E2 9DA",
        time: "18:00-21:00",
        date: "Jul 7",
        price: "Free",
        type: "social",
        tags: ["Board Games", "Queer Migrants", "POC"],
        description: "🎲 Queer Game Night: Let the Games Begin! 🎮\n\nGrab your tokens, shuffle your cards, and get ready for a night of games, snacks, and queer joy! This Queer Game Night is for queer migrants and queer people of colour, so bring your best game face and let's play! 🌈\n\nWhether you're a board game newbie or a seasoned pro who always 'accidentally' wins at Monopoly, this night is for you. We'll have some games ready, and you can also bring your own favourites to share! Snacks and refreshments will keep your energy up, no matter how intense the competition gets.\n\nWhat's in store?\n🎲 Meet amazing people and maybe even new gaming buddies\n🎉 Level up your social skills IRL\n🥂 Gobble snacks like Pac-Man\n🩺 Bonus treasure: Free sexual health resources and STI self-test kits to take home\n\nAccessibility: The venue is wheelchair accessible.\n\nSpaces are limited—bring your A-game (or just your love of snacks) and let's have a blast!",
        image: "images/game.png",
        website_link: "https://www.instagram.com/thelovetankcic/?hl=en",
        ticket_link: "https://www.thelovetank.info/events?fbclid=PAZXh0bgNhZW0CMTEAAadEGVxo18SxUsDyxQVsw8DsTBFOM7paHCgjzeWCetGgRApwTMfi1Zu6BPQbrA_aem_N9j85pGpA_0dsTeX5OT1TQ",
        coordinates: null,
        age: "18+",
        sellingFast: false
    },
    {
        id: 19,
        name: "ALTERNATIVE PRIDE",
        venue: "Coven",
        address: "FABWICK, Queen's Yard, London E9 5EN",
        time: "20:00-02:00",
        date: "Jul 5",
        price: "£11.50",
        type: "party",
        tags: ["Queer"],
        description: "Join us on Saturday 5th July from 20:00 - 02:00 am to enjoy an Alternative Pride Party outside the commercial Pride hype. We're taking over COVEN, a brand-new queer bar and arts space in Hackney Wick. Walk through the portal and step into a new era of queer nightlife and community. Whether you're ready to dance all night or relax in the outdoor terrace with good company, there's a vibe for everyone.\n\nThe Alternative Pride Party is an annual celebration by Moonlight Experiences that centres BIPOC queers and brings together a vibrant mix of change-makers, creatives, community builders, and weavers. The event is open to all queers, non-binary folks, trans people, lesbians, dykes, bi babes, the beautifully unlabelled, and allies who want to celebrate within East London's queer scene. This is the perfect place to get to know new people and listen to some great music from some emerging and talented DJs.\n\nThese powerhouse DJs bring an electrifying mix of genres spanning through Afrobeats, Dancehall, Soca, R&B, Hip-Hop, Funky House, Reggaeton, Pop, and more. From nostalgic Y2K edits to deep global cuts and high-octane carnival rhythms, their sounds are rooted in liberation. Together, they will create dancefloor experiences that are genre-defying, boundary-pushing, and unapologetically queer to enjoy Pride.\n\nSCARBA, Bonnèt Thee Mixtress, Lyvonne The Don, Trojan, Wardi (Host)\n\nDoors open at 20:00 (drop by early to beat the rush or meet some people if you are dropping by solo)\nDjs from 21:00\nParty until 2 am (last entry at 1 am)\n\nPlease note the event is taking upstairs at Coven (above Fabwick) which is currently not wheelchair accessible",
        image: "images/coven2.png",
        website_link: "https://www.instagram.com/covenhackney/?hl=en",
        ticket_link: "https://ra.co/events/2199271",
        coordinates: null,
        generes: ["Afrobeats", "Dancehall", "R&B", "Funky House"],
        age: "18+",
        sellingFast: false
    },
    {
        id: 20,
        name: "THE LESBIAN PUB QUIZ",
        venue: "The Clapham North Pub",
        address: "409 Clapham Road Upstairs bar London SW9 9BT",
        time: "19:00-22:00",
        date: "Jul 20",
        price: "£11.55",
        type: "party",
        tags: ["LGBTQ+"],
        description: "Every month this quiz attracts a room full of competitive queers ready to test their LGBTQ knowledge and chance winning fabulous prizes!",
        image: "images/island.png",
        website_link: "https://www.instagram.com/lesbian_island_/?hl=en",
        ticket_link: "https://www.eventbrite.co.uk/e/the-lesbian-pub-quiz-tickets-1409338522459?aff=ebdsoporgprofile&_gl=1*nwy600*_up*MQ..*_ga*MTk0ODM2MjUwMi4xNzUxMjI2MjI0*_ga_TQVES5V6SH*czE3NTEyMjYyMjQkbzEkZzAkdDE3NTEyMjYyMjQkajYwJGwwJGgw",
        coordinates: null,
        age: "18+",
        sellingFast: false
    },
    
    


    {
        id: 21,
        name: "STRUT: Queer Line Dancing",
        venue: "Coven",
        address: "FABWICK, Queen's Yard, London E9 5EN",
        time: "19:00-22:00",
        date: "Jul 15",
        price: "£9",
        type: "workshop",
        tags: ["Queer", "Line Dancing"],
        description: `Giddy up girls, gays, and theys—assemble your posse because STRUT Queer Line Dancing is moseying into town!<br><br>
Come learn to line dance with other queer hotties to Chappell Roan, Beyoncé, Britney, Charli XCX, Rihanna, Lady Gaga, Janet Jackson, Caroline Polachek, country classics, and more!<br><br>
<strong>Discounted tickets for QTIBPOC</strong><br>
<strong>Lessons from 7:30pm – no experience necessary</strong><br><br>
You'll learn a bunch of beginner-friendly follow-alongs and two full line dances, with breaks and an open dance floor for requests throughout.<br><br>
Polish your boots and get ready to STRUT!<br><br>
<strong>ACCESSIBILITY:</strong><br>
The venue is above FABWICK, accessed via a set of metal stairs and is unfortunately not currently wheelchair accessible.<br><br>
Line dancing involves footwork such as stepping from foot to foot in different directions, stamping, kicking, and winding steps like the grapevine, as well as twisting, turning, and spinning.<br><br>
There is a covered outdoor terrace with picnic benches and plenty of seating inside the venue at the back of the dance floor.`,
        image: "images/coven4.png",
        website_link: "https://www.instagram.com/strut.ldn/?hl=en",
        ticket_link: "https://www.outsavvy.com/event/28477/strut",
        coordinates: null,
        generes: ["Country", "Pop", "Rock"],
        age: "18+",
        sellingFast: true
    },
    {
        id: 22,
        name: "POC Single's Night",
        venue: "La Camionera",
        address: "243 Well Street,  London,  E9 6RG",
        time: "18:00-21:00",
        date: "Jul 1",
        price: "Free",
        type: "social",
        tags: ["Lesbian", "Trans", "Non-Binary", "POC"],
        description: "Low pressure speed dating, matchmaking, and games.",
        image: "images/camionera.png",
        website_link: "https://www.lacamionera.com/",
        ticket_link: "",
        coordinates: null,
        age: "18+",
        sellingFast: false
    },
    {
        id: 23,
        name: "Second Tuesday Monologues - HEAT",
        venue: "The Common Counter",
        address: "118 Bethnal Green Road, London, E2 6DG",
        time: "18:00-21:00",
        date: "Jul 8",
        price: "Free",
        type: "social",
        tags: ["Queer", "Dog-Friendly", "Monologues"],
        description: "📅 Tuesday, 8th of June 2025\n⏰ Doors 7 PM, Monologues 7:30 PM\n📍 The Common Press, 118 Bethnal Green Rd, London E2 6DG\n\nThis July, Second Tuesday Monologues is turning up the temperature with the theme HEAT. 🔥☀️\n\nWhether it's a scorching summer romance, the heat of political resistance, or the slow burn of desire and tension—expect stories that sizzle, spark, and smoulder. From steamy confessions to fiery truths, this will be a night of storytelling that glows hot with queer power and passion.\n\nHOW IT WORKS:\n\n🎭 Monologists have up to 10 minutes to share their unique take on the theme.\n🛋️ After the performances, we settle in for an open group discussion.\n\n🎟️ FREE ENTRY – but pre-booking is highly recommended!\n🍸 Support The Common Press – grab a drink from the bar and enjoy the night!\n🐶 Dog-friendly venue\n♿ Fully wheelchair accessible (entrance via Common Press Bookshop, additional level-access available)\n🚻 Please note: The bookshop itself doesn't have toilets, but accessible restrooms are available across the street at Rich Mix.\n\n💬 WANT TO PERFORM?\n\nWe're always on the lookout for new voices! Email Rob at maureen@thelovetank.info if you'd like to be a monologuist at this or future editions. Monologuists receive a small fee as a token of gratitude.\n\n✨ UPCOMING THEMES:\n\n📅 Aug 12: Freedom 🦅\n📅 Sept 9: Shadows 🌘\n📅 Oct 14: Black Queer Horror 🧟‍♀️👻\n📅 Nov 11: Legacy 🕊️\n📅 Dec 9: Chosen 🎁🫂\n\n➡️ If you can no longer attend, please let us know so we can offer your spot to someone else.\n\n📢 Follow @thelovetankcic for updates on this and other free queer community events! 🌈💜\n\n💕 Join us for a night of queer creativity, community, and connection. RSVP now to reserve your spot—space is limited!",
        image: "images/mono.png",
        website_link: "https://www.instagram.com/thelovetankcic/followers/mutualOnly?hl=en",
        ticket_link: "https://www.thelovetank.info/events?fbclid=PAZXh0bgNhZW0CMTEAAacu5JvQWXXyLIPixlOXmTg2nzRiRTPCG4V4Ht-rbjyonPcN_WAuL2Zqz0KiYg_aem_dILYj-QY3XgKPk1guE1IBQ",
        coordinates: null,
        sellingFast: false
    },
    
    {
        id: 24,
        name: "HOMOSTASH PRIDE RAVE",
        venue: "Colours Hoxton",
        address: "2-4 Hoxton Square,  London,  N1 6NU",
        time: "21:30-03:30",
        date: "Jul 5",
        price: "£13-250 ",
        type: "party",
        tags: ["Gay", "Queer", "Rave"],
        description: `Join the <strong>HOMOSTASH PRIDE RAVE</strong> at Colours Hoxton as part of our 11th year anniversary celebrations with an incredible queer line-up and all-night wild energy!<br><br>
🌀 <strong>Room 1 (techno):</strong> Ukrainian DJ sensation CATMINT + residents TAFKANIK & TELEOPATH<br><br>
🌈 <strong>Room 2 (disco/house + happy vibes):</strong> FILIUS, MARIANNA, NAWTY NICKY, N.U. NEIGHBOUR<br><br>
🔥 Expect sexy, moustachioed go-gos, wild performers including Christian Nimri, Daisy Puller, Jools, Rylee and the one-and-only Becky aka Prince of Poland & Ronnie as your hosts.<br><br>
🎉 This isn't just a Pride party – it's going to be <strong>WILD!</strong><br><br>
And whether you rock a moustache or just love them, everyone is welcome. 🖤`,
        image: "images/homostash.png",
        website_link: "https://www.instagram.com/homostash/?hl=en",
        ticket_link: "https://www.outsavvy.com/event/27347/homostash-pride-rave-colours-hoxton",
        coordinates: null,
        generes: ["House", "Techno", "Disco", "Happy Vibes"],
        age: "18+",
        sellingFast: true
    },

    {
        id: 25,
        name: "~\\ LILITH //~ chrysalis",
        venue: "Secret Location",
        address: "",
        time: "14:00-23:00",
        date: "Jul 12",
        price: "Donations",
        type: "party",
        tags: ["Day Party", "BBQ", "Queer"],
        description: "🦋𝓬𝓱𝓻𝔂𝓼𝓪𝓵𝓲𝓼 𖤓 𝓰𝓸𝓸 𖤓 𝓭𝓲𝓪𝓹𝓱𝓪𝓷𝓸𝓾𝓼 𖤓 𝓫𝓵𝓸𝓸𝓶 𖤓 𝓹𝓾𝓹𝓪𝓮 𖤓 𝓹𝓪𝓻𝓽𝔂 🦋\n\n🥵delicious activities to be announced - basic bitch bbq, SO MUCH MORE tba 👀\n\n🍬sweetheart DJ line up🍬\n\nGoh\nInda Flo\nAilish\nWatcha\nKamran\nHeavedny\nlilith luvrs more tba\n\n\n🧚🏻‍♂️keep eyes peeled + hearts open for delicious activities announcement🧚🏻‍♂️\n\n\n\n🌀20 min walk from Enfield Lock station - riverside party spot 🌀we dance under a willowtree 🧚🏻‍♂️\n\n\n\nevent location sent to ticket holders the day before.\n\n\n\nDonation-based tickets, pay-what-you-can.\n\nWe break even if everyone chips in around £15 - this will include snacks, activities etc. but anything appreciated x",
        image: "images/lilith.png",
        website_link: "",
        ticket_link: "https://www.eventbrite.com/e/lilith-chrysalis-tickets-1391278975869",
        coordinates: null,
        generes: ["Afrobeats", "UK Bass", "Edits", "House"],
        age: "18+",
        sellingFast: false
    },


    {
        id: 26,
        name: "Playbody 009",
        venue: "Secret Location",
        address: "",
        time: "21:00-04:30",
        date: "Jul 5",
        price: "Free ",
        type: "party",
        tags: ["Music", "Experience", "Art", "Fashion"],
        description: "Next week's program for what is set to be a sun-kissed, sweaty playbody 009 ⋆·˚ ༘ * \n\nIf you're with us, dm for the ticket password. we prioritise our community and spots are super limited so not all will receive a code",
        image: "images/playbody.png",
        website_link: "https://www.instagram.com/playbody.london/",
        ticket_link: "https://www.playbody.london/initiation?fbclid=PAZXh0bgNhZW0CMTEAAaf6cCtR_nKCo0rOxLFdw4T0G9-gNX-xu8zf0_8UJFz3Q-aNS_MUyUP6sOHnjw_aem_qUf7oaGnLGcKqeLW41jJGg",
        coordinates: null,
        generes: ["Techno"],
        age: "18+",
        sellingFast: false
    },
    
    {
        id: 27,
        name: "Klub Verboten: TEARS FOR BEERS x EAST",
        venue: "Secret Location",
        address: "",
        time: "19:00-22:45",
        date: "Jul 16",
        price: "£15",
        type: "party",
        tags: ["Kinky", "Queer"],
        description: "* PLEASE READ ALL FAQs IN TICKET LINK BEFORE BUYING A TICKET *",
        image: "images/beers.png",
        website_link: "https://www.instagram.com/klubverboten/?hl=en",
        ticket_link: "https://dice.fm/event/6d6r67-tears-for-beers-x-east-16th-jul-undisclosed-location-london-london-tickets",
        coordinates: null,
        generes: ["Techno"],
        age: "21+",
        sellingFast: false
    },

    {
        id: 28,
        name: "PLASTYK",
        venue: "Venue M.O.T",
        address: "Surrey Canal Road,  London,  SE14 5RT",
        time: "22:00-04:00",
        date: "Aug 8",
        price: "£13-22",
        type: "party",
        tags: ["Lesbian", "Queer", "Trans", "Non-Binary", "POC"],
        description: "PLASTYK is back for a single-room summer party. Get your tix ASAP, they'll sell out quick x \n\n \n\nBlack trans femmes go free - use code PLASTYKLIST.\n\nIf you are TRANS, POC or DISABLED and need a discount code, check out the info pinned to our Instagram @plastyk__\n\n \n\nWho is this event for? This event prioritizes d*kes of all kinds. Trans femmes and trans mascs to the front! The event is NOT for cishet people. Anyone disrupting the safety/comfort of the space will be removed. TERFs STAY AT HOME. \n\n \n\nAccess: Full access info is on our Instagram.",
        image: "images/plastyk.png",
        website_link: "https://www.instagram.com/plastyk__/?hl=en",
        ticket_link: "https://www.outsavvy.com/event/28339/plastyk-august?fbclid=PAZXh0bgNhZW0CMTEAAaeNZD04lgh_zcLJu3bCXcsERgSIcfhIQxAx5E_44jOqF441RzF0AIpAEXF5uw_aem_HBrkpo5feAPlAJYPHkD4tA",
        coordinates: null,
        generes: ["Techno"],
        age: "18+",
        sellingFast: true
    },

    
    {
        id: 29,
        name: "club cetera: angel 777 launch",
        venue: "Ormside Projects",
        address: "32 Ormside St, London SE15 1TR, UK",
        time: "23:00-05:00",
        date: "Jul 12",
        price: "£10-15",
        type: "party",
        tags: ["FLINTA"],
        description: "step into the ethereal & enter all things club music •*¨*•.¸¸☆*\n\ncelebrating melba's 'angel 777' EP launch on Hypercolour. featuring a SUPER special secret headliner to transcend your expectations on club music, which will be revealed JUST before the night...\n\nguaranteed innovative and energetic certified bangers. expect club beats, femme and FLINTA* centred aura, sexy sonics, fast bpm's and contagious melodies.\n\nmoving through club edits, footwork, deconstructed club, trance and everything in-between.\n\nNectax, melba, e-kitty, princess elf bar & bemme blu will all be brining their own unique and individual flavours which transcend genres and aid in the natural flow of music progressing through the night.\n\ncombining inclusivity and underground club sounds. club cetera in London will be a really unique experience at the beautiful ormside projects.\n\nour previous events welcomed Miss Jay, Evissimax, and latesleeper (as Peroxiide). And this next headliner wont disappoint.\n\ndiscounted tickets available for QTPOC/low income. no one will be turned away for the lack of funds. message on socials for this <3 @clubcetera\n\n♡ 𝓙𝓾𝓵𝔂 12\n♡ ormside projects, London\n♡ tickets: £7/£9/£12/£15\n\n𓆩♡𓆪",
        image: "images/cetera.png",
        website_link: "https://www.instagram.com/clubcetera/",
        ticket_link: "https://ra.co/events/2190104?fbclid=PAZXh0bgNhZW0CMTEAAac4Q1Hhu0KSWNS0ojtZj0vbSIfoxEo2l8o_bgmW7g17eqTy2NnzX3z4BRMKmg_aem_nwEli3lVg344dOFAydtwHw",
        coordinates: null,
        generes: ["160bpm", "Club", "Breaks", "Baile Funk"],
        age: "18+",
        sellingFast: false
    },
    {
        id: 30,
        name: "SOMA PEOPLE Summer Day Party",
        venue: "Night Tales Loft",
        address: "207, 1 Westgate St, Hackney, London E8 3RL",
        time: "15:00-23:00",
        date: "Jul 13",
        price: "£15-25",
        type: "party",
        tags: ["FLINTA", "Art", "Community"],
        description: "The Circle Forms – Community Support (With Love) – £30\nThis ticket is for those who feel called to support us a little extra. It helps us fund our events, as we pay every artist, crew member, and the venue fairly. Your love keeps Soma People alive, growing, and grounded in care. Thank you for being part of the circle\n\nTechno, Tech House music, breathwork/meditation, art installations, video art, and more\n\nOur Vision in Action\n\nAs a community-based collective, our events are built on values of respect, inclusivity, consent, and genuine connection.\n\n• A FLINTA*-centered lineup, from tech house to hypnotic, dark, sensual techno infused with feminine energy and art\n\n* Females, Lesbians, Intersex, Non-binary, Trans, and A gender\n\n• Music and vibes inspired by Panorama Bar and Berghain\n\n• A loft with a quality sound system and rooftop terrace blending Persian warmth and Berlin freedom\n\n• Art, video installations, and sensual visuals adding rich layers\n\n• An inclusive, safe space for FLINTA, queer community, and allies to express and celebrate\n\n• Strict no-photo/ video policy to keep you present and respect your privacy\n\nLeave feeling empowered, seen, and connected.\n\n-----------------------------------------------------------------------------------\nQuick Info:\n\n• No Physical ID, No Entry - Minimum age 21+\n• Cloakroom: Available at the venue\n• Snacks/ fruits available at the venue\n• No photo/ video policy; except for our photographer\n-----------------------------------------------------------------------------------\n\nIMPORTANT – PLEASE READ\nOur Social Contract: What You Agree to by Entering\n\n• Inclusive Space\nFLINTA individuals are prioritised. Everyone is welcome - if they respect the space, each other, and the community.\n\n• Respect First\nWe have zero tolerance for discrimination, harassment, racism, sexism, transphobia, homophobia, ableism, misogyny, or abusive behaviour of any kind.\n\n• Entry Is Not Guaranteed\nYour ticket gets you to the door, but final entry is at the discretion of our door team. This helps us maintain the safety and energy of the space.\n\n• Right to Refuse or Remove\nAnyone violating our values or disrupting the energy will be asked to leave. No refunds will be issued.\n\n• No Photos or Videos\nTo protect privacy and intimacy, phone use for photos/videos is not allowed. Our photographer is the only exception.\n\n• Consent is Key\nAlways ask before initiating physical contact. Boundaries matter.\n\n• No Outside Liquids\nFor safety reasons, outside drinks are not permitted. Violating this policy will result in removal from the venue.\n-----------------------------------------------------------------------------------\n\nOther Things to Know\n\n• Flashing Lights Warning\nThe event may include strobe and flashing lights. If you're photosensitive or epileptic, please take precautions.\n\n• On-Site Support\nIf you feel unwell or unsafe, reach out to the venue manager or security. We're here for you.\n\n• Creating the Vibe Together\nOur team is here to ensure a welcoming and safe space. Your presence contributes to the collective atmosphere.\n\n• Express Yourself\nBring your full self - bold, playful, unapologetic. This is a space to honour your individuality and express it with care and creativity.\n\n• Respect the Space & Team\nTreat the venue and all staff as you would a friend's home - with kindness and care.",
        image: "images/soma.png",
        website_link: "https://www.instagram.com/soma.people/",
        ticket_link: "https://ra.co/events/2189288",
        coordinates: null,
        generes: ["Techno", "Industrial","House"],
        age: "18+",
        sellingFast: false
    },
    {
        id: 31,
        name: "THE UNOFFICIAL LDN PRIDE AFTERS",
        venue: "M.O.T",
        address: "Orion Business Centre, Surrey Canal Rd SE14 5RT",
        time: "22:00-05:00",
        date: "Jul 5",
        price: "£5.50-17.30",
        type: "party",
        tags: ["Queer", "High Energy"],
        description: "We're back at our beloved venue to keep the Pride part going all night! — and we're bringing a full night of high-energy music to celebrate with our beautiful community! Expect an eclectic mix of Techno, Jungletek, Bassline, Baile, Hardcore, Footwork, and all the bassy bangers to keep you dancing all night long.\n\nWe're so excited to welcome some of our favourite up-and-coming queer DJs and producers from across the UK — it's going to be a night full of connection, joy, and movement. \n\nAs always, this is a queer-centered safe space. Please respect each other and the space around you. Our house rules are shared before every event on Instagram @jungyalsngays <3 xx",
        image: "images/jungle.png",
        website_link: "https://www.instagram.com/jungyalsngays/?hl=en",
        ticket_link: "https://ra.co/events/2198789?fbclid=PAZXh0bgNhZW0CMTEAAacR-Tq0vJHowH1cTO3DUBeacpt4bbw6juZZ_0-0kOT49R7oVOxIQwYwWv7S4w_aem_Wno0FwticBuXX6Rjk6AXqA",
        coordinates: null,
        generes: ["Jungle", "Techno", "Hardcore","Bassline", "Baile"],
        age: "18+",
        sellingFast: false
    },

    {
        id: 32,
        name: "Feel It: Pride",
        venue: "Omera",
        address: "6 O'Meara St, SE1 1TE",
        time: "22:30-05:00",
        date: "Jul 5",
        price: "£22 OTD",
        type: "party",
        tags: ["Queer"],
        description: "🚨Queer Super-Party\n🔥3 Rooms of pleasure\n⏰10:30 till 5am\n🚪Last entry 3am\n💥£22 on the door, no pre-sale\n Concession ticket available in Instagram bio",
        image: "images/feelit.png",
        website_link: "https://www.instagram.com/feelitparty/?hl=en",
        ticket_link: "",
        coordinates: null,
        generes: ["Tech House", "Techno", "House"],
        age: "18+",
        sellingFast: false
    },
    {
        id: 33,
        name: "BUTCH DAY PARTY",
        venue: "The Divine",
        address: "33-35 Stoke Newington Road,  London,  N16 8BJ",
        time: "22:30-05:00",
        date: "Jul 19",
        price: "£12.50-15",
        type: "party",
        tags: ["Butch", "Lesbian", "Trans", "Queer"],
        description: "HOT HOT HOT  BUTCH SUMMER \n\n \n\n< theme is. BEACH BUTCH >\n\n \n\ncome and look each at each other in the daylight\n\nand then rave like it's midnight in the basement. \n\n \n\ncome feel hot and free, it's summertime in London town.\n\n…there's a sort of a buzz…\n\n \n\nwhatever makes you feel hot. \n\n \n\ncoming out? \n\n \n\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\nPerformance & DJ's TBA\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n\n\n\nACCESS:\n\nSadly, The Divine is currently not fully accessible.\n\nThe cabaret and club space are in the basement of the venue. There are 17 wide steps with slip resistant treads down to the space with sturdy handrails either side. There are two steps up to the stage. The toilets are in the basement and are not accessible for wheelchair users.",
        image: "images/butch.png",
        website_link: "https://www.instagram.com/butchpleaselondon/?hl=en",
        ticket_link: "https://www.outsavvy.com/event/28539/butch-day-partyhttps://www.instagram.com/butchpleaselondon/?hl=en",
        coordinates: null,
        generes: ["Tech House", "Techno", "House"],
        age: "18+",
        sellingFast: false
    },

    {
        id: 34,
        name: "Horse Meat Disco",
        venue: "Eagle London",
        address: "Eagle London, 349 Kennington Ln, London SE11 5QY, UK",
        time: "20:30-03:00",
        date: "Jul 6",
        price: "£8.20",
        type: "party",
        tags: ["Queer"],
        description: "London's legendary Sunday night discotheque, every Sunday at Eagle London for more than 21 years. Pride Special with guests Jaye Ward and Bestley, with resident Luke Howard. 8pm-3am with Vauxhall's best value Happy Hour drinks offers till 9pm. £8.",
        website_link: "https://www.instagram.com/horse_meat_disco/?hl=en",
        image: "images/horse.png",
        ticket_link: "https://www.eaglelondon.com/event-details/horse-meat-disco-2025-07-06-20-00",
        coordinates: null,
        generes: ["Disco","House"],
        age: "18+",
        sellingFast: false
    },

    {
        id: 35,
        name: "Horse Meat Disco",
        venue: "Eagle London",
        address: "Eagle London, 349 Kennington Ln, London SE11 5QY, UK",
        time: "20:30-03:00",
        date: "Jul 13",
        price: "£8.20",
        type: "party",
        tags: ["Queer"],
        description: "London's legendary Sunday night discotheque, every Sunday at Eagle London for more than 21 years. With Jim Stanton and CJ Cooper. 8pm-3am with Vauxhall's best value Happy Hour drinks offers till 9pm. £8.",
        website_link: "https://www.instagram.com/horse_meat_disco/?hl=en",
        image: "images/horse1.png",
        ticket_link: "https://www.eaglelondon.com/event-details/horse-meat-disco-2025-07-13-20-00",
        coordinates: null,
        generes: ["Disco","House"],
        age: "18+",
        sellingFast: false
    },
    {
        id: 36,
        name: "Femmme Fraiche #056",
        venue: "Dalston Superstore",
        address: "117 Kingsland High Street,  London,  E8 2PB",
        time: "21:00-04:00",
        date: "Jul 19",
        price: "£5-8",
        type: "party",
        tags: ["FLINTA", "Femme", "Butch", "Trans", "NB"],
        description: "On Sat 17th May we're head back at the Mothership Dalston Superstore, for a sweaty summer affair, with a mixture of old friends and new faces. Our basement warm-up is none other than Leatherette and Tantrum mother, the one and only Milk Shandy and joining them we have an LA based legend, Stacy Christine a DJ known for her magnetic energy, eclectic taste, and deep roots in the LA city's underground dance scene. With our beloved resident Michelle Manetti closing out the basement, with hi-NRG fuelled house.\n\nUp in the bar we have a Femmme Fraiche debut DJ set from a longstanding FF regular Urlamelia, in fact, it's shameful quite how long it's taken for us to get her in for a set, because we know she delivers the slaggy bangers. Joining her is our fave NYC babe on her annual cross-Atlantic outing, Dinahfire – all this rounded off by our resident duo of Fraicheness Darren & Linzi on closing duties. Expect twisted pop, trash-tastic faves, and Cunty Slut-Pop bangers. \n\nFor gogo duties, we have Femmme Fraiche firecracker Sabrina Jade and regular superbabe Danni Spooner with, ass-shakin' sexy, stupendous bar-top antics. \n\n \n\nEntry is £8 b4 11pm / £10 after\n\n(for low salary income please contact us for discounted entry) \n\nWith a small selection of £5 early bird tickets and a limited number of General Admission tickets for sale online - these allow you Q-jump and are valid for entry until 11pm only. \n\n \n\nOnce these have sold out entry will be general admission tickets available on the door, on the night. \n\n \n\n*We operate a zero tolerance policy*\n\nOur event is FLINTA focused and aimed as a space for queer wxmn, Trans, NB, and they will be given priority. Allies and friends are welcome, providing they respect the space. ♡",
        website_link: "https://www.instagram.com/femmmefraiche/?hl=en",
        image: "images/femme.png",
        ticket_link: "https://www.outsavvy.com/event/28336/femmme-fraiche-056-with-michelle-manetti-milk-shandy-stacy-christine-dinahfire-urlamelia-more",
        coordinates: null,
        generes: ["Techno", "House"],
        age: "18+",
        sellingFast: false
    },
    {
        id: 37,
        name: "ROAST: LONDON PRIDE",
        venue: "Electrowerkz",
        address: "7 Torrens Street, London EC1V 1NQ",
        time: "21:00-03:00",
        date: "Jul 5",
        price: "Waitlist",
        type: "party",
        tags: ["Men Only"],
        description: "𝙇𝙊𝙉𝘿𝙊𝙉'𝙎 𝘽𝙀𝙀𝙁𝙄𝙀𝙎𝙏 𝘾𝙇𝙐𝘽𝙉𝙄𝙂𝙃𝙏 - 𝙀𝙇𝙀𝘾𝙏𝙍𝙊𝙒𝙀𝙍𝙆𝙕 10PM-6AM ROAST; Bears, cubs, chubs, chasers, muscle bears, trans men, muscle men, and admirers. 10 DJ'S, 5 rooms, 1 big darkroom. MEN ONLY. LAST ENTRY 3AM - NO PHYSICAL ID = NO ENTRY. 18+\nPlease be advised that there may be promotional and/or commercial photography and visual and/or audio recording at this event - by entering this event, you consent to your picture or footage of you possibly being taken and used by ROAST and/or Electrowerkz for promotional and/or commercial purposes.\nBy attending ROAST, commit to treating your fellow community members with respect and kindness - without judgment or bias.\n\nTeam ROAST 🧡",
        website_link: "https://www.instagram.com/roast.london.roast/?hl=en",
        image: "images/roast.png",
        ticket_link: "https://dice.fm/event/92lvp6-roast-london-pride-5th-jul-electrowerkz-london-tickets",
        coordinates: null,
        generes: ["Techno", "House"],
        age: "18+",
        sellingFast: false
    },

    {
        id: 38,
        name: "ADONIS PRIDE",
        venue: "The Cause",
        address: "60 Dock Rd, London, london, E16 1YZ",
        time: "10:00-22:00",
        date: "Jul 5",
        price: "£12.50-25",
        type: "party",
        tags: ["Gay", "Queer"],
        description: "ADONIS PRIDE! \nSATURDAY 5TH OF JULY@ THE CAUSE \nTICKET DOESN'T GUARANTEE ENTRY, RIGHT OF ADMISSION RESERVED. \nDOORS OPEN 10AM - 17:30",
        website_link: "https://www.instagram.com/adonis.adonis.adonis/?hl=en",
        image: "images/adonis.png",
        ticket_link: "https://adonis.eventcube.io/events/72635/adonis-pride-sat-5th-july-25",
        coordinates: null,
        generes: ["Techno", "House"],
        age: "18+",
        sellingFast: false
    },
    {
        id: 40,
        name: "Avalon Social Club",
        venue: "Avalon Cafe",
        address: "Juno Wy., London SE14 5RZ",
        time: "18:00-21:00",
        date: "Jul 7",
        price: "£8 OTD",
        type: "social",
        tags: ["LGBT+ Allies", "Chess", "Knitting"],
        description: "head to Avalon for an evening social: come hang out, play chess, bring your knitting, your mate or come solo for a friendly cuppa/pint.",
        website_link: "https://www.instagram.com/avaloncafebermondsey/",
        image: "images/avalon4.png",
        ticket_link: "",
        coordinates: null,
        sellingFast: false
    },

    {
        id: 41,
        name: "Avalon Choir",
        venue: "Avalon Cafe",
        address: "Juno Wy., London SE14 5RZ",
        time: "19:00-21:00",
        date: "Jul 7",
        price: "£8 OTD",
        type: "social",
        tags: ["LGBT+ Allies", "Choir"],
        description: "A community choir, singing a variety of songs and styles in multiple harmony. Everyone is welcome - just turn up!",
        website_link: "https://www.instagram.com/avaloncafebermondsey/",
        image: "images/avalon3.png",
        ticket_link: "",
        coordinates: null,
        sellingFast: false
    },

    {
        id: 42,
        name: "Lesbian+ Social",
        venue: "The Albany Pub",
        address: "1 Queen's Rd, Twickenham TW1 4EZ, UK",
        time: "19:00-22:00",
        date: "Jul 3",
        price: "Free",
        type: "social",
        tags: ["LGBTQ+"],
        description: "Join us on the first Thursday of every month from 19:00 for an informal meet-up and an opportunity to meet new friends. Open to LGBTQ+ Women and those who are non-binary.",
        website_link: "https://www.wlqp.org/",
        image: "images/wlqp.png",
        ticket_link: "https://www.wlqp.org/event-details/lesbian-social-23",
        coordinates: null,
        sellingFast: false
    },

    {
        id: 43,
        name: "West London Workouts - Spin",
        venue: "Gunnersbury Park Sports Hub",
        address: "Gunnersbury Park Sports Hub, Gunnersbury Park, Popes Ln, London W3 8LQ",
        time: "18:30-19:30",
        date: "Jul 4",
        price: "£4",
        type: "workshop",
        tags: ["LGBTQ+", "Spin"],
        description: "This is an all fitness levels class, open to beginners and seasoned gym goers.\n\nChanging rooms and lockers are available but please bring your own padlock if you wish to utilise the lockers. We also recommend that attendees bring their own towel and water bottle.\n\nPlease plan your arrival time to ensure you are ready to warm up on your bike by the class start time. Your instructor or a member of the WLQP team will be on hand from 10 minutes before the session to help you get set up on your bike, ready to work up a sweat and burn calories.\n\nStudio cycling is an exciting yet rigorous form of endurance training, ideal for improving lower body strength and kicking your cardiovascular fitness up a gear.",
        website_link: "https://www.wlqp.org/",
        image: "images/wlqp2.png",
        ticket_link: "https://www.wlqp.org/event-details/west-london-workouts-spin-2025-07-04-18-30",
        coordinates: null,
        sellingFast: false
    },

    {
        id: 44,
        name: "West London Workouts - Circuits",
        venue: "Gunnersbury Park Sports Hub",
        address: "Gunnersbury Park Sports Hub, Gunnersbury Park, Popes Ln, London W3 8LQ",
        time: "20:00-21:00",
        date: "Jul 7",
        price: "£12",
        type: "workshop",
        tags: ["LGBTQ+", "Workout"],
        description: "Monthly pass for our weekly Circuits class, every Monday at 8pm. By purchasing a monthly pass you do not need to book each class individually. \nIn the event that WLQP cancel a class, then you will be credited an additional session to book the following month. \nThis covers 7, 14, 21 & 28 July",
        website_link: "https://www.wlqp.org/",
        image: "images/wlqp3.png",
        ticket_link: "https://www.wlqp.org/event-details/west-london-workouts-circuits-monthly-pass-july",
        coordinates: null,
        sellingFast: false
    },

    {
        id: 45,
        name: "LGBTQ+ Professionals Networking",
        venue: "The Pontoon",
        address: "566 Chiswick High Rd., Chiswick, London W4 5AN, UK",
        time: "18:00-22:00",
        date: "Jul 10",
        price: "£10",
        type: "social",
        tags: ["LGBTQ+", "Networking"],
        description: "Unity Afloat: An LGBTQ+ Networking Event – Join us for a vibrant summer evening of connection and conversation on the scenic pontoon at Chiswick Business Park. \nTickets include a free glass of bubbles or a soft drink on arrival.",
        website_link: "https://www.wlqp.org/",
        image: "images/wlqp4.png",
        ticket_link: "https://www.wlqp.org/event-details/lgbtq-professionals-networking-2",
        coordinates: null,
        sellingFast: false
    },
    {
        id: 46,
        name: "QUEER Bachata Drop-In Class",
        venue: "SHE Bar",
        address: "23a Old Compton Street,  London,  W1D 5JL",
        time: "18:00-20:30",
        date: "Jul 6",
        price: "£11-30",
        type: "social",
        tags: ["FLINTA", "LGBTQ+", "Salsa", "Bachata"],
        description: "Get ready to sizzle, Sanura dancers!\n\nWe're thrilled to announce our partnership with the iconic SHE Soho Bar for our new QUEER Bachata Sundays!\n\nEmbrace your inner rhythm and join us for an evening of EMPOWERMENT through dance in the heart of London. As always, we're proudly FLINTA-focused, FEMINIST, and LGBTQ+ space, creating a space where everyone can shine on the dance floor.\n\nHere's what's heating up your Sunday nights:\nBachata Bliss\n6-7PM: Open Level Bachata Class\nLearn to both LEAD & FOLLOW, because who says you can't do it all?\nLatin Fever\nFrom 7.30: Latin Party with DJ Daniella\nKeep the energy high and the moves flowing!\n📍 SHE Soho Bar - London's premier girls-only venue\n\nDon't miss out on this incredible night of dance, community, and joy. Grab your tickets now and bring your friends – the more, the merrier! Let's make these autumn Sundays unforgettable together.\n\nFollow us on Instagram @sanuradance for the latest updates and behind-the-scenes fun.\n\nRemember, at Sanura Dance, every step is a celebration of who you are. See you on the dance floor!",
        website_link: "https://www.instagram.com/sanuradance/?hl=en",
        image: "images/sanura.png",
        ticket_link: "https://www.outsavvy.com/event/23411/queer-bachata-sundays-she-soho-bar-drop-ins",
        coordinates: null,
        sellingFast: false,
        age: "18+",
    },
    {
        id: 47,
        name: "QUEER Salsa & Bachata Socials",
        venue: "The Castle",
        address: "44 Commercial Road,  London,  E1 1LN",
        time: "18:00-20:30",
        date: "Jul 2",
        price: "£11-16",
        type: "social",
        tags: ["FLINTA", "LGBTQ+", "Salsa", "Bachata"],
        description: "📅 First Thursday of EVERY Month\n6:30 PM: Doors Open\n6:45-7:45 PM: Salsa Beginner Class (25 spots)\n7:55-8:55 PM: Salsa Improver Class (25 spots)\n9-11 PM: Social Dancing\n\n🔥 Our Vibe:\nNot a dancer? No worries!\nCome hang out, meet new people\nEnjoy the atmosphere\nGrab a drink\nMake connections\n\n✨Who is this for?\nCurious first-timers\nSocial butterflies\nCommunity supporters\nDance enthusiasts\nThose wanting to explore a FLINTA, FEMINIST & LGBTQ+ space\n\n🏠 About The Castle\nA historic pub dating back to 1792, The Castle offers an intimate, welcoming environment perfect for connecting, socialising, and experiencing something new. Located at 44 Commercial Road, this venue has walls that have seen it all - from boxing training to incredible music nights.\n\n🤝 Help Us Keep This Space Alive\nChip in to keep the space open - every little helps! Your presence, support, and community spirit are what keep these vital spaces thriving.\n\nJoin us in keeping our queer spaces alive and thriving. Come for the dance, stay for the community!",
        website_link: "https://www.instagram.com/sanuradance/?hl=en",
        image: "images/sanura1.png",
        ticket_link: "https://www.outsavvy.com/event/25082/queer-salsa-bachata-socials-first-thursday-of-every-month#anchor",
        coordinates: null,
        sellingFast: false,
        age: "18+",
    },

    {
        id: 48,
        name: "AS ONE IN THE PARK",
        venue: "Walpole Park",
        address: "Walpole Park Mattock Lane London W5 5EQ in London",
        time: "12:00-22:00",
        date: "Jul 19",
        price: "£22.50-67.50",
        type: "party",
        tags: ["LGBTQ+", "Festival"],
        description: "London's LGBTQ+ Festival! 🏳️‍🌈\n\nFor one day only this Summer, we will be celebrating all things LGBTQ+ with 5 Stages of Music covering every genre under the Sun! With some of the HOTTEST DJs and performers around, we CAN'T WAIT to share with you the amazing line up!\n\nTaking over Ealing's beautiful Walpole Park, surrounded by ancient woodland and picturesque ponds,12 minutes from Central London, we couldn't be happier to be back in 2025.\n\nAs One has Something for Everyone! From DJs to Drag Shows, Dance Troupes to Live Acts, Cabaret, Street Food, Cocktail Bars, Comedy, Circus acts, and the list goes on!\n\nIn response to the AMAZING feedback from last year's event As One moves to a Saturday for the 2025 edition!\n\nUpdates on the festival can be found on our Instagram - https://www.instagram.com/asonefestival\n\nImportant Info:\n\nTimes - Saturday 19th July 2025 - 12pm to 10pm. (Last Entry 6pm)\n\nTickets - We have 3 Main Ticket tiers,\n\nEntry before 2pm - Your ticket must be scanned before 2pm. We recommend that you arrive early between 12pm - 1:30pm. If your ticket is scanned after 2pm there will be a surcharge on the door\n\nAnytime Entry - Valid all day between 12pm and 6pm.\n\nVIP - Our VIP ticket grants you access to our VIP Area which includes a Private Stage with performances from SPECIAL GUEST Performers, VIP only Bars & Toilets, Queue jump and Free Entry to Afterparty at Fire!\n\nTransport - As One is taking place at Walpole Park, Ealing. The full address is Walpole Park, Mattock Ln, London W5 5EQ.\nThere are 2 Tube Stations within an 8-minute walk of the Site Entrance - Ealing Broadway (Circle, Elizabeth & District Lines) and South Ealing (Picadilly Line) The site also has great bus connections. If arriving by car please note that the site does not offer parking and for Taxi pick up and Drop off please use the postcode W5 5EQ.\n\nFood & Drink - We will have over 20 Food Stalls providing tasty dishes catering to all cuisines and dietary needs! The site will also have numerous well located Fully Stocked Bars, to make sure you keep hydrated and we keep queuing to a minimum. Please note that due to licensing we cannot allow any food or drink to be brought into the festival.\n\nLocation - Ealing's Walpole Park is our Home! Surrounded by ancient woodland and picturesque ponds we strive to do our best to make sure that we look after it and the residents that live nearby. Please be mindful of noise when arriving and leaving the site and to not leave litter. Please do not bring any chairs or gazebos as we will have plenty of seating and cover. We will not have a coat check so please try to only bring the essentials!",
        website_link: "https://www.instagram.com/asonefestival/?hl=en",
        image: "images/asone.png",
        ticket_link: "https://www.skiddle.com/festivals/as-one-in-the-park/?fbclid=PAZXh0bgNhZW0CMTEAAad8Uw9i3gkrM3L6NjA-oHPK4XpYpyEwvsFAbAxe2H_04RLoxjk6egOyGNHJJw_aem_wjEe_Awr9QSAI5TX8fExYg#tickets",
        coordinates: null,
        sellingFast: false,
        generes: ["Pop", "House", "Raggaeton", ""],
        age: "18+",
    },
    


    //#40 next
    
    
];
// Initialize the application
async function init() {
    await geocodeAllEvents();
    initializeMap();
    renderEvents(events);
    setupEventListeners();
    
    // Initialize mobile view properly
    if (isMobile) {
        setupMobileView();
    }
}

// Setup mobile view functionality
function setupMobileView() {
    // Ensure map is hidden by default on mobile
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.style.display = 'none';
    }
    
    // Set initial mobile view mode
    mobileViewMode = 'list';
    
    // Setup scroll transition for mobile
    setupScrollTransition();
}

// Setup smooth scroll transition for mobile
function setupScrollTransition() {
    if (!isMobile) return;
    
    const sidebar = document.querySelector('.sidebar');
    const container = document.querySelector('.container');
    
    // Add scroll listener to events list
    function handleScroll() {
        if (currentView !== 'list') return;
        
        const eventsList = document.getElementById('events-list');
        if (!eventsList) return;
        
        const scrollTop = eventsList.scrollTop;
        const scrollThreshold = 100; // Start transition after 100px scroll
        
        // Calculate transition progress (0 to 1)
        const progress = Math.min(scrollTop / scrollThreshold, 1);
        
        // Apply smooth transition
        if (progress > 0) {
            sidebar.style.height = `${50 + (50 * progress)}vh`;
            sidebar.style.transition = 'height 0.3s ease-out';
            
            const map = document.getElementById('map');
            map.style.height = `${50 - (50 * progress)}vh`;
            map.style.transition = 'height 0.3s ease-out';
        }
    }
    
    // Setup scroll listener when events list is created
    const observer = new MutationObserver(() => {
        const eventsList = document.getElementById('events-list');
        if (eventsList && currentView === 'list') {
            eventsList.addEventListener('scroll', handleScroll);
        }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
}
// Geocode all events that don't have coordinates
async function geocodeAllEvents() {
    const eventsNeedingGeocode = events.filter(event => !event.coordinates);
    
    for (const event of eventsNeedingGeocode) {
        try {
            const coords = await geocodeAddress(event.address);
            event.coordinates = coords;
        } catch (error) {
            console.error(`Failed to geocode ${event.name}:`, error);
            // Fallback to London center if geocoding fails
            event.coordinates = CONFIG.mapCenter;
        }
    }
    
    // Now that all events have coordinates, show them
    filterEvents('all');
}

// Geocode a single address using Mapbox Geocoding API
async function geocodeAddress(address) {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${CONFIG.mapboxToken}&country=GB&proximity=-0.1276,51.5074`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.features && data.features.length > 0) {
            return data.features[0].center; // [longitude, latitude]
        } else {
            throw new Error('No results found');
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        throw error;
    }
}

// Initialize Mapbox map
function initializeMap() {
    mapboxgl.accessToken = CONFIG.mapboxToken;
    
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v11',
        center: CONFIG.mapCenter,
        zoom: CONFIG.mapZoom
    });
    
    map.on('load', async () => {
        // Wait for geocoding to complete before showing events
        if (events.some(event => !event.coordinates)) {
            // Events are still being geocoded, filterEvents will be called by geocodeAllEvents
            return;
        }
        filterEvents('all');
    });
}

// Add markers to map
function addMarkers(eventsToShow) {
    // Remove existing markers
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());
    
    // Group events by location (same coordinates)
    const locationGroups = groupEventsByLocation(eventsToShow);
    
    locationGroups.forEach(group => {
        const el = document.createElement('div');
        
        if (group.events.length === 1) {
            // Single event marker - no direct click handler, only popup
            el.className = 'marker';
        } else {
            // Multiple events marker with count
            el.className = 'marker-cluster';
            el.innerHTML = `<span class="marker-count">${group.events.length}</span>`;
        }
        
        new mapboxgl.Marker(el)
            .setLngLat(group.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25, closeButton: false })
                .setHTML(createClusterPopupHTML(group)))
            .addTo(map);
    });
}

// Group events by location
function groupEventsByLocation(events) {
    const groups = [];
    const tolerance = 0.0001; // Small tolerance for coordinate matching
    
    events.forEach(event => {
        if (!event.coordinates) return;
        
        // Find existing group with same location
        const existingGroup = groups.find(group => 
            Math.abs(group.coordinates[0] - event.coordinates[0]) < tolerance &&
            Math.abs(group.coordinates[1] - event.coordinates[1]) < tolerance
        );
        
        if (existingGroup) {
            existingGroup.events.push(event);
        } else {
            groups.push({
                coordinates: event.coordinates,
                events: [event]
            });
        }
    });
    
    return groups;
}

// Create popup HTML for clustered events
function createClusterPopupHTML(group) {
    if (group.events.length === 1) {
        const event = group.events[0];
        const viewDetailsFunction = isMobile ? `showEventDetailFromMap(${event.id})` : `showEventDetail(${event.id})`;
        const imageHTML = isMobile && event.image ? `
            <div style="margin-bottom: 12px;">
                <img src="${event.image}" alt="${event.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
            </div>
        ` : '';
        
        return `
            <div class="popup-single">
                ${imageHTML}
                <h3>${event.name}</h3>
                <p><strong>${event.venue}</strong></p>
                <p>${event.time} • ${event.date}</p>
                <p>${event.price}</p>
                <button onclick="${viewDetailsFunction}" class="popup-btn">View Details</button>
            </div>
        `;
    } else {
        const eventsHTML = group.events.map(event => {
            const viewDetailsFunction = isMobile ? `showEventDetailFromMap(${event.id})` : `showEventDetail(${event.id})`;
            const imageHTML = isMobile && event.image ? `
                <img src="${event.image}" alt="${event.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; margin-right: 8px; float: left;">
            ` : '';
            
            return `
                <div class="popup-event" onclick="${viewDetailsFunction}">
                    ${imageHTML}
                    <div style="margin-left: ${isMobile && event.image ? '48px' : '0'};">
                        <div class="popup-event-name">${event.name}</div>
                        <div class="popup-event-time">${event.date} • ${event.time}</div>
                        <div class="popup-event-price">${event.price}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        return `
            <div class="popup-cluster">
                <h3>${group.events[0].venue}</h3>
                <p>${group.events.length} events at this location</p>
                <div class="popup-events">
                    ${eventsHTML}
                </div>
            </div>
        `;
    }
}

// Render events list
function renderEvents(eventsToShow) {
    const eventsList = document.getElementById('events-list');
    
    if (eventsToShow.length === 0) {
        eventsList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No events found for this filter.</p>';
        return;
    }
    
    eventsList.innerHTML = eventsToShow.map(event => createEventCardHTML(event)).join('');
}

// Create event card HTML
function createEventCardHTML(event) {
    const tagsHTML = (event.tags || []).slice(0, 5).map(tag => `<span class="tag">${tag}</span>`).join('');
    return `
    <div class="event-card card-media" onclick="showEventDetail(${event.id})">
      <div class="card-media-object-container">
        <div class="card-media-object" style="background-image: url('${event.image}');"></div>
        ${event.sellingFast ? '<span class="card-media-object-tag subtle">Selling Fast</span>' : ''}
      </div>
      <div class="card-media-body">
        <div class="card-media-body-top">
          <span class="subtle">${event.date}, ${event.time}</span>
          <span class="event-price-top subtle ">${event.price}</span>
        </div>
        <span class="card-media-body-heading">${event.name}</span>
        <div class="card-media-body-supporting-bottom">
          <span class="card-media-body-supporting-bottom-text subtle">${event.venue}</span>
          
        </div>
        <div class="card-media-body-supporting-bottom card-media-body-supporting-bottom-reveal">
          <span class="card-media-body-supporting-bottom-text subtle">${tagsHTML}</span>
        </div>
      </div>
    </div>
    `;
}

// Helper function to convert date strings to comparable dates
function parseEventDate(dateString) {
    if (dateString === 'Today') {
        return new Date(); // Today's date
    }
    
    // Handle formats like "Jun 4", "Jul 5"
    const currentYear = new Date().getFullYear();
    const dateWithYear = `${dateString} ${currentYear}`;
    const parsedDate = new Date(dateWithYear);
    
    // If the parsed date is invalid, return a far future date to put it at the end
    if (isNaN(parsedDate.getTime())) {
        return new Date('2099-12-31');
    }
    
    return parsedDate;
}

// Add this new function to check if a date is in the current week
function isDateInCurrentWeek(dateString) {
    const eventDate = parseEventDate(dateString);
    const today = new Date();
    
    // Get start of current week (Monday)
    const weekStart = new Date(today);
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // If Sunday (0), go back 6 days; otherwise go back (dayOfWeek - 1) days
    weekStart.setDate(today.getDate() - daysToMonday);
    weekStart.setHours(0, 0, 0, 0);
    
    // Get end of current week (Sunday)
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    
    return eventDate >= weekStart && eventDate <= weekEnd;
}

// Update the filterEvents function to handle 'this-week'
function filterEvents(filter) {
    let filteredEvents = events;
    
    if (filter !== 'all') {
        if (filter === 'today') {
            filteredEvents = events.filter(event => isEventToday(event.date));
        } else if (filter === 'this-week') {
            filteredEvents = events.filter(event => isDateInCurrentWeek(event.date));
        } else {
            // Filter by type (party, social, workshop)
            filteredEvents = events.filter(event => event.type === filter);
        }
    }
    
    // Sort events chronologically (Today first, then Jun 4, Jul 5, etc.)
    filteredEvents.sort((a, b) => {
        const dateA = parseEventDate(a.date);
        const dateB = parseEventDate(b.date);
        return dateA - dateB;
    });
    
    renderEvents(filteredEvents);
    addMarkers(filteredEvents);
}

// Add this new function to check if a date is today
function isEventToday(dateString) {
    const eventDate = parseEventDate(dateString);
    const today = new Date();
    
    // Compare year, month, and day
    return eventDate.getFullYear() === today.getFullYear() &&
           eventDate.getMonth() === today.getMonth() &&
           eventDate.getDate() === today.getDate();
}

// Show event detail view - Updated with scroll to top
function showEventDetail(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    currentEvent = event;
    currentView = 'detail';
    
    // Fly to event location on map
    if (event.coordinates) {
        flyToEvent(event.coordinates[0], event.coordinates[1]);
    }
    
    // Replace sidebar content with event detail
    const sidebar = document.querySelector('.sidebar');
    sidebar.innerHTML = createEventDetailHTML(event);
    
    // FIX: Scroll to top of the sidebar when opening event detail
    sidebar.scrollTop = 0;
    
    // MOBILE FIX: Also scroll the main document/window to top on mobile
    if (isMobile) {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        
        // If we're in map view, switch back to list view to show event detail
        if (mobileViewMode === 'map') {
            mobileViewMode = 'list';
            showMobileListView();
        }
    }
}

// Create detailed event view HTML
function createEventDetailHTML(event) {
    const allTags = [
        ...event.tags.map(tag => `<span class=\"tag\">${tag}</span>`),
        ...(event.generes && event.generes.length > 0 ? event.generes.map(genre => `<span class=\"tag genre\">${genre}</span>`) : []),
        ...(event.age ? [`<span class=\"tag age\">${event.age}</span>`] : [])
    ].join('');
    
    // Create image container with type tag overlay
    const imageHTML = event.image ? `
        <div class=\"event-detail-image-container\">
            <img src=\"${event.image}\" alt=\"${event.name}\" class=\"event-detail-image\">
            <div class=\"event-detail-type-overlay\">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</div>
        </div>
    ` : '';
    
    // Format description with proper line breaks
    const formattedDescription = event.description ? event.description.replace(/\n/g, '<br>') : '';
    
    return `
        <div class=\"event-detail\">
            <button class=\"back-btn-sharp\" onclick=\"showEventsList()\">← Back</button>
            ${imageHTML}
            <div class=\"event-detail-title-section\">
                <h2 class=\"event-detail-title\">${event.name}</h2>
            </div>
            <div class=\"event-detail-content\">
                <div class=\"event-detail-info\">
                    <div class=\"event-detail-venue-section\">
                        <div class=\"event-detail-venue\">${event.venue} • 
                            <a href=\"https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}\" target=\"_blank\" class=\"venue-link\">
                                ${event.address}
                            </a>
                        </div> 
                        <div class=\"event-detail-datetime\">${event.date} • ${event.time}</div>
                    </div>
                    <div class=\"event-detail-price\">${event.price}</div>
                </div>
                <div class=\"event-detail-actions\">
                    ${event.ticket_link ? `<a href=\"${event.ticket_link}\" target=\"_blank\" class=\"action-btn ticket-btn\">Get Tickets</a>` : ''}
                    ${event.website_link ? `<a href=\"${event.website_link}\" target=\"_blank\" class=\"action-btn website-btn\">Website</a>` : ''}
                </div>
                <div class=\"event-detail-tags\" style=\"margin-top: 24px;\">
                    ${allTags}
                </div>
                ${formattedDescription ? `<div class=\"event-detail-description\"><h3>About</h3><p>${formattedDescription}</p></div>` : ''}
            </div>
            ${event.address ? `
                <div class="event-detail-map-preview">
                    <iframe
                        width="100%"
                        height="200"
                        frameborder="0"
                        style="border:0; border-radius: 8px; margin-top: 24px;"
                        src="https://www.google.com/maps?q=${encodeURIComponent(event.address)}&output=embed"
                        allowfullscreen>
                    </iframe>
                </div>
            ` : ''}
        </div>
    `;
}

// Show events list view - Updated with scroll to top
function showEventsList() {
    currentView = 'list';
    currentEvent = null;

    map.flyTo({
        center: CONFIG.mapCenter,
        zoom: CONFIG.mapZoom,
        duration: 1000
    });
    
    // Restore original sidebar content
    const sidebar = document.querySelector('.sidebar');
    sidebar.innerHTML = `
        <div class="header">
            <h1>On My Gaydar</h1>
            <div class="header-subtitle-section">
                <h5>The best local queer events, updated daily</h5>
                ${isMobile ? `
                    <a href="https://mailchi.mp/54e006ea8469/gaydar-newsletter-sign-up" target="_blank" class="mobile-newsletter-link">
                        📧 Get Weekly Round-ups
                    </a>
                ` : ''}
            </div>
            ${!isMobile ? `
                <div class="newsletter-signup">
                    <a href="https://mailchi.mp/54e006ea8469/gaydar-newsletter-sign-up" target="_blank" class="newsletter-btn">
                        📧 Get Weekly Round-ups
                    </a>
                </div>
            ` : ''}
            <div class="filters">
                <button class="filter-btn ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">All</button>
                <button class="filter-btn ${currentFilter === 'this-week' ? 'active' : ''}" data-filter="this-week">This Week</button>
                <button class="filter-btn ${currentFilter === 'today' ? 'active' : ''}" data-filter="today">Today</button>
                <button class="filter-btn ${currentFilter === 'party' ? 'active' : ''}" data-filter="party">Party</button>
                <button class="filter-btn ${currentFilter === 'social' ? 'active' : ''}" data-filter="social">Social</button>
                <button class="filter-btn ${currentFilter === 'workshop' ? 'active' : ''}" data-filter="workshop">Workshop</button>
            </div>
            ${isMobile ? `
                <div class="mobile-view-toggle">
                    <button class="view-toggle-btn" data-view="map">
                        <span class="toggle-icon">🗺️</span>
                        <span class="toggle-text">Map View</span>
                    </button>
                </div>
            ` : ''}
        </div>
        <div class="events-list" id="events-list">
            <!-- Events will be populated here -->
        </div>
    `;
    
    // FIX: Scroll to top when returning to events list
    sidebar.scrollTop = 0;
    
    // MOBILE FIX: Also scroll the main document/window to top on mobile
    if (isMobile) {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    
    // Re-setup event listeners and show events
    setupEventListeners();
    filterEvents(currentFilter);
}

// Get directions to venue
function getDirections(address) {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(url, '_blank');
}

// Setup event listeners
function setupEventListeners() {
    // Filter button event listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    // Mobile view toggle event listeners
    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
        btn.addEventListener('click', handleViewToggle);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 768;
    });
    
    // Ensure mobile view is properly set up if we're on mobile
    if (isMobile && !document.querySelector('.mobile-view-toggle')) {
        // If mobile toggle is missing, re-render the header
        const header = document.querySelector('.header');
        if (header && currentView === 'list') {
            showEventsList();
        }
    }
}

// Handle filter button clicks
function handleFilterClick(event) {
    const btn = event.target;
    
    // Update active filter button
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    
    // Update current filter and apply it
    currentFilter = btn.dataset.filter;
    filterEvents(currentFilter);
}

// Handle mobile view toggle
function handleViewToggle(event) {
    const btn = event.target.closest('.view-toggle-btn');
    if (!btn) return;
    
    // Only handle map view since we only have one button now
    showMobileMapView();
}

// Show mobile map view
function showMobileMapView() {
    const container = document.querySelector('.container');
    const mapElement = document.getElementById('map');
    const sidebar = document.querySelector('.sidebar');
    
    if (!mapElement || !sidebar) {
        console.error('Map or sidebar element not found');
        return;
    }
    
  
    
    // Show map, hide sidebar
    mapElement.style.display = 'block';
    sidebar.style.display = 'none';
    
    // Ensure map takes full screen
    mapElement.style.height = '100vh';
    mapElement.style.width = '100vw';
    mapElement.style.position = 'fixed';
    mapElement.style.top = '0';
    mapElement.style.left = '0';
    mapElement.style.zIndex = '1000';
    
    // Add back button to map view
    if (!document.querySelector('.mobile-map-back-btn')) {
        const backBtn = document.createElement('button');
        backBtn.className = 'mobile-map-back-btn';
        backBtn.innerHTML = '← Back to List';
        backBtn.onclick = () => {
            mobileViewMode = 'list';
            showMobileListView();
        };
        document.body.appendChild(backBtn);
    }
    
    // Resize map to fit new container
    if (map) {
        setTimeout(() => {
            map.resize();
        }, 100);
    }
}

// Show mobile list view
function showMobileListView() {
    const container = document.querySelector('.container');
    const mapElement = document.getElementById('map');
    const sidebar = document.querySelector('.sidebar');
    
    if (!mapElement || !sidebar) {
        console.error('Map or sidebar element not found');
        return;
    }
    
    // Hide map, show sidebar
    mapElement.style.display = 'none';
    mapElement.style.position = 'static';
    mapElement.style.top = 'auto';
    mapElement.style.left = 'auto';
    mapElement.style.zIndex = 'auto';
    sidebar.style.display = 'block';
    
    // Restore sidebar to full height
    sidebar.style.height = '100vh';
    sidebar.style.width = '100%';
    
    // Remove back button from map view
    const backBtn = document.querySelector('.mobile-map-back-btn');
    if (backBtn) {
        backBtn.remove();
    }
    
    // Ensure events are displayed
    if (currentView === 'list') {
        filterEvents(currentFilter);
    }
}

// Fly to event location on map
function flyToEvent(lng, lat) {
    map.flyTo({
        center: [lng, lat],
        zoom: 15,
        duration: 1000
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Make mobile functions globally accessible
window.isMobile = isMobile;

// Handle window resize
window.addEventListener('resize', () => {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 768;
    
    // Update global variables
    window.isMobile = isMobile;
    
    if (wasMobile !== isMobile) {
        if (isMobile) {
            // Initialize mobile view when switching to mobile
            setupMobileView();
            // Reset to list view when switching to mobile
            mobileViewMode = 'list';
            showMobileListView();
        } else {
            // Clean up mobile view when switching to desktop
            const backBtn = document.querySelector('.mobile-map-back-btn');
            if (backBtn) {
                backBtn.remove();
            }
            
            // Reset map display for desktop
            const mapElement = document.getElementById('map');
            if (mapElement) {
                mapElement.style.display = 'block';
                mapElement.style.position = 'static';
                mapElement.style.top = 'auto';
                mapElement.style.left = 'auto';
                mapElement.style.zIndex = 'auto';
                mapElement.style.height = '100vh';
                mapElement.style.width = 'auto';
            }
            
            // Reset sidebar for desktop
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.style.display = 'block';
                sidebar.style.width = '600px';
                sidebar.style.height = '100vh';
            }
            
            // Reset mobile view mode
            mobileViewMode = 'list';
            
            // Resize map for desktop
            if (map) {
                setTimeout(() => {
                    map.resize();
                }, 100);
            }
        }
    }
});

// Show event detail from map view (mobile)
function showEventDetailFromMap(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    // Switch to list view first
    mobileViewMode = 'list';
    showMobileListView();
    
    // Show event detail immediately
    showEventDetail(eventId);
}