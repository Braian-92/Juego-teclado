// import * as THREE from './libs/three/build/three.module.js';
import * as THREE from 'three';
import {
  RGBELoader
} from './libs/three/examples/jsm/loaders/RGBELoader.js';
import {
  LoadingBar
} from './libs/LoadingBar.js';
//! libreria de sonidos
// https://pixabay.com/sound-effects/search/key-press/
import {
  SFX
} from './SFX.js';
import {
  TecladoFlotante
} from './TecladoFlotante.js';

import { 
  FontLoader
} from 'three/addons/loaders/FontLoader.js';
import {
  TextGeometry
} from 'three/addons/geometries/TextGeometry.js';

// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

class Game {
  constructor() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    this.loadingBar = new LoadingBar();
    this.loadingBar.visible = false;

    this.clock = new THREE.Clock();

    this.assetsPath = './assets/';

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
    // this.camera.position.set(-4.37, 0, -4.75);
    this.camera.position.set(0, 0, 30);
    // this.camera.lookAt(0, 0, 6);

    // this.cameraController = new THREE.Object3D();
    // this.cameraController.add(this.camera);
    // this.cameraTarget = new THREE.Vector3(0, 0, 0);

    this.scene = new THREE.Scene();
    // this.scene.add(this.cameraController);

    const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    ambient.position.set(0.5, 1, 0.25);
    this.scene.add(ambient);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(this.renderer.domElement);
    this.setEnvironment();

    this.active = false;
    this.load();

    window.addEventListener('resize', this.resize.bind(this));

    document.addEventListener('keypress', this.keypress.bind(this));
    document.addEventListener('keydown', this.keyDown.bind(this));
    document.addEventListener('keyup', this.keyUp.bind(this));

    document.addEventListener('touchstart', this.mouseDown.bind(this));
    document.addEventListener('touchend', this.mouseUp.bind(this));
    document.addEventListener('mousedown', this.mouseDown.bind(this));
    document.addEventListener('mouseup', this.mouseUp.bind(this));

    this.spaceKey = false;

    this.agregarElementos();
    this.crearTexto('EVELYN');

    this.teclado = new TecladoFlotante({
      id : 'tecladoF',
      presionado: function(parametros) {
        const tecla = parametros.ascii;
        const tipoTecla = parametros.tipo;
        console.log('TECLA APRETADA: ' + tecla + ' - topo: ' + tipoTecla);
      }
    });

    // const btn = document.getElementById('playBtn');
    // btn.addEventListener('click', this.startGame.bind(this));
  }

  

  crearTexto(text) {
    let bevelEnabled = true,
        font = undefined,
        fontName = 'optimer', // helvetiker, optimer, gentilis, droid sans, droid serif
        fontWeight = 'bold'; // normal bold
    
    const depth = 0.1,
        size = 10,
        hover = .1,
        curveSegments = 10,
        bevelThickness = 1, // profundidad del texto en 3D
        bevelSize = .1;

    let escenaPrincipal = this.scene;
    let letras = []; // Array para almacenar las letras individuales
    let separacionLetras = 2; // Separación entre letras

    const loader = new FontLoader();
    loader.load( './libs/three/examples/fonts/' + fontName + '_' + fontWeight + '.typeface.json', function ( response ) {
        font = response;

        let materialsPorLetra = []; // Array para almacenar materiales por letra

        for (let i = 0; i < text.length; i++) {
            // Crear material con color aleatorio
            let color = Math.random() * 0xffffff;
            let material = new THREE.MeshPhongMaterial({ color: color, flatShading: true });
            materialsPorLetra.push(material);
        }

        let totalWidth = 0;

        // Crear y posicionar cada letra
        for (let i = 0; i < text.length; i++) {
            let letraGeo = new TextGeometry( text[i], {
                font: font,
                size: size,
                depth: depth,
                curveSegments: curveSegments,
                bevelThickness: bevelThickness,
                bevelSize: bevelSize,
                bevelEnabled: bevelEnabled
            } );

            // Crear la malla de la letra con el material correspondiente
            let letraMesh = new THREE.Mesh( letraGeo, materialsPorLetra[i] );

            // Calcular el desplazamiento horizontal de la letra
            letraGeo.computeBoundingBox();
            let letterWidth = letraGeo.boundingBox.max.x - letraGeo.boundingBox.min.x;
            letraMesh.position.x = totalWidth + (i > 0 ? separacionLetras : 0); // Separación entre letras
            totalWidth += letterWidth + separacionLetras; // Acumular el ancho total
            letraMesh.position.z = 0;

            // Agregar la letra a la escena y al array
            escenaPrincipal.add( letraMesh );
            letras.push(letraMesh);
        }

        // Calcular el centro del texto
        const centerOffset = -0.5 * totalWidth;

        // Centrar el grupo de letras
        letras.forEach(letraMesh => {
            letraMesh.position.x += centerOffset;
        });
    });
  }

  agregarElementos() {
    // console.log('agregar elementos');
    const torusKnotGeometry = new THREE.TorusKnotGeometry(0.2, 0.05);
    const torusKnotMaterial = new THREE.MeshStandardMaterial();
    const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
    torusKnotMesh.castShadow = true;
    // torusKnotMesh.position.y = 0.7;
    torusKnotMesh.position.set(0,0,0);
    this.scene.add(torusKnotMesh);
  }

  startGame() {
    // const gameover = document.getElementById('gameover');
    // const instructions = document.getElementById('instructions');
    // const btn = document.getElementById('playBtn');

    // gameover.style.display = 'none';
    // instructions.style.display = 'none';
    // btn.style.display = 'none';

    this.score = 0;
    this.bonusScore = 0;
    this.lives = 3;

    // let elm = document.getElementById('score');
    // elm.innerHTML = this.score;

    elm = document.getElementById('lives');
    elm.innerHTML = this.lives;

    // this.plane.reset();
    // this.obstacles.reset();

    this.active = true;

    this.sfx.play('engine');
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  keypress(evt) {
    // this.sfx.playMulti('tecla');
  }

  keyDown(evt) {
    this.sfx.stopAll();
    this.sfx.play('tecla');
    switch (evt.keyCode) {
      case 32:
        this.spaceKey = true;
        break;
    }
  }

  keyUp(evt) {
    switch (evt.keyCode) {
      case 32:
        this.spaceKey = false;
        break;
    }
  }

  mouseDown(evt) {
    this.spaceKey = true;
  }

  mouseUp(evt) {
    this.spaceKey = false;
  }

  setEnvironment() {
    const loader = new RGBELoader().setPath(this.assetsPath);
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();

    const self = this;

    let envolvente = '';
    // envolvente = 'apartment.hdr';
    // envolvente = 'factory.hdr';
    // envolvente = 'field_sky.hdr';
    // envolvente = 'living_room.hdr';
    envolvente = 'venice_sunset_1k.hdr';

    loader.load('hdr/'+envolvente, (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      pmremGenerator.dispose();

      self.scene.environment = envMap;

    }, undefined, (err) => {
      console.error(err.message);
    });
  }

  load() {
    this.loadSkybox();
    this.loading = true;
    this.loadingBar.visible = true;

    // this.plane = new Plane(this);
    // this.obstacles = new Obstacles(this);

    this.loadSFX();
  }

  loadSFX() {
    this.sfx = new SFX( this.camera, this.assetsPath + 'plane/');

    this.sfx.load('explosion');
    this.sfx.load('engine', true, 1);
    this.sfx.load('gliss');
    this.sfx.load('gameover');
    this.sfx.load('bonus');
    this.sfx.load('tecla');
    this.sfx.load('teclaCristal');
  }

  loadSkybox() {
    this.scene.background = new THREE.CubeTextureLoader()
      .setPath(`${this.assetsPath}/plane/paintedsky/`)
      .load([
        'px.jpg',
        'nx.jpg',
        'py.jpg',
        'ny.jpg',
        'pz.jpg',
        'nz.jpg'
      ], () => {
        this.renderer.setAnimationLoop(this.render.bind(this));
      });
  }

  gameOver() {
    this.active = false;

    // const gameover = document.getElementById('gameover');
    // const btn = document.getElementById('playBtn');

    // gameover.style.display = 'block';
    // btn.style.display = 'block';

    // this.plane.visible = false;

    this.sfx.stopAll();
    this.sfx.play('gameover');
  }

  incScore() {
    this.score++;

    const elm = document.getElementById('score');

    if( this.score % 3 == 0 ){
      this.bonusScore += 3;
      this.sfx.play('bonus');
    }else{
      this.sfx.play('gliss')
    }

    elm.innerHTML = this.score + this.bonusScore;
  }

  decLives() {
    this.lives--;

    const elm = document.getElementById('lives');

    elm.innerHTML = this.lives;

    if (this.lives == 0) setTimeout(this.gameOver.bind(this), 1200);

    this.sfx.play('explosion');
  }

  updateCamera() {
    // this.cameraController.position.copy(this.plane.position);
    // this.cameraController.position.y = 0;
    // this.cameraTarget.copy(this.plane.position);
    // this.cameraTarget.z += 6;
    // this.camera.lookAt(this.cameraTarget);
  }

  render() {
    // if (this.loading) {
    //   if (this.plane.ready && this.obstacles.ready) {
        this.loading = false;
        this.loadingBar.visible = false;
    //   } else {
    //     return;
    //   }
    // }

    const dt = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // this.plane.update(time);

    // if (this.active) {
    //   this.obstacles.update(this.plane.position, dt);
    // }

    this.updateCamera();

    this.renderer.render(this.scene, this.camera);

  }
}

export {
  Game
};