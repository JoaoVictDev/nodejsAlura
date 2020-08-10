class LivroDao{
	constructor(db){
		this._db = db;
	}

	lista(){
		return new Promise( (resolve, reject) => {
			this._db.all(
				'SELECT * FROM livros', 
				(err, resultado) => {
					if(err) return reject(err);

					resolve(resultado)
				}
			);
		});
	}

	adiciona(livro){
		return new Promise((resolve, reject) => {
			this._db.run(`
				INSERT INTO livros (titulo, preco, descricao)
				VALUES(?, ?, ?)
			`, [
				livro.titulo,
				livro.preco,
				livro.descricao
			], err => {
				if(err){ 
					reject(err);
					return 'Não foi possível adicionar o livro!';
				}

				resolve();
			});

		});
	}

	busca(id){
		return new Promise( (resolve, reject) => {
			this._db.run(`SELECT * FROM livros WHERE id = ?`,
			 [id],
			 (err, livro) => {
			 	if(err){
			 		console.log(erro);
			 		return 'Não foi possível efetuar a busca';
			 	}

			 	console.log('Busca efetuada com sucesso!');
			 	resolve(livro);

			 });
		})
	}

	atualiza(livro){
		return new Promise( (resolve, reject) => {
			this._db.run(
			`UPDATE livros SET 
				titulo= ?,
				preco= ?,
				descricao= ?
				WHERE id = ?
			`, [
				livro.titulo,
				livro.preco,
				livro.descricao,
				livro.id
			], err => {
				if(err){
					console.log(err);
					return reject('Não foi possivel atualizar!');
				}

				resolve();
			});
		})
	}

	remove(id){
		return new Promise((resolve, reject) => {
			this._db.run(`DELETE FROM livros WHERE id = ?`,
				[id],
				(err) => {
					if(err){
						console.log(err);
						return reject(`Não foi possível efetuar a remoção!`);
					}

					resolve();
				}
			);
		} )
	}
}

module.exports = LivroDao