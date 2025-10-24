import Login from '../components/Login';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  return (
    <div>
      <h1>Login Page</h1>
      <Login onLoginSuccess={onLoginSuccess} />
    </div>
  );
};

export default LoginPage;