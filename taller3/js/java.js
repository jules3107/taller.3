var proyectosGuardados = [];
        var programasGuardados = [];

        function irA(seccion) {
            var paginas = document.querySelectorAll('.pagina');
            for (var j = 0; j < paginas.length; j++) {
                paginas[j].classList.remove('mostrar');
            }

            document.getElementById(seccion).classList.add('mostrar');

            if (seccion === 'programas') {
                mostrarListaProgramas();
            }

            if (seccion === 'proyectos') {
                mostrarListaProyectos();
            }
        }

        function crearPrograma(evento) {
            evento.preventDefault();

            var idIngresado = document.getElementById('codigoCarrera').value;
            var nombreIngresado = document.getElementById('nombreCarrera').value;
            var duracionIngresada = document.getElementById('semestres').value;
            var tipoIngresado = document.getElementById('comoEstudia').value;

            document.getElementById('errorCodigoCarrera').textContent = '';
            document.getElementById('errorNombreCarrera').textContent = '';

            var idRepetido = false;
            for (var j = 0; j < programasGuardados.length; j++) {
                if (programasGuardados[j].id === idIngresado) {
                    idRepetido = true;
                    break;
                }
            }

            if (idRepetido) {
                document.getElementById('errorCodigoCarrera').textContent = 'Este ID ya está en uso';
                return;
            }

            var nombreRepetido = false;
            for (var j = 0; j < programasGuardados.length; j++) {
                if (programasGuardados[j].titulo === nombreIngresado) {
                    nombreRepetido = true;
                    break;
                }
            }

            if (nombreRepetido) {
                document.getElementById('errorNombreCarrera').textContent = 'Este nombre ya se está usando';
                return;
            }
            var programaNuevo = {
                id: idIngresado,
                titulo: nombreIngresado,
                duracion: duracionIngresada,
                tipo: tipoIngresado
            };

            programasGuardados.push(programaNuevo);
            mostrarNotificacion('Programa creado exitosamente', 'bueno');
            limpiarFormularioPrograma();
            mostrarListaProgramas();
        }

        function borrarPrograma(indice) {
            var confirmacion = confirm('¿Quieres borrar este programa?');
            if (confirmacion) {
                programasGuardados.splice(indice, 1);
                mostrarListaProgramas();
                mostrarNotificacion('Programa borrado', 'bueno');
            }
        }

        function mostrarListaProgramas() {
            var area = document.getElementById('mostrarProgramas');
            var contenido = '<h3>Listado de Programas</h3>';

            if (programasGuardados.length === 0) {
                contenido += '<p>Aún no hay programas registrados.</p>';
            } else {
                contenido += '<table>';
                contenido += '<tr><th>ID</th><th>Título</th><th>Semestres</th><th>Tipo</th><th>Acción</th></tr>';

                for (var j = 0; j < programasGuardados.length; j++) {
                    var programa = programasGuardados[j];
                    contenido += '<tr>';
                    contenido += '<td>' + programa.id + '</td>';
                    contenido += '<td>' + programa.titulo + '</td>';
                    contenido += '<td>' + programa.duracion + ' períodos</td>';
                    contenido += '<td>' + programa.tipo + '</td>';
                    contenido += '<td><button class="boton-eliminar" onclick="borrarPrograma(' + j + ')">Borrar</button></td>';
                    contenido += '</tr>';
                }

                contenido += '</table>';
            }

            area.innerHTML = contenido;
        }

        function limpiarFormularioPrograma() {
            document.getElementById('codigoCarrera').value = '';
            document.getElementById('nombreCarrera').value = '';
            document.getElementById('semestres').value = '';
            document.getElementById('comoEstudia').value = '';
            document.getElementById('errorCodigoCarrera').textContent = '';
            document.getElementById('errorNombreCarrera').textContent = '';
        }

        function crearProyecto(evento) {
            evento.preventDefault();
            var idEscrito = document.getElementById('codigo').value;
            var nombreEscrito = document.getElementById('titulo').value;
            var categoriaEscrita = document.getElementById('area').value;
            var situacionEscrita = document.getElementById('estado').value;

            document.getElementById('errorCodigo').textContent = '';
            document.getElementById('errorTitulo').textContent = '';

            var idDuplicado = false;
            for (var j = 0; j < proyectosGuardados.length; j++) {
                if (proyectosGuardados[j].id === idEscrito) {
                    idDuplicado = true;
                    break;
                }
            }

            if (idDuplicado) {
                document.getElementById('errorCodigo').textContent = 'Este ID ya se usa';
                return;
            }

            var nombreDuplicado = false;
            for (var j = 0; j < proyectosGuardados.length; j++) {
                if (proyectosGuardados[j].nombre === nombreEscrito) {
                    nombreDuplicado = true;
                    break;
                }
            }

            if (nombreDuplicado) {
                document.getElementById('errorTitulo').textContent = 'Este nombre ya se usa';
                return;
            }

            var proyectoNuevo = {
                id: idEscrito,
                nombre: nombreEscrito,
                categoria: categoriaEscrita,
                situacion: situacionEscrita
            };

            proyectosGuardados.push(proyectoNuevo);

            mostrarNotificacion('Proyecto creado correctamente', 'bueno');
            limpiarFormularioProyecto();
            mostrarListaProyectos();
        }

        function borrarProyecto(indice) {
            var confirmacion = confirm('¿Quieres eliminar este proyecto?');
            if (confirmacion) {
                proyectosGuardados.splice(indice, 1);
                mostrarListaProyectos();
                mostrarNotificacion('Proyecto eliminado', 'bueno');
            }
        }
        function mostrarListaProyectos() {
            var area = document.getElementById('mostrarProyectos');
            var contenido = '<h3>Listado de Proyectos</h3>';

            if (proyectosGuardados.length === 0) {
                contenido += '<p>No tienes proyectos registrados aún.</p>';
            } else {
                contenido += '<table>';
                contenido += '<tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Situación</th><th>Acción</th></tr>';

                for (var j = 0; j < proyectosGuardados.length; j++) {
                    var proyecto = proyectosGuardados[j];
                    contenido += '<tr>';
                    contenido += '<td>' + proyecto.id + '</td>';
                    contenido += '<td>' + proyecto.nombre + '</td>';
                    contenido += '<td>' + proyecto.categoria + '</td>';
                    contenido += '<td>' + proyecto.situacion + '</td>';
                    contenido += '<td><button class="boton-eliminar" onclick="borrarProyecto(' + j + ')">Eliminar</button></td>';
                    contenido += '</tr>';
                }

                contenido += '</table>';
            }

            area.innerHTML = contenido;
        }

        function limpiarFormularioProyecto() {
            document.getElementById('codigo').value = '';
            document.getElementById('titulo').value = '';
            document.getElementById('area').value = '';
            document.getElementById('estado').value = '';
            document.getElementById('errorCodigo').textContent = '';
            document.getElementById('errorTitulo').textContent = '';
        }

        function mostrarNotificacion(mensaje, clase) {
            var alerta = document.createElement('div');
            alerta.className = 'mensaje ' + clase;
            alerta.textContent = mensaje;

            var contenedor = document.querySelector('.caja');
            contenedor.insertBefore(alerta, contenedor.firstChild);

            setTimeout(function () {
                alerta.remove();
            }, 3000);
        }