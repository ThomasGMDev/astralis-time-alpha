const Discord = require("discord.js");
const bot = new Discord.Client();
bot.options.http.api = "https://discord.com/api";
let prefix = "-";
let fs = require("fs");
let commandList = fs.readFileSync("storage/commands.txt", "utf8");
const ytdl = require("ytdl-core");
const search = require("youtube-search");
const yt = require("yt-search");
const { HLTV } = require("hltv");
const opts = {
  maxResults: 1,
  key: /*enter your API key here*/,
  type: "video",
};
global.servers = {};

let JDPOINTS = 9999999;

async function pStats(pName, message) {
  try {
    let statsres = await HLTV.getPlayerByName({ name: pName });
    let ingameName = statsres.ign;
    let nameP = statsres.name;
    let ageP = statsres.age;
    let country = statsres.country.name;
    let teamP = statsres.team.name;
    let pID = statsres.id;
    let stats = await HLTV.getPlayerStats({ id: pID });
    let imageP = statsres.image;

    const resultP = new Discord.MessageEmbed()
      .setColor("#d11212")
      .setTitle(ingameName)
      .addFields(
        { name: "Real Name", value: nameP, inline: true },
        { name: "Age", value: ageP, inline: true },
        { name: "Country", value: country, inline: true }
      )
      .addFields(
        { name: "Team", value: teamP, inline: true },
      )
      .addFields(
        { name: "ADR", value: stats.overviewStatistics.damagePerRound, inline: true },
        { name: "HS%", value: stats.overviewStatistics.headshots, inline: true }
      )
      .addFields(
        { name: "K/D Ratio", value: stats.overviewStatistics.kdRatio, inline: true },
        { name: "HLTV Rating", value: stats.overviewStatistics.rating1, inline: true }
      )
      .setImage(imageP);

    message.channel.send(resultP);
  } catch (error) {
    message.channel.send("**Please, try again.**");
  }
}

async function tStats(idT, message) {
  try {
    let statsres = await HLTV.getTeamByName({ name: idT });
    let nameT = statsres.name;
    let country = statsres.country.name;
    let rankT = statsres.rank;
    let playersT = statsres.players;
    let imageT = 'https://eslpro.imgix.net/csgo/proleague/wp-content/uploads/2019/04/ESL-Pro-League@2x.png?auto=format%2Ccompress';

    const resultP = new Discord.MessageEmbed()
      .setColor("#d11212")
      .setTitle(nameT)
      .addFields(
        { name: "Country", value: country, inline: true },
        { name: "Rank", value: rankT, inline: true },
        {
          name: "Players",
          value:
            playersT[0].name +
            ", " +
            playersT[1].name +
            ", " +
            playersT[2].name +
            ", " +
            playersT[3].name +
            ", " +
            playersT[4].name,
        }
      )
      .setImage(imageT);

    message.channel.send(resultP);
  } catch (error) {
    message.channel.send("**Please, try again.**");
  }
}

async function gRank(message) {
  try {
    let ranks = await HLTV.getTeamRanking();

    const resultP = new Discord.MessageEmbed()
      .setColor("#d11212")
      .setTitle("Team Ranking | Top 5")
      .addFields(
        {
          name: "1st Place - " + ranks[0].team.name,
          value: ranks[0].points + " points",
        },
        {
          name: "2nd Place - " + ranks[1].team.name,
          value: ranks[1].points + " points",
        },
        {
          name: "3rd Place - " + ranks[2].team.name,
          value: ranks[2].points + " points",
        },
        {
          name: "4th Place - " + ranks[3].team.name,
          value: ranks[3].points + " points",
        },
        {
          name: "5th Place - " + ranks[4].team.name,
          value: ranks[4].points + " points",
        }
      );

    message.channel.send(resultP);
  } catch (error) {
    message.channel.send("**Please, try again.**");
  }
}

async function pRank(message) {
  try {
    let ranks = await HLTV.getPlayerRanking({});

    const resultP = new Discord.MessageEmbed()
      .setColor("#d11212")
      .setTitle("Player Ranking | Top 5")
      .addFields(
        {
          name: "1st Place - " + ranks[0].player.name,
          value: "HLTV Rating: " + ranks[0].rating1,
        },
        {
          name: "2nd Place - " + ranks[1].player.name,
          value: "HLTV Rating: " + ranks[1].rating1,
        },
        {
          name: "3rd Place - " + ranks[2].player.name,
          value: "HLTV Rating: " + ranks[2].rating1,
        },
        {
          name: "4th Place - " + ranks[3].player.name,
          value: "HLTV Rating: " + ranks[3].rating1,
        },
        {
          name: "5th Place - " + ranks[4].player.name,
          value: "HLTV Rating: " + ranks[4].rating1,
        }
      );

    message.channel.send(resultP);
  } catch (error) {
    message.channel.send("**Please, try again.**");
  }
}

function claimWaifu(message, sender) {
  let probs = Math.round(Math.random() * 100);
  let name;
  let photo;
  let waifuRank;
  let waifuPoint;

  if (probs <= 15) {
    name = "Hanamaru Kunikida";
    photo =
      "https://vignette.wikia.nocookie.net/love-live/images/e/e8/Kunikida_Hanamaru_ALL_STARS.png/revision/latest/scale-to-width-down/350?cb=20200323035310&path-prefix=es";
    waifuRank = "N/A";
    waifuPoint = "N/A";
  } else if (probs > 15 && probs <= 30) {
    name = "Pyra";
    photo =
      "https://vignette.wikia.nocookie.net/p__/images/1/1c/Pyra.png/revision/latest/top-crop/width/360/height/450?cb=20180509065807&path-prefix=protagonist";
    waifuRank = "N/A";
    waifuPoint = "N/A";
  } else if (probs > 30 && probs <= 45) {
    name = "Rebecca Chambers";
    photo =
      "https://i1.wp.com/www.sopitas.com/wp-content/uploads/2016/12/rebecca-chambers-resident-evil.jpg";
    waifuRank = "N/A";
    waifuPoint = "N/A";
  } else if (probs > 45 && probs <= 60) {
    name = "Empress Cygnus";
    photo =
      "https://pm1.narvii.com/6896/94050386fb06d427133c83f8b9f6bcf0cf9c3e5dr1-800-600v2_uhq.jpg";
    waifuRank = "N/A";
    waifuPoint = "N/A";
  } else if (probs > 60 && probs <= 75) {
    name = "Sunazuka Akira";
    photo =
      "https://img2.gelbooru.com/images/54/24/54243a2d82b4661cb19bd814cc7192df.jpg";
    waifuRank = "N/A";
    waifuPoint = "N/A";
  } else if (probs > 75 && probs <= 90) {
    name = "Hayasaka Ai";
    photo =
      "https://vignette.wikia.nocookie.net/kaguyasama-wa-kokurasetai/images/0/02/HayasakaAnime.png/revision/latest/scale-to-width-down/340?cb=20190209190948";
    waifuRank = "N/A";
    waifuPoint = "N/A";
  } else {
    name = "Jimin's Dimple";
    photo =
      "https://cdn.discordapp.com/attachments/424425377218428930/718236830008475708/Damnrealgalaxybrainhours_86b4003c44ba8cf002ff46004288e2cf.jpg";
    waifuRank = 1;
    JDPOINTS++;
    waifuPoint = JDPOINTS;
  }

  const resultP = new Discord.MessageEmbed()
    .setColor("#d11212")
    .setTitle(sender + " got " + name + "!")
    .addFields(
      { name: "Rank", value: waifuRank, inline: true },
      { name: "Points", value: waifuPoint, inline: true }
    )
    .setImage(photo);

  message.channel.send(resultP);
}

async function playSong(channela, message) {
  let songTitle;
  let connection;
  let dispatcher;
  let sera;
  if (
    servers[message.guild.id].queue[0].url ===
    "https://www.youtube.com/watch?v=rm-a-EzaXOQ"
  ) {
    sera = true;
  }
  if (
    typeof servers[message.guild.id].queue[0].url === "undefined" ||
    typeof servers[message.guild.id].queue[0] === "undefined" ||
    typeof servers[message.guild.id].queue[0].url !== "string"
    || !servers[message.guild.id].queue[0]
  ) {
    servers[message.guild.id].queue.shift();
    if (!servers[message.guild.id].queue[0]) {
      connection.disconnect();
      message.member.voice.channel.leave();
    }
  }
  try {
    songTitle = servers[message.guild.id].queue[0].title;
    connection = await channela.join();
    
    dispatcher = await connection.play(
      ytdl(servers[message.guild.id].queue[0].url, {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25
      }),
      { highWaterMark: 1 }
    );
  } catch (error) {
    console.error("Could not play the video:" + error);
    try{
      playSong(channela, message);
    }catch(error){
      console.error("Could not play the video:" + error);
      message.channel.send("**Please, try again.**");
    }
  }
  if (sera) {
    message.channel.send("SERA <:BibleThump:708752843850514545>");
  } else {
    message.channel.send("Now playing - **" + songTitle + "**");
  }
  dispatcher.once("finish", function () {
    servers[message.guild.id].queue.shift();
    if (servers[message.guild.id].queue[0]) {
      playSong(channela, message);
    } else {
      connection.disconnect();
      message.member.voice.channel.leave();
    }
  });
}

async function addPlaylist(channela, message, aux) {
  try {
    aux = aux.split('?list=')
    aux = aux[1];
    let list = await yt({listId: aux});
    var plTitl = list.title;
    list = list.videos;
    var plLength = list.length;
    for(var vid of list){
      var titl = vid.title;
      var vidId = vid.videoId;
      vidId = "https://www.youtube.com/watch?v=" + vidId;
      servers[message.guild.id].queue.push({url: vidId, title: titl});
    }
    message.channel.send(
      "Playlist **" + plTitl + "** has been added to the queue!"
    );
    if (servers[message.guild.id].queue.length == plLength) {
      playSong(channela, message);
    }
  } catch (error) {
    console.error("Could not play the playlist:" + error);
    try {
      message.channel.send("**Please, try again.**");
    } catch (error) {
      console.error("Could not play the playlist:" + error);
    }
  }
}

async function playSearch(channela, message, aux) {
  let resultYT = await search(aux, opts);
  if (resultYT) {
    let ytResult = resultYT.results;
    let ytLink = ytResult[0].link;
    try {
      let songInfo = await ytdl.getInfo(ytLink);
      let songTitle = songInfo.videoDetails.title;
      servers[message.guild.id].queue.push({url: ytLink, title: songTitle});
      
      message.channel.send("Added  **" + songTitle + "**  to the queue!");
      if (servers[message.guild.id].queue.length == 1) {
        playSong(channela, message);
      }
    } catch (error) {
      console.error("Could not play the video:" + error);
      message.channel.send("**Please, try again.**");
    }
  } else {
    return message.channel.send("No results found!");
  }
}

async function botPlay(message) {
  if (message.author.bot) {
    return undefined;
  }
  if (!servers[message.guild.id]) {
    servers[message.guild.id] = { queue: [] };
  }
  let msg_og = message.content;
  let video = msg_og.split(" ");
  let i = 2;
  let aux = video[1];
  while (i < video.length) {
    aux = aux + " " + video[i];
    i++;
  }
  let channela = message.member.voice.channel;
  if (!channela) {
    return message.channel.send(
      "You must be in a voice channel to use that command my G."
    );
  }

  let validate = await ytdl.validateURL(aux);
  if (validate) {
    if (aux.includes("list")) {
      addPlaylist(channela, message, aux);
    } else {
      try {
        let songInfo = await ytdl.getInfo(aux);
        let songTitle = songInfo.videoDetails.title;
        servers[message.guild.id].queue.push({url: aux, title: songTitle});

        message.channel.send("Added  **" + songTitle + "**  to the queue!");
        if (servers[message.guild.id].queue.length == 1) {
          playSong(channela, message);
        }
      } catch (error) {
        console.error("Could not play the video:" + error);
        message.channel.send("**Please, try again.**");
      }
    }
  } else {
    if(aux.includes('playlist?list=')){
      addPlaylist(channela, message, aux);
    }else{
      playSearch(channela, message, aux);
    }
  }
}

function botStop(message) {
  if (!message.member.voice.channel) {
    return message.channel.send("Not in a voice channel my G.");
  }
  if (
    servers[message.guild.id].queue &&
    servers[message.guild.id].queue.length
  ) {
    servers[message.guild.id].queue = [];
  }
  try {
    message.guild.voice.channel.leave();
  } catch (error) {
    console.error("Could not leave voice channel:" + error);
  }

  return message.channel.send("Stopped!");
}

function botSkip(message) {
  if (!message.member.voice.channel) {
    return message.channel.send("Not in a voice channel my G.");
  }
  if (servers[message.guild.id].queue[1]) {
    try {
      servers[message.guild.id].queue.shift();
      let channela = message.member.voice.channel;
      playSong(channela, message);
    } catch (error) {
      console.error("Could not skip:" + error);
      return message.channel.send("**Could not skip.**");
    }
  } else {
    if (servers[message.guild.id].queue) {
      try {
        servers[message.guild.id].queue = [];
        message.guild.voice.channel.leave();
      } catch (error) {
        console.error("Could not leave voice channel:" + error);
      }
    }
  }
  return message.channel.send("Skipped!");
}

function botDelete(message, aux){
  if (!message.member.voice.channel) {
    return message.channel.send("Not in a voice channel my G.");
  }
  try{
    aux = parseInt(aux);
    if(typeof(aux) !== "number"){
      return message.channel.send("**Enter a valid number.**");
    }
  }catch(error){return console.log("**Enter a valid number.**");}
  if (servers[message.guild.id].queue[aux - 1]) {
    message.channel.send("**" + aux + ". " + servers[message.guild.id].queue[aux - 1].title + " removed from the queue! **");
    servers[message.guild.id].queue.splice(aux - 1, 1);
  }
}

function botQueue(message) {
  if (
    servers[message.guild.id] &&
    Array.isArray(servers[message.guild.id].queue)
  ) {
    try {/*
      message.channel.send(
        "There are **" +
          servers[message.guild.id].queue.length +
          "** videos in queue."
      );*/
      let i = 1;
      let titles = '';
      for(const object of servers[message.guild.id].queue){
        titles += '**' + i.toString() + '. ' + object.title + '**\n';
        i++;
      }
      message.channel.send(titles);
    } catch (error) {
      console.error("Could not send message:" + error);
    }
  } else {
    try {
      message.channel.send("**There is no active queue.**");
    } catch (error) {
      console.error("Could not send message:" + error);
    }
  }
}

function botEmpty(message) {
  if (!message.member.voice.channel) {
    return message.channel.send("Not in a voice channel my G.");
  }
  if (servers[message.guild.id].queue) {
    servers[message.guild.id].queue = [];
  }

  return message.channel.send("Queue emptied!");
}

function playTomboy(message) {
  if (message.author.bot) {
    return undefined;
  }
  if (!message.member.voice.channel) {
    return message.channel.send("Not in a voice channel my G.");
  }
  if (!servers[message.guild.id]) {
    servers[message.guild.id] = { queue: [] };
  }
  servers[message.guild.id].queue.push({url:
    "https://www.youtube.com/watch?v=JVovZkcU5tk", title: 'Mio Honda (本田未央) - Step! (ステップ！) [60 FPS, Full, HQ Audio]'}
  );
  if (servers[message.guild.id].queue.length == 1) {
    let channela = message.member.voice.channel;
    playSong(channela, message);
  }

  return message.channel.send("**N E E D   T O M B O Y**");
}

function playXieXie(message) {
  if (message.author.bot) {
    return undefined;
  }
  if (!message.member.voice.channel) {
    return message.channel.send("Not in a voice channel my G.");
  }
  if (!servers[message.guild.id]) {
    servers[message.guild.id] = { queue: [] };
  }
  servers[message.guild.id].queue.push(
    {url: "https://www.youtube.com/watch?v=WfExWESjbfs", title: '费 玉 清 - 一 剪 梅'}
  );
  if (servers[message.guild.id].queue.length == 1) {
    let channela = message.member.voice.channel;
    playSong(channela, message);
  }

  return message.channel.send("**费 玉 清 - 一 剪 梅**");
}

function playFranchouchou(message) {
  if (message.author.bot) {
    return undefined;
  }
  if (!message.member.voice.channel) {
    return message.channel.send("Not in a voice channel my G.");
  }
  if (!servers[message.guild.id]) {
    servers[message.guild.id] = { queue: [] };
  }
  servers[message.guild.id].queue.push({url:
    "https://www.youtube.com/watch?v=AwtI5o3RsLs&list=PLWatCJpTzyoRAnmEXkGvIIlEvw2soYKfP", title: 'Adabana Necromancy'}
  );
  servers[message.guild.id].queue.push({url:
    "https://www.youtube.com/watch?v=tqD1e6BzscU&list=PLWatCJpTzyoRAnmEXkGvIIlEvw2soYKfP&index=5", title: 'DEAD or RAP!!!'}
  );
  servers[message.guild.id].queue.push({url:
    "https://www.youtube.com/watch?v=R3o79aHSppw&list=PLWatCJpTzyoRAnmEXkGvIIlEvw2soYKfP&index=6", title: 'Mezame RETURNER'}
  );
  servers[message.guild.id].queue.push({url:
    "https://www.youtube.com/watch?v=QGvEgbX_VsE&list=PLWatCJpTzyoRAnmEXkGvIIlEvw2soYKfP&index=7", title: 'Atsuku Nare'}
  );
  servers[message.guild.id].queue.push({url:
    "https://www.youtube.com/watch?v=67QWCOU17fI&list=PLWatCJpTzyoRAnmEXkGvIIlEvw2soYKfP&index=8", title: 'Mezame Returner ELECTRIC'}
  );
  servers[message.guild.id].queue.push({url:
    "https://www.youtube.com/watch?v=UEOgjl8ZMV4&list=PLWatCJpTzyoRAnmEXkGvIIlEvw2soYKfP&index=9", title: 'Jellyfish'}
  );
  servers[message.guild.id].queue.push({url:
    "https://www.youtube.com/watch?v=uTAlZ15k8l0&list=PLWatCJpTzyoRAnmEXkGvIIlEvw2soYKfP&index=10", title: 'To my Dearest'}
  );
  servers[message.guild.id].queue.push({url:
    "https://www.youtube.com/watch?v=pJgmZ-m2CG4&list=PLWatCJpTzyoRAnmEXkGvIIlEvw2soYKfP&index=11", title: 'Tokkou Dance'}
  );
  servers[message.guild.id].queue.push({url: 
    "https://www.youtube.com/watch?v=P3bEmh28-Yo&list=PLWatCJpTzyoRAnmEXkGvIIlEvw2soYKfP&index=12", title: 'Yomigaere'}
  );
  servers[message.guild.id].queue.push({url:
    "https://www.youtube.com/watch?v=PPlUDizUlUc&list=PLWatCJpTzyoRAnmEXkGvIIlEvw2soYKfP&index=14", title: 'Saga Jihen'}
  );
  servers[message.guild.id].queue.push({url:
    "https://www.youtube.com/watch?v=AK15YGXOflA&list=PLWatCJpTzyoRAnmEXkGvIIlEvw2soYKfP&index=15", title: '「カレーメシ×ゾンビランドサガ」『輝いて（カレーメシver.）』'}
  );
  servers[message.guild.id].queue.push({url:
    "https://www.youtube.com/watch?v=0qY929lmvSs&list=PLWatCJpTzyoRAnmEXkGvIIlEvw2soYKfP&index=17", title: 'Drive-In Tori'}
  );
  if (servers[message.guild.id].queue.length == 12) {
    let channela = message.member.voice.channel;
    playSong(channela, message);
  }
  return message.channel.send("**Franchouchou Playlist added to the queue!**");
}

function playMBTS(message) {
  message.channel.send("I killed the children.", { tts: true });
  message.channel.send("<:mbtsK:706035630379106314>");
  if (message.member.voice.channel) {
    if (!servers[message.guild.id]) {
      servers[message.guild.id] = { queue: [] };
    }
    servers[message.guild.id].queue.push({url:
      "https://www.youtube.com/watch?v=gk-aCL6eyGc", title: "Five Nights at Freddy's 2 Song - The Living Tombstone (FNAF2)"}
    );
    if (servers[message.guild.id].queue.length == 1) {
      let channela = message.member.voice.channel;
      playSong(channela, message);
    }
  }
}

function playSera(message) {
  if (message.author.bot) {
    return undefined;
  }
  if (!message.member.voice.channel) {
    return message.channel.send("SERA <:BibleThump:708752843850514545>");
  }
  if (!servers[message.guild.id]) {
    servers[message.guild.id] = { queue: [] };
  }
  servers[message.guild.id].queue.push({url:
    "https://www.youtube.com/watch?v=rm-a-EzaXOQ", title: 'Midsplit & A-SHO - Sera'}
  );
  if (servers[message.guild.id].queue.length == 1) {
    let channela = message.member.voice.channel;
    playSong(channela, message);
  }

  return message.channel.send("SERA <:BibleThump:708752843850514545>");
}

function playCuckles(message) {
  if (message.author.bot) {
    return undefined;
  }
  if (!message.member.voice.channel) {
    return message.channel.send(
      "https://cdn.discordapp.com/attachments/367822342090653701/699670198688415804/3xsjn746uq101.jpg"
    );
  }/*
  if (!servers[message.guild.id]) {
    servers[message.guild.id] = { queue: [] };
  }
  servers[message.guild.id].queue.push({url:
    "https://www.youtube.com/watch?v=tXDNBBh2QSo", title: 'Knuckles from K.N.U.C.K.L.E.S. & Knuckles (Full Version)'}
  );
  if (servers[message.guild.id].queue.length == 1) {
    let channela = message.member.voice.channel;
    playSong(channela, message);
  }*/
  return message.channel.send(
    "https://cdn.discordapp.com/attachments/367822342090653701/699670198688415804/3xsjn746uq101.jpg"
  );
}

bot.on("message", async (message) => {
  let sender = message.author.username;
  let msg = message.content.toUpperCase();
  let msg_og = message.content;
  let msg_start = msg.split(" ")[0];

  switch (msg) {
    case prefix + "PING":
      message.channel.send({
        embed: {
          title: "Ping",
          description: "Pong!",
          color: 0xd11212,
        },
      });
      break;
    case prefix + "RANKP":
      pRank(message);
      break;
    case prefix + "RANKT":
      gRank(message);
      break;
    case prefix + "HELP":
      message.channel.send(commandList);
      break;
    case "JUEGA ASTRALIS":
      message.channel.send(
        "https://cdn.discordapp.com/attachments/367822342090653701/692125332240728074/aaaaaaaaaaaaaaaaaaaaa.png"
      );
      break;
    case prefix + "Q":
      botQueue(message);
      break;
    case prefix + "CLAIM":
      claimWaifu(message, sender);
      break;
    case prefix + "STFU":
    case prefix + "STOP":
      botStop(message);
      break;
    case prefix + "EMPTY":
      botEmpty(message);
      break;
    case prefix + "SKIP":
      botSkip(message);
      break;
    case "NEED TOMBOY":
      playTomboy(message);
      break;
    case prefix + "SERA":
      playSera(message);
      break;
    case "XIE XIE":
      playXieXie(message);
      break;
    case prefix + "JUAN":
      message.channel.send("**streamea**", { tts: true });
      break;
    case "CHE ASTRALIS":
      playMBTS(message);
      break;
    case "CUCKLES":
      playCuckles(message);
      break;
    case "FRANCHOUCHOU":
      playFranchouchou(message);
      break;
    default:
      switch (msg_start) {
        case prefix + "PLAY":
          botPlay(message);
          break;
        case prefix + "STATS":
          if (msg === prefix + "STATS") {
            message.channel.send("**Remember to input a player name.**");
          } else {
            let video = msg_og.split(" ");
            let i = 2;
            let aux = video[1];
            while (i < video.length) {
              aux = aux + " " + video[i];
              i++;
            }
            pStats(aux, message);
          }
          break;
        case prefix + "TEAM":
          if (msg === prefix + "TEAM") {
            message.channel.send("**Remember to input a team name.**");
          } else {
            let video = msg_og.split(" ");
            let aux = video[1];
            tStats(aux, message);
          }
          break;
        case prefix + "HIT":
          if (msg === prefix + "HIT") {
            message.channel.send(
              "Querés que le pegue al aire? Dame un objetivo, pichón.",
              { tts: true }
            );
          } else {
            let video = msg_og.split(" ");
            let i = 2;
            let aux = video[1];
            while (i < video.length) {
              aux = aux + " " + video[i];
              i++;
            }
            message.channel.send(
              "Nooo, **" +
                sender +
                "** le pegó una trompada a **" +
                aux +
                "**!",
              { tts: true }
            );
          }
          break;
        case prefix + "PAT":
          if (msg === prefix + "PAT") {
            message.channel.send("Te hiciste un **P A T** a vos mismo.", {
              tts: true,
            });
          } else {
            let video = msg_og.split(" ");
            let i = 2;
            let aux = video[1];
            while (i < video.length) {
              aux = aux + " " + video[i];
              i++;
            }
            message.channel.send(
              "**" + sender + "** **patted** **" + aux + "**.",
              { tts: true }
            );
          }
          break;
        case prefix + "KISS":
          if (msg === prefix + "KISS") {
            message.channel.send("**You threw a kiss in the air.**", {
              tts: true,
            });
          } else {
            let video = msg_og.split(" ");
            let i = 2;
            let aux = video[1];
            while (i < video.length) {
              aux = aux + " " + video[i];
              i++;
            }
            message.channel.send("**" + sender + "** kissed **" + aux + "**.", {
              tts: true,
            });
          }
          break;
        case prefix + "HUG":
          if (msg === prefix + "HUG") {
            message.channel.send("**You hugged urself, pretty lame my G.**", {
              tts: true,
            });
          } else {
            let video = msg_og.split(" ");
            let i = 2;
            let aux = video[1];
            while (i < video.length) {
              aux = aux + " " + video[i];
              i++;
            }
            message.channel.send(
              "**" + sender + "** hugged **" + aux + "** uwu.",
              { tts: true }
            );
          }
          break;
        case prefix + "KILL":
          if (msg === prefix + "KILL") {
            message.channel.send("**You killed yourself.**", { tts: true });
          } else {
            let video = msg_og.split(" ");
            let i = 2;
            let aux = video[1];
            while (i < video.length) {
              aux = aux + " " + video[i];
              i++;
            }
            message.channel.send(
              "**" + sender + "** GAME ENDED **" + aux + "**.",
              { tts: true }
            );
          }
          break;
        case prefix + "D":
          if(msg === prefix + "D"){
            message.channel.send("**Enter a valid queue position.**")
          }
          else{
            let video = msg_og.split(" ");
            let aux = video[1];
            botDelete(message, aux);
          }
          break;
      }
  }
});

bot.on("ready", () => {
  console.log("Bot On");
  bot.user.setActivity(prefix + "help");
});

bot.login(/*Enter your Discord developer key here*/);
