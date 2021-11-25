import './main.scss'

import { TweenLite, TweenMax, gsap } from 'gsap' // https://greensock.com/docs/
import howlerjs from 'howler' // https://github.com/goldfire/howler.js#documentation

import Scene from '@js/Scene'
import PostProcessing from '@js/PostProcessing' // Création de la scène + renderer + camera
import LoadModel from '@js/LoadModel' // Chargement d'un modèle 3D
import Mouse from '@js/Mouse' // Obtenir la position de la souris dans tous les environnement
import Raycaster from '@js/Raycaster' // Création de raycasters si besoin
import Control from '@js/Control' // Orbitcontrol (pour le debbugage)
import Settings from '@js/Settings' // Dat.gui (toujours pour le debbugage)
import Device from '@js/Device'
import Raf from '@js/Raf'
import Datas from '@js/Datas'
import Score from '@js/Score'

import DarkHole from '@js/DarkHole'
import Themes from '@js/Themes'
import ParticlesTrails from '@js/ParticlesTrails'
import SphereParticles from '@js/SphereParticles'
import Univers from '@js/Univers'
import Users from '@js/Users'
import Connections from '@js/Connections'
// import User from '@js/User'

const darkHole = new DarkHole()
// const users = new Users()
// const connections = new Connections()

// Themes.start()

// const univers = new Univers()

document.addEventListener('keydown', e => {
    console.log(`${e.key} touch pressed`)
})

Raf.suscribe('update', () => { update() })

function update() {
    Scene.render()
    // PostProcessing.render()
    darkHole.update()
    // users.update(Raf.timeElapsed)
    // connections.update()
    // Themes.update()
    // univers.update()
    Control.controls.update()
}