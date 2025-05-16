import React, { useState } from 'react';
import Dashboard from './Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modalType, setModalType] = useState(null); 
  const [showModal, setShowModal] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotCode, setForgotCode] = useState('');
  const [forgotPasswords, setForgotPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [callType, setCallType] = useState('individual'); 

  const [callIndividualData, setCallIndividualData] = useState({
    clientName: '',
    rut: '',
    tel: '',
    city: '',
    commune: '',
    address: '',
    date: '',
    time: '',
    agent: '',
  });

  const datosLlamadas = [
    {
      fecha: '2025-05-15',
      hora: '16:30',
      telefono: '+56987654321',
      cliente: 'María López',
      estado: 'Programada',
      agente: 'Agente 2'
    },
    {
      fecha: '2025-05-15',
      hora: '10:00',
      telefono: '+56912345678',
      cliente: 'Juan Pérez',
      estado: 'En curso',
      agente: 'Agente 1'
    },
    {
      fecha: '2025-05-14',
      hora: '15:45',
      telefono: '+56911223344',
      cliente: 'Carlos Díaz',
      estado: 'Finalizada',
      agente: 'Agente 1'
    }
  ];

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Programada':
        return 'bg-blue-100 text-blue-800';
      case 'En curso':
        return 'bg-yellow-100 text-yellow-800';
      case 'Finalizada':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const [agentData, setAgentData] = useState({
  nombre: '',
  script: '',
  voz: 'voz1', 
  });

  const [errors, setErrors] = useState({});

  const [callMassiveFile, setCallMassiveFile] = useState(null);

  const isAlphabetic = (text) => /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(text);
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (pass) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass);

  function validateRut(rut) {
    const cleanRut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    if (cleanRut.length < 2) return false;

    const body = cleanRut.slice(0, -1);
    let dv = cleanRut.slice(-1);

    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body.charAt(i)) * multiplier;
      multiplier = multiplier < 7 ? multiplier + 1 : 2;
    }

    let expectedDv = 11 - (sum % 11);
    if (expectedDv === 11) expectedDv = '0';
    else if (expectedDv === 10) expectedDv = 'K';
    else expectedDv = expectedDv.toString();

    return dv === expectedDv;
  }

  const handleLoginClick = () => {
    setModalType('login');
    setShowModal(true);
  };

  const handleRegisterClick = () => {
    setModalType('register');
    setShowModal(true);
  };

  const handleForgotPasswordClick = () => {
    setModalType('forgot');
    setShowModal(true);
    setForgotStep(1);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginData({ email: '', password: '' });
    setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
    setCallIndividualData({
      clientName: '',
      rut: '',
      tel: '',
      city: '',
      commune: '',
      address: '',
      date: '',
      time: '',
      agent: '',
    });
    setCallMassiveFile(null);
  };

  const handleChange = (setter) => (e) => {
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    if (!isValidEmail(email)) {
      alert('Correo inválido');
      return;
    }
    if (!password) {
      alert('Ingrese contraseña');
      return;
    }

    setIsAuthenticated(true);
    setShowModal(false);
    setModalType(null);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = registerData;

    if (!name || !isAlphabetic(name)) {
      alert('Nombre inválido (No se permiten números ni caracteres especiales)');
      return;
    }
    if (!isValidEmail(email)) {
      alert('Correo inválido');
      return;
    }
    if (!isValidPassword(password)) {
      alert(
        'Contraseña inválida. Debe tener al menos 8 caracteres e incluir letras y números.'
      );
      return;
    }
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    setIsAuthenticated(true);
    setShowModal(false);
    setModalType(null);
  };

  const handleForgotSubmitStep1 = (e) => {
    e.preventDefault();
    if (!isValidEmail(forgotEmail)) {
      alert('Correo inválido');
      return;
    }
    setForgotStep(2);
  };

  const handleForgotSubmitStep2 = (e) => {
    e.preventDefault();
    if (!forgotCode) {
      alert('Ingrese código de verificación');
      return;
    }
    setForgotStep(3);
  };

  const handleForgotSubmitStep3 = (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = forgotPasswords;
    if (!isValidPassword(newPassword)) {
      alert(
        'Contraseña inválida. Debe tener al menos 8 caracteres, incluyendo letras y números.'
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    alert('Contraseña actualizada exitosamente');
    setShowModal(false);
    setModalType(null);
    setForgotStep(1);
  };

  const handleCallIndividualSubmit = (e) => {
    e.preventDefault();
    const { clientName, rut, tel, city, commune, address, date, time, agent } =
      callIndividualData;

    if (!clientName || !isAlphabetic(clientName)) {
      alert('Nombre inválido (No se permiten números ni caracteres especiales)');
      return;
    }
    if (!validateRut(rut)) {
      alert('RUT inválido');
      return;
    }
    if (!tel) {
      alert("El número de teléfono es obligatorio");
      return;
    } else if (!/^[9|2]\d{8}$/.test(tel)) {
      alert("El número debe tener 9 dígitos y comenzar con 9 o 2");
      return;
    }
    if (!city || !isAlphabetic(city)) {
      alert('Ciudad inválida (No se permiten números ni caracteres especiales)');
      return;
    }
    if (!commune || !isAlphabetic(commune)) {
      alert('Comuna inválida (No se permiten números ni caracteres especiales)');
      return;
    }
    if (!address) {
      alert('Dirección requerida');
      return;
    }
    if (!date) {
      alert('Fecha requerida');
      return;
    }
    if (!time) {
      alert('Hora requerida');
      return;
    }
    if (!agent) {
      alert('Agente requerido');
      return;
    }

    alert('Llamada individual programada con éxito');
  };

  const handleCallMassiveSubmit = (e) => {
    e.preventDefault();
    if (!callMassiveFile) {
      alert('Debe subir un archivo CSV');
      return;
    }

    alert('Llamada masiva procesada con éxito');
  };

  const handleChange2 = (e) => {
  const { name, value } = e.target;
  setAgentData(prev => ({ ...prev, [name]: value }));
  setErrors(prev => ({ ...prev, [name]: '' }));
};

const handleSubmit = (e) => {
  e.preventDefault();

  // Validaciones simples
  const newErrors = {};
  if (!agentData.nombre.trim()) newErrors.nombre = 'Nombre es obligatorio';
  if (!agentData.script.trim()) newErrors.script = 'Script es obligatorio';

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  // Aquí podrías enviar los datos a tu backend o guardarlos en estado global
  console.log('Agente creado:', agentData);

  // Reset form o mostrar mensaje éxito
  setAgentData({ nombre: '', script: '', voz: 'voz1' });
};


  const renderLoginForm = () => (
    <form onSubmit={handleLoginSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Correo:</label>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange(setLoginData)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Contraseña:</label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange(setLoginData)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Iniciar sesión
      </button>
      <button
        type="button"
        onClick={handleForgotPasswordClick}
        className="mt-2 text-blue-600 underline hover:text-blue-800"
      >
        ¿Olvidó su contraseña?
      </button>
    </form>
  );

  const renderRegisterForm = () => (
    <form onSubmit={handleRegisterSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nombre:</label>
        <input
          type="text"
          name="name"
          value={registerData.name}
          onChange={handleChange(setRegisterData)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Correo:</label>
        <input
          type="email"
          name="email"
          value={registerData.email}
          onChange={handleChange(setRegisterData)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Contraseña:</label>
        <input
          type="password"
          name="password"
          value={registerData.password}
          onChange={handleChange(setRegisterData)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Repetir Contraseña:</label>
        <input
          type="password"
          name="confirmPassword"
          value={registerData.confirmPassword}
          onChange={handleChange(setRegisterData)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Registrarse
      </button>
    </form>
  );

  const renderForgotPassword = () => {
    if (forgotStep === 1) {
      return (
        <form onSubmit={handleForgotSubmitStep1} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Correo electrónico:</label>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Enviar código
          </button>
        </form>
      );
    }
    if (forgotStep === 2) {
      return (
        <form onSubmit={handleForgotSubmitStep2} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Código de verificación:</label>
            <input
              type="text"
              value={forgotCode}
              onChange={(e) => setForgotCode(e.target.value)}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Verificar código
          </button>
        </form>
      );
    }
    if (forgotStep === 3) {
      return (
        <form onSubmit={handleForgotSubmitStep3} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nueva contraseña:</label>
            <input
              type="password"
              value={forgotPasswords.newPassword}
              name="newPassword"
              onChange={(e) =>
                setForgotPasswords((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Repetir nueva contraseña:</label>
            <input
              type="password"
              value={forgotPasswords.confirmPassword}
              name="confirmPassword"
              onChange={(e) =>
                setForgotPasswords((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Actualizar contraseña
          </button>
        </form>
      );
    }
  };

  // Modal component
  const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          aria-label="Cerrar"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );

  // Render del formulario de llamada individual
  const renderCallIndividualForm = () => (
    <form onSubmit={handleCallIndividualSubmit} className="space-y-4 max-w-md mx-auto p-4 border rounded shadow-md bg-white">
      <h3 className="text-lg font-semibold mb-4">Llamada Individual</h3>
      <div>
        <label className="block font-medium mb-1">Nombre Cliente:</label>
        <input
          type="text"
          name="clientName"
          value={callIndividualData.clientName}
          onChange={handleChange(setCallIndividualData)}
          className="w-full border px-2 py-1 rounded"
          required
          placeholder=""
        />
      </div>
      <div>
        <label className="block font-medium mb-1">RUT:</label>
        <input
          type="text"
          name="rut"
          value={callIndividualData.rut}
          onChange={handleChange(setCallIndividualData)}
          className="w-full border px-2 py-1 rounded"
          required
          placeholder="Ej: 12345678-9"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Teléfono</label>
        <input
          type="text"
          name="tel"
          value={callIndividualData.tel}
          onChange={handleChange(setCallIndividualData)}
          className="w-full border px-2 py-1 rounded"
          required
          placeholder="Ej: 912345678"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Ciudad:</label>
        <input
          type="text"
          name="city"
          value={callIndividualData.city}
          onChange={handleChange(setCallIndividualData)}
          className="w-full border px-2 py-1 rounded"
          required
          placeholder=""
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Comuna:</label>
        <input
          type="text"
          name="commune"
          value={callIndividualData.commune}
          onChange={handleChange(setCallIndividualData)}
          className="w-full border px-2 py-1 rounded"
          required
          placeholder=""
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Dirección:</label>
        <input
          type="text"
          name="address"
          value={callIndividualData.address}
          onChange={handleChange(setCallIndividualData)}
          className="w-full border px-2 py-1 rounded"
          required
          placeholder=""
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Fecha:</label>
        <input
          type="date"
          name="date"
          value={callIndividualData.date}
          onChange={handleChange(setCallIndividualData)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Hora:</label>
        <input
          type="time"
          name="time"
          value={callIndividualData.time}
          onChange={handleChange(setCallIndividualData)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Agente:</label>
        <select
          name="agent"
          value={callIndividualData.agent}
          onChange={handleChange(setCallIndividualData)}
          className="w-full border px-2 py-1 rounded"
          required
        >
          <option value="">Seleccione agente</option>
          <option value="Agente 1">Agente 1</option>
          <option value="Agente 2">Agente 2</option>
          <option value="Agente 3">Agente 3</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Enviar llamada individual
      </button>
    </form>
  );

  // Render del formulario llamada masiva
  const renderCallMassiveForm = () => (
    <form onSubmit={handleCallMassiveSubmit} className="w-full max-w-md mx-auto p-4 border rounded shadow-md bg-white space-y-4">
      <h3 className="text-lg font-semibold mb-4">Llamada Masiva</h3>
      <div>
        <label className="block font-medium mb-1">Subir archivo CSV:</label>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setCallMassiveFile(e.target.files[0])}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Enviar llamada masiva
      </button>
    </form>
  );

  const renderNewAgent = () => (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow-md bg-white space-y-4">
    <h3 className="text-lg font-semibold mb-4">Crear agente</h3>
    <div>
      <label className="block font-medium mb-1">Nombre del agente</label>
      <input
        type="text"
        name="nombre"
        value={agentData.nombre}
        onChange={handleChange2}
        className="w-full border px-2 py-1 rounded"
        required
      />
      {errors.nombre && <p className="error">{errors.nombre}</p>}
    </div>

    <div>
      <label className="block font-medium mb-1">Script / Prompt</label>
      <textarea
        name="script"
        value={agentData.script}
        onChange={handleChange2}
        className="w-full border px-2 py-1 rounded"
        required
      />
      {errors.script && <p className="error">{errors.script}</p>}
    </div>

    <div>
      <label className="block font-medium mb-1">Voz</label>
      <select name="voz" 
      value={agentData.voz} 
      onChange={handleChange2}
      className="w-full border px-2 py-1 rounded"
      required>
        <option value="voz1">Voz 1 (dummy)</option>
        <option value="voz2">Voz 2 (dummy)</option>
        <option value="voz3">Voz 3 (dummy)</option>
      </select>
    </div>

    <button type="submit"
    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
      Crear Agente</button>
    </form>
  )

  return (
    <div className="min-h-screen bg-cover bg-center bg-gray-100 flex flex-col" style={{ backgroundImage: 'url(/favicon/fondo.avif)' }}>
      {/* Navbar */}
      <nav className="bg-custom-dark-blue shadow-md py-4 px-6 flex justify-between items-center text-white font-medium">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/favicon/logo.svg" alt="Logo" className="h-16 w-auto" />
      </div>

      {/* Menú (centrado en pantalla grande) */}
      <div className="hidden lg:flex space-x-6 text-sm tracking-wide">
        <button className="hover:text-blue-600 transition">Servicios</button>
        <button className="hover:text-blue-600 transition">Soluciones</button>
        <button className="hover:text-blue-600 transition">Equipo</button>
        <button className="hover:text-blue-600 transition">Historias de éxito</button>
        <button className="hover:text-blue-600 transition">Formación</button>
        <button className="hover:text-blue-600 transition">Recursos</button>
        <button className="hover:text-blue-600 transition">Partners</button>
        <button className="hover:text-blue-600 transition">Eventos</button>
        <button className="hover:text-blue-600 transition">Contacto</button>
      </div>

      {/* Botones de autenticación */}
      <div className="flex items-center space-x-2">
        {!isAuthenticated ? (
          <>
            <button
              onClick={handleLoginClick}
              className="px-4 py-2 text-sm bg-custom-dark-blue hover:bg-blue-900 text-white rounded transition"
            >
              Iniciar sesión
            </button>
            <button
              onClick={handleRegisterClick}
              className="px-4 py-2 text-sm bg-custom-purple hover:bg-blue-900 text-white rounded transition"
            >
              Regístrate
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-custom-dark-blue hover:bg-red-700 text-white rounded transition"
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>

      <section className="relative bg-cover bg-center h-full" style={{ backgroundImage: 'url(/favicon/fondo.avif)' }}>
      {/* Menú para llamadas */}
      {(
        <div className="bg-transparent shadow p-4 flex justify-center gap-6 mt-6 backdrop-blur-sm">
          <button
            onClick={() => setCallType('individual')}
            className={`px-4 py-2 rounded font-semibold ${
              callType === 'individual'
                ? 'bg-custom-purple text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Llamada individual
          </button>
          <button
            onClick={() => setCallType('massive')}
            className={`px-4 py-2 rounded font-semibold ${
              callType === 'massive'
                ? 'bg-custom-purple text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Llamada masiva
          </button>
        </div>
      )}

      {/* Formulario de llamadas */}
      <main className="max-w-md mx-auto min-h-[600px]">
        {
          callType === 'individual' ? (
            renderCallIndividualForm()
          ) : (
            renderCallMassiveForm()
          )
        }
      </main>

      {/* Modal para login, registro y recuperar contraseña */}
      {showModal && (
        <Modal
          title={
            modalType === 'login'
              ? 'Iniciar sesión'
              : modalType === 'register'
              ? 'Registro'
              : 'Recuperar contraseña'
          }
          onClose={() => {
            setShowModal(false);
            setModalType(null);
            setForgotStep(1);
          }}
        >
          {modalType === 'login' && renderLoginForm()}
          {modalType === 'register' && renderRegisterForm()}
          {modalType === 'forgot' && renderForgotPassword()}
        </Modal>
      )}
      
      {/* Tabla de llamadas */}
      <div className="mt-10 bg-custom-purple p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Llamadas Recientes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border">Fecha</th>
                <th className="px-4 py-2 border">Hora</th>
                <th className="px-4 py-2 border">Teléfono</th>
                <th className="px-4 py-2 border">Cliente</th>
                <th className="px-4 py-2 border">Estado</th>
                <th className="px-4 py-2 border">Agente</th>
              </tr>
            </thead>
            <tbody>
              {datosLlamadas.map((llamada, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 border">{llamada.fecha}</td>
                  <td className="px-4 py-2 border">{llamada.hora}</td>
                  <td className="px-4 py-2 border">{llamada.telefono}</td>
                  <td className="px-4 py-2 border">{llamada.cliente}</td>
                  <td className="px-4 py-2 border">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getEstadoColor(llamada.estado)}`}>
                      {llamada.estado}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">{llamada.agente}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        <main className="flex-grow p-6">
        {
          callType === 'individual' ? (
            renderNewAgent()
          ) : (
            renderCallMassiveForm()
          )
        }
      </main>
      <div>
        {/* Dashboard */}
        <Dashboard />
      </div>
      </section>
    </div>
    
  );
}

export default App;
