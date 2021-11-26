export const Store = {
   sizes: {
      width: window.innerWidth,
      height: window.innerHeight
   },
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
      badMatch: .5,
      default: 1.,
   },
   views: {
      preloader: 'preloader',
      home: 'home',
      about: 'about',
      exp: 'exp',
      userInfos: 'userInfos',
      themeInfos: 'themeInfos'
   }
}
