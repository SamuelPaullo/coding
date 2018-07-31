module.exports = function() {

	var arquivo = new Schema({
		_id: Schema.Types.ObjectId,
		titulo: {type: String, required: true},
		texto: {type: String, required: true},
		projeto: { type: Schema.Types.ObjectId, ref: 'Projeto' }
	});

	return db.model('Arquivo', arquivo);
}