var api =
    {
	g_connections: 0,
	gamers: 2,
	blabla: [],
	nb: [],
	sockets: [],
	functions: {
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
		    api.sockets.forEach(v=>{
			v.ops = []
		    })
		    api.io.emit('goTo', {res})
		}
	    },
	    disconnect(args){
		console.log("from : ", this.id)
		console.log("bye")
		api.nb.splice(api.nb.indexOf(this.id), 1)
	    },
	    button(isIn){
		console.log("from : ", this.id)
		if(isIn)
		{ api.nb.push(this.id)}
		else
		{ api.nb.splice(api.nb.indexOf(this.id), 1)}
		if(api.nb.length == api.gamers) {
		    let rand = Math.random() * 10 % 10
		    api.sockets.filter(socket=>{
			return api.nb.indexOf(socket.id) != -1
		    })
			.forEach(v=>{
			    v.emit("game")
			})
		    api.nb = []
		}
	    }
	}
    }

module.exports = api
