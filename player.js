
module.exports = {

  VERSION: "Goku JS - it's over 9000",

  bet_request: function(game_state) {
    var player = game_state.players[game_state.in_action];
    var cards = player.hole_cards

    if ('AK'.indexOf(cards[0].rank) != -1 && 'AK'.indexOf(cards[1].rank) != -1) {
      return player.stack;
    }

    if (cards[0].rank == cards[1].rank) {
      return (int)(player.stack / 2);
    }

    if ((player.in_action + 2) % 4 == player.dealer &&
        game_state.pot < 8 * game_state.small_blind)
    {
      return player.stack;
    }

    return 0;
  },

  showdown: function(game_state) {

  }
};
