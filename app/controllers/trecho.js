module.exports.cadastrar = function (application, req, res) {

	var codigo = new application.app.models.Codigo(
		req.body.codigo
	);

	application.app.models.Trecho.
	findOne({
		descricao: req.body.descricao,
		projeto: req.body.codigo.projeto
	}).
	exec(function (err, trech) {
		if (err) { 
			res.status(500).json({error: err});
		}
		
		if(trech){

			codigo.trechos.push(trech);
			trech.codigos.push(codigo);

			application.app.models.Trecho.update({
				_id: trech._id},
			 	trech,
			 	{upsert: true},
			 	function(err){
			 		if(err){
						res.status(500).json({error: err});
						return;
					}else{

						application.app.models.Codigo.update({
						_id: codigo._id},
					 	codigo,
					 	{upsert: true},
					 	function(err){
						 		if(err){
									res.status(500).json({error: err});
									return;
								}else{
									res.status(200).json({msg: 'trecho alterado com sucesso'});
								}
							}
						);
					}
				}
			);

		} else {

			var trecho = new application.app.models.Trecho({
				_id: new mongoose.Types.ObjectId(),
				descricao: req.body.descricao,
				projeto: req.body.codigo.projeto
			});

			codigo.trechos.push(trecho);
			trecho.codigos.push(codigo);

			trecho.save(function(err) {
				if(err){
					res.status(500).json({error: err});
				}else{

					application.app.models.Codigo.update({
						_id: codigo._id},
					 	codigo,
					 	{upsert: true},
					 	function(err){
					 		if(err){
								res.status(500).json({error: err});
								return;
							}else{				
								res.status(200).json({msg: 'trecho cadastrado com sucesso'});
							}
						}
					);
				}
			});
		}

	}); 
}

module.exports.trechobydesc = function (application, req, res) {

	application.app.models.Trecho.
	findOne({
		descricao: req.params.descricao,
		projeto: req.params.idprojeto
	}).
	populate('codigos').
	exec(function (err, trecho) {
		if (err) { 
			res.status(500).json({error: err});
			return;
		} else {
			res.send(JSON.stringify(trecho));
		} 
	}); 
}
