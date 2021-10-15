function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false);
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function makeDataArray(data) {
    var dict = {};

    for (let i = 0; i < data.length; i++) {
        dict[data[i].id] = i;
    }

    return dict;
}

const init = function() {
    gameId = document.URL.match(/\d+/);

    if (gameId) {
        const serverList = document.getElementById("rbx-game-server-item-container");
        const servers = serverList.getElementsByTagName("li");

        getURL = "https://games.roblox.com/v1/games/" + gameId + "/servers/Public?sortOrder=Asc&limit=25";
        responseBody = JSON.parse(httpGet(getURL));
        bodyData = responseBody.data;

        dictData = makeDataArray(bodyData);
        
        console.log(dictData);
        setTimeout(() => {
            for (let i = 0; i < servers.length; i++) {
                server = servers[i]
                datagameid = server.getAttribute("data-gameid");
                
                if (dictData[datagameid] >= 0) {
                    console.log(dictData[datagameid]);
                    data = bodyData[dictData[datagameid]];
                    serverChildren = server.children;

                    ping = data.ping;
                    maxPlayers = data.maxPlayers;
                    playing = data.playing;
                    fps = data.fps
    
                    // Find the child
                    div1 = document.createElement("div");
                    div1.innerHTML = "Ping: " + ping;
                    server.appendChild(div1);
                } 
            } 
        }, 2000)
    }
}

if(document.readyState !== 'loading' ) {
    console.log( 'document is already ready, just execute code here' );
    init();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log( 'document was not ready, place code here' );
        init();
    });
}