var map, player = {
    x: 1,
    y: 8
};
var maze = document.getElementById('maze');
var win, i;
var playerDirection = 'north';
var game = document.getElementById('game');

function mapToHTML(map) {
    var html = '',
        x, y, dictionary = {
            'H': '<span class="tile wall">H</span>',
            '.': '<span class="tile floor">.</span>',
            '@': '<span class="tile player ' + playerDirection + '">@</span>',
            'X': '<span class="tile goal">X</span>'
        };
    for (y = 0; y < map.length; y += 1) {
        for (x = 0; x < map[y].length; x += 1) {
            html += dictionary[map[y][x]];
        }
        html += '<br>';
    }
    return html;
}

function updateMap() {
    var displayMap = [],
        x, y;
    for (y = 0; y < map.length; y += 1) {
        displayMap[y] = displayMap[y] || [];
        for (x = 0; x < map[y].length; x += 1) {
            displayMap[y][x] = map[y][x];
        }
    }
    displayMap[player.y][player.x] = '@';
    for (y = 0; y < displayMap.length; y += 1) {
        displayMap[y] = displayMap[y].join('');
    }
    maze.innerHTML = mapToHTML(displayMap);
}

function playerMove(x, y) {
    var toX = player.x + x,
        toY = player.y + y;
    if (map[toY][toX] === '.' || map[toY][toX] === 'X') {
        player.x = toX;
        player.y = toY;
        updateMap();
    }
    if (map[toY][toX] === 'X') {
        maze.innerHTML = 'YOU WIN';
    }
}

map = [
    'HHHHHHHHHH',
    'HH......XH',
    'HH.H.H.H.H',
    'HH.HHHHH.H',
    'H........H',
    'HHHHH.H.HH',
    'H...H.H.HH',
    'H.H...H.HH',
    'H.H.HHH.HH',
    'HHHHHHHHHH'
    ];
	
for (i = 0; i < map.length; i += 1)
{
    map[i] = map[i].split('');
}

$(document).keydown(function(event)
{
	console.log(event.which);
	if (event.which == 38)
	{
		playerDirection = "north";
		playerMove(0, -1);
	}
	else if(event.which == 39)
	{
		playerDirection = "east";
		playerMove(1, 0);
	}
	else if(event.which == 37)
	{
		playerDirection = "west";
		playerMove(-1, 0);
	}
	else if(event.which == 40)
	{
		playerDirection = "south";
		playerMove(0, 1);
	}
});

$(document).ready(function()
{
	updateMap();
});