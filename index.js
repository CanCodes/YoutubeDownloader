const ytdl = require("ytdl-core");
const readline = require("readline");
const fs = require("fs")
var url;
var type;


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.clear()
rl.question("**Welcome! please enter a YouTube Video link.\n\n", (answer) => {
    console.clear()
    ytdl.getInfo(answer, (err, info) => {
        if (err) {
        console.log("Please restart the app and try again. INVALID LINK");
            return process.exit();
        }
        
        
        console.log("Video Name: " + info.title + "\n" + "Channel Name: " + info.author.name)
        rl.resume()
        rl.question("**Are these informations true? If true, please type true. If false, please type false.\n\n", async (aw) => {
            switch(aw.toLocaleLowerCase()) {
                case "true":
                    url = answer;
                    console.clear()
                     rl.question("**Please specify a format (mp4, mp3)", (format) => {
                        if (format == "mp4") {type = "mp4"} else {type = "mp3"};
                        console.clear();
                         return Owo(url, type, info.title.replace(/"<"|">"|":"|";"|"""|"*"|"?"/g, " "));
                    });
                    break;
                case "false":
                rl.close()
                console.log("ok bye!");
                
                break;
            }
        })
    })
})

var Owo = function (url, type, name) {
    const content = ytdl(url /*{ filter: (format) => format.container === type }*/)
    content.pipe(fs.createWriteStream(`${name}.${type}`));
    content.once("respond", () => {
        console.log("Download has started.");
        
    })
    content.on("progress", (chunk, downloaded, total) =>{
        console.clear();
        console.log(`Downloading... ${(downloaded / 1024 / 1024).toFixed(2)}/${(total / 1024 / 1024).toFixed(2)} MB`);
    })
    content.on("end", () => {console.log("Download Ended.")})
}