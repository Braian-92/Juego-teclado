class TecladoFlotante {
  constructor(options) {
    this.options = options;
    const contenedor = document.createElement("div");
    contenedor.id = this.options.id;
    contenedor.classList.add("container-fluid");

    contenedor.innerHTML = `
		<div id="tecladoF" class="container-fluid">
			<div class="sabana sabanainf mb-3">
					<div class="row">
						<div class="col-12">
								<div class="container px-5">
									<div class="row">
											<div class="col-12">
												<div id="teclado">
														<div class="rowTeclas d-flex">
															<div asciiTecla="27" tipo="ESPECIALES" class="teclas flex-grow-1">esc</div>
															<div asciiTecla="49" tipo="NUMERO" class="teclas flex-grow-1">1</div>
															<div asciiTecla="50" tipo="NUMERO" class="teclas flex-grow-1">2</div>
															<div asciiTecla="51" tipo="NUMERO" class="teclas flex-grow-1">3</div>
															<div asciiTecla="52" tipo="NUMERO" class="teclas flex-grow-1">4</div>
															<div asciiTecla="53" tipo="NUMERO" class="teclas flex-grow-1">5</div>
															<div asciiTecla="54" tipo="NUMERO" class="teclas flex-grow-1">6</div>
															<div asciiTecla="55" tipo="NUMERO" class="teclas flex-grow-1">7</div>
															<div asciiTecla="56" tipo="NUMERO" class="teclas flex-grow-1">8</div>
															<div asciiTecla="57" tipo="NUMERO" class="teclas flex-grow-1">9</div>
															<div asciiTecla="48" tipo="NUMERO" class="teclas flex-grow-1">0</div>
															<div asciiTecla="45" tipo="ESPECIALES" class="teclas flex-grow-1">-</div>
															<div asciiTecla="43" tipo="ESPECIALES" class="teclas flex-grow-1">+</div>
														</div>
														<div class="rowTeclas d-flex">
															<div asciiTecla="9" tipo="ESPECIALES" class="teclas flex-grow-1">Tab</div>
															<div asciiTecla="81" tipo="LETRA" class="teclas flex-grow-1">Q</div>
															<div asciiTecla="87" tipo="LETRA" class="teclas flex-grow-1">W</div>
															<div asciiTecla="69" tipo="LETRA" class="teclas flex-grow-1">E</div>
															<div asciiTecla="82" tipo="LETRA" class="teclas flex-grow-1">R</div>
															<div asciiTecla="84" tipo="LETRA" class="teclas flex-grow-1">T</div>
															<div asciiTecla="89" tipo="LETRA" class="teclas flex-grow-1">Y</div>
															<div asciiTecla="85" tipo="LETRA" class="teclas flex-grow-1">U</div>
															<div asciiTecla="73" tipo="LETRA" class="teclas flex-grow-1">I</div>
															<div asciiTecla="79" tipo="LETRA" class="teclas flex-grow-1">O</div>
															<div asciiTecla="80" tipo="LETRA" class="teclas flex-grow-1">P</div>
															<div asciiTecla="46" tipo="ESPECIALES" class="teclas flex-grow-1">Delete</div>
														</div>
														<div class="rowTeclas d-flex">
															<div asciiTecla="20" tipo="ESPECIALES" class="teclas flex-grow-1">Caps Lock</div>
															<div asciiTecla="65" tipo="LETRA" class="teclas flex-grow-1">A</div>
															<div asciiTecla="83" tipo="LETRA" class="teclas flex-grow-1">S</div>
															<div asciiTecla="68" tipo="LETRA" class="teclas flex-grow-1">D</div>
															<div asciiTecla="70" tipo="LETRA" class="teclas flex-grow-1">F</div>
															<div asciiTecla="71" tipo="LETRA" class="teclas flex-grow-1">G</div>
															<div asciiTecla="72" tipo="LETRA" class="teclas flex-grow-1">H</div>
															<div asciiTecla="74" tipo="LETRA" class="teclas flex-grow-1">J</div>
															<div asciiTecla="75" tipo="LETRA" class="teclas flex-grow-1">K</div>
															<div asciiTecla="76" tipo="LETRA" class="teclas flex-grow-1">L</div>
															<div asciiTecla="59" tipo="ESPECIALES" class="teclas flex-grow-1">;</div>
															<div asciiTecla="13" tipo="ESPECIALES" class="teclas flex-grow-1">Enter</div>
														</div>
														<div class="rowTeclas d-flex">
															<div asciiTecla="16" tipo="ESPECIALES" class="teclas flex-grow-1">Shift</div>
															<div asciiTecla="90" tipo="LETRA" class="teclas flex-grow-1">Z</div>
															<div asciiTecla="88" tipo="LETRA" class="teclas flex-grow-1">X</div>
															<div asciiTecla="67" tipo="LETRA" class="teclas flex-grow-1">C</div>
															<div asciiTecla="86" tipo="LETRA" class="teclas flex-grow-1">V</div>
															<div asciiTecla="66" tipo="LETRA" class="teclas flex-grow-1">B</div>
															<div asciiTecla="78" tipo="LETRA" class="teclas flex-grow-1">N</div>
															<div asciiTecla="77" tipo="LETRA" class="teclas flex-grow-1">M</div>
															<div asciiTecla="188" tipo="ESPECIALES" class="teclas flex-grow-1">&lt;</div>
															<div asciiTecla="190" tipo="ESPECIALES" class="teclas flex-grow-1">&gt;</div>
															<div asciiTecla="16" tipo="ESPECIALES" class="teclas flex-grow-1">Shift</div>
														</div>
														<div class="rowTeclas d-flex">
															<div asciiTecla="17" tipo="ESPECIALES" class="teclas flex-grow-1 active">Fn</div>
															<div asciiTecla="17" tipo="ESPECIALES" class="teclas flex-grow-1">Control</div>
															<div asciiTecla="18" tipo="ESPECIALES" class="teclas flex-grow-1">Option</div>
															<div asciiTecla="91" tipo="ESPECIALES" class="teclas flex-grow-1">Command</div>
															<div class="teclas flex-grow-1"></div>
															<div class="teclas flex-grow-1"></div>
															<div asciiTecla="191" tipo="ESPECIALES" class="teclas flex-grow-1">?</div>
															<div asciiTecla="220" tipo="ESPECIALES" class="teclas flex-grow-1">|</div>
															<div class="d-flex rowTeclas flex-grow-1">
																	<div asciiTecla="37" tipo="FLECLAS" class="teclas flex-grow-1 active">←</div>
																	<div class="flex-column">
																		<div asciiTecla="38" tipo="FLECLAS" class="teclaH50 active">↑</div>
																		<div asciiTecla="40" tipo="FLECLAS" class="teclaH50 active">↓</div>
																	</div>
															</div>
															<div asciiTecla="39" tipo="FLECLAS" class="teclas flex-grow-1 active">→</div>
														</div>
												</div>
											</div>
									</div>
								</div>
						</div>
					</div>
			</div>
		</div>
		`;

    document.body.appendChild(contenedor);
    this.contenedor = document.querySelector(`#${this.options.id}`);

    if (this.contenedor) {
      const teclado = this;
      this.contenedor.addEventListener("click", function(event) {
        teclado.handleClick(event);
      });
    }

    // Verificar si se ha proporcionado una función de callback
    if (typeof options.presionado === 'function') {
      this.presionadoCallback = options.presionado;
    }
  }

  handleClick(event) {
    const asciiTecla = event.target.getAttribute("asciiTecla");
    // console.log("Tecla presionada con ASCII:", asciiTecla);
    if (this.presionadoCallback) {
      // Llamar a la función de callback si está definida
      this.presionadoCallback({ ascii: asciiTecla });
    }
  }

  set visible(mode) {
    const setting = mode ? "block" : "none";
    this.contenedor.style.display = setting;
  }

  presionado(callback) {
    // Permite establecer una función de callback para manejar eventos de teclado
    this.presionadoCallback = callback;
  }
}



export { TecladoFlotante };
