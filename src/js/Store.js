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
            "Chien",
            "Chat",
            "Tortue",
         ],
         art: [
            "Abstrait",
            "Pop Art",
            "Romantisme",
            "Surréalisme",
            "Impressionnisme",
         ],
         bookType: [
            "Poésie",
            "Roman",
            "Essai",
            "BD",
            "Manga",
            "Biographie",
            "Documentaire",
         ],
         design: [
            "2D",
            "3D",
         ],
         event: [
            "Concert",
            "Cinéma",
            "Expo",
            "Théâtre",
         ],
         food: [
            "Asiatique",
            "Italien",
            "Français",
            "Indien",
            "Fast-Food",
         ],
         game: [
            "RPG",
            "MMO",
            "FPS",
            "MOBA",
            "Stratégie",
            "Jeux de combat",
            "Simulation",
         ],
         movieType: [
            "Action",
            "Thriller/Policier",
            "SF",
            "Fantastique",
            "Animation",
            "Comédie",
            "Horreur",
         ],
         music: [
            "Classique",
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
            "Natation",
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
   users: null
}
