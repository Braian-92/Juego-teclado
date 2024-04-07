import * as THREE from 'three'; // Asegúrate de importar Three.js correctamente
import { FontLoader } from 'three/addons/loaders/FontLoader.js'; // Importa FontLoader desde la ubicación correcta
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'; // Importa TextGeometry desde la ubicación correcta

class Texto3D {
  constructor(scene) {
    this.scene = scene;
    this.letras = null; // Inicializa la propiedad de letras como nulo
  }

  crearTexto(text) {
    // Eliminar el texto anterior si existe
    if (this.letras !== null) {
      this.letras.forEach(letra => {
        this.scene.remove(letra);
      });
    }

    // Crear el nuevo texto
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

    let letras = []; // Array para almacenar las letras individuales
    let separacionLetras = 2; // Separación entre letras

    const loader = new FontLoader();
    loader.load( './libs/three/examples/fonts/' + fontName + '_' + fontWeight + '.typeface.json', (response) => {
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
            this.scene.add( letraMesh );
            letras.push(letraMesh);
        }

        // Calcular el centro del texto
        const centerOffset = -0.5 * totalWidth;

        // Centrar el grupo de letras
        letras.forEach(letraMesh => {
            letraMesh.position.x += centerOffset;
        });

        // Guardar las letras actuales en la propiedad this.letras
        this.letras = letras;
    });
  }
}

export { Texto3D };
