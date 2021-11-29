import './main.scss'

import { TweenLite, TweenMax, gsap } from 'gsap' // https://greensock.com/docs/
import Splitting from "splitting";
Splitting();

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
import Views from '@js/Views'
import Preloader from '@js/Preloader'
import SoundController from '@js/SoundController'

import DarkHole from '@js/DarkHole'
import Themes from '@js/Themes'
import ParticlesTrails from '@js/ParticlesTrails'
import SphereParticles from '@js/SphereParticles'
import Univers from '@js/Univers'
import Users from '@js/Users'
import Connections from '@js/Connections'

// DarkHole.start()

Users.start()
Connections.start()
Themes.start()
Score.start()

document.addEventListener('keydown', e => {
    console.log(`${e.key} touch pressed`)
})

Views.startExp()
// setTimeout(() => {
//     Views.goToUserInfo('xX_PRO_GAMER_35310_Xx')
// }, 2000);

Raf.suscribe('update', () => { update() })

function update() {
    document.body.style.cursor = 'default'

    updateExp()
}

function updateExp() {
    PostProcessing.render()
    Users.update()
    Connections.update()
    Themes.update()
    Control.controls.update()
}