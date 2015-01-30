var redis = require("redis"),
    client = redis.createClient();
 
client.on("error", function (err) {
    console.log("Error " + err);
});
// Set a value
 client.set("string key", "Hello World", redis.print);

console.log(client.dbsize());     

client.quit();
