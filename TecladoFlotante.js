class TecladoFlotante{
	constructor(options){
		this.options = options;
		const contenedor = document.createElement("div");
    contenedor.id = this.options.id; // Asignar el ID al contenedor
    contenedor.classList.add("container-fluid"); // Agregar clases al contenedor

    // Inyectar el HTML dentro del contenedor
    contenedor.innerHTML = `
			<div class="sabana sabanainf mb-3">
				<div class="row">
					<div class="col-12">
						<div class="container px-5">
							<div class="row">
								<div class="col-12">
									<div id="teclado">
										<div asciiTecla="27" class="teclas flex-grow-1">esc</div>
										<div asciiTecla="49" class="teclas flex-grow-1">1</div>
										<div asciiTecla="50" class="teclas flex-grow-1">2</div>
										<div asciiTecla="51" class="teclas flex-grow-1">3</div>
										<div asciiTecla="52" class="teclas flex-grow-1">4</div>
										<div asciiTecla="53" class="teclas flex-grow-1">5</div>
										<div asciiTecla="54" class="teclas flex-grow-1">6</div>
										<div asciiTecla="55" class="teclas flex-grow-1">7</div>
										<div asciiTecla="56" class="teclas flex-grow-1">8</div>
										<div asciiTecla="57" class="teclas flex-grow-1">9</div>
										<div asciiTecla="48" class="teclas flex-grow-1">0</div>
										<div asciiTecla="45" class="teclas flex-grow-1">-</div>
										<div asciiTecla="43" class="teclas flex-grow-1">+</div>
										<div asciiTecla="9" class="teclas flex-grow-1">Tab</div>
										<div asciiTecla="81" class="teclas flex-grow-1">Q</div>
										<div asciiTecla="87" class="teclas flex-grow-1">W</div>
										<div asciiTecla="69" class="teclas flex-grow-1">E</div>
										<div asciiTecla="82" class="teclas flex-grow-1">R</div>
										<div asciiTecla="84" class="teclas flex-grow-1">T</div>
										<div asciiTecla="89" class="teclas flex-grow-1">Y</div>
										<div asciiTecla="85" class="teclas flex-grow-1">U</div>
										<div asciiTecla="73" class="teclas flex-grow-1">I</div>
										<div asciiTecla="79" class="teclas flex-grow-1">O</div>
										<div asciiTecla="80" class="teclas flex-grow-1">P</div>
										<div asciiTecla="46" class="teclas flex-grow-1">Delete</div>
										<div asciiTecla="20" class="teclas flex-grow-1">Caps Lock</div>
										<div asciiTecla="65" class="teclas flex-grow-1">A</div>
										<div asciiTecla="83" class="teclas flex-grow-1">S</div>
										<div asciiTecla="68" class="teclas flex-grow-1">D</div>
										<div asciiTecla="70" class="teclas flex-grow-1">F</div>
										<div asciiTecla="71" class="teclas flex-grow-1">G</div>
										<div asciiTecla="72" class="teclas flex-grow-1">H</div>
										<div asciiTecla="74" class="teclas flex-grow-1">J</div>
										<div asciiTecla="75" class="teclas flex-grow-1">K</div>
										<div asciiTecla="76" class="teclas flex-grow-1">L</div>
										<div asciiTecla="59" class="teclas flex-grow-1">;</div>
										<div asciiTecla="13" class="teclas flex-grow-1">Enter</div>
										<div asciiTecla="16" class="teclas flex-grow-1">Shift</div>
										<div asciiTecla="90" class="teclas flex-grow-1">Z</div>
										<div asciiTecla="88" class="teclas flex-grow-1">X</div>
										<div asciiTecla="67" class="teclas flex-grow-1">C</div>
										<div asciiTecla="86" class="teclas flex-grow-1">V</div>
										<div asciiTecla="66" class="teclas flex-grow-1">B</div>
										<div asciiTecla="78" class="teclas flex-grow-1">N</div>
										<div asciiTecla="77" class="teclas flex-grow-1">M</div>
										<div asciiTecla="188" class="teclas flex-grow-1">&lt;</div>
										<div asciiTecla="190" class="teclas flex-grow-1">&gt;</div>
										<div asciiTecla="16" class="teclas flex-grow-1">Shift</div>
										<div asciiTecla="17" class="teclas flex-grow-1 active">Fn</div>
										<div asciiTecla="17" class="teclas flex-grow-1">Control</div>
										<div asciiTecla="18" class="teclas flex-grow-1">Option</div>
										<div asciiTecla="91" class="teclas flex-grow-1">Command</div>
										<div class="teclas flex-grow-1"></div>
										<div class="teclas flex-grow-1"></div>
										<div asciiTecla="191" class="teclas flex-grow-1">?</div>
										<div asciiTecla="220" class="teclas flex-grow-1">|</div>
										<div class="d-flex rowTeclas flex-grow-1">
											<div asciiTecla="37" class="teclas flex-grow-1 active">←</div>
											<div class="flex-column">
												<div asciiTecla="38" class="teclaH50 active">↑</div>                  
												<div asciiTecla="40" class="teclaH50 active">↓</div>                  
											</div>
										</div>
										<div asciiTecla="39" class="teclas flex-grow-1 active">→</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;

    // Agregar el contenedor al body del documento
    document.body.appendChild(contenedor);

    // Asignar el contenedor al objeto actual
    this.contenedor = document.querySelector(`#${this.options.id}`);

    if (this.contenedor) {
      const teclado = this;
      // Agregar el evento click a todas las teclas
      this.contenedor.querySelectorAll(".teclas").forEach(tecla => {
        tecla.addEventListener("click", function(evt) {
          evt.preventDefault();
          teclado.click(evt);
        });
      });
    }
	}
		
	set visible( mode ){
		const setting = (mode) ? 'block' : 'none';
		this.contenedor.style.display = setting;
	}

	click(evt) {
    // Extraer el atributo asciiTecla del evento
    const asciiTecla = evt.target.getAttribute("asciiTecla");
    // Aquí puedes utilizar el atributo asciiTecla
    console.log("Tecla presionada con ASCII:", asciiTecla);
    // Agrega aquí la lógica que necesites con la tecla presionada
  }
}

export { TecladoFlotante };