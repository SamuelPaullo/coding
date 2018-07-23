module.exports.cadastrar = function (application, req, res) {

	var projeto = new application.app.models.Projeto(
		req.body.projeto
	);

	var codigo = new application.app.models.Codigo({
		_id: new mongoose.Types.ObjectId(),
		trecho: req.body.trecho,
		descricao: req.body.descricao,
		projeto: projeto._id
	});

	projeto.codigos.push(codigo);

	application.app.models.Projeto.update({
		_id: projeto._id},
	 	projeto,
	 	{upsert: true},
	 	function(err){
	 		if(err){
				res.status(500).json({error: err});
				return;
			}else{				
				codigo.save(function(err) {
					if(err){
						res.status(500).json({error: err});
					}else{
						res.status(200).json({msg: 'codigo cadastrado com sucesso'});
					}
					res.send();
				});
			}
		}
	);
}

module.exports.alterar = function (application, req, res) {

	var Codigo = application.app.models.Codigo;

	var codigo = new Codigo({
		_id: req.body._id,
		trecho: req.body.trecho,
		descricao: req.body.descricao,
	});

	Codigo.update({
		_id: req.body._id},
	 	codigo,
	 	{upsert: true},
	 	function(err){
	 		if(err){
				res.status(500).json({error: err});
				return;
			}else{
				res.status(200).json({msg: 'codigo alterado com sucesso'});
			}
			res.send();
		}
	);
}

module.exports.excluir = function (application, req, res) {

	application.app.models.Codigo.findOneAndRemove(
		{_id: req.params.id},
		function(err){
			if(err){
				res.status(500).json({error: err});
				return;
			}else{
				res.status(200).json({msg: 'codigo excluido com sucesso'});
			}
			res.send();
		}
	);
}

module.exports.codigobyid = function (application, req, res) {

	application.app.models.Codigo.
		findOne({ _id: req.params.id }).
		exec(function (err, codigo) {
			if(err){
				res.status(500).json({error: err});
				res.send();
			}else{
				res.send(JSON.stringify(codigo));
			}
		}); 
}

module.exports.codigos = function (application, req, res) {

	application.app.models.Codigo.
		find({projeto: req.params.id}).
		select('_id trecho').
		sort('trecho').
		exec(function (err, codigos) {
			if(err){
				res.status(500).json({error: err});
				res.send();
				return;
			}else{
				res.send(JSON.stringify(codigos));
			}
		});
}