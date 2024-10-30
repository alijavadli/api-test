import { useState } from 'react';
import './App.css';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    
    const requestBody = {
      apiKey: "HE9EP7YE07K5E3AKTRFC2V2LCHZS1ZFF30LAW2BQO4BPX2JH7493FF30CNHVKABT89GJ",
      lang: "ru",
      exhib_code: "KIOGE 2024",
      currency: "398",
      manager_code: "",
      company_code: "",
      contact_code: "",
      type: "",
      order_code: ""
    };

    try {
      const response = await fetch('https://reg.iteca.kz/booking-api/exhibition_form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>API Test</h1>
      <button onClick={testApi} disabled={loading}>
        {loading ? 'Loading...' : 'Test API'}
      </button>

      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {response && (
        <div style={{ marginTop: '20px' }}>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;