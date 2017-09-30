var Game = require('./game')

var api =
    {
	g_connections: 0,
	gamers: 2,
	blabla: [],
	games: [],
	queue: [],
	sockets: [],
	functions: {
	    chat(args){
		api.io.emit("blabla", args)
	    },
	    op(args){
		let ops = args.ops
		let res = args.numbers[0]
		ops.forEach((v,i) => {
		    let equation = `res ${v} ${args.numbers[i + 1]}`
		    res = eval(equation)
		})
		let win = res == args.to_find
		let game = api.games.filter(g => { return g.id == args.id })[0]
		if (win) {
		    this.wins += 1
		    this.score += 1
		}
		else {
		    this.score -= 1
		}
		this.emit('goTo', {res, win, wins: this.wins})
		game.sockets.filter(s => s.id != this.id)
		    .forEach(s => s.emit('goTo', {res, win: false}))
		game.sockets
		    .forEach(s => s.emit('score', game.sockets.map(s => {
			console.log(s.id, s.score)
			return {name: s.id, score: s.score}
		    })))
		game.init()
	    },
	    disconnect(args){
		console.log("from : ", this.id)
		console.log("bye")
		api.queue.splice(api.queue.indexOf(this.id), 1)
	    },
	    go(args){
		let game = api.games.filter(g => { return g.id == args.id })[0]
		game.go() 
	    },
	    button(args){
		let isIn = args.isIn
		if(isIn)
		{ api.queue.push(this)}
		else
		{
		    let index = api.queue.indexOf(this)
		    if(index >= 0) {api.queue.splice(index, 1)}
		}
		console.log(isIn, api.queue)
		if(api.queue.length == api.gamers) {
		    let game = new Game(api.queue)
		    game.go()
		    api.games.push(game)
		    api.queue = []
		}
	    }
	}
    }
module.exports = api
