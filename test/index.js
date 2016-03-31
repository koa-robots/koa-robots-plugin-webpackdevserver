import fs from 'fs'
import koa from 'koa'
import path from 'path'
import webpackDev from '../dist'
import request from 'supertest'

describe('webpackDev', () => {
    it('webpackDev', (done) => {
        var app = koa()

        app.use(webpackDev())

        var agent = request(app.listen())

        new Promise(function(resolve, reject){
            agent.get('/build/bundle.js')
                .expect(/[hello]{5}/, (err) => {
                    if(err) throw err
                    resolve()
                })
        }).then(function(){
            new Promise(function(resolve, reject){
                fs.writeFile(path.resolve(__dirname, 'build/main.js'), "document.write('hello wrold')", function(err){
                    if(err){
                        reject(err)
                        return
                    }

                    resolve()
                })
            }).then(function(){
                setTimeout(function(){
                    agent.get('/build/bundle.js')
                        .expect(/[hello wrold]{11}/, (err) => {
                            if(err) throw err
                            done()
                        })
                }, 500)
            })
        })
    })
})
