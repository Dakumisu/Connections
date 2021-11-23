import './main.scss'

import { TweenLite, TweenMax, gsap } from 'gsap' // https://greensock.com/docs/
import howlerjs from 'howler' // https://github.com/goldfire/howler.js#documentation

import Scene from '@js/Scene' // Création de la scène + renderer + camera
import LoadModel from '@js/LoadModel' // Chargement d'un modèle 3D
import Mouse from '@js/Mouse' // Obtenir la position de la souris dans tous les environnement
import Raycaster from '@js/Raycaster' // Création de raycasters si besoin
import Control from '@js/Control' // Orbitcontrol (pour le debbugage)
import Settings from '@js/Settings' // Dat.gui (toujours pour le debbugage)
import Device from '@js/Device'
import Raf from '@js/Raf'
import Datas from '@js/Datas'

import DarkHole from '@js/DarkHole'
import Themes from '@js/Themes'
import Users from '@js/Users'
import Connections from '@js/Connections'
// import User from '@js/User'

// const darkHole = new DarkHole()
// const themes = new Themes()
const users = new Users()
const connections = new Connections()

document.addEventListener('keydown', e => {
    console.log(`${e.key} touch pressed`)
})

Raf.suscribe('update', () => { update() })

function update() {
    Scene.update()
    // darkHole.update()
    // users.update(Raf.timeElapsed)
    Themes.update()
    Control.controls.update()
}