
function cardValue(card) {
  return 2 + ('234567891JQKA'.indexOf(card.rank.charAt(0)));
}

module.exports = {

  VERSION: "Goku JS - it's over 9004",

  bet_request: function(game_state) {
    var player = game_state.players[game_state.in_action];
    var cards = player.hole_cards

    var all_in = player.stack;

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

    if ((player.in_action + 2) % 4 == player.dealer &&
        (game_state.pot < 8 * game_state.small_blind || game_state.pot < 300))
    {
      return all_in;
    }

    if (Math.random() < 0.1) {
      return all_in;
    }

    return 0;
  },

  showdown: function(game_state) {

  }
};
