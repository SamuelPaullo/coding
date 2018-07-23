module.exports = function() {

	var projeto = new Schema({
		_id: Schema.Types.ObjectId,
		nome: {type: String, required: true, unique: true},
		infoAdicional: {type: String},
		arquivos: [{ type: Schema.Types.ObjectId, ref: 'Arquivo' }],
		codigos: [{ type: Schema.Types.ObjectId, ref: 'Codigo' }]
	});

	return db.model('Projeto', projeto);
}