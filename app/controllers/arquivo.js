module.exports.cadastrar = function (application, req, res) {

	var projeto = new application.app.models.Projeto(
		req.body.projeto
	);

	var arquivo = new application.app.models.Arquivo({
		_id: new mongoose.Types.ObjectId(),
		titulo: req.body.titulo,
		texto: req.body.texto,
		projeto: projeto._id
	});

	projeto.arquivos.push(arquivo);

	application.app.models.Projeto.update({
		_id: projeto._id},
	 	projeto,
	 	{upsert: true},
	 	function(err){
	 		if(err){
				res.status(500).json({error: err});
				return;
			}else{
				
				arquivo.save(function(err) {
					if(err){
						res.status(500).json({error: err});
					}else{
						res.status(200).json({msg: 'arquivo cadastrado com sucesso'});
					}
					res.send();
				});
			}
		}
	);
}

module.exports.alterar = function (application, req, res) {

	var Arquivo = application.app.models.Arquivo;

	var arquivo = new Arquivo({
		_id: req.body._id,
		titulo: req.body.titulo,
		texto: req.body.texto
	});

	Arquivo.update({
		_id: req.body._id},
	 	arquivo,
	 	{upsert: true},
	 	function(err){
	 		if(err){
				res.status(500).json({error: err});
				return;
			}else{
				res.status(200).json({msg: 'arquivo alterado com sucesso'});
			}
			res.send();
		}
	);
}

module.exports.excluir = function (application, req, res) {

	application.app.models.Arquivo.findOneAndRemove(
		{_id: req.params.id},
		function(err){
			if(err){
				res.status(500).json({error: err});
				return;
			}else{
				res.status(200).json({msg: 'projeto excluido com sucesso'});
			}
			res.send();
		}
	);
}

module.exports.aquivobyid = function (application, req, res) {

	application.app.models.Arquivo.
		findOne({ _id: req.params.id }).
		exec(function (err, arquivo) {
			if(err){
				res.status(500).json({error: err});
				res.send();
			}else{
				res.send(JSON.stringify(arquivo));
			}
		}); 
}

module.exports.arquivos = function (application, req, res) {

	application.app.models.Arquivo.
		find({projeto: req.params.id}).
		select('_id titulo').
		sort('titulo').
		exec(function (err, arquivos) {
			if(err){
				res.status(500).json({error: err});
				res.send();
				return;
			}else{
				res.send(JSON.stringify(arquivos));
			}
		});
}