var Game = require('./game')

var api =
    {
	g_connections: 0,
	gamers: 2,
	blabla: [],
	games: [],
	nb: [],
	sockets: [],
	functions: {
	    generate_numbers(){
		for(var i = 0; i < this.size; i++)
		{
		    this.numbers.push(Math.ceil(Math.random() * this.to))
		    if(i == 0)
		    {this.to_find = this.numbers[i]}
		    else
		    {
			let op = Math.floor(Math.random() * this.possible_ops.length)
			this.ops.push(this.possible_ops[op])
			this.equation = `${this.to_find} ${this.ops[i - 1]} ${this.numbers[i]}`
			this.to_find = eval(this.equation)
		    }
		}	    
	    },
	    chat(args){
		api.io.emit("blabla", args)
	    },
	    op(args){
		this.ops.push(args.op)
		if(this.ops.length == 2)
		{
		    let res = args.nbs[0]
		    this.ops.forEach((v,i) => {
			let equation = `res ${v} ${args.nbs[i + 1]}`
			res = eval(equation)
		    })
		    let win = res == args.to_find
		    api.io.emit('goTo', {res, win})
		}
	    },
	    disconnect(args){
		console.log("from : ", this.id)
		console.log("bye")
		api.nb.splice(api.nb.indexOf(this.id), 1)
	    },
	    for_those(cb){
	    	return api.sockets.filter(socket=>{
		    return api.nb.indexOf(socket.id) != -1
		})
	    },
	    go(id){
		let game = api.games.filter(g => { return g.id == id })
		console.log(game)
		this.emit("game", game)
	    },
	    button(args){
		let isIn = args.isIn
		if(isIn)
		{ api.nb.push(this.id)}
		else
		{ api.nb.splice(api.nb.indexOf(this.id), 1)}
		if(api.nb.length == api.gamers) {
		    let game = new Game()
		    api.games.push(game)
		    api.functions.for_those()
			.forEach(s => {
			    api.functions.go.bind(s)(game.id)
			})
		    api.nb = []
		}
	    }
	}
    }
module.exports = api
