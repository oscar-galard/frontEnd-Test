import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		setIsLoggedIn(!!token);
	}, []);

	const handleLoginSuccess = () => {
		setIsLoggedIn(true);
	};

	const handleRegisterSuccess = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		setIsLoggedIn(false);
	};

	return (
		<Router>
			<div>
				<nav>
					<ul>
						{!isLoggedIn && (
							<>
								<li>
									<Link to="/register">Register</Link>
								</li>
								<li>
									<Link to="/login">Login</Link>
								</li>
							</>
						)}
						{isLoggedIn && (
							<>
								<li>
									<Link to="/dashboard">Dashboard</Link>
								</li>
								<li>
									<button onClick={handleLogout}>Logout</button>
								</li>
							</>
						)}
					</ul>
				</nav>

				<hr />

				<Routes>
					<Route path="/" element={<Welcome />} />
					<Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
					<Route path="/register" element={<RegisterPage onRegisterSuccess={handleRegisterSuccess} />} />
					<Route element={<ProtectedRoute />}>
						<Route path="/dashboard" element={<Dashboard />} />
					</Route>
					{/* Redirect all other routes to welcome */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
