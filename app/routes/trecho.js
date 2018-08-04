module.exports = function (application) {
	
	application.post('/cadastrar-trecho', function (req, res) {
		application.app.controllers.trecho.cadastrar(application, req, res);
	});

 	application.get('/trecho/:descricao/:idprojeto', function (req, res) {
		application.app.controllers.trecho.trechobydesc(application, req, res);
	});
} 