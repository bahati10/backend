module.exports = {
development:{
    url: process.env.MONGO_DEV_URL
},
test:{
    url: process.env.MONGO_TEST_URL
},
production:{
    url: process.env.MONGO_URL
},
}
