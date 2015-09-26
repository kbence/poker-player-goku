log = console.error;

function cardValue(card) {
  return 2 + ('234567891JQKA'.indexOf(card.rank.charAt(0)));
}

function cardIndex(card) {
  return ('AKQJ198765432'.indexOf(card.rank.charAt(0)));
}

function rankHand(game_state) {
  var cards = [].concat(game_state.players[game_state.in_action].hole_cards, game_state.community_cards);

  cardsByRank = groupBy(cards, 'rank');
  cardsBySuit = groupBy(cards, 'suit');

  for (var rank in cardsByRank) {
    if (cardsByRank[rank].length == 3) {
      return 'three';
    }

    if (cardsByRank[rank].length == 2) {
      return 'pair';
    }

    if (cardsByRank[rank].length == 4) {
      return 'poker';
    }
  }

  return null;
}

function groupBy(list, key) {
  return list.reduce(function(prev, cur) {
    if (prev.hasOwnProperty(cur[key])) {
      prev[cur[key]].push(cur);
    } else {
      prev[cur[key]] = [cur];
    }

    return prev;
  }, {});
}



module.exports = {

  VERSION: "Goku JS - Super Saiyan God Super Saiyan (Kamehameha version) with Picolo",

  bet_request: function(game_state) {
    var player = game_state.players[game_state.in_action];
    var cards = player.hole_cards;
    var post_flop = game_state.community_cards.length > 0;

    var all_in = player.stack;

    var new_strategy = Math.random() < 0.5;
    var ferki_out = game_state.players[3].status != 'active';
    var juci_out = game_state.players[2].status != 'active';

    if (ferki_out && !juci_out) {
      new_strategy = false;
    }
    if (!ferki_out && juci_out) {
      new_strategy = true;
    }

    var in_game = 0;
    for(var i = 1; i < 4; i++){
      in_game += game_state.players[2].status != 'active' ? 0 : 1;
    }
    var in_heads_up = in_game < 2;
    var short_stack = (player.stack + player.bet) < 2000;


    if (new_strategy) {
      if (!post_flop) {
        var suited = cards[0].suit == cards[1].suit;
        var same_rank = cards[0].rank == cards[1].rank;
        var min_rank = Math.min(cardIndex(cards[0]), cardIndex(cards[1]));
        var max_rank = Math.max(cardIndex(cards[0]), cardIndex(cards[1]));
        var data = [
            [20, 20  , 20  , 20  , 20  , 20  , 20  , 20  , 20  , 20  , 20  , 20  , 20  ],
            [20, 20  , 20  , 20  , 20  , 20  , 20  , 20  , 20  , 20  , 20  , 19.9, 19.3],
            [20, 20  , 20  , 20  , 20  , 20  , 20  , 20  , 20  , 20  , 16.3, 13.5, 12.7],
            [20, 20  , 20  , 20  , 20  , 20  , 20  , 20  , 18.6, 14.7, 13.5, 10.6, 8.5 ],
            [20, 20  , 20  , 20  , 20  , 20  , 20  , 20  , 20  , 11.9, 10.5, 7.7 , 6.5 ],
            [20, 20  , 20  , 20  , 20  , 20  , 20  , 20  , 20  , 14.4, 6.9 , 4.9 , 3.7 ],
            [20, 18.0, 13.0, 13.3, 17.5, 20  , 20  , 20  , 20  , 18.8, 10.1, 2.7 , 2.5 ],
            [20, 16.1, 10.3, 8.5 , 9.0 , 10.8, 14.7, 20  , 20  , 20  , 13.9, 2.5 , 2.1 ],
            [20, 15.1, 9.6 , 6.5 , 5.7 , 5.2 , 7.0 , 10.7, 20  , 20  , 16.3, 2.3 , 2.0 ],
            [20, 14.2, 8.9 , 6.0 , 4.1 , 3.5 , 3.0 , 2.6 , 2.4 , 20  , 20  , 2.4 , 2.0,],
            [20, 13.1, 7.9 , 5.4 , 3.8 , 2.7 , 2.3 , 2.1 , 2.0 , 2.1 , 20  , 2.2 , 1.8 ],
            [20, 12.2, 7.5 , 5.0 , 3.4 , 2.5 , 1.9 , 1.8 , 1.7 , 1.8 , 1.6 , 20  , 1.7 ],
            [20, 11.6, 7.0 , 4.6 , 2.9 , 2.2 , 1.8 , 1.6 , 1.5 , 1.5 , 1.4 , 1.4 ,20   ]
        ];

        var mult = 0;

        if (suited) {
          mult = data[max_rank][min_rank];
        } else {
          mult = data[min_rank][max_rank];
        }

        result = Math.floor(mult * game_state.small_blind);

        if (!in_heads_up && !short_stack) {
          return result / 3;
        }
        return result;
      } else {
        var hand = rankHand(game_state);
        var multipliers = {
          pair: 20,
          three: 30,
          poker: 100,
          max: 100
        }

        if (hand) {
          result = Math.floor(
            Math.max(
              game_state.current_buy_in - player.bet + game_state.minimum_raise,
              multipliers[hand] * player.stack / multipliers.max
            )
          );

          if (!in_heads_up && !short_stack) {
            return result / 3;
          }
          return result;
        }
      }
    } else {
      if (!in_heads_up && !short_stack) { return 0; }

      if ('AK'.indexOf(cards[0].rank) != -1 && 'AK'.indexOf(cards[1].rank) != -1) {
        return all_in;
      }

      if (cards[0].rank == cards[1].rank) {
        return all_in;
      }

      if (cards[0].suit == cards[1].suit &&
          Math.abs(cardValue(cards[0]) - cardValue(cards[1])) == 1)
      {
        return all_in;
      }

      if ((game_state.in_action + 2) % 4 == player.dealer &&
          (game_state.pot < 8 * game_state.small_blind || game_state.pot < 300))
      {
        return all_in;
      }

      if (Math.random() < 0.1) {
        return all_in;
      }
    }

    return 0;
  },

  showdown: function(game_state) {

  }
};
