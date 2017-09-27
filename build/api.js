var api =
    {
	g_connections: 0,
	blabla: [],
	nb: [],
	sockets: [],
	functions: {
	    chat(args){
		api.io.emit("blabla", args)
	    },
	    op(args){
		console.log(args)
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
		if(api.nb.length == 3) {
		    let rand = Math.random() * 10 % 10
		    api.sockets.filter(socket=>{
			return api.nb.indexOf(socket.id) != -1
		    })
			.forEach(v=>{
			    v.emit("first", rand)
			})
		    api.nb = []
		}
	    }
	}
    }

module.exports = api
