package player

import "../leanpoker"

const VERSION = "Goku v0.0.1"

func BetRequest(state *leanpoker.Game) int {
	return 1000
}

func Showdown(state *leanpoker.Game) {

}

func Version() string {
	return VERSION
}
