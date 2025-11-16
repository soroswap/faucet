# Soroswap Testnet Faucet

A web application for minting testnet tokens on the Stellar network for Soroswap development and testing.

## What is Soroswap?

[Soroswap](https://soroswap.finance) is a decentralized exchange (DEX) built on the Stellar blockchain using Soroban smart contracts. This faucet provides developers with testnet tokens needed for testing and development.

## Features

- Mint testnet tokens directly to your Stellar wallet
- Support for multiple token types (USDC, XLM, XRP, BTC, EURC, and more)
- Simple, user-friendly interface
- Real-time minting status feedback

## Available Testnet Tokens

- **USDC** - USD Coin
- **XTAR** - Dogstar
- **XRP** - Ripple
- **BTC** - Bitcoin
- **EURC** - Euro Coin
- **AQUA** - Aquarius
- **ARST** - Argentine Peso
- **BRL** - Brazilian Real
- And more...

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd faucet

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## Usage

1. Enter your Stellar wallet address (starting with `G...`)
2. Click the "Mint" button next to the token you want to receive
3. Wait for the transaction to complete
4. Check your wallet to confirm the tokens were received

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **Soroswap API** - Backend faucet service

## API

The faucet uses the Soroswap API endpoint:
```
POST https://api.soroswap.finance/api/faucet?address={walletAddress}&contract={contractAddress}
```

## Development

```bash
# Run linter
npm run lint
```

## License

[Add your license here]
