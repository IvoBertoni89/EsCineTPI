import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../sevices/authentication/autentication.context";
import useFetch from "../custom/useFetch/useFetch";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
  const { handleLogin } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const { data } = useFetch("http://localhost:8000/users"); //ojo api aca

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const [loginRegisterToggle, setLoginRegisterToggle] = useState(true);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "name") setName(value);
    else if (name === "userType") setUserType(value);
  };

  const toggleLoginRegister = () => {
    setLoginRegisterToggle(!loginRegisterToggle);
    setError(""); // Limpiar cualquier error al cambiar entre registro e inicio de sesión
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    if (loginRegisterToggle) {
      // Registro
      if (!name || !email || !password || !userType) {
        setError("Todos los campos son obligatorios para registrarse.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Math.random(),
            name,
            email,
            password,
            userType,
          }),
        });

        if (!response.ok) {
          throw new Error("Error al registrar usuario.");
        }

        const data = await response.json();
        handleLogin(data);
        navigate("/dashboard");
      } catch (error) {
        setError("Error al registrar usuario.");
        console.error("Error:", error);
      }
    } else {
      // Inicio de sesión
      const user = data.find((user) => user.email === email);

      if (!user || user.password !== password) {
        setError("Correo electrónico o contraseña incorrectos.");
        return;
      }

      handleLogin(user);
      navigate("/dashboard");
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center background">
      <div className="container col-md-3 bg-light p-5  bg-secondary-user rounded">
        <Form onSubmit={handleLoginSubmit}>
          <h1 className="font-marca text-center color-accent-user p-2">
            Gatuna Matata
          </h1>
          <p className="text-center color-secondary-user">
            "miau miau miau miau miau miau"
          </p>
          <hr />

          {loginRegisterToggle && (
            <Form.Group className="my-3" controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su nombre"
                name="name"
                value={name}
                onChange={handleInputChange}
              />
            </Form.Group>
          )}

          <Form.Group className="my-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">{email}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </Form.Group>

          {loginRegisterToggle && (
            <Form.Group className="mb-3" controlId="formBasicUserType">
              <Form.Label>Quiero ser...</Form.Label>
              <Form.Select
                name="userType"
                value={userType}
                onChange={handleInputChange}
              >
                <option value="">Elige una opción</option>
                <option value="client">Cliente</option>
                <option value="sitter">Niñera</option>
              </Form.Select>
            </Form.Group>
          )}

          {error && <p className="text-danger">{error}</p>}

          <div className="d-grid gap-2 ">
            <Button
              onClick={toggleLoginRegister}
              variant="link"
              className="mb-2"
            >
              {loginRegisterToggle
                ? "¿Ya tienes una cuenta? Inicia sesión"
                : "¿No tienes cuenta? Registrate"}
            </Button>
            <Button
              type="submit"
              size="lg"
              className="btn bg-secondary-user text-white fw-bold border-0"
            >
              {loginRegisterToggle ? "Registrarse" : "Iniciar sesión"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
