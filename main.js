const { newSet } = require("./helpers/grouping");
const { httpP } = require("./helpers/httpabstract");

main()

async function main () {

    var data = await httpP('http://open-api.myhelsinki.fi/v2/places/').catch((error) => {
        console.log(error)
    })

var places = JSON.parse(data)

    // make sortable data "flat"
    places.data.map(place => {
        //console.log(place)
        place.postal = place.location.address.postal_code
        place.neighbourhood = place.location.address.neighbourhood
        place.tag = place.tags[0].name
    })

    // Additional sort for post number
    var sortedSet = newSet(places.data, ['postal','neighbourhood','tag']).sort((a,b) => {

        if (a.group < b.group) {
            return -1
        } else {
            return 1
        }

    })
    console.log(sortedSet)
}




