
# Data grouping tool

There is likely multiple libraries to do this same thing, I did this mostly for fun, and since I need to customize sorting to certain output type very often.

![image](https://user-images.githubusercontent.com/58001986/146882914-5a1e0695-ae78-463a-b976-c91953cc0ef8.png)


```JS
{
  group: "Kumpula",
  items: [
    [
      {
        group: "sports",
        items: [
          {
              "......":"....."
          },
        ],
      },
    ],
  ],
}
```

## Example using https://open-api.myhelsinki.fi/

## How to use
1. Make the sortable data available in single level (Node.JS array.map() is handy for this
2. Decide grouping criteria

```js
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

```

