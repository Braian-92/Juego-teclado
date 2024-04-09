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
import {
  SFX
} from './SFX.js';


class Juego {
  constructor() {
    let juego = this;
    
    
    
    const container = document.createElement('div');
    document.body.appendChild(container);

    this.juegoIniciado = 0;
    this.palabrasKPI = 0;
    this.correctasKPI = 0;
    this.incorrectasKPI = 0;

    this.indNombre = 0;
    this.nombres = [
      // 'ABCDEFGHIJKLMN',
      'TECHEIRA',
      'EVELYN',
      'NATALIA',
      'BRAIAN',
      'SAMARA',
      'CINTIA',
      'AGUSTIN',
      'MAURO',
      'LILIAN',
      'TIA',
      'TIO',
      'ABUELA',
      'ABUELO',
      'PRIMA',
      'LUPE',
      'DIANA',
      'MAMA',
      'PAPA',
      'CASA',
      'AUTO',
      'PUERTA',
      'MESA',
      'COMIDA',
      'CAMA',
      'PERRO',
      'GATO',
      'LORO',
      'OVEJA',
      'RATON',
      'ELEFANTE',
      'CARACOL',
      'CONEJO',
      'VACA',
      'CERDO',
      'POLLO',
      'SOL',
      'LUNA',
      'ESTRELLA',
      'NUVE',
      
    ];
    this.loadingBar = new LoadingBar();
    this.loadingBar.visible = false;

    this.clock = new THREE.Clock();

    this.assetsPath = './assets/';

    this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.01, 100);
    this.camera.position.set(0, 0, 100);

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
    this.load();
    let sfx = this.sfx;

    

    this.texto3D = new Texto3D(
      this.scene,
      this.assetsPath
    ); // Inicialización de Texto3D
    let texto3D = this.texto3D;

    this.texto3D.crearTexto(this.nombres[0]);

    

    console.log('texto3D', this.texto3D);

    

    

    this.teclado = new TecladoFlotante({
      id : 'tecladoF',
      presionado: function(parametros) {


        if(!juego.juegoIniciado){
          juego.juegoIniciado = true;
          // setTimeout(() => {
          //   console.log(sfx);
          //   console.log(juego.nombres[juego.indNombre]);
          //   sfx.play(juego.nombres[juego.indNombre]);
          // }, 1000);
        }else{

        }
        const tecla = parametros.ascii;
        const tipoTecla = parametros.tipo;
        // console.log('TECLA APRETADA: ' + tecla + ' - topo: ' + tipoTecla);
        let resultadoLetra = texto3D.verificarLetra(tecla);
        const indiceActual = texto3D.indicePalabra;
        const totalLetrasL= texto3D.palabra.length
        // console.log('indiceActual', indiceActual);
        // console.log('totalLetrasL', totalLetrasL);
        // console.log('resultadoLetra', resultadoLetra);
        if(indiceActual == totalLetrasL){
          texto3D.crearTexto(texto3D.palabra);
          sfx.stopAll();
          sfx.play('bonus');
          console.log('termino juego');
          setTimeout(() => {
            juego.palabrasKPI++;

            var kpiHTML = document.getElementById("palabrasDigitadas");
            kpiHTML.textContent = juego.palabrasKPI;

            console.log('llego al intervalo');
            juego.indNombre ++;
            texto3D.indicePalabra = 0;
            console.log('nuevo nombre: ' + juego.nombres[juego.indNombre]);
            
            texto3D.crearTexto(juego.nombres[juego.indNombre]);

            setTimeout(() => {
              sfx.play(juego.nombres[juego.indNombre]);

              setTimeout(() => {
                const letraActual = texto3D.letraActual();
                console.log('letraActual: ' + letraActual);
                sfx.play(letraActual);
              }, 2000);
              
            }, 1000);

            if(juego.indNombre == juego.nombres.length){
              juego.indNombre = 0;
            }
          }, 2000);
        }else{
          if(resultadoLetra){
            juego.correctasKPI++;
            var kpiHTML = document.getElementById("letrasCorrectas");
            kpiHTML.textContent = juego.correctasKPI;
            
            texto3D.crearTexto(texto3D.palabra);
            sfx.stopAll();
            sfx.play('teclaCristal');

            setTimeout(() => {
              const letraActual = texto3D.letraActual();
              console.log('letraActual: ' + letraActual);
              sfx.play(letraActual);
            }, 1000);

            
          }else{
            juego.incorrectasKPI++;
            var kpiHTML = document.getElementById("letrasIncorrectas");
            kpiHTML.textContent = juego.incorrectasKPI;


            sfx.stopAll();
            sfx.play('error');
          }
        }
      }
    });

    // setTimeout(() => {
    //   this.texto3D.crearTexto('BRAIAN');
    //   setTimeout(() => {
    //     this.texto3D.crearTexto('NATALIA');
    //   }, 3000);
    // }, 3000);

    this.active = false;
    
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
    this.loadSFX();
  }

  loadSFX() {
    this.sfx = new SFX( this.camera, this.assetsPath + 'plane/');

    // this.sfx.load('explosion');
    // this.sfx.load('engine', true, 1);
    // this.sfx.load('gliss');
    // this.sfx.load('gameover');
    this.sfx.load('bonus');
    this.sfx.load('tecla');
    this.sfx.load('teclaCristal');
    this.sfx.load('error');
    this.sfx.load('EVELYN');
    setTimeout(() => {
      this.sfx.load('A');
      this.sfx.load('B');
      this.sfx.load('C');
      this.sfx.load('D');
      this.sfx.load('E');
      this.sfx.load('F');
      this.sfx.load('G');
      this.sfx.load('H');
      this.sfx.load('I');
      this.sfx.load('J');
      this.sfx.load('K');
      this.sfx.load('L');
      this.sfx.load('M');
      this.sfx.load('N');
      this.sfx.load('O');
      this.sfx.load('P');
      this.sfx.load('Q');
      this.sfx.load('R');
      this.sfx.load('S');
      this.sfx.load('T');
      this.sfx.load('U');
      this.sfx.load('V');
      this.sfx.load('W');
      this.sfx.load('X');
      this.sfx.load('Y');
      this.sfx.load('Z');


      setTimeout(() => {

        this.sfx.load('TECHEIRA');
        this.sfx.load('NATALIA');
        this.sfx.load('BRAIAN');
        this.sfx.load('SAMARA');
        this.sfx.load('CINTIA');
        this.sfx.load('AGUSTIN');
        this.sfx.load('MAURO');
        this.sfx.load('LILIAN');
        this.sfx.load('TIA');
        this.sfx.load('TIO');
        this.sfx.load('ABUELA');
        this.sfx.load('ABUELO');
        this.sfx.load('PRIMA');
        this.sfx.load('LUPE');
        this.sfx.load('DIANA');
        this.sfx.load('MAMA');
        this.sfx.load('PAPA');
        this.sfx.load('CASA');
        this.sfx.load('AUTO');
        this.sfx.load('PUERTA');
        this.sfx.load('MESA');
        this.sfx.load('COMIDA');
        this.sfx.load('CAMA');
        this.sfx.load('PERRO');
        this.sfx.load('GATO');
        this.sfx.load('LORO');
        this.sfx.load('OVEJA');
        this.sfx.load('RATON');
        this.sfx.load('ELEFANTE');
        this.sfx.load('CARACOL');
        this.sfx.load('CONEJO');
        this.sfx.load('VACA');
        this.sfx.load('CERDO');
        this.sfx.load('POLLO');
        this.sfx.load('SOL');
        this.sfx.load('LUNA');
        this.sfx.load('ESTRELLA');
        this.sfx.load('NUVE');
      }, 3000);
    }, 1000);
    
    
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