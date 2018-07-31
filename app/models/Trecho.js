module.exports = function() {

	var trecho = new Schema({
		_id: Schema.Types.ObjectId,
		descricao: {type: String, required: true},
		codigos: [{ type: Schema.Types.ObjectId, ref: 'Codigo' }],
		projeto: { type: Schema.Types.ObjectId, ref: 'Projeto' } 
	});

	return db.model('Trecho', trecho);
}