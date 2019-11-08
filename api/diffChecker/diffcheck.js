const isEqual = require('lodash.isequal');

var x = {
    name: "Counter-Strike: Global Offensive",
    genre: "FPS",
    additional: {
        release_date: "2012-08-21"
    },
    platform: [
        "Windows",
        "Mac OS X",
        "Linux"
    ],
    reviews: {
        positive: 595113,
        negative: 31958
    }
    
};

var y = {
    
    additional: {
        release_date: "2012-08-21"
    },
    name: "Counter-Strike: Global Offensive",
    reviews: {
        negative: 31958,
        positive: 595113,

    },
    genre: "FPS",
   
    platform: [
        "Windows",
        "Mac OS X",
        "Linux"
    ]
    
}

console.log(isEqual(x,y));