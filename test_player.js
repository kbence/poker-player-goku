var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
var suits = ['diamonds', 'hearts', 'clubs', 'spades'];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomCard() {
  return {
    rank: pick(ranks),
    suit: pick(suits)
  }
}

function randomCommunityCards() {
  var commCards = [];
  var rnd = Math.random();

  if (rnd > 0.5) {
    commCards.push(randomCard());
    commCards.push(randomCard());
    commCards.push(randomCard());
  }

  if (rnd > 0.6) {
    commCards.push(randomCard());
  }

  if (rnd > 0.8) {
    commCards.push(randomCard());
  }

  return commCards;
}

function randomStatus() {
  pick(['active', 'out']);
}

function generateGameState() {
  return {
    "players":[
      {
        "name":"Player 1",
        "stack":Math.floor(Math.random() * 1000),
        "status":"active",
        "bet":0,
        "hole_cards":[randomCard(), randomCard()],
        "version":"Version name 1",
        "id":0
      },
      {
        "name":"Player 2",
        "stack":1000,
        "status":"active",
        "bet":0,
        "hole_cards":[],
        "version":"Version name 2",
        "id":1
      },
      {
        "name":"Player 3",
        "stack":1000,
        "status":"active",
        "bet":0,
        "hole_cards":[],
        "version":"Version name 2",
        "id":1
      },
      {
        "name":"Player 4",
        "stack":1000,
        "status":randomStatus(),
        "bet":0,
        "hole_cards":[],
        "version":"Version name 2",
        "id":1
      }
    ],
    "tournament_id":"550d1d68cd7bd10003000003",
    "game_id":"550da1cb2d909006e90004b1",
    "round":0,
    "bet_index":0,
    "small_blind":10,
    "orbits":0,
    "dealer":0,
    "minimum_raise": 5,
    "community_cards": randomCommunityCards(),
    "current_buy_in":50,
    "in_action": 0,
    "pot":70
  }
}

console.log(JSON.stringify(generateGameState()));
