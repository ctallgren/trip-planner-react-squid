import { useState } from 'react';
import { useSquid } from '@squidcloud/react';
import LoadingIndicator from './LoadingIndicator';
import './AskAI.css';

function AskAI() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const squid = useSquid();

  const askPressed = async () => {
    if (!text) return;
    setLoading(true);
    const result = await squid.executeFunction('askQuestion', text);
    setResult(result);
    setText('');
    setLoading(false);
  };

  const closeResult = () => {
    setResult('');
  };

  return (
    <div className="container">
      <h3>Ask a Question!</h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {loading ? (
        <div className="loading">
          <LoadingIndicator />
        </div>
      ) : (
        <button onClick={askPressed}>Ask</button>
      )}
      {result && (
        <div className="result-container">
          <textarea value={result} rows={10} />
          <button onClick={closeResult} className="close-button"></button>
        </div>
      )}
    </div>
  );
}

export default AskAI;
