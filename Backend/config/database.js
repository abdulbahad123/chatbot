const mongoose=require("mongoose");
const dns = require("dns");

// Force Node.js to use Google and Cloudflare DNS to bypass local SRV lookup issues
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const  mongodb= async ()=>{
    await mongoose.connect("mongodb+srv://abdulbahad:bahad123@cluster0.8gzw0ix.mongodb.net/chatbotdb?retryWrites=true&w=majority");
}
module.exports=mongodb;