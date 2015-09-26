
module.exports = {

  VERSION: "Goku JS - it's over 9000",

  bet_request: function(game_state) {
    var player = game_state.players[game_state.in_action];
    var cards = player.hole_cards

    if ('AK'.indexOf(cards[0].rank) != -1 && 'AK'.indexOf(cards[1].rank) != -1) {
      return 10000;
    }

    if (cards[0].rank == cards[1].rank) {
      return (int)(player.stack / 2);
    }

    return 0;
  },

  showdown: function(game_state) {

  }
};
