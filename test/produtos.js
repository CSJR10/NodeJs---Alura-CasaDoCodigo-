var express = require('../config/express')();
var request = require('supertest')(express);

describe('ProdutosController', function () {

    beforeEach(function (done) {
        var conn = express.infra.connectionFactory();
        conn.query('delete from produtos', function (ex, results) {
            console.log()
            if (!ex) {
                done();
            }
        })
    });

    it('#listagem json', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    it('#listagem html', function (done) {
        request.get('/produtos')
            .set('Accept', 'text/html')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
    it('#cadastro de novo produto com dados inválidos', function (done) {
        request.post('/produtos')
            .send({ titulo: "", descricao: "" })
            .expect(400, done);
    });
    it('#cadastro de novo produto com dados válidos', function (done) {
        request.post('/produtos')
            .send({ titulo: "titulo teste", descricao: "novo livro teste", preco: 20.50 })
            .expect(302, done);
    });
});