module.exports = function (application) {
	
	application.post('/cadastrar-codigo', function (req, res) {
		application.app.controllers.codigo.cadastrar(application, req, res);
	});

 	application.put('/alterar-codigo', function (req, res) {
		application.app.controllers.codigo.alterar(application, req, res);
	});

	application.get('/excluir-codigo/:id', function (req, res) {
		application.app.controllers.codigo.excluir(application, req, res);
	});

 	application.get('/codigo/:id', function (req, res) {
		application.app.controllers.codigo.codigobyid(application, req, res);
	});

	application.get('/codigos/:id', function (req, res) {
		application.app.controllers.codigo.codigos(application, req, res);
	});
} 