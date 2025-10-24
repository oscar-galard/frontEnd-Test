import Register from '../components/Register';

interface RegisterPageProps {
  onRegisterSuccess: () => void;
}

const RegisterPage = ({ onRegisterSuccess }: RegisterPageProps) => {
  return (
    <div>
      <h1>Register Page</h1>
      <Register onRegisterSuccess={onRegisterSuccess} />
    </div>
  );
};

export default RegisterPage;