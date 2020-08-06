const db = require('../../config/database');
const LivroDao = require('../infra/livro-dao.js');
const livroDao = new LivroDao(db);

module.exports = (app) => {
    app.get('/', (req, resp) => {
        resp.send(
            `
                <html>
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1> Casa do Código </h1>
                    </body>
                </html>
            `
        );
    });
    
    app.get('/livros', (req, resp) => {   
        livroDao.lista()
            .then((livros) =>{
                resp.marko(
                    require('../views/livros/lista/lista.marko'),
                    {
                            livros
                    }
                )
            }).catch( err => console.log(err))

    });

    app.get('/livros/form', (req, resp) => {
        resp.marko(
            require('../views/livros/form/form.marko')
        )
    });

    app.post('/livros', (req, resp) => {
        console.log(req.body);
    
        livroDao.adiciona(req.body)
            .then(resp.redirect('/livros'))
            .catch( err => console.log(err));
    });

    app.delete('/livros/:id', (req, resp) => {
        const livroId = req.params.id;
        livroDao.remove(livroId)
            .then( () => resp.status(200).end())
            .catch( err => console.log(err));
    });
};