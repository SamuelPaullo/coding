module.exports.cadastrar = function (application, req, res) {

	var projeto = new application.app.models.Projeto({
		_id: new mongoose.Types.ObjectId(),
		nome: req.body.nome,
		infoAdicional: req.body.infoAdicional
	});

    projeto.save(function(err) {
		if(err){
			res.status(500).json({error: err});
			return;
		}else{
			res.status(200).json({msg: 'projeto cadastrado com sucesso'});
		}
		res.send();
	}); 
}

module.exports.alterar = function (application, req, res) {

	var Projeto = application.app.models.Projeto;

	var projeto = new Projeto({
		_id: req.body._id,
		nome: req.body.nome,
		infoAdicional: req.body.infoAdicional
	});

	Projeto.update({
		_id: req.body._id},
	 	projeto,
	 	{upsert: true},
	 	function(err){
	 		if(err){
				res.status(500).json({error: err});
				return;
			}else{
				res.status(200).json({msg: 'projeto alterado com sucesso'});
			}
			res.send();
		}
	);
}

module.exports.excluir = function (application, req, res) {

	application.app.models.Projeto.findOneAndRemove(
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

module.exports.projetobyid = function (application, req, res) {

	application.app.models.Projeto.
		findOne({ _id: req.params.id }).
		populate('arquivos').
		populate('codigos').
		exec(function (err, projeto) {
			if (err) { 
				console.log(err);
			}
			res.send(JSON.stringify(projeto));
		}); 
}

module.exports.projetos = function (application, req, res) {

	application.app.models.Projeto.
		find().
		select('_id nome').
		populate('arquivos').
		populate('codigos').
		sort('nome').
		exec(function (err, projetos) {
			if(err){
				res.status(500).json({error: err});
				res.send();
				return;
			}else{
				res.send(JSON.stringify(projetos));
			}
		});
}