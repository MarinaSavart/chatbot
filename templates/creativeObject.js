const fakeMacro = {
  redirect: 'https://hawk-tech.io/',
  hawkClick: 'https://hawk-tech.io/?hawkClick',
  customEventMacro: 'https://format.tabmo.io/assets/fakes/1*1.png?templateCustomEvent',
  sspMacro: 'localTest',
}

const quiz = {
  initial: {
    firstquestion: 'A quelle fréquence utilisez-vous votre véhicule ?',
    children: ['jours', 'semaine', 'weekend', 'saisonniere'],
  },

  choices: {
    // 1.1
    jours: {
      event: 'jours',
      name: 'Tous les jours',
      nextQuestion: 'Quel usage principale faites-vous de votre véhicule',
      children: ['autoroute', 'quotidiens', 'mixte'],
    },
    // 1.2
    semaine: {
      event: 'semaine',
      name: '2 à 3 fois par semaine',
      nextQuestion: 'Quel usage principale faites-vous de votre véhicule',
      children: ['autoroute', 'quotidiens', 'mixte'],
    },
    // 1.3
    weekend: {
      event: 'weekend',
      name: 'Le week-end',
      nextQuestion: 'Quel usage principale faites-vous de votre véhicule',
      children: ['autoroute', 'quotidiens', 'mixte'],
    },
    // 1.4
    saisonniere: {
      event: 'saisonniere',
      name: 'De manière saisonnière',
      nextQuestion: 'Quel usage principale faites-vous de votre véhicule',
      children: ['autoroute', 'quotidiens', 'mixte'],
    },

    // 2.1
    autoroute: {
      event: 'autoroute',
      name: 'Autoroute et voies rapides',
      nextQuestion: 'Pour vous les road-trips c’est plutôt...',
      children: ['solitaire', 'wk-amoureux', 'famille'],
    },

    // 2.1 3.1
    solitaire: {
      event: 'solitaire',
      name: 'Loup solitaire',
      nextQuestion: 'Sur la base de vos réponses, nous vous recommandons la nouvelle Volkswagen ID. 4 électrique !',
      urlImage: 'https://static.tabmo.io/Test-Marina/chatbot/assets/header_3_c2.jpg',
      children: ['id4', 'concessionnaire'],
    },

    // 2.1 3.2
    'wk-amoureux': {
      event: 'wk-amoureux',
      name: 'Week-end en amoureux',
      nextQuestion: 'Sur la base de vos réponses, nous vous recommandons la nouvelle Volkswagen ID. 4 électrique !',
      urlImage: 'https://static.tabmo.io/Test-Marina/chatbot/assets/header_3_c2.jpg',
      children: ['id4', 'concessionnaire'],
    },

    // 2.1 3.3
    famille: {
      event: 'famille',
      name: 'En famille avec le chien et la belle-mère',
      nextQuestion: 'Sur la base de vos réponses, nous vous recommandons le nouveau Volkswagen ID. Buzz électrique !',
      urlImage: 'https://static.tabmo.io/Test-Marina/chatbot/assets/header_2b_a.png',
      children: ['idbuzz', 'concessionnaire'],
    },

    // 2.2
    quotidiens: {
      event: 'quotidiens',
      name: 'Trajets quotidiens en ville',
      nextQuestion: 'Pratiquez-vous le covoiturage ?',
      children: ['oui', 'non'],
    },

    // 2.2 3.1
    oui: {
      event: 'oui',
      name: 'Oui',
      nextQuestion: 'Sur la base de vos réponses, nous vous recommandons la nouvelle Volkswagen ID. 4 électrique !',
      urlImage: 'https://static.tabmo.io/Test-Marina/chatbot/assets/header_3_c2.jpg',
      children: ['id4', 'concessionnaire'],
    },

    // 2.2 3.2
    non: {
      event: 'non',
      name: 'Non',
      nextQuestion: 'Sur la base de vos réponses, nous vous recommandons la nouvelle Volkswagen ID. 3 électrique !',
      urlImage: 'https://static.tabmo.io/Test-Marina/chatbot/assets/header_2_a.png',
      children: ['id3', 'concessionnaire'],
    },

    // 2.3
    mixte: {
      event: 'mixte',
      name: 'Usage mixte',
      nextQuestion: 'Combien de passager voyagent avec vous habituellement ?',
      children: ['aucun', 'moins', 'plus'],
    },

    // 2.2 3.1
    aucun: {
      event: 'aucun',
      name: 'Aucun',
      nextQuestion: 'Sur la base de vos réponses, nous vous recommandons la nouvelle Volkswagen ID. 3 électrique !',
      urlImage: 'https://static.tabmo.io/Test-Marina/chatbot/assets/header_2_a.png',
      children: ['id3', 'concessionnaire'],
    },

    // 2.2 3.2
    moins: {
      event: 'moins',
      name: '1 à 2 passagers',
      nextQuestion: 'Sur la base de vos réponses, nous vous recommandons la nouvelle Volkswagen ID. 4 électrique !',
      urlImage: 'https://static.tabmo.io/Test-Marina/chatbot/assets/header_3_c2.jpg',
      children: ['id4', 'concessionnaire'],
    },

    // 2.1 3.3
    plus: {
      event: 'plus',
      name: '3 et plus',
      nextQuestion: 'Sur la base de vos réponses, nous vous recommandons le nouveau Volkswagen ID. Buzz électrique !',
      urlImage: 'https://static.tabmo.io/Test-Marina/chatbot/assets/header_2b_a.png',
      children: ['idbuzz', 'concessionnaire'],
    },

    id3: {
      event: 'id3',
      name: 'Je souhaite en savoir plus sur la nouvelle Volkswagen ID. 3 électrique',
      redirect: 'https://www.volkswagen.fr/fr/modeles-et-configurateur.html/__app/id-3.app',
    },

    id4: {
      event: 'id4',
      name: 'Je souhaite en savoir plus sur la nouvelle Volkswagen ID. 4 électrique',
      redirect: 'https://www.volkswagen.fr/fr/modeles-et-configurateur.html/__app/id-4.app',
    },

    idbuzz: {
      event: 'idbuzz',
      name: 'Je souhaite en savoir plus sur la nouvelle Volkswagen ID. Buzz électrique',
      redirect: 'https://www.volkswagen.fr/fr/modeles-et-configurateur/id-buzz.html',
    },

    concessionnaire: {
      event: 'concessionnaire',
      name: 'Je souhaite me rendre chez mon concessionnaire le plus proche',
      redirect: 'https://www.volkswagen.fr/fr/trouver-un-concessionnaire-volkswagen.html',
    },
  },
}

const customMacro = {
  // creativeSize: {
  //   width: 300,
  //   height: 250,
  // },

  creativeSize: {
    width: 375,
    height: 667,
  },

  // for mpu or banner
  // chatbotSize: {
  //   width: 375,
  //   height: 667,
  // },
  // previewMode: true, // Mandatory, if is file prod delete this line


  colors: {
    background: '#2e2e2e',
    backgroundContent: '#ffffff',
    loader: '#cccccc',
    backgroundContainerChatbot: '#ffffff',
  },

  assetsFolder: 'https://static.tabmo.io/Test-Marina/chatbot/assets/',
  assets: {
    preloadImg: 'MPU_VW.jpg', // if is a banner or mpu
    // backgroundChatbot: 'background.png',
  },
  
  // for load your typo
  // fonts: {
    // If you want to use the same typo for the questions and answers : use ONLY text
    // text: {
    //   url: "https://s3.eu-west-1.amazonaws.com/static.tabmo.io/fonts/AudiType/AudiType-ExtendedNormal.woff",
    //   format: 'woff' // Mandatory
    // },
  
    // Otherwise use that :
    // question: {
    //   url: "https://s3.eu-west-1.amazonaws.com/static.tabmo.io/fonts/AudiType/AudiType-ExtendedNormal.woff",
    //   format: 'woff' // Mandatory
    // },
    // response: {
    //   url: "https://static.tabmo.io/creatives/2023-q2/may/henkel/assets/arial-black.woff",
    //   format: 'woff' // Mandatory
    // },
  // },


  chatbot: {
    // width: 50, // Optional, default 100
    // height: 56, // Optional, default 56
    // top: 10, // Optional, default 0
    // right: 10, // Optional, default 0
    // bottom: 10, // Optional, default 0
    // left: 10, // Optional, default 0
    // paddingTop: 0, // Optional, default 2
    // paddingBottom: 0, // Optional, default 4
    // paddingLeft: 0, // Optional, default 2
    // paddingRight: 0, // Optional, default 4
  },

  // containerChatbot: {
  //   width: 100,
  //   height: 34,
  //   top: 35,
  //   //   bottom: 0,
  //   left: 0,
  //   //   right: 0,
  // },

  header: {
    url: 'https://static.tabmo.io/Test-Marina/chatbot/assets/header_1.png',
    // width: 100, // Optional, default 100
    // height: 34, // Optional, default auto
    // widthImg: 100, // Optional, default auto
    // heightImg: 100, // Optional, default auto
    // top: 10, // Optional, default 0
    // right: 10, // Optional, default 0
    // bottom: 10, // Optional, default 0
    // left: 10, // Optional, default 0
    // paddingTop: 10, // Optional, default 0
    // paddingBottom: 10, // Optional, default 0
    // paddingLeft: 10, // Optional, default 0
    // paddingRight: 10, // Optional, default 0
  },

  // footer: {
  // url: ' https://static.tabmo.io/Test-Marina/chatbot/assets/footer.png',
  // width: 100, // Optional, default 100
  // height: 34, // Optional, default auto
  // widthImg: 100, // Optional, default auto
  // heightImg: 100, // Optional, default auto
  // top: 10, // Optional, default 0
  // right: 10, // Optional, default 0
  // bottom: 10, // Optional, default 0
  // left: 10, // Optional, default 0
  // paddingTop: 10, // Optional, default 0
  // paddingBottom: 10, // Optional, default 0
  // paddingLeft: 10, // Optional, default 0
  // paddingRight: 10, // Optional, default 0
  // },

  dots: {
    dotSize: 6, // Optional, default 6
    dotColor: '#fff', // Optional, default white
  },

  question: {
    // paddingTop: 3, // Optional, default 3%
    // paddingBottom: 3, // Optional, default 3%
    // paddingRight: 6, // Optional, default 6%
    // paddingLeft: 6, // Optional, default 6%
    // borderRadiusBottomLeft: 0, // Optional, default 0
    // borderRadiusBottomRight: 19, // Optional, default 19
    // borderRadiusTopLeft: 19, // Optional, default 19
    // borderRadiusTopRight: 19, // Optional, default 19
    backgroundColor: '#024d82', // Mandatory, default #024d82
    color: '#fff', // Mandatory, default #fff
  },

  response: {
    color: '#024d82', // Mandatory, default #024d82
    backgroundColor: '#fff', // Mandatory, default #fff
    borderColor: '#024d82', // Mandatory, default #024d82
    // borderRadiusBottomLeft: 19, // Optional, default 19
    // borderRadiusBottomRight: 0, // Optional, default 0
    // borderRadiusTopLeft: 19, // Optional, default 19
    // borderRadiusTopRight: 19, // Optional, default 19
    // paddingTop: 2, // Optional, default 2%
    // paddingBottom: 2, // Optional, default 2%
    // paddingRight: 4, // Optional, default 4%
    // paddingLeft: 4, // Optional, default 4%
  },

  reponseSelected: {
    color: '#fff', // Mandatory, default #fff
    backgroundColor: '#b9b9b9', // Mandatory, default #b9b9b9
    borderColor: '#b9b9b9', // Mandatory, default #b9b9b9
  },

  text: {
    // fontFamily: 'regular',
    fontWeight: 100, // Optional, default 100
    fontSize: 0.85, // Optional, default 0.85em
  },

  quiz,

  hawkFooter: {
    background: '#003a70', // optional, background color, default "#0ea6ac"
    color: '#ffffff', // optional, background color, default "#ffffff"
    // width: 20, // optional, logo width, default "30" for "30%"
  },

  // debug: false, // Display log in console and other debug information : true or false, default false
  // logs: 'all', // Display log in overlay above the creative : true, false or all, default false
}

const previewMacro = {
  ...customMacro,
  ...fakeMacro,
}

const prodMacro = {
  ...customMacro,
}

module.exports = { previewMacro, prodMacro }
