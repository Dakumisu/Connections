export const Store = {
   sizes: {
      width: window.innerWidth,
      height: window.innerHeight
   },
   mobile: false,
   list: {
      themes: [
         "animal",
         "art",
         "bookType",
         "design",
         "event",
         "food",
         "game",
         "movieType",
         "music",
         "socialNetwork",
         "sport"
      ],
      themesName: {
         "animal": "Animal",
         "art": "Art",
         "bookType": "Book type",
         "design": "Design",
         "event": "Event",
         "food": "Food",
         "game": "Game",
         "movieType": "Movie type",
         "music": "Music",
         "socialNetwork": "Social network",
         "sport": "Sport"
      },
      themesChilds: {
         animal: [
            "Dog",
            "Cat",
            "Turtle",
         ],
         art: [
            "Abstract",
            "Pop Art",
            "Romanticism",
            "Surrealism",
            "Impressionism",
         ],
         bookType: [
            "Poetry",
            "Novel",
            "Essay",
            "Comics",
            "Manga",
            "Biography",
            "Documentary",
         ],
         design: [
            "2D",
            "3D",
         ],
         event: [
            "Concert",
            "Cinema",
            "Art exhibition",
            "Theater",
         ],
         food: [
            "Asian",
            "Italian",
            "French",
            "Indian",
            "Fast-Food",
         ],
         game: [
            "RPG",
            "MMO",
            "FPS",
            "MOBA",
            "Strategy",
            "Fighting game",
            "Simulation",
         ],
         movieType: [
            "Action",
            "Thriller",
            "SF",
            "Fantastique",
            "Animation",
            "Comedy",
            "Horror",
         ],
         music: [
            "Classical",
            "Rap",
            "Rock",
            "Electro",
            "Jazz",
            "Pop",
         ],
         socialNetwork: [
            "Twitter",
            "Facebook",
            "Instagram",
            "Snapchat",
            "Tiktok",
         ],
         sport: [
            "Foot",
            "Basket",
            "Rugby",
            "Swimming",
            "Tennis",
         ]
      },
      checkThemesChilds: {
         animal: {
            "Dog": "A",
            "Cat": "B",
            "Turtle": "C",
            "Nothing": "D",
         },
         art: {
            "Abstract": "A",
            "Pop Art": "B",
            "Romanticism": "C",
            "Surrealism": "D",
            "Impressionism": "E",
            "Nothing": "F",
         },
         bookType: {
            "Poetry": "A",
            "Novel": "B",
            "Essay": "C",
            "Comics": "D",
            "Manga": "E",
            "Biography": "F",
            "Documentary": "G",
            "Nothing": "H"
         },
         design: {
            "2D": "A",
            "3D": "B",
            "Nothing": "C"
         },
         event: {
            "Concert": "A",
            "Cinema": "B",
            "Art exhibition": "C",
            "Theater": "D",
            "Nothing": "E"
         },
         food: {
            "Asian": "A",
            "Italian": "B",
            "French": "C",
            "Indian": "D",
            "Fast-Food": "E",
            "Nothing": "F"
         },
         game: {
            "RPG": "A",
            "MMO": "B",
            "FPS": "C",
            "MOBA": "D",
            "Strategy": "E",
            "Fighting game": "F",
            "Simulation": "G",
            "Nothing": "H"
         },
         movieType: {
            "Action": "A",
            "Thriller": "B",
            "SF": "C",
            "Fantastique": "D",
            "Animation": "E",
            "Comedy": "F",
            "Horror": "G",
            "Nothing": "H"
         },
         music: {
            "Classical": "A",
            "Rap": "B",
            "Rock": "C",
            "Electro": "D",
            "Jazz": "E",
            "Pop": "F",
            "Nothing": "G"
         },
         socialNetwork: {
            "Twitter": "A",
            "Facebook": "B",
            "Instagram": "C",
            "Snapchat": "D",
            "Tiktok": "E",
            "Nothing": "F"
         },
         sport: {
            "Foot": "A",
            "Basket": "B",
            "Rugby": "C",
            "Swimming": "D",
            "Tennis": "E",
            "Nothing": "F"
         }
      }
   },
   themes: {
      animal: {
         position: null,
         childs: {}
      },
      art: {
         position: null,
         childs: {}
      },
      food: {
         position: null,
         childs: {}
      },
      design: {
         position: null,
         childs: {}
      },
      movieType: {
         position: null,
         childs: {}
      },
      bookType: {
         position: null,
         childs: {}
      },
      game: {
         position: null,
         childs: {}
      },
      music: {
         position: null,
         childs: {}
      },
      socialNetwork: {
         position: null,
         childs: {}
      },
      sport: {
         position: null,
         childs: {}
      },
      event: {
         position: null,
         childs: {}
      }
   },
   users: null,
   colors: {
      goodMatch: '#82A5FF',
      badMatch: '#AA2626',
      default: '#CB98FF',
   },
   alpha: {
      goodMatch: 1.,
      badMatch: .85,
      default: 1.,
   },
   views: {
      preloader: 'preloader',
      home: 'home',
      about: 'about',
      exp: 'exp',
      userInfos: 'userInfos',
      themeInfos: 'themeInfos'
   },
   nodes: null
}
