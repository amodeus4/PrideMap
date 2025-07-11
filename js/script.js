// Global variables
let map;
let currentFilter = 'all';
let currentView = 'list'; // 'list' or 'detail'
let currentEvent = null;
let isMobile = window.innerWidth <= 768;
let mobileViewMode = 'list'; // 'list' or 'map' for mobile
let selectedTags = []; // Track selected tags for filtering

// Mobile view state
let isDragging = false;
let startY, startBottom;

const events = [
    
    
    {
        id: 1,
        name: "Avalon Summer Market",
        venue: "Avalon Cafe",
        address: "Juno Way, SE14 5RW",
        time: "13:00-18:00",
        date: "Jul 13",
        price: "Free",
        type: "social",
        tags: ["Pop-up Shop", "Market", "BBQ", "Clothing"],
        description: "🌹 THIS SUNDAY ! We are turning Avalon into one big pop-up shop! 🌹 \n\nFull of independent makers and local designers. 🌾 \n\nIt set to be a scorcher ! 🌤🌷 \nso it would be rude not to get the BBQ out! 🦐🍒🌭 \n\nWith stalls indoors and out ft. \n\njewellery / ceramics / clothing / keychains / accessories / glass work / print and publications / latex / bikinis / zines and more !!!!",
        image: "images/avalon1.png",
        website_link: "https://www.instagram.com/avaloncafebermondsey/?hl=en",
        ticket_link: "",
        coordinates: null,
        sellingFast: false
    },
    {
        id: 2,
        name: "London Trans pride",
        venue: "Langham Place",
        address: "Langham Place,W1W",
        time: "13:00-16:00",
        date: "Jul 26",
        price: "Free",
        type: "social",
        tags: ["Protest", "Trans", "Queer"],
        image: "images/transpride.png",
        description: "Following our record breaking march last year of over 60,000 participants we're excited to take to the streets in protest for trans+ rights with you all again on Saturday, 26 July! /n/nKEY DETAILS: \n\n• As always, bring bottled water and sun protection (umbrellas, hats, etc.) as well as signs & banners, face masks to protect yourself and others, flowers, and friends x \n• We'll be meeting in the streets from 1pm (13:00) at Langham Place and we will set off marching at 2pm (14:00)!\n• This year's march will end around 4pm (16:00) at Parliament Square Gardens and its surrounding streets (NOT Wellington Arch), where there will be speeches from members of the community. \n• For disabled comrades and anyone wanting to attend without doing full 2-hour march, remember: you have the option of going straight to Parliament Square Gardens from 14:00! \n• We highly recommend dressing up in whatever way you feel comfortable and, of course, consensual handholding is always encouraged ☺️ \nWe look forward to raising our voices and marching proudly with you all.\nAs always , \nLove + Rage \nLT+P",
        website_link: "https://www.instagram.com/londontranspride/?hl=en",
        ticket_link: "",
        coordinates: null,
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
        description: "Amores\n\nVery excited to announce our Twerk Temple Pride Extra Special Edition on 12th July at the beloved Jam Jar\n\nBringing our Twerk Temple decolonising sanctuary where diasporic queens, QPOC babes, and allies come together to honour heritage and celebrate culture. Where Latinx and Afro-Caribbean culture comes alive through reggaeton, soca, dancehall, salsa, afrobeats, and moreee\n\nExpect a night of joyful, anti-colonial resistance as incredible DJs, go-go perras, and performers take you on a caliente journey of self-expression, liberation, and pure ancestral fire\n\nMusic by:\n\n- Girl on Girl DJ Collective - Fierce queer non-binary collective celebrating sexuality through art and movement, crafting sacred spaces for authentic self-expression.\n\n- DJ Ivicore - Explosive Venezuelan force delivering electrifying Latinx and Caribbean fire with her signature Elektro Afro Perreo sound.\n\n- DJ Cheza - Multi-dimensional artivist weaving soca, dembow, amapiano, jungle, dubstep, and garage into transcendent underground liberation.\n\nLimited free tickets for our QPOC babes\nEarly bird tickets start at £5\n\nNos vemos",
        image: "images/popola.png",
        website_link: "",
        ticket_link: "https://www.headfirstbristol.co.uk/whats-on/jam-jar/sat-12-jul-popola-extra-special-pride-edition-132095#e132095",
        coordinates: null,
        generes: ["Afrobeats", "Raggaeton", "Electro", "Salsa", "Dancehall"],
        age: "18+",
        sellingFast: false
    },

    {
        id: 4,
        name: "Queer Film Club",
        venue: "The Green House",
        address: "244-254 Cambridge Heath Road,  London,  E2 9DA",
        time: "18:30-21:30",
        date: "Jul 12",
        price: "Free",
        type: "party",
        tags: ["POC", "Queer Migrants"],
        description: `📅 Date: Monday, 21st of July 2025 (more dates soon!)
🕡 Time: Doors 18:30, Movie introduction 18:50, Screening 19:00 (sharp!)
📍 Location: THE LOVE TANK, 244-254 Cambridge Heath Rd, Cambridge Heath, London E2 9DA

Step into the vibrant world of LGBTQ+ cinema with our Queer Film Club, specially curated for queer migrants and queer people of colour and hosted by Krzysztof Dubicki, a Polish queer film expert. Discover powerful, independent, queer films from across the globe, each thoughtfully selected to celebrate diverse voices and stories, as Krzysztof guides us through an evening of cinematic exploration. With his background in film and screen media studies, along with his role as an assistant to the London Independent Film Festival, Krzysztof is always up to date with the newest film premieres, ensuring an enriching and engaging experience for all attendees.

📽️Movie we will see📽️

Supernova (2020) Sam and Tusker are traveling across England in their old RV to visit friends, family and places from their past. Since Tusker was diagnosed with dementia two years ago, their time together is the most important thing they have.. For trailer click here.

What to Expect: 

🎬 Film Screenings: Experience ambitious and inspiring LGBTQ+ films that delve into themes of identity, love, and resilience. 

🎤 Engaging Introductions: Before each screening, dive into the film's background with a brief introduction and some fascinating fun facts. 

🎙️ Exclusive Interviews: Gain deeper insights into the movie with interviews featuring actors or directors, available for viewing after the screening. 

💬 Post-Film Discussions: Share your thoughts and insights in stimulating discussions exploring the film's themes or broader topics, fostering learning and connection within our community.

Come as you are and join us for an enriching cinematic experience filled with warmth, inclusivity, and celebration of queer narratives. Reserve your free ticket now! 🌈🎬

Stay Connected: 

Follow us on Instagram @thelovetankcic for updates on this event and other exciting free projects and events you can be a part of!

Accessibility Information: 

🏠 Accessible Venue: The event takes place on the step-free ground floor, with accessible toilets and wheelchair accessibility. 

🔊 Language Accessibility: All movies will have either English dubbing or English subtitles.`,
        image: "images/filmclub.png",
        website_link: "https://www.instagram.com/thelovetankcic/?hl=en",
        ticket_link: "https://www.thelovetank.info/events?fbclid=PAZXh0bgNhZW0CMTEAAadDT-2KPUQplrzpnI4E8uPhllcaqMfOoE9Cxu7Lq9t-42SSXM0QkOAhMqRPTg_aem_C1jA8EFvYjkT9SrFNOou4w",
        coordinates: null,
        sellingFast: true
    },

    {
        id: 5,
        name: "Dykes on Decks X Femmme Fraiche Pride",
        venue: "The Tempest Inn",
        address: "159-161 Kings Road Arches, Brighton, BN1 1NB",
        time: "20:00-03:00",
        date: "Aug 1",
        price: "£12-15",
        type: "party",
        tags: ["DJs", "FLINTA", "Lesbian", "Trans", "NB"],
        description: "Dykes on Decks X Femmme Fraiche Pride 2025 🌈 \nIt's the one you've all been waiting for!! Soaked in sapphic energy! We've invited some of the hottest queer DJs and promoters on the scene! 💖",
        image: "images/dykesdecks.png",
        website_link: "https://www.instagram.com/dykes_on_decks/?hl=en",
        ticket_link: "https://www.headfirstbristol.co.uk/whats-on/jam-jar/sat-12-jul-popola-extra-special-pride-edition-132095#e132095",
        coordinates: null,
        generes: ["Undeground", "Trance", "Techno", "Electro", "Hard House"],
        age: "18+",
        sellingFast: true
    },

    {
        id: 6,
        name: "Singles Night at La Camionera",
        venue: "La Camionera",
        address: "43 Well Street,  London,  E9 6RG",
        time: "19:00-22:00",
        date: "Jul 8",
        price: "Free",
        type: "social",
        tags: ["Speed Dating", "Lesbian", "NB", "Trans"],
        description: "Join us for an evening of speed dating, live matchmaking, and cocktails. Speed dating starts at 7 PM, but feel free to arrive from 4 to grab a drink, chat with others and meet some new faces before it all kicks off.Free tickets, and walk-ins are welcome after the event has started :) .  But we recommend you book ahead as it gets quite busy.  All ages are welcome, see you Tuesday.   XOXO This is a LGBTQTIA+ event",
        image: "images/lacam.png",
        website_link: "https://www.instagram.com/camionera.e9/?hl=en",
        ticket_link: "https://www.outsavvy.com/event/28650/singles-night-at-la-camionera-free-tickets-080725",
        coordinates: null,
        age: "18+",
        sellingFast: false
    },
    {
        id: 7,
        name: "PIANO BAR KARAOKE",
        venue: "Coven",
        address: "Unit 4 Queen's Yard,  London,  E9 5EN",
        time: "19:00-23:59",
        date: "Jul 10",
        price: "£5",
        type: "social",
        tags: ["Karaoke", "Queer"],
        description: "Sing your heart out with a professional live pianist backing you up.  After the incredible success of our debut event, we're making this a weekly celebration. Whether you're belting out power ballads or crooning intimate classics, our talented pianist will make you sound like a star.Perfect for a great night out with friends in COVEN's intimate, inclusive atmosphere. Come solo and make new connections, or bring your crew for an unforgettable evening of music and community.Every Thursday from 6pm-midnight at the first permanent queer venue in Hackney Wick.",
        image: "images/coven3.png",
        website_link: "https://www.instagram.com/covenhackney/?hl=en",
        ticket_link: "https://www.outsavvy.com/event/28687/piano-bar-karaoke-at-coven",
        coordinates: null,
        age: "18+",
        sellingFast: false
    },
    {
        id: 8,
        name: "THE RETURN TO LONDON: ZACH WITNESS & FRIENDS",
        venue: "Coven",
        address: "Unit 4 Queen's Yard,  London,  E9 5EN",
        time: "20:30-01:30",
        date: "Jul 11",
        price: "£10",
        type: "party",
        tags: ["Music", "Dancing", "Queer"],
        description: "London quieten down she needs to make a sound.  Texas born artist, DJ, and producer Zach Witness makes his official return home to London with his gang of supernova friends.  Expect dancefloor divinity from Rush Davis, Serenda b2b L-VIS 1990, Bestley, and Madame Gandhi.  As well as a very special live performance from Zach himself. Located at East London's new queer sanctuary, Coven 🕊️",
        image: "images/coven5.png",
        website_link: "https://www.instagram.com/covenhackney/?hl=en",
        ticket_link: "https://www.outsavvy.com/event/28685/the-return-to-london-zach-witness-friends",
        coordinates: null,
        generes: ["Techno", "Electronic"],
        age: "18+",
        sellingFast: false
    },
    {
        id: 9,
        name: "After Life Drawing",
        venue: "Coven",
        address: "Unit 4 Queen's Yard,  London,  E9 5EN",
        time: "12:00-14:00",
        date: "Jul 13",
        price: "Pay what you can",
        type: "workshop",
        tags: ["Drawing", "Queer"],
        description: "Queer life drawing @coven (above Fabwick) in Queen's Yard, Hackney Wick To be hosted by Spencer Grimshaw (slpgtattoo), artist and tattooist After moving to London a year ago Spencer found that the life drawing sessions available either didn't feature a diverse range of models, didn't feel like a safe space for queer people or weren't regular enough to create a community so decided to create that space and community of like minded people All abilities are welcome from beginner to experienced.  As I will be offering options to be tutored or non-tutoredWe will be here every Sunday beginning on 6th July Materials will be provided however, if there is anything specific that you require please provide this yourself Every week we will be hosting a diverse range of queer modelsThis weeks model TBA",
        image: "images/coven6.png",
        website_link: "https://www.instagram.com/covenhackney/?hl=en",
        ticket_link: "https://www.outsavvy.com/event/28679/after-life-drawing",
        coordinates: null,
        age: "18+",
        sellingFast: true
    },
    {
        id: 10,
        name: "BALLER FC x TEAM UHAUL DJS",
        venue: "Signature Brew Haggerston",
        address: "Railway Arches, 340 Acton Mews, London E8 4EA",
        time: "19:00-00:15",
        date: "Jul 11",
        price: "£5",
        type: "social",
        tags: ["Women's Football", "Music", "DJs"],
        description: "Slaying the Field's in the rearview mirror of our Uhaul truck, but we just can't get over those 🔥 vibes so we're bringing the Dyke Rescue DJs back to Haggerston this Friday night! \n\nWe've got Baller's Laura Brat back with Topbins tunes for pre-match warm up and 1-800 Dyke Rescue will finish you off after the game. \n\nDoors at 7pm, we're dual screening Portugal v Belgium AND Italy v Spain - it's going to be a total Barn Burner after witnessing the drama in group B this wk (Oh Mariona!) \n\nEarlybird tickets are £5. General Admission is £8. Limited amount of tickets available on the door!",
        image: "images/ballerfc.png",
        website_link: "https://www.instagram.com/ballerfc_ldn/?hl=en",
        ticket_link: "https://www.tickettailor.com/events/ballerfc/1775337",
        coordinates: null,
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
        tags: ["Party", "Trans", "Queer"],
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
        name: "gayns presents: roadrunner",
        venue: "Potters Fields Park",
        address: "Tooley Street, London, England, SE1 2UD",
        time: "9:00-11:30",
        date: "Jul 12",
        price: "Free",
        type: "social",
        tags: ["Running Club", "LGBTQ+"],
        description: "a free, weekly run club for gay and queer people in central london.",
        image: "images/gayns2.png",
        website_link: "",
        ticket_link: "https://www.eventbrite.co.uk/e/gayns-presents-roadrunner-tickets-1006397922277",
        coordinates: null,
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
        name: "gayns presents: rush",
        venue: "The Ministry, Borough",
        address: "79-81 Borough Road, London, England, SE1 1DN",
        time: "10:30-11:30",
        date: "Jul 12",
        price: "£15",
        type: "social",
        tags: ["Conditioning", "LGBTQ+"],
        description: "A 45 minute conditioning class",
        image: "images/gayns3.png",
        website_link: "",
        ticket_link: "https://www.eventbrite.co.uk/e/gayns-presents-rush-tickets-1127536836029",
        coordinates: null,
        sellingFast: false
    },
    {
        id: 17,
        name: "gayns presents: fold",
        venue: "The Ministry, Borough",
        address: "79-81 Borough Road, London, England, SE1 1DN",
        time: "10:30-11:30",
        date: "Jul 12",
        price: "£15",
        type: "social",
        tags: ["Yoga", "LGBTQ+"],
        description: "An hour long yoga class with george pearse",
        image: "images/gayns4.png",
        website_link: "",
        ticket_link: "https://www.eventbrite.co.uk/e/gayns-presents-fold-tickets-1127557858909",
        coordinates: null,
        sellingFast: false
    },
    {
        id: 18,
        name: "PxssyCat Club",
        venue: "Secret Location",
        address: "",
        time: "16:00-22:30",
        date: "Jul 13",
        price: "£20",
        type: "party",
        tags: ["Rave", "Playroom", "FLINTA", "Performance", "No Cis Men"],
        description: "Founded by the team behind Catnip, we are run by and for queer, POC, trans and SWer individuals. We're here to create the safe and sxxy space we need to dance, connect and play, free from the judgement and expectations of hetero and cis-normative society. For this reason, Pxssycat Club is FLINTA (Female, Lesbian, Intersex, Nonbinary, Trans and Agender) ONLY.  We do not admit cis men.\n\nWe do ask that you read our rules on Instagram here before attending.\n\nWe have an experienced welfare team who will be on hand throughout the event to ensure attendees are safe, respected and well cared for. They will be identifiable by LED armbands. Consent and safety is PxssyCat Club's number one priority. Take care not to over-intoxicate, look out for each other, and always reach out to a safeguard if you need assistance.\n\nVetting:\nVetting for PxssyCat Club is done on the door (also known as a vibe check) with a short conversation at the point of scanning your ticket.  This is not as scary as it sounds, our welfare team are lovely, it is simply to ensure guests are aware of our rules and the space they are entering and will be respectful of each other.\n\nWe will not police anyone's gender expression, we simply ask for your honesty and sincerity that you belong to at least one of the identities in the FLINTA (Female, Lesbian, Intersex, Nonbinary, Trans and Agender) acronym.\n\nWe will reject or eject anyone who is found to be making other guests uncomfortable or breaking the PxssyCat Club Rules.\n\nDresscode:\nThis is the place to show up as your sexiest self!\n\nIn order to maintain the vibe of PxssyCat Club, we ask guests to stick to kink wear. We expect to see leather, lingerie, rubber, fishnets, harnesses, latex etc. Feel free to wear affirming items such as binders and packers.\n\nLow effort, casual day-wear and jeans are not allowed. This is to make sure no other guests are made to feel uncomfortable when dressed up.\n\nWe encourage everyone to express their creativity through their outfits, but please avoid cultural appropriation, cop or military styles.\n\nAccessibility Information:  \nAs always, for the safety of all our guests the venue details are top secret.  Full details will be sent to ticket holders 24hrs before the event.\n\nWhat we can say, is the closest rail links are Hoxton, Cambridge Heath and Bethnal Green.\n\nTo enter Pxssycat Club the door is off the main street, it has a shutter 2150mm wide and 1920mm tall, followed by 7 steps with a handrail on one side leading to heavy-duty double doors. This entrance is on the same level as the WCs. There are three WCs in total, two with accordion doors and one slightly larger with a sliding door.\n\nThere is an alternative entrance which leads on to the main road which is 910mm wide and 2190mm tall and acts as a fire exit. To exit the venue this way, there are 12 steps, including some spiral steps, with a handrail on one side. To reach those stairs from the main floor you'll step on a small elevated platform before accessing the steps.\n\nDue to the venue being in a locally listed building, we are unfortunately unable to to provide lift or ramp access. For more accessibility info, please feel free to contact us.\n\nConcessions:\nWe have a limited number of low cost tickets for low income, SW and vulnerable attendees.\n\nIf you would like a code to unlock our concession tickets, please send an email to catnip.productions.london@gmail.com\n\nWe also have a small donation-based cab fund for vulnerable attendees which allows us to contribute towards fares, we encourage those with the means to donate to this fund when buying your ticket.\n\nAs it is donation based we are unable to specify how much we can contribute until after the event so please ensure, if you need a taxi home, that you have it covered.\n\nTo access the fund please contact us at catnip.productions.london@gmail.com within 24hrs of the event starting, we will add your name to the list and send details on how to claim it the following day.\n\n 15% off with code G3t$tr@pp3d",
        image: "images/pxssycat.png",
        website_link: "https://www.instagram.com/pxssycatclub_london/?hl=en",
        ticket_link: "https://www.outsavvy.com/event/27635/pxssycat-club-july-13th-2025?fbclid=PAZXh0bgNhZW0CMTEAAafyI8fK87oJ5haN60wZdwRNgztSBqZmFRFqnyHdp4JPETjhZzSntCH-88xs_g_aem_NbJi_24YAc5T3K0pGW4RAw",
        age: "21+",
        coordinates: null,
        sellingFast: false
    },
   
    {
        id: 19,
        name: "WET All Day Summer Party",
        venue: "Fox And Firkin",
        address: "316 Lewisham High Street, Lewisham, London, SE13 6JZ, United Kingdom",
        time: "12:00-21:00",
        date: "Jul 27",
        price: "£14",
        type: "party",
        tags: ["POC", "Day Party", "Trans", "Lesbian", "NB", "Queer"],
        description: "WET is back outside for round two of our Summer All Day Special! \nAfter a sold-out heater of a debut last year, since lovingly dubbed as WETfest, we're returning to Fox & Firkin's gorgeous outdoor yard for another full day of music, sunshine, dykes and dancing on Sunday 27th of July. \nMusic will be powered by a stacked lineup of WET's extended friends & family, alongside some very special guests, which we will announce in the coming weeks, and the usual vibes from residents Rabz & Mo Probs! n\ne'll be going all day under the covered garden, come rain or shine, with plenty of space to dance, eat, drink, natter & chill, moving inside for a special afters once the summer sun sets! There'll be two delicious food vendors, with wood-fired pizza and Caribbean goodies to choose from, plus frozen cocktails and more flowing from the bar all day long. \nWe can't wait to see you and do it all over again. A reminder that last year was a quick sell-out, and an absolute dream of a summer day, so don't forget to grab your tickets fast! \n\nWET is a night for dykes, lesbians, queer women, trans masc, femme & non-binary people that prioritises BPOC folks with early access and lower cost tickets. All dykes are welcome but we ask non-BPOC folks to consider the space they take up, and cis-het and cis-gay men to only attend if with friends who are members of these communities, and further, remember they are guests here as these spaces are rare and sacred.",
        image: "images/wet.png",
        website_link: "https://www.instagram.com/wetldn/?hl=en",
        ticket_link: "https://dice.fm/event/yoka8r-wet-all-day-summer-party-27th-jul-fox-firkin-london-fox-and-firkin-london-tickets?sharer_id=586a4c008983be62feb7ae2d&_branch_match_id=1287494257629300288&utm_source=dice&utm_campaign=event_share&utm_medium=event_share&_branch_referrer=H4sIAAAAAAAAAwXBSwqAIBQF0N00TOljFkRgW2jQLDSvKX15BkGD1t45%2Fr6v2DC2hWNNbZiRup0t5atUHa9xMF30mkBTsG0phS5mzmUtcwOROZhKI7PJR3AgCscyGTqfCGp7T%2BeOH5GyTMpdAAAA",
        age: "18+",
        generes: ["Afrobeats", "Baile Funk", "Raggaeton", "Afro Tek", "Electronic"],
        coordinates: null,
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
        name: "A Woman Like Eve + ScreenTalk with director Nouchka van Brakel",
        venue: "Barbican - Cinema 2",
        address: "Beech Street, EC2Y 8DS",
        time: "18:30-20:00",
        date: "Jul 9",
        price: "£13",
        type: "workshop",
        tags: ["Cinema", "Film Screening", "Q&A", "LGBTQ+"],
        description: "After leaving her husband for another woman, a mother faces difficult challenges and decisions about her future in Nouchka van Brakel's Dutch melodrama from 1979. \nEefje (Moniek van de Ven) is a loving mother and wife but feels unhappy and unfulfilled, leading to a public breakdown. A recuperating trip to the French seaside changes her life, when she encounters a feminist commune and begins an affair with singer Liliane (Maria Schneider), who re-christens her with the name 'Eve'. Eve's husband is furious when she wishes to continue her new relationship and a bitter custody battle begins. \nA Woman Like Eve captures the feminist zeitgeist of the 1970s without softening the tough consequences of following your heart. Van Brakel's films centre women's experiences navigating a patriarchal world and A Woman Like Eve is one of her best works. \nThis screening will be followed by a ScreenTalk with director Nouchka van Brakel, hosted by Gali Gold.",
        image: "images/barbican.png",
        website_link: "",
        ticket_link: "https://www.barbican.org.uk/whats-on/2025/event/a-woman-like-eve-een-vrouw-als-eva-screentalk",
        coordinates: null,
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
        name: "🍑 BOTTOM HEAVY 🍑",
        venue: "Dalston Superstore",
        address: "117 Kingsland High Street,  London,  E8 2PB",
        time: "22:00-04:00",
        date: "Jul 12",
        price: "£8-10",
        type: "party",
        tags: ["Queer", "Dancing"],
        description: "Superstore daddy Dan Beaumont and Bottom Heavy resident Wes Baggaley are back and bum to bumming all night long in the lazercave for another edition of Bottom Heavy.  House music for gays from Chicago and Detroit via Wigan. On the top deck, Superstore favourites Stav B, Ryussi &amp; Margo Broom serve up disco debauchery and dancefloor hits n misses all damn night. Shaking their peaches on the bar will are East London icons Cherry and Loren Dell'Arco 🍑CUM N PLAY XXX ",
        image: "images/bottom.png",
        website_link: "",
        ticket_link: "https://www.outsavvy.com/event/28244/-bottom-heavy-",
        coordinates: null,
        generes: ["Disco", "Detroit House", "Chicago House"],
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
        address: "32 Ormside St, London SE15 1TR",
        time: "23:00-05:00",
        date: "Jul 12",
        price: "£10-15",
        type: "party",
        tags: ["FLINTA", "Allies", "Undeground"],
        description: "step into the ethereal & enter all things club music •*¨*•.¸¸☆*\n\ncelebrating melba's 'angel 777' EP launch on Hypercolour. featuring a SUPER special secret headliner to transcend your expectations on club music, which will be revealed JUST before the night...\n\nguaranteed innovative and energetic certified bangers. expect club beats, femme and FLINTA* centred aura, sexy sonics, fast bpm's and contagious melodies.\n\nmoving through club edits, footwork, deconstructed club, trance and everything in-between.\n\nNectax, melba, e-kitty, princess elf bar & bemme blu will all be brining their own unique and individual flavours which transcend genres and aid in the natural flow of music progressing through the night.\n\ncombining inclusivity and underground club sounds. club cetera in London will be a really unique experience at the beautiful ormside projects.\n\nour previous events welcomed Miss Jay, Evissimax, and latesleeper (as Peroxiide). And this next headliner wont disappoint.\n\ndiscounted tickets available for QTPOC/low income. no one will be turned away for the lack of funds. message on socials for this <3 @clubcetera\n\n♡ 𝓙𝓾𝓵𝔂 12\n♡ ormside projects, London\n♡ tickets: £7/£9/£12/£15\n\n𓆩♡𓆪",
        image: "images/cetera.png",
        website_link: "https://www.instagram.com/clubcetera/",
        ticket_link: "https://ra.co/events/2190104?fbclid=PAZXh0bgNhZW0CMTEAAac4Q1Hhu0KSWNS0ojtZj0vbSIfoxEo2l8o_bgmW7g17eqTy2NnzX3z4BRMKmg_aem_nwEli3lVg344dOFAydtwHw",
        coordinates: null,
        generes: ["Fast", "160bpm", "Club", "Breaks", "Baile Funk"],
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
        sellingFast: true
    },
    {
        id: 31,
        name: "dyke speed dating",
        venue: "Retro Bar",
        address: "2 George Court,  London,  WC2N 6HH",
        time: "19:00-21:30",
        date: "Jul 16",
        price: "£10-22",
        type: "social",
        tags: ["Speed Dating", "Lesbian", "Trans", "Bisexual", "NB"],
        description: "It only takes one fateful conversation to begin your UHAUL journey.  How does it work?A survey will be emailed to you before the event, and we'll use your results to make sure you get to meet the best people for you. All queer identities are welcome (TERFS need not apply). you'll have 8-10 short, approx 5 minute dates (with prompts. ) to get to know as many new people as possible.  at the end, you'll be able to fill out a sheet with folks you'd like to keep in touch. If they feel the same way, you'll be matched.  Who's welcome? Anyone who resonates with the dyke/sapphic/lesbian experience - from bisexuals, to trans folks, to nonbinary folks - if you've ever loved queer women, this is the event for you. Poly/ENM folks welcome.  Monogamous people also welcome.  We usually have a fairly even split.  What ages is this for? This event is 21+ We'll do our best to make sure there are no major age gaps, and in some cases we'll have two separate groups - it all depends on who signs up.  If you are the only one in your age/relationship style category- I will shoot you an email and give you a heads up ahead of time.   Unfortunately this venue is not wheelchair accessible inside, and has stairs up. Please let us know if you need to sit, require back support, or have mobility issues, and we'll make sure that you get to stay in the same spot throughout the night.  For UC/LOW INCOME – PWYC/sliding scale tickets - shoot us an email or contact us via outsavvy.  ",
        image: "images/dykedating.png",
        website_link: "",
        ticket_link: "https://www.outsavvy.com/event/28403/dyke-speed-dating-at-retro-bar",
        coordinates: null,
        age: "21+",
        sellingFast: true
    },
    {
        id: 32,
        name: "Trans Sauna Peckham ",
        venue: "Sauna Social Club",
        address: "842 Brayards Road,  (Railway Arch),  London,  SE15 2AG",
        time: "19:45-22:30",
        date: "Jul 17",
        price: "£0-10",
        type: "social",
        tags: ["Sauna", "Relax", "Social", "Trans", "NB", "Intersex"],
        description: "Sweat, soak, and unwind! Trans Sauna is back in South London 🔥 \nA night for trans+ people (transgender, non-binary, intersex or gender non-conforming) to warm up, cool down, and connect. Expect hot hot saunas, icy cold plunges and a space that's entirely ours for the evening. This is not a cruising event - it's a care, rest, and community event.  \n\nSee you in the steam. ❤️‍🔥",
        image: "images/transsauna.png",
        website_link: "",
        ticket_link: "https://www.outsavvy.com/event/28415/trans-sauna-peckham-17th-july",
        coordinates: null,
        age: "18+",
        sellingFast: true
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
        name: "Queer Board Game Group",
        venue: "Retro Bar",
        address: "2 George Court,  London,  WC2N 6HH",
        time: "19:00-21:00",
        date: "Jul 15",
        price: "£10-14",
        type: "social",
        tags: ["Games", "Women", "Queer", "Trans", "NB"],
        description: "Are you queer and do you love playing board games? Sappho runs a monthly social event for playing board games, open to LGBTQIA+ women, trans and non-binary people. We have multiple tables set up with games, ranging from quick and easy games to learn for newbies, to medium-length strategy board games. If you've got a game you'd love to bring and teach others to play, please bring it too, as we will have some spare tables for wildcard games on the night. This will be a really friendly environment where we can enjoy playing games with other queers who love games as much as us.  Learn something new, or put a new strategy to the test, and make some new queer friends in the process. Dates: Tuesday 20 May, 17 June, 15 July, 7-9pm Location: Retro Bar, 2 George Court, Westminster, WC2N 6HH (3 minutes walk from Charring Cross underground station)Cost: £14 standard, £10 concession. Booking in advance is essential as we have venue caps. Accessibility: The venue is not step-free, please contact ",
        image: "images/games1.png",
        website_link: "",
        ticket_link: "https://www.outsavvy.com/event/26758/queer-board-game-group",
        coordinates: null,
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
        name: "Queer Stitch and Sip: Scrap Textile Collage Workshop",
        venue: "Royal Inn on the Park",
        address: "111 Lauriston Road,  London,  E9 7DA",
        time: "19:30-21:30",
        date: "Jul 16",
        price: "£10-20",
        type: "workshop",
        tags: ["Crafts", "Stitching", "Beginner", "Lesbian", "Trans", "NB"],
        description: "A beginner's introduction to the world of abstract and experimental collage with textiles. \n\nThis workshop begins with an overview of basic embroidery stitches followed by collage exploration using scrap and discarded textile materials. Freely explore a material or idea using intuition and creative stitching techniques in an inclusive and encouraging environment. Develop the confidence to engage with textiles in a therapeutic way, and meet more like minded creative queer people in the process. \n\nThis workshop is suitable for anyone! Both beginners and those with experience are welcome. \n\nYou're welcome to sip on a beverage while you stitch :)  \n\nWhat will be provided? \nEmbroidery hoop, embroidery floss, scissors, needles, scrap fabrics, and one piece of calico fabric cut per attendee. Attendees will take home the textile piece they create. Reuse-able materials such as embroidery hoops, scissors, and needles are for workshop use only. \n\nShould I bring anything? \nIf you have any scrap or craft materials (excess yarn, old clothes, string, scrap paper) that you would like to bring and work with, you are welcome to do so! But it is not necessary, and all attendees will have everything they need provided at the workshop.",
        website_link: "",
        image: "images/crafts.png",
        ticket_link: "https://www.outsavvy.com/event/28452/queer-stitch-and-sip-scrap-textile-collage-workshop",
        coordinates: null,
        age: "18+",
        sellingFast: false
    },
    {
        id: 38,
        name: "QUEER Bachata Drop-In Class ",
        venue: "SHE Soho Bar",
        address: "23a Old Compton Street,  London,  W1D 5JL",
        time: "17:30-19:30",
        date: "Jul 20",
        price: "£11-30",
        type: "workshop",
        tags: ["Bachata", "FLINTA"],
        description: "Get ready to sizzle, Sanura dancers! \nWe're thrilled to announce our partnership with the iconic SHE Soho Bar for our new QUEER Bachata Sundays! \nEmbrace your inner rhythm and join us for an evening of EMPOWERMENT through dance in the heart of London. As always, we're proudly FLINTA-focused, FEMINIST, and LGBTQ+ space, creating a space where everyone can shine on the dance floor.",
        website_link: "",
        image: "images/bachata.png",
        ticket_link: "https://www.outsavvy.com/event/23411/queer-bachata-sundays-she-soho-bar-drop-ins",
        coordinates: null,
        age: "18+",
        sellingFast: false
    },

    {
        id: 39,
        name: "Popola Sober Club: Open Decks II",
        venue: "The Common Press Bookshop",
        address: "118 Bethnal Green Road,  London,  E2 6DG",
        time: "19:00-22:00",
        date: "Jul 31",
        price: "£5",
        type: "social",
        tags: ["Open Decks", "LGBTQ+", "Allies"],
        description: "Amoress, we're back. .  🥰 After the beautiful energy of our first gathering, we're so excited to invite you to Popola Sober Club: Open Decks Edition 2 ✨ Our second meet-up is happening on Thursday, 31st of July at the beloved The Common Press This is our alcohol-free sanctuary where Global Majority queers, womxn and allies come together to vibe, connect, and celebrate culture in the most authentic way. Think good music, real conversations, and that warm community feeling that we've all been craving outside of the night club, where joy happens naturally. We're running it back with another open decks session, so if you've got tunes that honour diasporic beats within Latinx and Afro-Caribbean music, please send us a DM, whether you've never played in public before or you're more experienced, you're totally welcome, this is a relaxed, supportive space to share your sound and show your beat.  😘  Online Tickets just £5 🎟️OTD £8 Can't wait to see you there and feel the magic all over again. Nos vemosss 💋💋💋",
        website_link: "",
        image: "images/popla2.png",
        ticket_link: "https://www.outsavvy.com/event/28357/popola-sober-club-open-decks-ii",
        coordinates: null,
        age: "18+",
        sellingFast: false
    },
    {
        id: 40,
        name: "queer speed friending x clay workshop!",
        venue: "Mud Gang Pottery C.I.C",
        address: "118 Bethnal Green Road,  London,  E2 6DG",
        time: "18:45-21:30",
        date: "Jul 18",
        price: "£18-25",
        type: "workshop",
        tags: ["New Friends", "Pottery", "LGBTQ+", "BYOB"],
        description: "🚨QUEER FRIENDS ARE JUST AROUND THE CORNER! 🚨 \nHOT + BOTHERED X MUDGANG\n\nRough Schedule \n6:45-7:30 speed friending \n7:45-9:30 clay workshop \nBYOB - we'll have tea on, but feel free to bring wine/beer/etc \n\nWho's welcome? \nAnyone queer of any gender! ",
        website_link: "",
        image: "images/mug.png",
        ticket_link: "https://www.outsavvy.com/event/27784/queer-speed-friending-x-clay-workshop",
        coordinates: null,
        sellingFast: false
    },
    {
        id: 41,
        name: "strip night returns..",
        venue: "The Cavendish Arms",
        address: "128 Hartington Road,  London,  SW8 2HJ",
        time: "19:00-22:30",
        date: "Jul 20",
        price: "£14-16",
        type: "party",
        tags: ["Stip Club", "Performance", "Sapphic", "Cabaret", "Burlesque", "Drag Kings"],
        description: "Pack all of your dollar bills and pound notes and get ready to make it rain. We're curating a sizzling sapphic lineup and sexy vibes for the night of your queerest dreams. We run our night cabaret style, with time between acts to drink, chat, and meet new people.  \n\nPut your name into the draw for a hot lap dance on stage, or buy one ahead of time for ur cheekiest pal! Our acts range in vibe from traditional skripping to burlesque to drag kings, encompassing many different ways to feel and be fucking hot as a queer person.  \n\nSTRIP NIGHT DOLLARS ARE CASH ONLY AT THE VENUE! Get them ahead of time on Outsavvy and pick up at the door.  \n\nCONSENT IS KEY! Please respect all of our performers both on the stage and after. ",
        website_link: "",
        image: "images/strip.png",
        ticket_link: "https://www.outsavvy.com/event/28620/strip-night-returns",
        coordinates: null,
        sellingFast: false
    },
    {
        id: 42,
        name: "all queer supper club",
        venue: "The Table Café",
        address: "83 Southwark Street,  London,  SE1 0HX",
        time: "19:00-22:00",
        date: "Aug 21",
        price: "£32",
        type: "social",
        tags: ["Food", "Social", "LGBTQ+"],
        description: "one night. queer chef. queer venue. queer organisers. \n\nit's going to be cute, cozy, and absolutely delicious. \n\nfurther details tba.  \nvegan/vegetarian options. ",
        website_link: "",
        image: "images/supperclub.png",
        ticket_link: "https://www.outsavvy.com/event/28548/all-queer-supper-club",
        coordinates: null,
        sellingFast: false
    },
    {
        id: 43,
        name: "Queer Singles Night - collab with Funnier Than Your Mum",
        venue: "The Phoenix",
        address: "37 Cavendish Square,  London,  W1G 0PP",
        time: "19:00-23:00",
        date: "Jul 18",
        price: "£18",
        type: "social",
        tags: ["Comedy", "Dating", "Sapphic", "NB"],
        description: "Sappho Events is partnering with Funnier Than Your Mum to present a singles night for queer ladies and non-binary people! \n\nComedians from Funnier Than Your Mum will engage with the audience and run interactive activities to help you mingle with ease, eliminating the awkwardness of typical singles events. There's a matchmaking round so you just might meet your future love.",
        website_link: "",
        image: "images/singles.png",
        ticket_link: "https://www.outsavvy.com/event/26718/queer-singles-night-collab-with-women-arent-funny",
        age: "18+",
        coordinates: null,
        sellingFast: false
    },
    {
        id: 44,
        name: "GAYTORADE ♡ TRANS PRIDE TAKEOVER",
        venue: "Old Nun's Head",
        address: "15 Nunhead Green,  London,  SE15 3QQ",
        time: "21:00-02:00",
        date: "Jul 26",
        price: "Free",
        type: "party",
        tags: ["Trans Pride", "Fast Music", "LGBTQ+", "FLINTA"],
        description: "CHOO CHOOOO, BITCH. 🚂 Did somebody say TRANSport for London? No? Well we're saying it and we want to give your money to TRANS LEGAL CLINIC.\n\nDon't be an ungrateful hoe ❌ and cum to The Old Nun's Head ✝️ after Trans Pride 🏳️‍⚧️ for the GAYTORADE two-room takeover. It's gonna be so f*cking dumb and there's gonna heaps of FLINTA* fitties ther, we promise 👍. TRAINS RIGHTS ARE HUMAN RIGHTS? 🏳️‍⚧️\n\n    ,~~~~____    |~~~~~~~~~~~~~~~~~~|\n  Y_,___|[]|       | 🏳️‍⚧️GAYTORADE🏳️‍⚧️  |\n {|_|_|_|PU|_,_|_____ACAB _____|\n//oo---OO=OO     OOO          OOO\n\nWe love all TRANSport and we wanna show our appreciation: trains, buses, haulage vehicles, ferries, the whole spectrum of TRANSport is beautiful. Even planes and personal automobiles (but less so cos like the environment yk 💚).\n\nHitch your wagon of dykes to your 16-wheeler 🚛, grease the wheels on your scooter 🛴, shovel some coal 🖤 into Thomas the Tanked Enby's ass 🥵... Did that escalate too quickly? Why am I turned on 💦? Stop looking at me like that, I'm just a girl.\n\nWhatever, use your favoured form of transport and get yourt sexxxi ass 🍑 South East, cos we wanna see your ass 🍑 we love your ass 🍑\n\n2 Rooms Carriages 💄\n5 DJs Drivers 🤹‍♂️\n2 GoGos Conductors 🧩\nMany hot queers passengers ⏰\nMuch snogging wifi? 🪑",
        website_link: "",
        image: "images/gaytorade.png",
        ticket_link: "https://www.outsavvy.com/event/28437/gaytorade-trans-pride-after-party-",
        coordinates: null,
        sellingFast: true
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
        name: "Homoelectric Residency: Week 2",
        venue: "Metropolis",
        address: "234 Cambridge Heath Road; Bethnal Green; London E2 9NN",
        time: "22:30-03:00",
        date: "Jul 12",
        price: "£6-11",
        type: "party",
        tags: ["Party", "Dancing", "Gay", "LGBTQ+"],
        description: "𝐇𝐨𝐦𝐨𝐞𝐥𝐞𝐜𝐭𝐫𝐢𝐜 𝐰𝐢𝐥𝐥 𝐛𝐫𝐢𝐧𝐠 𝐜𝐥𝐮𝐛 𝐜𝐡𝐚𝐨𝐬 𝐟𝐫𝐨𝐦 𝐌𝐚𝐧𝐜𝐡𝐞𝐬𝐭𝐞𝐫 𝐭𝐨 𝐨𝐮𝐫 𝐭𝐫𝐚𝐧𝐬𝐟𝐨𝐫𝐦𝐞𝐝 𝐬𝐭𝐫!𝐩 𝐜𝐥𝐮𝐛, 𝐞𝐯𝐞𝐫𝐲 𝐒𝐚𝐭𝐮𝐫𝐝𝐚𝐲 𝐧𝐢𝐠𝐡𝐭 𝐢𝐧 𝐉𝐮𝐥𝐲. \n\n𝟒 𝐬𝐰𝐞𝐚𝐭-𝐟𝐮𝐞𝐥𝐥𝐞𝐝 𝐧𝐢𝐠𝐡𝐭𝐬 𝐨𝐟 𝐡𝐨𝐮𝐬𝐞, 𝐭𝐞𝐜𝐡𝐧𝐨, 𝐝𝐢𝐬𝐜𝐨, 𝐟𝐢𝐥𝐭𝐡𝐲 𝐩𝐨𝐩, 𝐬𝐥𝐞𝐚𝐳𝐞 𝐚𝐧𝐝 𝐝𝐚𝐧𝐜𝐞𝐟𝐥𝐨𝐨𝐫 𝐥𝐢𝐛𝐞𝐫𝐚𝐭𝐢𝐨𝐧 𝐟𝐫𝐨𝐦 𝐚 𝐩𝐚𝐜𝐤𝐞𝐝 𝐥𝐢𝐧𝐞-𝐮𝐩 𝐨𝐟 𝐭𝐡𝐞𝐢𝐫 𝐚𝐥𝐥-𝐬𝐭𝐚𝐫𝐬. \n\n𝐍𝐨 𝐬𝐧𝐨𝐛𝐛𝐞𝐫𝐲, 𝐧𝐨 𝐩𝐫𝐞𝐭𝐞𝐧𝐬𝐢𝐨𝐧, 𝐣𝐮𝐬𝐭 𝐩𝐮𝐫𝐞 𝐞𝐮𝐩𝐡𝐨𝐫𝐢𝐚 𝐟𝐨𝐫 𝐪𝐮𝐞𝐞𝐫𝐬 𝐚𝐧𝐝 𝐭𝐡𝐞𝐢𝐫 𝐚𝐥𝐥𝐲 𝐩𝐞𝐞𝐫𝐬…",
        website_link: "",
        image: "images/homoelectric2.png",
        ticket_link: "https://ra.co/events/2140158",
        coordinates: null,
        generes: ["Disco", "House", "Techno", "Funky"],
        age: "18+",
        sellingFast: false

    },
    
    {
        id: 47,
        name: "DYKE MARCH SOCIALS",
        venue: "The Abbey Tavern",
        address: "124 Kentish Town Rd, NW1 9QB",
        time: "18:00-00:00",
        date: "Jul 17",
        price: "£11-16",
        type: "social",
        tags: ["Lesbian", "Trans", "Dyke"],
        description: "We're popping back up with our monthly socials after a crazy June seeing all your lovely faces at the march! 🥾\n\nJoin us on the 17th July at the Abbey Tavern in Kentish Town from 6pm till close. 🍺\n\nIf you're new to our socials it's basically just a load of d¥kes taking over a pub for an evening and making it our own!\n\nIt's free, we always choose accessible venues and we've made sure the pubs are d¥ke/trans friendly! 🏳️‍⚧️\n\nWe'll also have some crafts from the wonderful @thecraftydyke.ldn 🎨\n\nSo - need an excuse to ask someone fit from the march on a date? 💌\n\nMissed the march and want to get ur d¥ke fix? ⛓️\n\nOr maybe you're a regular coming back for more… 💋\n\nWe're a trans inclusive space so pls be miserable at home instead if you're not on board!\n\nDolls and POC low income d¥kes DM us for the free drink code word! 🍸\n\nFootball gays don't fret, we've picked somewhere showing the euros ⚽️\n\nSee you on the 17th babes x",
        website_link: "https://www.instagram.com/dyke_march/?hl=en",
        image: "images/dykemarch.png",
        ticket_link: "",
        coordinates: null,
        sellingFast: false,

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
        generes: ["Pop", "House", "Raggaeton"],
        age: "18+",
    },

    {
        id: 49,
        name: "PXSSY PALACE x SUZIO x SUBSKATE PARTY",
        venue: "Jumbi",
        address: "Unit 4.1, Copeland Park, 133 Copeland Rd, London SE15 3SN",
        time: "14:00-02:00",
        date: "Jul 18",
        price: "£11-28",
        type: "party",
        tags: ["LGBTQ+", "Skating", "Arcade", "High Energy", "Party"],
        description: "PXSSY PALACE x SUZIO\nOne unmissable night. One continuous, high-energy party. 24hrs to sign up and secure your early bird tickets. \n\nFrom 6PM right through 'til 2AM, two of the best parties and Queer institutions are taking over the warehouse for a full-throttle baddie experience. \n\nSkate early, dance late: the skating track's open 'til 10PM (£5 optional add-on) if you want to glide before you go all in.\n\n🕺 700+ capacity dancefloor\n🎶 DJs all night long\n🛍️ Traders handpicked by PXSSY PALACE\n🌇 Rooftop terrace open 'til 10PM\n🕹️ Arcade machines, pool tables & chill-out zones\n\nDon't miss this. Sign up to lock in your place.\n\nOne night only. Come roll with us.",
        image: "images/pxxy1.png",
        website_link: "https://www.instagram.com/pxssypalace/?hl=en",
        ticket_link: "https://ra.co/events/2192438",
        sellingFast: false,
        generes: ["Latin Core", "UK Bass", "Techno", "Cunty"],
        age: "18+",
    },
    {
        id: 50,
        name: "Seasoned: Double Denim Day party",
        venue: "Pergola Brixton",
        address: "Coldharbour Lane, Lambeth, London, SW9 8PR, United Kingdom",
        time: "17:30-22:30",
        date: "Jul 20",
        price: "£16",
        type: "party",
        tags: ["25+", "LGBTQ+"],
        description: "After 2 sold out events we are back for episode 3 and we are running back the Pergola day party, this time in double denim 🙂‍↕️ \nOn July 20th we will be taking over the stunning rooftop of Pergola Brixton where 600 of us will vibe into the sunset 😍 \nDJ's Donnie Sunshine, Glade Marie, Ken Styles, Arliiiyah and Harvz\nDATE: July 20th \nTIME: 5.30pm- 10.30pm \nLast entry: 7pm \nVenue: Pergola Brixton \nThe venue is wheelchair accessible and has disabled toilets. \nSTRICTLY 25+ for the Girls, Gays and Theys.",
        image: "images/seasoned.png",
        website_link: "",
        ticket_link: "https://dice.fm/partner/seasoned/event/eoeav6-seasoned-double-denim-day-party-20th-jul-pergola-brixton-london-tickets?dice_id=6478472&dice_channel=web&dice_tags=organic&dice_campaign=SEASONED&dice_feature=mio_marketing&utm_source=web&utm_campaign=SEASONED&utm_medium=mio_marketing&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXz8nMy9ZLyUxO1UvL1XdLMTUwTTRJSTayMLavK0pNSy0qysxLj08qyi8vTi2y9cwrLklML0rMBQD%2B5NKiPgAAAA%3D%3D&_branch_match_id=1469019422367661175",
        coordinates: null,
        sellingFast: true,
        generes: ["Afrobeats", "Raggaeton", "Soca", "Carribean"],
        age: "25+",
    },
    {
        id: 51,
        name: "Homoelectric Residency: Week 3",
        venue: "Metropolis",
        address: "234 Cambridge Heath Road; Bethnal Green; London E2 9NN",
        time: "22:30-04:00",
        date: "Jul 19",
        price: "£6-11",
        type: "party",
        tags: ["Party", "Dancing", "Gay", "LGBTQ+"],
        description: "𝐇𝐨𝐦𝐨𝐞𝐥𝐞𝐜𝐭𝐫𝐢𝐜 𝐰𝐢𝐥𝐥 𝐛𝐫𝐢𝐧𝐠 𝐜𝐥𝐮𝐛 𝐜𝐡𝐚𝐨𝐬 𝐟𝐫𝐨𝐦 𝐌𝐚𝐧𝐜𝐡𝐞𝐬𝐭𝐞𝐫 𝐭𝐨 𝐨𝐮𝐫 𝐭𝐫𝐚𝐧𝐬𝐟𝐨𝐫𝐦𝐞𝐝 𝐬𝐭𝐫!𝐩 𝐜𝐥𝐮𝐛, 𝐞𝐯𝐞𝐫𝐲 𝐒𝐚𝐭𝐮𝐫𝐝𝐚𝐲 𝐧𝐢𝐠𝐡𝐭 𝐢𝐧 𝐉𝐮𝐥𝐲. \n\n𝟒 𝐬𝐰𝐞𝐚𝐭-𝐟𝐮𝐞𝐥𝐥𝐞𝐝 𝐧𝐢𝐠𝐡𝐭𝐬 𝐨𝐟 𝐡𝐨𝐮𝐬𝐞, 𝐭𝐞𝐜𝐡𝐧𝐨, 𝐝𝐢𝐬𝐜𝐨, 𝐟𝐢𝐥𝐭𝐡𝐲 𝐩𝐨𝐩, 𝐬𝐥𝐞𝐚𝐳𝐞 𝐚𝐧𝐝 𝐝𝐚𝐧𝐜𝐞𝐟𝐥𝐨𝐨𝐫 𝐥𝐢𝐛𝐞𝐫𝐚𝐭𝐢𝐨𝐧 𝐟𝐫𝐨𝐦 𝐚 𝐩𝐚𝐜𝐤𝐞𝐝 𝐥𝐢𝐧𝐞-𝐮𝐩 𝐨𝐟 𝐭𝐡𝐞𝐢𝐫 𝐚𝐥𝐥-𝐬𝐭𝐚𝐫𝐬. \n\n𝐍𝐨 𝐬𝐧𝐨𝐛𝐛𝐞𝐫𝐲, 𝐧𝐨 𝐩𝐫𝐞𝐭𝐞𝐧𝐬𝐢𝐨𝐧, 𝐣𝐮𝐬𝐭 𝐩𝐮𝐫𝐞 𝐞𝐮𝐩𝐡𝐨𝐫𝐢𝐚 𝐟𝐨𝐫 𝐪𝐮𝐞𝐞𝐫𝐬 𝐚𝐧𝐝 𝐭𝐡𝐞𝐢𝐫 𝐚𝐥𝐥𝐲 𝐩𝐞𝐞𝐫𝐬…",
        website_link: "",
        image: "images/homoelectric3.png",
        ticket_link: "https://ra.co/events/21401598",
        coordinates: null,
        generes: ["Disco", "House", "Techno", "Funky"],
        age: "18+",
        sellingFast: false
    },
    {
        id: 52,
        name: "Homoelectric Residency: Closing Party",
        venue: "Metropolis",
        address: "234 Cambridge Heath Road; Bethnal Green; London E2 9NN",
        time: "22:30-04:00",
        date: "Jul 26",
        price: "£6-11",
        type: "party",
        tags: ["Party", "Dancing", "Gay", "LGBTQ+"],
        description: "𝐇𝐨𝐦𝐨𝐞𝐥𝐞𝐜𝐭𝐫𝐢𝐜 𝐰𝐢𝐥𝐥 𝐛𝐫𝐢𝐧𝐠 𝐜𝐥𝐮𝐛 𝐜𝐡𝐚𝐨𝐬 𝐟𝐫𝐨𝐦 𝐌𝐚𝐧𝐜𝐡𝐞𝐬𝐭𝐞𝐫 𝐭𝐨 𝐨𝐮𝐫 𝐭𝐫𝐚𝐧𝐬𝐟𝐨𝐫𝐦𝐞𝐝 𝐬𝐭𝐫!𝐩 𝐜𝐥𝐮𝐛, 𝐞𝐯𝐞𝐫𝐲 𝐒𝐚𝐭𝐮𝐫𝐝𝐚𝐲 𝐧𝐢𝐠𝐡𝐭 𝐢𝐧 𝐉𝐮𝐥𝐲. \n\n𝟒 𝐬𝐰𝐞𝐚𝐭-𝐟𝐮𝐞𝐥𝐥𝐞𝐝 𝐧𝐢𝐠𝐡𝐭𝐬 𝐨𝐟 𝐡𝐨𝐮𝐬𝐞, 𝐭𝐞𝐜𝐡𝐧𝐨, 𝐝𝐢𝐬𝐜𝐨, 𝐟𝐢𝐥𝐭𝐡𝐲 𝐩𝐨𝐩, 𝐬𝐥𝐞𝐚𝐳𝐞 𝐚𝐧𝐝 𝐝𝐚𝐧𝐜𝐞𝐟𝐥𝐨𝐨𝐫 𝐥𝐢𝐛𝐞𝐫𝐚𝐭𝐢𝐨𝐧 𝐟𝐫𝐨𝐦 𝐚 𝐩𝐚𝐜𝐤𝐞𝐝 𝐥𝐢𝐧𝐞-𝐮𝐩 𝐨𝐟 𝐭𝐡𝐞𝐢𝐫 𝐚𝐥𝐥-𝐬𝐭𝐚𝐫𝐬. \n\n𝐍𝐨 𝐬𝐧𝐨𝐛𝐛𝐞𝐫𝐲, 𝐧𝐨 𝐩𝐫𝐞𝐭𝐞𝐧𝐬𝐢𝐨𝐧, 𝐣𝐮𝐬𝐭 𝐩𝐮𝐫𝐞 𝐞𝐮𝐩𝐡𝐨𝐫𝐢𝐚 𝐟𝐨𝐫 𝐪𝐮𝐞𝐞𝐫𝐬 𝐚𝐧𝐝 𝐭𝐡𝐞𝐢𝐫 𝐚𝐥𝐥𝐲 𝐩𝐞𝐞𝐫𝐬…",
        website_link: "",
        image: "images/homoelectric4.png",
        ticket_link: "https://ra.co/events/2140161",
        coordinates: null,
        generes: ["Disco", "House", "Techno", "Funky"],
        age: "18+",
        sellingFast: false
    },
    {
        id: 53,
        name: "Rat Party",
        venue: "Distillery N17",
        address: "Unit 25, Millmead Industrial Estate",
        time: "14:00-02:00",
        date: "Aug 2",
        price: "£10-20",
        type: "party",
        tags: ["Party", "Dancing", "LGBTQ+", "Underground"],
        description: "Rat Party takes London!",
        website_link: "",
        image: "images/ratparty.png",
        ticket_link: "https://ra.co/events/2201593",
        coordinates: null,
        generes: ["Undeground Electronic", "UK Bass", "Techno", "Breaks"],
        age: "18+",
        sellingFast: false
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
    
    // Initialize tag filter
    setupTagFilterDropdown();
    
    // Set up automatic refresh to remove ended events
    setupAutoRefresh();
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

// Function to check if an event has ended
function isEventEnded(event) {
    const eventDate = parseEventDate(event.date);
    const now = new Date();
    
    // If event is not today, check if the date has passed
    if (eventDate.getTime() !== new Date().setHours(0, 0, 0, 0)) {
        return eventDate < new Date().setHours(0, 0, 0, 0);
    }
    
    // If event is today, check if the end time has passed
    const timeMatch = event.time.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
        const endHour = parseInt(timeMatch[1]);
        const endMinute = parseInt(timeMatch[2]);
        
        // Handle events that go past midnight (like "22:00-4:00")
        let endTime = new Date();
        endTime.setHours(endHour, endMinute, 0, 0);
        
        // If end time is earlier than start time, it means the event goes past midnight
        // In this case, add 24 hours to the end time
        if (endHour < 12) { // Assuming events don't end before noon
            endTime.setDate(endTime.getDate() + 1);
        }
        
        return now > endTime;
    }
    
    // If we can't parse the time, assume event ends at 11:59 PM
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    return now > endOfDay;
}

// Function to filter out ended events
function filterOutEndedEvents(eventsArray) {
    return eventsArray.filter(event => !isEventEnded(event));
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

// Update the filterEvents function to handle 'this-week' and tag filtering
function filterEvents(filter) {
    let filteredEvents = events;
    
    // First, filter out ended events automatically
    filteredEvents = filterOutEndedEvents(filteredEvents);
    
    if (filter !== 'all') {
        if (filter === 'today') {
            filteredEvents = filteredEvents.filter(event => isEventToday(event.date));
        } else if (filter === 'this-week') {
            filteredEvents = filteredEvents.filter(event => isDateInCurrentWeek(event.date));
        } else {
            // Filter by type (party, social, workshop)
            filteredEvents = filteredEvents.filter(event => event.type === filter);
        }
    }
    
    // Apply tag filtering if tags are selected
    if (selectedTags.length > 0) {
        filteredEvents = filteredEvents.filter(event => {
            if (!event.tags) return false;
            // Event must have at least one of the selected tags
            return selectedTags.some(tag => event.tags.includes(tag));
        });
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
                <h5>The best local queer events, updated daily. <a href="https://mailchi.mp/54e006ea8469/gaydar-newsletter-sign-up" target="_blank" class="newsletter-link">Sign up for weekly roundups</a></h5>
            </div>
            <div class="filters">
                <button class="filter-btn ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">All</button>
                <button class="filter-btn tags-filter-btn ${selectedTags.length > 0 ? 'active' : ''}" onclick="toggleTagFilter()">
                    🔍 Tags ${selectedTags.length > 0 ? `(${selectedTags.length})` : ''}
                </button>
                <button class="filter-btn ${currentFilter === 'this-week' ? 'active' : ''}" data-filter="this-week">This Week</button>
                <button class="filter-btn ${currentFilter === 'today' ? 'active' : ''}" data-filter="today">Today</button>
                <button class="filter-btn ${currentFilter === 'party' ? 'active' : ''}" data-filter="party">Party</button>
                <button class="filter-btn ${currentFilter === 'social' ? 'active' : ''}" data-filter="social">Social</button>
                <button class="filter-btn ${currentFilter === 'workshop' ? 'active' : ''}" data-filter="workshop">Workshop</button>
            </div>
            <div class="tag-filter-dropdown-container"></div>
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
        if (!btn.classList.contains('tags-filter-btn')) {
            btn.addEventListener('click', handleFilterClick);
        }
    });
    
    // Mobile view toggle event listeners
    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
        btn.addEventListener('click', handleViewToggle);
    });
    
    // Setup tag filter dropdown
    setupTagFilterDropdown();
    
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

// Setup tag filter dropdown functionality
function setupTagFilterDropdown() {
    const container = document.querySelector('.tag-filter-dropdown-container');
    if (!container) return;
    
    // Create and append dropdown
    const dropdown = createTagFilterDropdown();
    container.appendChild(dropdown);
    
    // Add event listeners
    dropdown.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-tag-filter')) {
            toggleTagFilter();
        } else if (e.target.classList.contains('clear-tags-btn')) {
            clearTagSelections();
        } else if (e.target.classList.contains('apply-tags-btn')) {
            handleTagSelection();
            toggleTagFilter();
            filterEvents(currentFilter);
            updateTagsFilterButton();
        } else if (e.target.type === 'checkbox') {
            // Handle individual checkbox changes
            setTimeout(() => {
                handleTagSelection();
                updateTagsFilterButton();
            }, 0);
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && !e.target.classList.contains('tags-filter-btn')) {
            dropdown.style.display = 'none';
        }
    });
}

// Update the tags filter button text
function updateTagsFilterButton() {
    const tagsBtn = document.querySelector('.tags-filter-btn');
    if (tagsBtn) {
        tagsBtn.textContent = `🔍 Tags ${selectedTags.length > 0 ? `(${selectedTags.length})` : ''}`;
        tagsBtn.classList.toggle('active', selectedTags.length > 0);
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

// Function to extract all unique tags from events
function getAllUniqueTags() {
    const allTags = [];
    events.forEach(event => {
        if (event.tags) {
            event.tags.forEach(tag => {
                if (!allTags.includes(tag)) {
                    allTags.push(tag);
                }
            });
        }
    });
    return allTags.sort(); // Sort alphabetically
}

// Function to create tag filter dropdown
function createTagFilterDropdown() {
    const uniqueTags = getAllUniqueTags();
    const dropdown = document.createElement('div');
    dropdown.className = 'tag-filter-dropdown';
    dropdown.style.display = 'none';
    
    const tagList = uniqueTags.map(tag => `
        <div class="tag-filter-option" data-tag="${tag}">
            <input type="checkbox" id="tag-${tag}" ${selectedTags.includes(tag) ? 'checked' : ''}>
            <label for="tag-${tag}">${tag}</label>
        </div>
    `).join('');
    
    dropdown.innerHTML = `
        <div class="tag-filter-header">
            <h4>Filter by Tags</h4>
            <button class="close-tag-filter">×</button>
        </div>
        <div class="tag-filter-content">
            ${tagList}
        </div>
        <div class="tag-filter-actions">
            <button class="clear-tags-btn">Clear All</button>
            <button class="apply-tags-btn">Apply Filters</button>
        </div>
    `;
    
    return dropdown;
}

// Function to show/hide tag filter dropdown
function toggleTagFilter() {
    const dropdown = document.querySelector('.tag-filter-dropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
}

// Function to handle tag selection
function handleTagSelection() {
    const checkboxes = document.querySelectorAll('.tag-filter-option input[type="checkbox"]');
    selectedTags = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedTags.push(checkbox.id.replace('tag-', ''));
        }
    });
}

// Function to clear all tag selections
function clearTagSelections() {
    selectedTags = [];
    const checkboxes = document.querySelectorAll('.tag-filter-option input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

// Set up automatic refresh to remove ended events
function setupAutoRefresh() {
    // Check for ended events every minute
    setInterval(() => {
        // Only refresh if we're in list view (not in event detail)
        if (currentView === 'list') {
            filterEvents(currentFilter);
        }
    }, 60000); // Check every minute
    
    // Also check when the page becomes visible (user returns to tab)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && currentView === 'list') {
            filterEvents(currentFilter);
        }
    });
}