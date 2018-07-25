$(document).ready(function () {

	$('#btn-novo-projeto').click(function () {
		var dlg = document.getElementById('dlg-cad-projeto');

		$('#header-dlg-projeto').text('Cadastrar Projeto');
		$('#id-projeto').val('');
		$('#txt-nome-projeto').val('');
		$('#txt-info-adic-projeto').val('');

	    dlg.showModal();
	});	

	$('#btn-cancel-projeto').click(function () {
		var dlg = document.getElementById('dlg-cad-projeto');
	    dlg.close();
	});

	$('#btn-salvar-projeto').click(function () {

		var idProj = $('#id-projeto').val();
		var nome = $('#txt-nome-projeto').val();
		var infoAdicional = $('#txt-info-adic-projeto').val();

		if(!nome){
			var dlg = document.getElementById('dlg-msg-erro');
			$('#msg-erro').text('Informe o nome do projeto antes de confirmar');
			dlg.showModal();
			return;
		}
		
		var data = {
			nome: nome,
			infoAdicional: infoAdicional
		};		

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){

				var resposta = xhr.responseText;
				
				$('#id-projeto').val('');
	    		$('#txt-nome-projeto').val('');
	    		$('#txt-info-adic-projeto').val('');

				var idInterval = setInterval(function () {

					var dlg = document.getElementById('dlg-msg');
					if(!idProj){
						$('#msg').text('Projeto cadastrado com sucesso!');
					}else{
						$('#msg').text('Projeto alterado com sucesso!');
					}

		    		dlg.showModal();
		    		clearInterval(idInterval);
				});

				var dlgProj = document.getElementById('dlg-cad-projeto');
			    dlgProj.close();

			    loadProjetos();
			}
		}


		if(!idProj){
			xhr.open("POST", "/cadastrar-projeto");
		}else{
			data._id = idProj;
			xhr.open("PUT", "/alterar-projeto");
		}

		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify(data));
		
	});

	$('#btn-editar-projeto').click(function () {

		var id = $("#select-projeto option:selected").val();

		if(!id){
			var dlg = document.getElementById('dlg-msg-erro');
			$('#msg-erro').text('Nenhum projeto selecionado para edição');
			dlg.showModal();
			return;
		}

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){

				var resposta = xhr.responseText;
				var proj = JSON.parse(resposta);

				var dlg = document.getElementById('dlg-cad-projeto');

				$('#header-dlg-projeto').text('Editar Projeto');
				$('#id-projeto').val(proj._id);
				$('#txt-nome-projeto').val(proj.nome);
	    		$('#txt-info-adic-projeto').val(proj.infoAdicional);

			    dlg.showModal();
	    	}
	    }

		xhr.open("GET", "/projeto/" + id);
		xhr.send();
	});

	$('#btn-exc-projeto').click(function () {

		var id = $("#select-projeto option:selected").val();

		if(!id){
			var dlg = document.getElementById('dlg-msg-erro');
			$('#msg-erro').text('Nenhum projeto selecionado para exclusão');
			dlg.showModal();
			return;
		}

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){

				var resposta = xhr.responseText;

				var idInterval = setInterval(function () {

					var dlg = document.getElementById('dlg-msg');
					$('#msg').text('Projeto excluido com sucesso!');
		    		dlg.showModal();
		    		clearInterval(idInterval);
				});
	    		loadProjetos();
	    	}
	    }

		xhr.open("GET", "/excluir-projeto/" + id);
		xhr.send();
	});

	$('#btn-novo-arquivo').click(function () {

		var id = $("#select-projeto option:selected").val();
		if(!id){
			var dlg = document.getElementById('dlg-msg-erro');
			$('#msg-erro').text('Nenhum projeto selecionado para criação de arquivo');
			dlg.showModal();
			return;
		}

		var dlg = document.getElementById('dlg-cad-arquivo');

		$('#header-dlg-arquivo').text('Cadastrar Arquivo');
		$('#id-arquivo').val('');
		$('#txt-titulo-arquivo').val('');
		$('#txt-texto-arquivo').val('');

	    dlg.showModal();
	});

	$('#btn-cancel-arquivo').click(function () {
		var dlg = document.getElementById('dlg-cad-arquivo');
	    dlg.close();
	});

	$('#btn-salvar-arquivo').click(function () {

		var id = $("#select-projeto option:selected").val();

		if(!id){
			return;
		}

	    var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){

				var resposta = xhr.responseText;
				var proj = JSON.parse(resposta);

				var idArq = $('#id-arquivo').val();
				var titulo = $('#txt-titulo-arquivo').val();
				var texto = $('#txt-texto-arquivo').val();

				if(!titulo || !texto){
					var dlg = document.getElementById('dlg-msg-erro');
					$('#msg-erro').text('Preencha todos os campos antes de confirmar');
					dlg.showModal();
					return;
				}
				
				var data = {
					titulo: titulo,
					texto: texto,
					projeto: proj
				};

				var xhr1 = new XMLHttpRequest();

				xhr1.onreadystatechange = function(){
					if(xhr1.readyState == 4){

						var resposta = xhr1.responseText;
						
						$('#id-arquivo').val('');
						$('#txt-titulo-arquivo').val('');
						$('#txt-texto-arquivo').val('');

						var idInterval = setInterval(function () {

							var dlg = document.getElementById('dlg-msg');
							if(!idArq){
								$('#msg').text('Arquivo cadastrado com sucesso!');
							}else{
								$('#msg').text('Arquivo alterado com sucesso!');
							}

				    		dlg.showModal();
				    		clearInterval(idInterval);
						});

						var dlgArq = document.getElementById('dlg-cad-arquivo');
					    dlgArq.close();

					    loadArquivos();
					}
				}


				if(!idArq){
					xhr1.open("POST", "/cadastrar-arquivo");
				}else{
					data._id = idArq;
					xhr1.open("PUT", "/alterar-arquivo");
				}

				xhr1.setRequestHeader("Content-Type", "application/json");
				xhr1.send(JSON.stringify(data));
			}
		}

		xhr.open("GET", "/projeto/" + id);
		xhr.send();
	});

	$('#btn-editar-arquivo').click(function () {

		var id = $("#select-arquivo option:selected").val();

		if(!id){
			var dlg = document.getElementById('dlg-msg-erro');
			$('#msg-erro').text('Nenhum arquivo selecionado para edição');
			dlg.showModal();
			return;
		}

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){

				var resposta = xhr.responseText;
				var arq = JSON.parse(resposta);

				var dlg = document.getElementById('dlg-cad-arquivo');

				$('#header-dlg-arquivo').text('Editar Arquivo');
				$('#id-arquivo').val(arq._id);
				$('#txt-titulo-arquivo').val(arq.titulo);
	    		$('#txt-texto-arquivo').val(arq.texto);

			    dlg.showModal();
	    	}
	    }

		xhr.open("GET", "/arquivo/" + id);
		xhr.send();
	});

	$('#btn-exc-arquivo').click(function () {

		var id = $("#select-arquivo option:selected").val();

		if(!id){
			var dlg = document.getElementById('dlg-msg-erro');
			$('#msg-erro').text('Nenhum arquivo selecionado para exclusão');
			dlg.showModal();
			return;
		}

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){

				var resposta = xhr.responseText;

				var idInterval = setInterval(function () {

					var dlg = document.getElementById('dlg-msg');
					$('#msg').text('Arquivo excluido com sucesso!');
		    		dlg.showModal();
		    		clearInterval(idInterval);
				});
	    		loadArquivos();
	    	}
	    }

		xhr.open("GET", "/excluir-arquivo/" + id);
		xhr.send();
	});

	$('#btn-ok-msg').click(function () {
		var dlg = document.getElementById('dlg-msg');
		dlg.close(); 
	});

	$('#btn-ok-msg-erro').click(function () {
		var dlg = document.getElementById('dlg-msg-erro');
		dlg.close();
	});

	/* tornar o botao de novo codigo visivel ou invisivel */
	$("#txt-area-texto-arquivo").mouseup(function(){
    	var selectedText = window.getSelection().toString();
    	if(selectedText){
    		
    		$('#btn-novo-codigo').show();

    		var idInterval = setInterval(function () {

    			var selectedText = window.getSelection().toString();
    			if(!selectedText){
    				$('#btn-novo-codigo').hide();
	    			clearInterval(idInterval);
    			}
    		});
    	}
	});

	$('#btn-novo-codigo').click(function() {
		var dlg = document.getElementById('dlg-cad-codigo');

		$('#header-dlg-codigo').text('Cadastrar Código');
		$('#id-codigo').val('');
		$('#txt-trecho').val(window.getSelection().toString().trim());
		$('#txt-codigos').val('');

	    dlg.showModal();
	});

	$('#btn-cancel-codigo').click(function () {
		var dlg = document.getElementById('dlg-cad-codigo');
	    dlg.close();
	});

	$('#btn-salvar-codigo').click(function() {

		var id = $("#select-projeto option:selected").val();

		if(!id){
			return;
		}

	    var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){

				var resposta = xhr.responseText;
				var proj = JSON.parse(resposta);

				var idCod = $('#id-codigo').val();
				var trecho = $('#txt-trecho').val().normalize().trim();
				var descricao = $('#txt-codigos').val();
			
				if(!trecho || !descricao){
					var dlg = document.getElementById('dlg-msg-erro');
					$('#msg-erro').text('Preencha todos os campos antes de confirmar');
					dlg.showModal();
					return;
				}

				var data = {
					trecho: trecho,
					descricao: descricao,
					projeto: proj
				};

				var xhr1 = new XMLHttpRequest();

				xhr1.onreadystatechange = function(){
					if(xhr1.readyState == 4){

						var resposta = xhr1.responseText;
						
						$('#id-codigo').val('');
						$('#txt-trecho').val('');
						$('#txt-codigos').val('');

						var idInterval = setInterval(function () {

							var dlg = document.getElementById('dlg-msg');
							if(!idCod){
								$('#msg').text('Código cadastrado com sucesso!');
							}else{
								$('#msg').text('Código alterado com sucesso!');
							}

				    		dlg.showModal();
				    		clearInterval(idInterval);
						});

						var dlgCod = document.getElementById('dlg-cad-codigo');
					    dlgCod.close();

	    				loadCodigos();

					}
				}

				if(!idCod){
					xhr1.open("POST", "/cadastrar-codigo");
				}else{
					data._id = idCod;
					xhr1.open("PUT", "/alterar-codigo");
				}

				xhr1.setRequestHeader("Content-Type", "application/json");
				xhr1.send(JSON.stringify(data));
			}
		}

		xhr.open("GET", "/projeto/" + id);
		xhr.send();
	});

	$('#btn-editar-codigo').click(function() {

		var id = $("#select-codigo option:selected").val();

		if(!id){
			var dlg = document.getElementById('dlg-msg-erro');
			$('#msg-erro').text('Nenhum código selecionado para edição');
			dlg.showModal();
			return;
		}

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){

				var resposta = xhr.responseText;
				var cod = JSON.parse(resposta);

				var dlg = document.getElementById('dlg-cad-codigo');

				$('#header-dlg-codigo').text('Editar Código');
				$('#id-codigo').val(cod._id);
				$('#txt-trecho').val(cod.trecho);
	    		$('#txt-codigos').val(cod.descricao);

			    dlg.showModal();
	    	}
	    }

		xhr.open("GET", "/codigo/" + id);
		xhr.send();
	});

	$('#btn-exc-codigo').click(function () {

		var id = $("#select-codigo option:selected").val();

		if(!id){
			var dlg = document.getElementById('dlg-msg-erro');
			$('#msg-erro').text('Nenhum código selecionado para exclusão');
			dlg.showModal();
			return;
		}

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){

				var resposta = xhr.responseText;

				var idInterval = setInterval(function () {

					var dlg = document.getElementById('dlg-msg');
					$('#msg').text('Código excluido com sucesso!');
		    		dlg.showModal();
		    		clearInterval(idInterval);
				});
				loadCodigos();
	    	}
	    }

		xhr.open("GET", "/excluir-codigo/" + id);
		xhr.send();
	});

	$('#select-projeto').change(function() {

	    var id = $(this).val();

	    var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){

				var resposta = xhr.responseText;
				var proj = JSON.parse(resposta);

				$('#select-arquivo').empty();
				$('#select-arquivo').append('<option value="" selected hidden>Selecione</option>');

				if(proj.arquivos.length > 0){
					$.each(proj.arquivos, function (i, arq) {
					    $('#select-arquivo').append($('<option>', { 
					        value: arq._id,
					        text : arq.titulo 
					    }));
					});
				}else{
					$('#txt-area-texto-arquivo').empty();
				}

				$('#select-codigo').empty();
				$('#select-codigo').append('<option value="" selected hidden>Selecione</option>');

				$.each(proj.codigos, function (i, cod) {
				    $('#select-codigo').append($('<option>', { 
				        value: cod._id,
				        text : cod.trecho 
				    }));
				});
			}
		}

		xhr.open("GET", "/projeto/" + id);
		xhr.send();
	});

	$('#select-arquivo').change(function() {

	    var id = $(this).val();

	    var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){

				var resposta = xhr.responseText;
				var arq = JSON.parse(resposta);

				var texto = arq.texto
					.replaceAll('\n', '<br>'); // espaco

				$('#txt-area-texto-arquivo').empty();
				$('#txt-area-texto-arquivo').append(texto);
			}
		}

		xhr.open("GET", "/arquivo/" + id);
		xhr.send();
	});

	$('#select-codigo').change(function() {

		var idArq = $("#select-arquivo option:selected").val();
		var idCod = $(this).val();

		if(!idArq){
			return;
		}

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){

				var resposta = xhr.responseText;
				var arq = JSON.parse(resposta);

				var texto = arq.texto
					 .replaceAll('\n', '<br>');
					
			    var xhr1 = new XMLHttpRequest();

				xhr1.onreadystatechange = function(){
					if(xhr1.readyState == 4){

						var resposta = xhr1.responseText;
						var cod = JSON.parse(resposta);

						var novoTexto = texto
							.replaceWords(
								cod.trecho,
								'<div class="tooltip">' +
									cod.trecho +
									'<span class="tooltip-text">' +
										cod.descricao +
									'</span>' +
								'</div>'
							);

						var html = $.parseHTML(novoTexto);

						$('#txt-area-texto-arquivo').empty();
						$('#txt-area-texto-arquivo').append(html);
					}
				}

				xhr1.open("GET", "/codigo/" + idCod);
				xhr1.send();
				
			}
		}

		xhr.open("GET", "/arquivo/" + idArq);
		xhr.send();
	});
});

function loadProjetos() {

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){

			var resposta = xhr.responseText;
			var projetos = JSON.parse(resposta);

			$('#select-projeto').empty();
			$('#select-projeto').append('<option value="" selected hidden>Projeto</option>');
			
			$.each(projetos, function (i, proj) {
			    $('#select-projeto').append($('<option>', { 
			        value: proj._id,
			        text : proj.nome 
			    }));
			});

			$('#select-arquivo').empty();
			$('#select-arquivo').append('<option value="" selected hidden>Selecione</option>');
			$('#txt-area-texto-arquivo').empty();

			$('#select-codigo').empty();
			$('#select-codigo').append('<option value="" selected hidden>Selecione</option>');
		}
	}

	xhr.open("GET", "/projetos");
	xhr.send();
}

function loadArquivos() {

	var idProj = $("#select-projeto option:selected").val();

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){

			var resposta = xhr.responseText;
			var arquivos = JSON.parse(resposta);

			$('#select-arquivo').empty();
			$('#select-arquivo').append('<option value="" selected hidden>Selecione</option>');
			$('#txt-area-texto-arquivo').empty();

			$.each(arquivos, function (i, arq) {
			    $('#select-arquivo').append($('<option>', { 
			        value: arq._id,
			        text : arq.titulo 
			    }));
			});
		}
	}

	xhr.open("GET", "/arquivos/" + idProj);
	xhr.send();
}

function loadCodigos() {

	var idProj = $("#select-projeto option:selected").val();

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){

			var resposta = xhr.responseText;
			var codigos = JSON.parse(resposta);

			$('#select-codigo').empty();
			$('#select-codigo').append('<option value="" selected hidden>Selecione</option>');

			$.each(codigos, function (i, cod) {
			    $('#select-codigo').append($('<option>', { 
			        value: cod._id,
			        text : cod.trecho 
			    }));
			});
		}
	}

	xhr.open("GET", "/codigos/" + idProj);
	xhr.send();
}