//localStorage.clear()

//Función para validar relleno de formulario
function validar() {
  const name = document.getElementById('name').value;
  const lastName = document.getElementById('lastName').value;
  const rut = document.getElementById('rut').value;
  const userName = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const usuarios = JSON.parse(localStorage.getItem('usuarios'));

  if (name.length == 0) {
    alert('Debe ingresar el nombre');
    return false;
  }

  if (lastName.length == 0) {
    alert('Debe ingresar el apellido');
    return false;
  }

  //validaciones de RUT
  if (rut.length == 0) {
    alert('Debe ingresar el rut');
    return false;
  } else if (!/^([0-9]+-[0-9kK])$/.test(rut)) {
    alert('Ingrese un RUT válido')
    return false;
  }

  // Validar RUT duplicado
  if (usuarios && usuarios.some(usuario => usuario.rut === rut)) {
    alert('El RUT ya está registrado');
    return false;
  }

  //validaciones de nombre de usuario
  if (userName.length == 0) {
    alert('Debe ingresar el nombre de usuario');
    return false;
  } else if (usuarios && usuarios.some(usuario => usuario.userName === userName)) {// si nombre de usuario ya existe no se podrá repetir
    alert('Nombre de usuario ya está registrado')
    return false;
  }

  //validaciones de correo
  if (email.length == 0) {
    alert('Debe ingresar el correo electrónico');
    return false;
  } else if (!email.includes("@")) {
    alert('Ingrese un correo válido')
    return false;
  }else {
  const usuarioExistente = usuarios && usuarios.find(usuario => usuario.correo === email);
  if (usuarioExistente) {
    alert('Correo ya está registrado');
    return false;
  }
}


  //validaciones de contraseña
  if (password != document.getElementById('repeatPassword').value || password.length == 0) {
    alert('Verifique haber ingresado las contraseñas correctamente');
    return false;
  }

  return true;
}


function activarCheck() {
  var d = document.getElementById('registrar');
  if (document.getElementById("flexCheckDefault").checked == true) {
    d.disabled = false;   //disabled activa y desactiva el botón
  } else {
    d.disabled = true;
  }
}

document.onload = ListarDatos();

function guardarDato() {
  activarCheck();
  if (validar() == true) {
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const rut = document.getElementById('rut').value;
    const userName = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    var usuarios;
    var arr = JSON.parse(localStorage.getItem('usuarios'));
    if (arr == null) {
      usuarios = [];
      usuarios.push({
        nombre: name,
        apellido: lastName,
        rut: rut,
        userName: userName,
        correo: email,
        contrasenia: password
      });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    } else {
      arr.push({
        nombre: name,
        apellido: lastName,
        rut: rut,
        userName: userName,
        correo: email,
        contrasenia: password
      });
      localStorage.setItem('usuarios', JSON.stringify(arr));
      alert('Usuario registrado con éxito')
      ListarDatos();
      limpiarCampos();
    }
  }
}



function ListarDatos() {
  var usuarios;
  if (localStorage.getItem("usuarios") == null) {
    usuarios = [];
  }
  else {
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
  }
  var html = "";

  usuarios.forEach(function(element, index) {
    html += "<tr>";
    html += "<td>" + element.nombre + "</td>";
    html += "<td>" + element.apellido + "</td>";
    html += "<td>" + element.rut + "</td>";
    html += "<td>" + element.userName + "</td>";
    html += "<td>" + element.correo + "</td>";
    html += '<td><button onclick="borrarDato(' + index + ')" class="btn btn-danger">Eliminar</button><button onclick="updateData(' + index + ')" class= "btn btn-warning m-2">Editar</button></td>';
    html += "</tr>";
  });

  document.querySelector("#Usuarios tbody").innerHTML = html;
}


function borrarDato(index) {
  var usuarios;
  if (localStorage.getItem("usuarios") == null) {
    usuarios = [];
  }
  else {
    usuarios = JSON.parse(localStorage.getItem("usuarios"));
  }

  if (
    confirm('¿Esta seguro que desea eliminar el registro?') === true) {
      usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    ListarDatos();
    return true

  } else {
    ListarDatos();


  }



}

function limpiarCampos() {
  document.getElementById('name').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('rut').value = '';
  document.getElementById('username').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.getElementById('repeatPassword').value = '';
}

function updateData(index) {
  var usuarios = JSON.parse(localStorage.getItem('usuarios'));
  var usuario = usuarios[index];

  // Rellenar los campos del formulario con los datos del usuario
  document.getElementById('name').value = usuario.nombre;
  document.getElementById('lastName').value = usuario.apellido;
  document.getElementById('rut').value = usuario.rut;
  document.getElementById('username').value = usuario.userName;
  document.getElementById('rut').readOnly = true;
  document.getElementById('email').value = usuario.correo;
  document.getElementById('password').value = usuario.contrasenia;
  document.getElementById('repeatPassword').value = usuario.contrasenia;

  // Cambiar el botón "Crear Cuenta" por "Modificar"
  var registrarBtn = document.getElementById('registrar');
  registrarBtn.innerHTML = 'Modificar';
  registrarBtn.onclick = function() {
    modificarDato(index);
  };

  // Agregar el botón "Volver"
  var volverBtn = document.createElement('button');
  volverBtn.className = 'btn btn-secondary m-2';
  volverBtn.innerHTML = 'Volver';
  volverBtn.onclick = function() {
    volverFormulario();
  };

  // Insertar el botón "Volver" antes del botón "Crear Cuenta"
  var formDiv = document.querySelector('.registro');
  formDiv.insertBefore(volverBtn, registrarBtn);
}

function modificarDato(index) {
  var usuarios = JSON.parse(localStorage.getItem('usuarios'));
  var usuario = usuarios[index];

  // Obtener los valores actuales del usuario
  var nombreActual = usuario.nombre;
  var apellidoActual = usuario.apellido;
  var userNameActual = usuario.userName;
  var correoActual = usuario.correo;
  var contraseniaActual = usuario.contrasenia;

  // Obtener los valores ingresados en el formulario
  var nombreNuevo = document.getElementById('name').value;
  var apellidoNuevo = document.getElementById('lastName').value;
  var userNameNuevo = document.getElementById('username').value;
  var correoNuevo = document.getElementById('email').value;
  var contraseniaNueva = document.getElementById('password').value;

  // Validar solo los campos modificados
  if (nombreNuevo !== nombreActual) {
    if (nombreNuevo.trim() === '') {
      alert('Debe ingresar el nombre');
      return;
    }
    // Realizar otras validaciones específicas para el campo nombreNuevo si es necesario
  }

  if (apellidoNuevo !== apellidoActual) {
    if (apellidoNuevo.trim() === '') {
      alert('Debe ingresar el apellido');
      return;
    }
    // Realizar otras validaciones específicas para el campo apellidoNuevo si es necesario
  }

  if (userNameNuevo !== userNameActual) {
    if (userNameNuevo.trim() === '') {
      alert('Debe ingresar el nombre de usuario');
      return;
    }
    var usuariosExistentes = JSON.parse(localStorage.getItem('usuarios'));
    if (usuariosExistentes && usuariosExistentes.some(function(usuario) { return usuario.userName === userNameNuevo; })) {
      alert('Nombre de usuario ya está registrado');
      return;
    }
    // Realizar otras validaciones específicas para el campo userNameNuevo si es necesario
  }

  if (correoNuevo !== correoActual) {
    if (correoNuevo.trim() === '') {
      alert('Debe ingresar el correo electrónico');
      return;
    }
    if (!correoNuevo.includes('@')) {
      alert('Ingrese un correo válido');
      return;
    }
    var usuariosExistentes = JSON.parse(localStorage.getItem('usuarios'));
    if (usuariosExistentes && usuariosExistentes.some(function(usuario) { return usuario.correo === correoNuevo; })) {
      alert('Correo ya está registrado');
      return;
    }
    // Realizar otras validaciones específicas para el campo correoNuevo si es necesario
  }

  if (contraseniaNueva !== contraseniaActual) {
    if (contraseniaNueva.trim() === '') {
      alert('Debe ingresar la contraseña');
      return;
    }
    if (contraseniaNueva !== document.getElementById('repeatPassword').value) {
      alert('Verifique haber ingresado las contraseñas correctamente');
      return;
    }
    // Realizar otras validaciones específicas para el campo contraseniaNueva si es necesario
  }

  // Actualizar los datos del usuario
  usuario.nombre = nombreNuevo;
  usuario.apellido = apellidoNuevo;
  usuario.userName = userNameNuevo;
  usuario.correo = correoNuevo;
  usuario.contrasenia = contraseniaNueva;

  // Guardar los cambios en el almacenamiento local
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  // Restablecer los campos del formulario y los botones
  limpiarCampos();
  volverFormulario();
  ListarDatos();
  alert('Usuario modificado con éxito');
}



function volverFormulario() {
  // Restablecer los campos del formulario
  limpiarCampos();

  // Restablecer los botones
  var registrarBtn = document.getElementById('registrar');
  registrarBtn.innerHTML = 'Crear Cuenta';
  registrarBtn.onclick = function() {
    guardarDato();
  };

  var volverBtn = document.querySelector('.btn-secondary');
  volverBtn.remove();

  document.getElementById('rut').readOnly = false;
}