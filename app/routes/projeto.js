module.exports = function (application) {
	application.post('/cadastrar-projeto', function (req, res) {
		application.app.controllers.projeto.cadastrar(application, req, res);
	});

	application.put('/alterar-projeto', function (req, res) {
		application.app.controllers.projeto.alterar(application, req, res);
	});

	application.get('/excluir-projeto/:id', function (req, res) {
		application.app.controllers.projeto.excluir(application, req, res);
	});

	application.get('/projeto/:id', function (req, res) {
		application.app.controllers.projeto.projetobyid(application, req, res);
	});	

	application.get('/projetos', function (req, res) {
		application.app.controllers.projeto.projetos(application, req, res);
	});	
} 