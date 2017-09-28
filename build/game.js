function Game (sockets, size = 3, to = 9) {
    this.id = Game.ids + 1
    this.sockets = sockets
    this.numbers = []
    this.ops = []
    this.possible_ops = ['+', '*', '-']
    this.to_find = 0
    this.size = size
    this.to = to
    this.init()
}
Game.prototype = {
    init(){
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
    go(){
	
    }
}
Game.ids = 0
module.exports = Game
