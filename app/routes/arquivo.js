module.exports = function (application) {
	
	application.post('/cadastrar-arquivo', function (req, res) {
		application.app.controllers.arquivo.cadastrar(application, req, res);
	});

 	application.put('/alterar-arquivo', function (req, res) {
		application.app.controllers.arquivo.alterar(application, req, res);
	});

	application.get('/excluir-arquivo/:id', function (req, res) {
		application.app.controllers.arquivo.excluir(application, req, res);
	});

 	application.get('/arquivo/:id', function (req, res) {
		application.app.controllers.arquivo.aquivobyid(application, req, res);
	});

	application.get('/arquivos/:id', function (req, res) {
		application.app.controllers.arquivo.arquivos(application, req, res);
	});
} 