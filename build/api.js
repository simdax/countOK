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
		console.log(api)
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
	    button(args){
		let isIn = args.isIn
		console.log("from : ", this.id)
		if(isIn)
		{ api.nb.push(this.id)}
		else
		{ api.nb.splice(api.nb.indexOf(this.id), 1)}
		console.log(args)
		if(api.nb.length == api.gamers) {
		    let rand = Math.random() * 10 % 10
		    api.sockets.filter(socket=>{
			return api.nb.indexOf(socket.id) != -1
		    })
			.forEach(v=>{
			    v.emit("game")
			})
		    api.games.push(new Game)
		    api.nb = []
		}
	    }
	}
    }

module.exports = api
