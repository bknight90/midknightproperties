export type Experience = {
  name: string;
  category: string;
  description: string;
  tip: string;
  href: string;
  linkLabel: string;
};

export type ExperienceGroup = {
  value: string;
  label: string;
  places: Experience[];
};

// Destination facts link to the attraction, operator or official visitor guide.
// Suggested combinations are editorial ideas, not services included with a stay.
export const experienceGroups: ExperienceGroup[] = [
  {
    value: "essentials",
    label: "The essentials",
    places: [
      {
        name: "The Old Town",
        category: "History, at your own pace",
        description:
          "Begin at the Bargate and follow Southampton’s free, self-guided Walk the Walls trail. Medieval gateways, stretches of town wall and tucked-away corners reveal a city with far more to its story than its port. It is a rewarding way to find your bearings, with plenty of reasons to pause, look closer and let the afternoon unfold.",
        tip: "Make it a first-day wander, with time for a leisurely lunch along the way.",
        href: "https://www.visitsouthampton.co.uk/walk-the-walls-trail/",
        linkLabel: "Follow the official walking trail",
      },
      {
        name: "Ocean Village",
        category: "A moment by the marina",
        description:
          "Masts, boats and a change of pace: Ocean Village brings Southampton’s maritime character into the everyday. The marina is home to restaurants, bars and Harbour Lights Picturehouse, making this a natural setting for an evening built around dinner and a film. Come for a little waterfront atmosphere and leave room in the plan for lingering.",
        tip: "Choose a waterside table, then check what is showing at Harbour Lights.",
        href: "https://www.mdlmarinas.co.uk/marinas/mdl-ocean-village-marina/",
        linkLabel: "Explore Ocean Village",
      },
      {
        name: "SeaCity Museum",
        category: "Stories that stay with you",
        description:
          "Southampton’s Titanic Story puts people at the heart of the city’s connection with the famous ship. Objects linked to passengers and crew, personal accounts and survivor voices bring that history into focus. It is a thoughtful introduction to Southampton’s maritime identity, and an absorbing choice when you want a day with a little more depth.",
        tip: "Give the personal stories time, then continue your own exploration of the city.",
        href: "https://seacitymuseum.co.uk/exhibitions/southamptons-titanic-story/",
        linkLabel: "Discover Southampton’s Titanic Story",
      },
    ],
  },
  {
    value: "culture",
    label: "Culture & evenings",
    places: [
      {
        name: "Tudor House & Garden",
        category: "Centuries behind one door",
        description:
          "Step inside the Old Town’s timber-framed Tudor House to explore the lives of people who helped shape Southampton. Beyond the house, a recreated Tudor knot garden and the remains of the Norman building known as King John’s Palace add another layer to the visit. It is a lovely invitation to slow down and look beyond the façade.",
        tip: "Pair the house and garden with a wander through the surrounding Old Town.",
        href: "https://tudorhouseandgarden.com/",
        linkLabel: "Plan a visit to Tudor House",
      },
      {
        name: "Southampton City Art Gallery",
        category: "Make space for something beautiful",
        description:
          "Move from Renaissance art to contemporary work in Southampton’s civic gallery, whose collection is particularly strong in twentieth-century British art. A changing programme gives you a reason to look beyond the familiar and discover something unexpected. Leave a little room in your itinerary for a painting, sculpture or exhibition that makes you want to stay longer.",
        tip: "Browse the current exhibitions before choosing a relaxed gallery afternoon.",
        href: "https://southamptoncityartgallery.com/whats-on/",
        linkLabel: "See what is on at the gallery",
      },
      {
        name: "Mayflower Theatre",
        category: "An evening to dress up for",
        description:
          "Make the performance the occasion. Mayflower Theatre’s programme spans touring musicals, dance, opera, drama and more, giving a city break a memorable centrepiece. Its grand auditorium adds to the sense of a proper night out. Choose your show, book your seats and build an unhurried dinner around the evening you have been looking forward to.",
        tip: "Check the theatre programme early if you are travelling for a particular show.",
        href: "https://www.mayflower.org.uk/",
        linkLabel: "Find your evening at Mayflower",
      },
    ],
  },
  {
    value: "slow-days",
    label: "Shops & green spaces",
    places: [
      {
        name: "Westquay",
        category: "A little browsing. A long lunch.",
        description:
          "Keep the day open for shopping, a coffee stop and the pleasure of choosing where to eat next. Westquay brings a broad mix of shops and restaurants into the city centre, with dining around its outdoor Esplanade. It is an easy ingredient in a Southampton break, whether you have a full afternoon or simply dinner in mind.",
        tip: "Look through the dining directory and make lunch part of the plan.",
        href: "https://www.westquay.co.uk/eat-and-drink",
        linkLabel: "Explore Westquay dining",
      },
      {
        name: "Southampton Common",
        category: "Room to breathe",
        description:
          "Trade the city streets for woodland, grassland, ponds and lakes at Southampton Common. This much-loved green space offers a different rhythm to a stay: a morning walk, a quiet pause or an afternoon with no particular agenda. Bring a little curiosity, follow a path and enjoy having both urban life and open space in the same city.",
        tip: "Leave a morning unscheduled and let the weather choose the pace.",
        href: "https://www.southampton.gov.uk/culture-leisure-tourism/parks-open-spaces/find-a-park/by-area/freemantle-shirley/southampton-common/",
        linkLabel: "Discover Southampton Common",
      },
    ],
  },
];

export const destinationReasons = [
  {
    title: "A city with a story",
    text: "Medieval walls, Tudor rooms and the human stories behind Titanic give Southampton real depth. Add an art gallery afternoon or a theatre evening and a short break becomes more than a change of scenery: it becomes a collection of moments worth remembering.",
  },
  {
    title: "Evenings by the water",
    text: "Southampton’s maritime identity is part of its everyday appeal. Make Ocean Village the setting for a marina-side meal, choose a film at Harbour Lights or explore the dining at Westquay. There is room here for both a full itinerary and a very slow evening.",
  },
  {
    title: "One base, more possibilities",
    text: "Stay for the city, then widen the picture. Rail connections open up days in the New Forest and Winchester, while ferries put the Isle of Wight within reach. Add time before or after a cruise, and the journey itself becomes part of your break.",
  },
];

export const escapeDestinations = [
  {
    icon: "trees" as const,
    tag: "Countryside",
    name: "The New Forest",
    description:
      "Ancient woodland, open heathland and free-roaming ponies give the New Forest its distinctive character. Take the train from Southampton Central to Brockenhurst and plan a day around walking, village stops or simply a slower pace. Southampton makes it possible to weave a countryside chapter into a city stay, without having to choose just one kind of escape.",
    href: "https://www.thenewforest.co.uk/visitor-info/travel-to-the-new-forest/",
    linkLabel: "Plan your New Forest day",
  },
  {
    icon: "landmark" as const,
    tag: "History",
    name: "Winchester",
    description:
      "Make time for another side of Hampshire in Winchester. Its cathedral, historic streets and independent places to browse invite a day of gentle exploring, with the Great Hall and its famous Round Table adding another story to discover. Go for the history, leave space for lunch, and enjoy returning to Southampton with a different sense of the county.",
    href: "https://www.visitwinchester.co.uk/blog/an-itinerary-for-a-great-day-out-in-winchester",
    linkLabel: "Find your Winchester inspiration",
  },
  {
    icon: "waves" as const,
    tag: "Island time",
    name: "The Isle of Wight",
    description:
      "Start your island day on the water. Red Funnel’s Red Jet connects Southampton with West Cowes, where you can begin with the harbour-town atmosphere or plan onward travel to see more of the Isle of Wight. Coastal scenery, independent towns and a fresh perspective make a compelling reason to add another day to your Southampton stay.",
    href: "https://www.redfunnel.co.uk/isle-of-wight-ferry/routes/southampton-to-west-cowes",
    linkLabel: "Explore the crossing to West Cowes",
  },
];

export const itineraries = [
  {
    value: "weekend",
    label: "The city weekend",
    duration: "A two-night idea",
    title: "Arrive curious. Leave with stories.",
    description:
      "A little heritage, a little waterfront atmosphere and an evening made for going out. Give Southampton a whole weekend and let the best moments find their own pace.",
    stops: [
      {
        moment: "Friday evening",
        title: "Ease into the city",
        text: "Settle into your stay, then make Ocean Village the setting for dinner and a first taste of Southampton’s maritime character.",
      },
      {
        moment: "Saturday",
        title: "Follow the stories",
        text: "Explore the Old Town’s walls and Tudor House, pause for lunch, then make an evening of a performance at Mayflower Theatre.",
      },
      {
        moment: "Sunday",
        title: "Keep one more discovery",
        text: "Choose SeaCity Museum for a deeper connection to the city, or take an unhurried walk on the Common before heading home.",
      },
    ],
  },
  {
    value: "cruise",
    label: "Before your cruise",
    duration: "A one- or two-night idea",
    title: "Let the holiday begin on land.",
    description:
      "Give Southampton a place in the trip, with time to discover the city around your sailing. A little breathing room can make the beginning or end of a cruise feel like a break of its own.",
    stops: [
      {
        moment: "Arrival day",
        title: "Make room to arrive",
        text: "Allow time to settle in, have an easy meal and enjoy an evening in the city before the next part of your journey.",
      },
      {
        moment: "A day to explore",
        title: "Meet the maritime city",
        text: "Visit SeaCity Museum or follow the Old Town walls, then spend a leisurely evening beside the boats at Ocean Village.",
      },
      {
        moment: "Sailing day",
        title: "Continue your adventure",
        text: "Follow your cruise line’s terminal and embarkation instructions, and arrange your onward journey with time for the day’s travel conditions.",
      },
    ],
  },
  {
    value: "city-country",
    label: "City, coast & country",
    duration: "A three- or four-night idea",
    title: "A change of scene, every day.",
    description:
      "Build a longer break around variety. Southampton’s culture and waterfront can sit alongside a forest day or an island adventure, with one city as the starting point.",
    stops: [
      {
        moment: "Your city day",
        title: "Find your Southampton",
        text: "Choose a gallery or museum, browse Westquay, then settle on an evening of waterfront dining or a show.",
      },
      {
        moment: "Your forest day",
        title: "Take a greener direction",
        text: "Travel to Brockenhurst and follow a planned New Forest walk, with time to enjoy the village and countryside along the way.",
      },
      {
        moment: "Your final chapter",
        title: "Follow the water or the history",
        text: "Cross to West Cowes for an Isle of Wight day, or head to Winchester for cathedral history and a leisurely wander.",
      },
    ],
  },
];
