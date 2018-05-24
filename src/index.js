import 'aframe';
import 'aframe-gradient-sky';
import 'aframe-physics-system';

import '../node_modules/three.terrain.js/build/THREE.Terrain.min.js';

// Images
import heightmapPNG from './heightmap.png';
// import castle from './static/Castle.glb';

import load from 'load-asset';

// import tree from './Tree.gltf';








function initScene(assets){
  console.log('init Scene');



  // Init Aframe components
  AFRAME.registerComponent('landscape', {
    schema: {

    },
    /**
     * Initial creation and setting of the mesh.
     */
    init: function(){
      console.log(assets.heightmap);

      // var data = this.data;
      var landscape = this.el;
      // var heightmap = new Image();
      // heightmap.addEventListener('load', function() {
        // console.log(this.data.heightmap)
        console.log(landscape);
        // Generate a terrain
        var xS = 200, yS = 200;
        var terrainScene = THREE.Terrain({
            easing: THREE.Terrain.EaseIn,
            frequency: 2.5,
            heightmap: assets.heightmap,
            material: new THREE.MeshLambertMaterial({color: 0x57A773 }),
            maxHeight: 5,
            minHeight: -5,
            steps: 1,
            useBufferGeometry: true,
            xSegments: xS,
            xSize: 100,
            ySegments: yS,
            ySize: 100,
        });
        landscape.setObject3D('mesh', terrainScene);

      // }, false);
      // heightmap.src = heightmapPNG;

    }
  });
}


async function preload () {
  // Resolves to an object mapping
  const assets = await load.any({
    heightmap: heightmapPNG,
    // diffuse: 'foo/diffuse.png'
  })
  .then(assets => {
    console.log(assets);
    initScene(assets);
  });
}
preload();





// ;(function(){

    /* Onload init */
    // var init = function(){
    //   var playerEl = document.getElementById('player');
    //   console.log(playerEl);
    //   playerEl.addEventListener('collide', function (e) {
    //   console.log('Player has collided with body #' + e.detail.body.id);
    //
    //   e.detail.target.el;  // Original entity (playerEl).
    //   e.detail.body.el;    // Other entity, which playerEl touched.
    //   e.detail.contact;    // Stats about the collision (CANNON.ContactEquation).
    //   e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
    //   });
    // };
    // window.addEventListener('load', init, false );


    /* Landscape rendered form heightmap */



    /* Sea */
    // AFRAME.registerPrimitive('a-sea-plane', {
    //  defaultComponents: {
    //   geometry: {
    //    primitive: 'plane',
    //    height: 300,
    //    width: 300
    //   },
    //   rotation: '-90 0 0',
    //   material: {
    //    shader: THREE.FlatShading,
    //    color: '#8FB8DE',
    //    metalness: 1,
    //    roughness: 0.2,
       // normalTextureRepeat: '50 50',
       // normalTextureOffset: '0 0',
       // normalScale: '0.5 0.5',
    //    opacity: 0.6
    //   },
    //   // 'wobble-normal': {}
    //  },
    // });
    // AFRAME.registerShader('water', {
    //   schema: {
    //     // ... Define schema to pass properties from DOM to this component
    //     color: {type: 'color', is: 'uniform'},
    //     opacity: {type: 'number', is: 'uniform', default: .6}
    //   },
    //   init: function () {
    //     var el = this.el;  // Entity.
    //     console.log(el);
    //     // var mythreejsobject = // ... Create three.js object.
    //     var mat = new THREE.MeshPhongMaterial({
    //   		color: 0x8FB8DE,
    //   		transparent: true,
    //   		opacity: .6,
    //   		shading: THREE.FlatShading,
    //   	});
    //     console.log(mat);
    //     el.setObject3D('material', mat);
    //   }
    // });

// })();





//return array with height data from img
function getHeightData(img,scale) {

 if (scale == undefined) scale=1;

    var canvas = document.createElement( 'canvas' );
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext( '2d' );

    var size = img.width * img.height;
    var data = new Float32Array( size );

    context.drawImage(img,0,0);

    for ( var i = 0; i < size; i ++ ) {
        data[i] = 0
    }

    var imgd = context.getImageData(0, 0, img.width, img.height);
    var pix = imgd.data;

    var j=0;
    for (var i = 0; i<pix.length; i +=4) {
        var all = pix[i]+pix[i+1]+pix[i+2];
        data[j++] = all/(12*scale);
    }

    return data;
}
