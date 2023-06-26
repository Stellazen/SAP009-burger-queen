import { React, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { userLogin } from '../../api/users';
import Paragraph from '../../components/Paragraph/Paragraph';
// import Errors from '../../Errors/Errors';
import { setLocalStorageItem } from '../../storage/localStorage';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [erro, setErro] = useState(null);

  const signIn = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const loggedUser = await userLogin(email, password);
      console.log(loggedUser);
      setLocalStorageItem('token', loggedUser.accessToken);
      setLocalStorageItem('userId', loggedUser.user.id);
      setLocalStorageItem('userRole', loggedUser.user.role);

      if (loggedUser.user.role === 'waiter') {
        navigate('/menu');
      }
      if (loggedUser.user.role === 'chef') {
        navigate('/kitchen');
      }
      if (loggedUser.user.role === 'admin') {
        navigate('/homepage');
      }
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <div className="bodyHome">
      <section className="container">
        <img alt="logo-imagem" src={Logo} className="logoImage" />
        <form className="form" onSubmit={signIn}>
          <Input
            label="E-mail"
            type="email"
            value={email}
            whenChanged={(value) => setEmail(value)}
            name={email}
            placeholder="email@exemplo.com"
          />
          <Input
            label="Senha"
            type="password"
            value={password}
            whenChanged={(value) => setPassword(value)}
            name={password}
            placeholder="●●●●●●"
          />
          <Paragraph>
            {erro}
          </Paragraph>
          <Button> Entrar </Button>
        </form>
      </section>
    </div>
  );
}

export default Login;
