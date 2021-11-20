function lookupPlace(placeId) {
	console.log(`lookupPlace(${placeId})`);
	return {good: 0, bad: 0};
}
function scorePlace(placeId, good) {
	console.log(`scorePlace(${placeId}, ${good})`);
}

exports.lookupPlace = lookupPlace;
exports.scorePlace = scorePlace;
