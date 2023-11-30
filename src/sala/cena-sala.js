export default class sala extends Phaser.Scene {
  constructor () {
    super('sala')
  }

  preload () {
    this.load.image('rpg', '/assets/abertura.png')
  }

  create () {
    this.imagem = this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5, 'rpg').setTint(0xcccccc)
    this.mensagem = this.add.text(100, 75, 'Escolha uma sala para entrar:', {
      fontFamily: 'monospace',
      font: '32px Courier',
      fill: '#cccccc'
    })
    this.salas = [
      {
        numero: '0',
        x: 150,
        y: 125,
        botao: undefined
      },
      {
        numero: '1',
        x: 150,
        y: 175,
        botao: undefined
      },
      {
        numero: '2',
        x: 150,
        y: 225,
        botao: undefined
      },
      {
        numero: '3',
        x: 150,
        y: 275,
        botao: undefined
      }
    ]

    this.salas.forEach((item) => {
      item.botao = this.add
        .text(item.x, item.y, '[Sala ' + item.numero + ']', {
          fontFamily: 'monospace',
          font: '32px Courier',
          fill: '#cccccc',
        })
        .setInteractive()
        .on('pointerdown', () => {
          this.salas.forEach((item) => {
            item.botao.destroy()
          })
          this.game.sala = item.numero
          this.game.socket.emit('entrar-na-sala', this.game.sala)
        })
    })

    // this.game.socket.on('jogadores', (jogadores) => {
    //   console.log(jogadores)
    //   if (jogadores.segundo) {
    //     this.mensagem.destroy()
    //     this.game.jogadores = jogadores
    //     this.game.scene.start('principal')
    //   } else if (jogadores.primeiro) {
    //     this.grade.destroy()
    //     this.imagem.destroy()
    //     this.mensagem.setText('Aguardando segundo jogador...')

    //     /* Captura de áudio */
    //     navigator.mediaDevices
    //       .getUserMedia({ video: false, audio: true })
    //       .then((stream) => {
    //         this.game.midias = stream
    //       })
    //       .catch((error) => console.log(error))
    //   }
    // })
  }
}
