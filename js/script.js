// Global variables
let map;
let currentFilter = 'all';
let currentView = 'list'; // 'list' or 'detail'
let currentEvent = null;
let isMobile = window.innerWidth <= 768;

// Mobile Bottom Sheet Functionality
let isDragging = false;
let startY, startBottom;
let bottomSheet, dragHandle, mobileEventsList;

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
        price: "£18.42",
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
        name: "Leatherette: dyke fantasy den",
        venue: "Avalon Cafe",
        address: "Avalon cafe, unit D, Juno Way, SE14 5RW",
        time: "20:00-02:00",
        date: "Jun 28",
        price: "£8",
        type: "party",
        tags: ["Lesbian", "Queer", "FLINTA"],
        description: "London's late night dyke dance party LEATHERETTE is back this June for a hot 'n' heavy midsummer blowout!\n\nSpotlighting the hottest FLINTA talent from across the capital, with bass-forward DJs, electric live shows and plenty of dark corners to find/lose yourself in. This time, we're heading back South for an all night takeover of Avalon Cafe!\n\n**DJs**\nJess Hands\nLO-LOW\nMilk Shandy\nRuby Quick\n\n**Performances by**\nFinn Love\nJessica Winter\nMiss Averi\n\n**LIMITED PRESALE TICKETS AVAILABLE NOW:**\n£8 Mailing list early access\n£10 Earlybirds\n£12 Second Release\n£14 General Admission",
        image: "images/letherette.png",
        website_link: "https://www.instagram.com/leatherette_ldn/?hl=en",
        ticket_link: "https://www.outsavvy.com/event/27619/leatherette-dyke-fantasy-den",
        coordinates: null,
        generes: ["Techno", "Bass", "Pop"],
        age: "18+",
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
        name: "Coven Presents: MAJÓTACHI",
        venue: "Coven",
        address: "FABWICK, Queen's Yard, London E9 5EN",
        time: "20:00-01:00",
        date: "Jun 27",
        price: "£11.50",
        type: "party",
        tags: ["Queer"],
        description: "A spellbinding night of global bass and queer magic, MAJÓTACHI is where boundary-breaking sound meets community ritual. Curated by DJ and sonic shapeshifter ŌKAMI, this new party series brings together some of the boldest voices in underground club music, honouring ancestral rhythms, diasporic pulse, and the power of the femme spirit.\n\nDISCO MONDE:\nDisco Monde are a DJ duo, collective, and club night where dance music from the Global South is at the forefront. Drawing inspiration from the queer and femme-led club nights that paved the way, Disco Monde thrives on the fusion of genres and cultures, embracing a musical journey that knows no boundaries. Refusing to be confined by labels, they believe that when it comes to music, nothing is off-limits. At Disco Monde, the dance floor becomes a celebration of diversity, where the sounds of the world unite in a shared rhythm of joy and freedom.\n\nThey have been booked to play at popular venues, such as Soho House, The Jago, Grow Hackney. They also played Brighton Pride 2024, Twist Festival 2025 and have been featured on Loose FM and Foundation FM.\n\nDJ AC:\nDJ AC spins bassy global club goodness inspired by her upbringing across Aotearoa, Taiwan, and London. Expect a queer flow through the polyrhythmic sounds of the afro and latinx diaspora infused with tasty edits from afrobeats to UKG.\n\nDR. MAZZA:\nDr. Mazza - Marie-Ermelinda Mayassi is a Paris-born, Congolese DJ, community curator and NGO founder currently based in London. Based in East London, Dr. Mazza is a co-founder of the Echoes Collective, a member of the Original Soundsystem collective and a new resident at Oroko Radio.\n\nDr. Mazza seeks to channel her unconditional love for the dancefloor by sharing her favourite mix of genres, including an eclectic range of electronic music from alternative techno to GQOM and jersey club, inspired by her French, Congolese and British roots. You can explore her musical universe through her performances on NTS, foundation fm and keep hush. Find her behind the DJ booth near you.\n\nŌKAMI:\nNamed after the Japanese word for wolf, ŌKAMI is the side project of artist Kamī; a space where she channels her fundamental belief that sound is a sacred vessel through which communities of colour can connect in solidarity and find true liberation in the dance.\n\nWhile ŌKAMI has a deep affinity for the atmospheric and sub-heavy frequencies of dubstep, grime, drill and jungle you can often find her playfully switching gear into rich club sounds from across the world such as dancehall, bhangra, gqom, Asian dance sub-genres, baile funk and ballroom - with plenty of attitude.\n\nINDA FLO:\ninda Flo is a disc jockey, radio host, and event promoter pushing and pulling up on the underground club scene to bend and blend cultural sounds in her stomping ground of Global Bass, Techno, Percussive Club, Electronic, and World.\n\nHer sets guarantee a nonstop high and bouncy energy that reach across waters and beyond borders of Asia, Africa, Latin America, The Middle East, The Caribbean, Europe, and the diasporic world. Expect to move and sweat to heavy basslines, relentless rhythms, and certified bangers - accompanied with her signature sound of euphoric instrumentals ranging from brass, percussion, strings, wind, and vocal melodies.\n\nHer mission? To remind the world that every cultural sound, identity, and expression gets to co-exist.\n\nSet in COVEN – East London's new queer bar and arts space – MAJOTACHI is more than a club night. It's a portal. Come ready to sweat, chant, bounce, and be transformed.\n\nPlease note the event is taking upstairs at Coven (above Fabwick) which is currently not wheelchair accessible.",
        image: "images/coven.png",
        website_link: "https://www.instagram.com/covenhackney/?hl=en",
        ticket_link: "https://ra.co/events/2199301",
        coordinates: null,
        generes: ["Global Bass", "Afrobeats"],
        age: "18+",
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
        sellingFast: false
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
        description: "",
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
        name: "HAG: First Edition",
        venue: "Coven",
        address: "FABWICK, Queen's Yard, London E9 5EN",
        time: "20:00-02:00",
        date: "Jun 28",
        price: "£11.50",
        type: "party",
        tags: ["Queer", "Performances"],
        description: "HAG - Saturday 28th June\nA new monthly ritual begins.\n\nCOVEN's inaugural in-house queer techno night HAG summons you to the floor for a night of pulsing rhythms, deep ritual energy, and euphoric queer chaos. Expect hard techno, acidic breaks, industrial witchery and body-shaking basslines as we conjure a lineup that's both spellbinding and uncompromising.\n\nFeaturing:\n🜃 Daskaran – pounding industrial techno with transcendent queer ferocity\n🜁 Nina Pixina – acid-laced club spells, percussive hauntings, and techno enchantment\n🜄 Sidthesciencebxtch – experimental body music, high-concept energy, and dark camp brilliance\n🜂 AVGDJ – dark, driving, genre-bending techno for possessed bodies and ecstatic minds\n\nPlus: surprise live performances and plenty of sonic sorcery.\n\nCome dressed to hex.\nBring your demons.\nDance 'til your soul slips sideways.\n\nwear black <3",
        image: "images/coven3.png",
        website_link: "https://www.instagram.com/covenhackney/?hl=en",
        ticket_link: "https://ra.co/events/2200220",
        coordinates: null,
        generes: ["Techno"],
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
        name: "Life Drawing",
        venue: "La Camionera",
        address: "243 Well Street,  London,  E9 6RG",
        time: "11:00-13:00",
        date: "Jun 28",
        price: "£15",
        type: "social",
        tags: ["Drawing", "Lesbian", "Trans", "Non-Binary", "POC"],
        description: "•⁠ ⁠casual, informal, open to all abilities and experience!\n\n\n•⁠ special, experienced models and teachers!\n\n\n•⁠  ⁠11-1.15, with a 15 min break!\n\n\n•⁠ our summer cafe menu, soft drinks, and more available!\n\n\n•⁠  ⁠newsprint and charcoal provided, please bring sketch pads and other materials if you would like them!\n\nxxxxxx",
        image: "images/camionera1.png",
        website_link: "https://www.lacamionera.com/",
        ticket_link: "https://www.outsavvy.com/event/28232/life-drawing-at-la-cami-280625",
        coordinates: null,
        age: "18+",
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
    
];
// Initialize the application
async function init() {
    await geocodeAllEvents();
    initializeMap();
    renderEvents(events);
    setupEventListeners();
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
            // Single event marker
            el.className = 'marker';
            el.onclick = () => {
                showEventDetail(group.events[0].id);
            };
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
        return `
            <div class="popup-single">
                <h3>${event.name}</h3>
                <p><strong>${event.venue}</strong></p>
                <p>${event.time} • ${event.date}</p>
                <p>${event.price}</p>
                <button onclick="showEventDetail(${event.id})" class="popup-btn">View Details</button>
            </div>
        `;
    } else {
        const eventsHTML = group.events.map(event => `
            <div class="popup-event" onclick="showEventDetail(${event.id})">
                <div class="popup-event-name">${event.name}</div>
                <div class="popup-event-time">${event.date} • ${event.time}</div>
                <div class="popup-event-price">${event.price}</div>
            </div>
        `).join('');
        
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
    
    // Get start of current week (Sunday)
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    weekStart.setHours(0, 0, 0, 0);
    
    // Get end of current week (Saturday)
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
            filteredEvents = events.filter(event => event.date === 'Today');
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
            <h1>London Pride Map</h1>
            <h5>The best local queer events, updated daily</h5>
            <div class="filters">
                <button class="filter-btn ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">All</button>
                <button class="filter-btn ${currentFilter === 'this-week' ? 'active' : ''}" data-filter="this-week">This Week</button>
                <button class="filter-btn ${currentFilter === 'today' ? 'active' : ''}" data-filter="today">Today</button>
                <button class="filter-btn ${currentFilter === 'party' ? 'active' : ''}" data-filter="party">Party</button>
                <button class="filter-btn ${currentFilter === 'social' ? 'active' : ''}" data-filter="social">Social</button>
                <button class="filter-btn ${currentFilter === 'workshop' ? 'active' : ''}" data-filter="workshop">Workshop</button>
            </div>
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
    
    // Handle window resize
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 768;
    });
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
            // Initialize mobile bottom sheet if switching to mobile
            initializeMobileBottomSheet();
        } else {
            // Clean up mobile event listeners if switching to desktop
            if (map) {
                map.remove();
            }
        }
    }
});