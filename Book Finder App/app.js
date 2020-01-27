//DOM Queries
const searchForm = document.querySelector('.search-form');
const booksList = document.querySelector('.books-list');

//Class instances
const book = new Book();

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  if (e.target.tagName === 'BUTTON' || 'I') {
    let searchTerm = e.target.searchText.value.trim();

    fetchBookData();

    book.fetchData(searchTerm)
      .then(data => {
        if(data.totalItems != 0) {
          let { items } = data;
            if(items !== undefined) {
              items.forEach(item => {
                book.renderData(item);
              })
          }
        }
      })
      .catch(err => {
        console.log("Error ::", err);
    });

    searchForm.reset();
  }
})

fetchBookData = () => {
  let { items } = demoData;

  console.log(items);

  // data.forEach(item  => {
  //   renderData(item);
  // })
}

const demoData = {
  "kind": "books#volumes",
  "totalItems": 2418,
  "items": [{
      "kind": "books#volume",
      "id": "8yg41Q0nQw4C",
      "etag": "GVEHG4+4dTU",
      "selfLink": "https://www.googleapis.com/books/v1/volumes/8yg41Q0nQw4C",
      "volumeInfo": {
        "title": "The Case-Book of Sherlock Holmes",
        "authors": [
          "Arthur Conan Doyle"
        ],
        "publisher": "House of Stratus",
        "publishedDate": "2011-12-11",
        "description": "This intriguing collection of Sherlock Holmes cases contains 'Shoscombe Old Place' - the last story Conan Doyle ever wrote. Grappling with treachery and ingenious crimes of all kinds, Holmes' dazzling powers of logic are as sharp as ever - no case is too challenging, no mystery too dense for the sleuth's logic and legendary powers of deduction.",
        "industryIdentifiers": [{
            "type": "ISBN_13",
            "identifier": "9780755106479"
          },
          {
            "type": "ISBN_10",
            "identifier": "0755106474"
          }
        ],
        "readingModes": {
          "text": true,
          "image": true
        },
        "pageCount": 294,
        "printType": "BOOK",
        "categories": [
          "Fiction"
        ],
        "averageRating": 3.5,
        "ratingsCount": 18,
        "maturityRating": "NOT_MATURE",
        "allowAnonLogging": false,
        "contentVersion": "1.0.2.0.preview.3",
        "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=8yg41Q0nQw4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=8yg41Q0nQw4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        "language": "en",
        "previewLink": "http://books.google.co.in/books?id=8yg41Q0nQw4C&printsec=frontcover&dq=sherlock+holmes&hl=&cd=1&source=gbs_api",
        "infoLink": "http://books.google.co.in/books?id=8yg41Q0nQw4C&dq=sherlock+holmes&hl=&source=gbs_api",
        "canonicalVolumeLink": "https://books.google.com/books/about/The_Case_Book_of_Sherlock_Holmes.html?hl=&id=8yg41Q0nQw4C"
      },
      "saleInfo": {
        "country": "IN",
        "saleability": "NOT_FOR_SALE",
        "isEbook": false
      },
      "accessInfo": {
        "country": "IN",
        "viewability": "PARTIAL",
        "embeddable": true,
        "publicDomain": false,
        "textToSpeechPermission": "ALLOWED",
        "epub": {
          "isAvailable": true,
          "acsTokenLink": "http://books.google.co.in/books/download/The_Case_Book_of_Sherlock_Holmes-sample-epub.acsm?id=8yg41Q0nQw4C&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        "pdf": {
          "isAvailable": false
        },
        "webReaderLink": "http://play.google.com/books/reader?id=8yg41Q0nQw4C&hl=&printsec=frontcover&source=gbs_api",
        "accessViewStatus": "SAMPLE",
        "quoteSharingAllowed": false
      },
      "searchInfo": {
        "textSnippet": "This intriguing collection of Sherlock Holmes cases contains &#39;Shoscombe Old Place&#39; - the last story Conan Doyle ever wrote."
      }
    },
    {
      "kind": "books#volume",
      "id": "aJ6x0U4kndgC",
      "etag": "KhBgfo0ZXOc",
      "selfLink": "https://www.googleapis.com/books/v1/volumes/aJ6x0U4kndgC",
      "volumeInfo": {
        "title": "The Penguin Complete Sherlock Holmes",
        "authors": [
          "Arthur Conan Doyle"
        ],
        "publisher": "Penguin UK",
        "publishedDate": "2009-11-05",
        "description": "Sherlock Holmes is not only the most famous character in crime fiction, but arguably the most famous character in all fiction. In sixty adventures that pit his extraordinary wits and courage against foreign spies, blackmailers, cultists, petty thieves, murderers, swindlers, policemen (both stupid and clever), and his arch-nemesis Moriarty, Sherlock Holmes, together with his faithful sidekick Doctor John H. Watson, proves himself to be not only the quintessential detective but also the most engaging and entertaining company any reader could ask for. This beautiful new edition contains a new foreword by Ruth Rendell",
        "industryIdentifiers": [{
            "type": "ISBN_13",
            "identifier": "9780141931814"
          },
          {
            "type": "ISBN_10",
            "identifier": "0141931817"
          }
        ],
        "readingModes": {
          "text": true,
          "image": false
        },
        "pageCount": 1136,
        "printType": "BOOK",
        "categories": [
          "Fiction"
        ],
        "maturityRating": "NOT_MATURE",
        "allowAnonLogging": true,
        "contentVersion": "1.14.10.0.preview.2",
        "panelizationSummary": {
          "containsEpubBubbles": false,
          "containsImageBubbles": false
        },
        "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=aJ6x0U4kndgC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=aJ6x0U4kndgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        "language": "en",
        "previewLink": "http://books.google.co.in/books?id=aJ6x0U4kndgC&printsec=frontcover&dq=sherlock+holmes&hl=&cd=2&source=gbs_api",
        "infoLink": "https://play.google.com/store/books/details?id=aJ6x0U4kndgC&source=gbs_api",
        "canonicalVolumeLink": "https://play.google.com/store/books/details?id=aJ6x0U4kndgC"
      },
      "saleInfo": {
        "country": "IN",
        "saleability": "FOR_SALE",
        "isEbook": true,
        "listPrice": {
          "amount": 1001.82,
          "currencyCode": "INR"
        },
        "retailPrice": {
          "amount": 500.91,
          "currencyCode": "INR"
        },
        "buyLink": "https://play.google.com/store/books/details?id=aJ6x0U4kndgC&rdid=book-aJ6x0U4kndgC&rdot=1&source=gbs_api",
        "offers": [{
          "finskyOfferType": 1,
          "listPrice": {
            "amountInMicros": 1001820000,
            "currencyCode": "INR"
          },
          "retailPrice": {
            "amountInMicros": 500910000,
            "currencyCode": "INR"
          }
        }]
      },
      "accessInfo": {
        "country": "IN",
        "viewability": "PARTIAL",
        "embeddable": true,
        "publicDomain": false,
        "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
        "epub": {
          "isAvailable": true,
          "acsTokenLink": "http://books.google.co.in/books/download/The_Penguin_Complete_Sherlock_Holmes-sample-epub.acsm?id=aJ6x0U4kndgC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        "pdf": {
          "isAvailable": false
        },
        "webReaderLink": "http://play.google.com/books/reader?id=aJ6x0U4kndgC&hl=&printsec=frontcover&source=gbs_api",
        "accessViewStatus": "SAMPLE",
        "quoteSharingAllowed": false
      },
      "searchInfo": {
        "textSnippet": "This beautiful new edition contains a new foreword by Ruth Rendell"
      }
    },
    
    {
      "kind": "books#volume",
      "id": "8FFoAwAAQBAJ",
      "etag": "uw+9g4A1/Gg",
      "selfLink": "https://www.googleapis.com/books/v1/volumes/8FFoAwAAQBAJ",
      "volumeInfo": {
        "title": "The Adventures of Sherlock Holmes",
        "authors": [
          "Arthur Conan Doyle"
        ],
        "publisher": "BookRix",
        "publishedDate": "2018-10-17",
        "description": "The Adventures of Sherlock Holmes is a collection of twelve stories by Arthur Conan Doyle, featuring his famous detective. These are the first of the Sherlock Holmes short stories, originally published as single stories in the Strand Magazine. The 12 stories in this collection are: \"A Scandal in Bohemia\"; Client: The King of Bohemia \"The Adventure of the Red-Headed League\"; Client: Jabez Wilson \"A Case of Identity\"; Client: Mary Sutherland \"The Boscombe Valley Mystery\"; Client: Alice Turner \"The Five Orange Pips\"; Client: John Openshaw \"The Man with the Twisted Lip\"; Client: Mrs. St. Clair \"The Adventure of the Blue Carbuncle\"; No client. \"The Adventure of the Speckled Band\"; Client: Miss Helen Stoner \"The Adventure of the Engineer's Thumb\"; Client: Victor Hatherley \"The Adventure of the Noble Bachelor\"; Client: Lord Robert St. Simon \"The Adventure of the Beryl Coronet\"; Client: Alexander Holder \"The Adventure of the Copper Beeches\"; Client: Violet Hunter",
        "industryIdentifiers": [{
            "type": "ISBN_13",
            "identifier": "9783736800182"
          },
          {
            "type": "ISBN_10",
            "identifier": "3736800185"
          }
        ],
        "readingModes": {
          "text": true,
          "image": true
        },
        "pageCount": 420,
        "printType": "BOOK",
        "categories": [
          "Fiction"
        ],
        "averageRating": 4,
        "ratingsCount": 95,
        "maturityRating": "NOT_MATURE",
        "allowAnonLogging": true,
        "contentVersion": "1.17.13.0.preview.3",
        "panelizationSummary": {
          "containsEpubBubbles": false,
          "containsImageBubbles": false
        },
        "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=8FFoAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=8FFoAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        "language": "en",
        "previewLink": "http://books.google.co.in/books?id=8FFoAwAAQBAJ&printsec=frontcover&dq=sherlock+holmes&hl=&cd=3&source=gbs_api",
        "infoLink": "https://play.google.com/store/books/details?id=8FFoAwAAQBAJ&source=gbs_api",
        "canonicalVolumeLink": "https://play.google.com/store/books/details?id=8FFoAwAAQBAJ"
      },
      "saleInfo": {
        "country": "IN",
        "saleability": "FOR_SALE",
        "isEbook": true,
        "listPrice": {
          "amount": 78.63,
          "currencyCode": "INR"
        },
        "retailPrice": {
          "amount": 78.63,
          "currencyCode": "INR"
        },
        "buyLink": "https://play.google.com/store/books/details?id=8FFoAwAAQBAJ&rdid=book-8FFoAwAAQBAJ&rdot=1&source=gbs_api",
        "offers": [{
          "finskyOfferType": 1,
          "listPrice": {
            "amountInMicros": 78630000,
            "currencyCode": "INR"
          },
          "retailPrice": {
            "amountInMicros": 78630000,
            "currencyCode": "INR"
          }
        }]
      },
      "accessInfo": {
        "country": "IN",
        "viewability": "PARTIAL",
        "embeddable": true,
        "publicDomain": false,
        "textToSpeechPermission": "ALLOWED",
        "epub": {
          "isAvailable": true,
          "acsTokenLink": "http://books.google.co.in/books/download/The_Adventures_of_Sherlock_Holmes-sample-epub.acsm?id=8FFoAwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        "pdf": {
          "isAvailable": true,
          "acsTokenLink": "http://books.google.co.in/books/download/The_Adventures_of_Sherlock_Holmes-sample-pdf.acsm?id=8FFoAwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        "webReaderLink": "http://play.google.com/books/reader?id=8FFoAwAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
        "accessViewStatus": "SAMPLE",
        "quoteSharingAllowed": false
      },
      "searchInfo": {
        "textSnippet": "These are the first of the Sherlock Holmes short stories, originally published as single stories in the Strand Magazine."
      }
    },
    {
      "kind": "books#volume",
      "id": "aJ6x0U4kndgC",
      "etag": "KhBgfo0ZXOc",
      "selfLink": "https://www.googleapis.com/books/v1/volumes/aJ6x0U4kndgC",
      "volumeInfo": {
        "title": "The Penguin Complete Sherlock Holmes",
        "authors": [
          "Arthur Conan Doyle"
        ],
        "publisher": "Penguin UK",
        "publishedDate": "2009-11-05",
        "description": "Sherlock Holmes is not only the most famous character in crime fiction, but arguably the most famous character in all fiction. In sixty adventures that pit his extraordinary wits and courage against foreign spies, blackmailers, cultists, petty thieves, murderers, swindlers, policemen (both stupid and clever), and his arch-nemesis Moriarty, Sherlock Holmes, together with his faithful sidekick Doctor John H. Watson, proves himself to be not only the quintessential detective but also the most engaging and entertaining company any reader could ask for. This beautiful new edition contains a new foreword by Ruth Rendell",
        "industryIdentifiers": [{
            "type": "ISBN_13",
            "identifier": "9780141931814"
          },
          {
            "type": "ISBN_10",
            "identifier": "0141931817"
          }
        ],
        "readingModes": {
          "text": true,
          "image": false
        },
        "pageCount": 1136,
        "printType": "BOOK",
        "categories": [
          "Fiction"
        ],
        "maturityRating": "NOT_MATURE",
        "allowAnonLogging": true,
        "contentVersion": "1.14.10.0.preview.2",
        "panelizationSummary": {
          "containsEpubBubbles": false,
          "containsImageBubbles": false
        },
        "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=aJ6x0U4kndgC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=aJ6x0U4kndgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        "language": "en",
        "previewLink": "http://books.google.co.in/books?id=aJ6x0U4kndgC&printsec=frontcover&dq=sherlock+holmes&hl=&cd=2&source=gbs_api",
        "infoLink": "https://play.google.com/store/books/details?id=aJ6x0U4kndgC&source=gbs_api",
        "canonicalVolumeLink": "https://play.google.com/store/books/details?id=aJ6x0U4kndgC"
      },
      "saleInfo": {
        "country": "IN",
        "saleability": "FOR_SALE",
        "isEbook": true,
        "listPrice": {
          "amount": 1001.82,
          "currencyCode": "INR"
        },
        "retailPrice": {
          "amount": 500.91,
          "currencyCode": "INR"
        },
        "buyLink": "https://play.google.com/store/books/details?id=aJ6x0U4kndgC&rdid=book-aJ6x0U4kndgC&rdot=1&source=gbs_api",
        "offers": [{
          "finskyOfferType": 1,
          "listPrice": {
            "amountInMicros": 1001820000,
            "currencyCode": "INR"
          },
          "retailPrice": {
            "amountInMicros": 500910000,
            "currencyCode": "INR"
          }
        }]
      },
      "accessInfo": {
        "country": "IN",
        "viewability": "PARTIAL",
        "embeddable": true,
        "publicDomain": false,
        "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
        "epub": {
          "isAvailable": true,
          "acsTokenLink": "http://books.google.co.in/books/download/The_Penguin_Complete_Sherlock_Holmes-sample-epub.acsm?id=aJ6x0U4kndgC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
        },
        "pdf": {
          "isAvailable": false
        },
        "webReaderLink": "http://play.google.com/books/reader?id=aJ6x0U4kndgC&hl=&printsec=frontcover&source=gbs_api",
        "accessViewStatus": "SAMPLE",
        "quoteSharingAllowed": false
      },
      "searchInfo": {
        "textSnippet": "This beautiful new edition contains a new foreword by Ruth Rendell"
      }
    }
  ]
}