module.exports.index = function(application, req, res) {

	application.app.models.Projeto.
		find().
		select('_id nome').
		populate('arquivos').
		populate('codigos').
		sort('nome').
		exec(function (err, projetos) {
			if (err){
				return handleError(err);
			} 
			res.render('index', {projetos: projetos});
		});
}