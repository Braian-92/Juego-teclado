// import * as THREE from './libs/three/build/three.module.js';
import * as THREE from 'three';
import {
  RGBELoader
} from './libs/three/examples/jsm/loaders/RGBELoader.js';
import {
  LoadingBar
} from './libs/LoadingBar.js';
import {
  TecladoFlotante
} from './TecladoFlotante.js';
import { 
  Texto3D
} from './Texto3D.js'


class Juego {
  constructor() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    this.loadingBar = new LoadingBar();
    this.loadingBar.visible = false;

    this.clock = new THREE.Clock();

    this.assetsPath = './assets/';

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
    this.camera.position.set(0, 0, 30);

    this.scene = new THREE.Scene();

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

    this.teclado = new TecladoFlotante({
      id : 'tecladoF',
      presionado: function(parametros) {
        const tecla = parametros.ascii;
        const tipoTecla = parametros.tipo;
        console.log('TECLA APRETADA: ' + tecla + ' - topo: ' + tipoTecla);
      }
    });

    this.texto3D = new Texto3D(
      this.scene,
      this.assetsPath
    ); // Inicialización de Texto3D

    this.texto3D.crearTexto('EVELYN');

    setTimeout(() => {
      this.texto3D.crearTexto('BRAIAN');
      setTimeout(() => {
        this.texto3D.crearTexto('NATALIA');
      }, 3000);
    }, 3000);

    this.active = false;
    this.load();
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  

  setEnvironment() {
    const loader = new RGBELoader().setPath(this.assetsPath);
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();

    const self = this;

    let envolvente = '';
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

  
  render() {
    this.loading = false;
    this.loadingBar.visible = false;
    const dt = this.clock.getDelta();
    const time = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
  }
}

export {
  Juego
};