module.exports = function() {

	var codigo = new Schema({
		_id: Schema.Types.ObjectId,
		descricao: {type: String, required: true},
		trechos: [{ type: Schema.Types.ObjectId, ref: 'Trecho' }],
		projeto: { type: Schema.Types.ObjectId, ref: 'Projeto' } 
	});

	return db.model('Codigo', codigo);
}