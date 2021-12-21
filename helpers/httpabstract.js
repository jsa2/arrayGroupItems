
const http = require('http')


 function httpP (getUrl) {



    return new Promise((resolve, reject) => {
        var r = ""
        http.get(getUrl, (data) => {
            data.on('data', (chunk) => {
                r+=(chunk.toString('utf8'))
            }).on('end', () => {
                return resolve(r)
            })
        }).on('finish',() => {
            console.log('done')
        }).on('error', (err) => {
            return reject((err))
        })

    })

}

module.exports={httpP}
