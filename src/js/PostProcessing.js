import { Vector2 } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';

import Scene from '@js/Scene'
import { Store } from '@js/Store'

const tVec2a = new Vector2()

class PostProcessing {
   constructor() {
      this.canvas = document.querySelector('canvas.webgl')

      this.postProcessing()
   }

   postProcessing() {
      this.renderScene = new RenderPass( Scene.scene, Scene.camera );

      this.bloomPass = new UnrealBloomPass( tVec2a.set(Store.sizes.width, Store.sizes.height ));
      this.bloomPass.threshold = 0;
      this.bloomPass.strength = .75;
      this.bloomPass.radius = 0;

      this.afterimagePass = new AfterimagePass();
      this.afterimagePass.uniforms.damp.value = .65

      
      this.composer = new EffectComposer( Scene.renderer );
      this.composer.addPass( this.renderScene );
		this.composer.addPass( this.afterimagePass );
      this.composer.addPass( this.bloomPass );
   }

   render() {
      this.composer.render()
   }
}

const out = new PostProcessing()
export default out