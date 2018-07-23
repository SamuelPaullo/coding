module.exports = function() {

	var codigo = new Schema({
		_id: Schema.Types.ObjectId,
		trecho: {type: String, required: true},
		descricao: {type: String, required: true},
		projeto: { type: Schema.Types.ObjectId, ref: 'projeto' } 
	});

	return db.model('Codigo', codigo);
}