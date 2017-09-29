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
		this.broadcast.emit('goTo', {res, win: false})
		api.io.emit('score', api.functions.for_those().forEach(s => {
		    console.log(s.id, s.score)
		    return {name: s.id, score: s.score}
		}))
		api.functions.for_those().forEach(s => {
		    s.ops = []
		})
		game.init()
	    },
	    disconnect(args){
		console.log("from : ", this.id)
		console.log("bye")
		api.queue.splice(api.queue.indexOf(this.id), 1)
	    },
	    for_those(cb){
	    	return api.sockets.filter(socket=>{
		    return api.queue.indexOf(socket.id) != -1
		})
	    },
	    go(args){
		let game = api.games.filter(g => { return g.id == args.id })[0]
		this.emit("game", game)
	    },
	    button(args){
		let isIn = args.isIn
		if(isIn)
		{ api.queue.push(this.id)}
		else
		{
		    let index = api.queue.indexOf(this.id)
		    if(index >= 0) {api.queue.splice(index, 1)}
		}
		if(api.queue.length == api.gamers) {
		    let game = new Game()
		    api.games.push(game)
		    api.functions.for_those()
			.forEach(s => {
			    api.functions.go.bind(s)({id: game.id})
			})
		    api.queue = []
		}
	    }
	}
    }
module.exports = api
