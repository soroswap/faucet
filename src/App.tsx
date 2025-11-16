import { useState, useEffect } from 'react'
import './App.css'
import { tokensJson } from './assets/tokens'

interface Token {
  name: string;
  contract: string;
  code: string;
  icon: string;
  decimals: number;
  issuer?: string;
}

interface NetworkTokens {
  network: string;
  assets: Token[];
}

async function mintToken(walletAddress: string, contract: string): Promise<void> {
  const url = `https://api.soroswap.finance/api/faucet?address=${walletAddress}&contract=${contract}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to mint token: ${response.statusText}`);
  }

  return response.json();
}

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [testnetTokens, setTestnetTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [mintingToken, setMintingToken] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copiedContract, setCopiedContract] = useState<string | null>(null);

  useEffect(() => {
    const testnet = (tokensJson as NetworkTokens[]).find(n => n.network === 'testnet');
    if (testnet) {
      const filteredTokens = testnet.assets.filter(
        (token: Token) => token.contract !== 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC'
      );
      console.log("🚀 | App | filteredTokens:", filteredTokens)
      setTestnetTokens(filteredTokens);
    }
    setLoading(false);
  }, []);

  const handleMint = async (token: Token) => {
    if (!walletAddress.trim()) {
      setMessage({ type: 'error', text: 'Please enter a wallet address' });
      return;
    }

    setMintingToken(token.contract);
    setMessage(null);

    try {
      await mintToken(walletAddress, token.contract);
      setMessage({ type: 'success', text: `Successfully minted ${token.code}!` });
    } catch (error) {
      setMessage({ type: 'error', text: `Failed to mint ${token.code}` });
      console.error('Mint error:', error);
    } finally {
      setMintingToken(null);
    }
  };

  const handleCopyAddress = async (contract: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(contract);
      setCopiedContract(contract);
      setTimeout(() => setCopiedContract(null), 2000);
    } catch (error) {
      console.error('Failed to copy address:', error);
      setMessage({ type: 'error', text: 'Failed to copy address' });
    }
  };

  const truncateAddress = (address: string): string => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Soroswap Testnet Faucet</h1>
        <p>Mint testnet tokens for development</p>
      </header>

      <main className="main">
        <div className="card">
          <div className="wallet-input-section">
            <label htmlFor="wallet-address">Wallet Address</label>
            <input
              id="wallet-address"
              type="text"
              placeholder="G..."
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="wallet-input"
            />
          </div>

          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          {loading ? (
            <div className="loading">Loading tokens...</div>
          ) : (
            <div className="tokens-grid">
              {testnetTokens.map((token) => (
                <div key={token.contract} className="token-card">
                  <div className="token-info">
                    {token.icon && (
                      <img src={token.icon} alt={token.name} className="token-icon" />
                    )}
                    <div className="token-details">
                      <div className="token-code">{token.code}</div>
                      <div className="token-name">{token.name}</div>
                      <button
                        onClick={() => handleCopyAddress(token.contract)}
                        className="contract-address"
                        title={token.contract}
                      >
                        {copiedContract === token.contract ? '✓ Copied!' : truncateAddress(token.contract)}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleMint(token)}
                    disabled={mintingToken === token.contract}
                    className="mint-button"
                  >
                    {mintingToken === token.contract ? 'Minting...' : 'Mint'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
