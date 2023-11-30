// import {Phaser} from 'phaser'
import config from './config.js'
import sala from './cena-sala.js'

class Game extends Phaser.Game {
    constructor() {
        super(config)
        this.socket = io()

        this.socket.on('connection-success', ({ socketId }) => {
            console.log(socketId)
        })        
        this.scene.add('sala', sala)
        this.scene.start('sala')
    }
}

window.game = new Game()
