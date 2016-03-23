import koa from 'koa'
import fs from 'co-fs'
import {join} from 'path'
import request from 'supertest'
import webpackDevServer from '../dist'

describe('webpackDevServer', () => {
    it('text/html', (done) => {
        var app = koa()

        app.use(webpackDevServer())
        app.use(function *(next){
            this.type = 'html'
            this.body = yield fs.createReadStream(join(process.cwd(), './test/views/index.html'))
        })

        setTimeout(function(){
            request(app.listen())
                .get('/')
                .expect(function(res){
                    res.text.should.containEql('webpack-dev-server.js')
                })
                .end(done)
        }, 100)
    })

    it('text/plain', (done) => {
        var app = koa()

        app.use(webpackDevServer())
        app.use(function *(next){
            this.type = 'text'
            this.body = yield fs.createReadStream(join(process.cwd(), './test/views/index.html'))
        })

        request(app.listen())
            .get('/')
            .expect(function(res){
                res.text.should.not.containEql('webpack-dev-server.js')
            })
            .end(done)
    })
})
