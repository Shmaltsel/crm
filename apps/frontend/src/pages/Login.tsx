import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('admin@crm.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  
  // Ініціалізуємо хук для навігації
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // ЗМІНЕНО: тепер стукаємо на локальний оновлений бекенд!
      const response = await axios.post('https://crm-57qd.onrender.com/auth/login', {
        email,
        password,
      });
      
      // Зберігаємо токен і одразу перекидаємо на сторінку подій
      localStorage.setItem('token', response.data.access_token);
      navigate('/events');
      
    } catch {
      // Блок catch тепер порожній (без змінної), помилки ESLint не буде
      setError('Невірний email або пароль');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Вхід у CRM
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              required
            />
          </div>

          <button 
            type="submit" 
            className="mt-2 bg-blue-600 text-white font-medium p-2.5 rounded-lg hover:bg-blue-700 transition"
          >
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
}