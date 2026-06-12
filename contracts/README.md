# Delego Smart Contracts

This directory contains Soroban smart contracts for the Delego platform. These contracts handle trust-critical operations on the Stellar blockchain, including escrow management, spending permissions, and reputation tracking.

## 📋 Table of Contents

- [Overview](#overview)
- [Contracts](#contracts)
- [Prerequisites](#prerequisites)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)
- [Architecture](#architecture)

## Overview

Delego smart contracts are written in Rust using the Soroban SDK. They provide the blockchain layer for secure, trust-minimized commerce operations.

### Design Principles

- **Security First**: All contracts undergo rigorous security audits
- **Gas Efficiency**: Optimized for minimal gas consumption
- **Upgradability**: Designed with upgrade patterns in mind
- **Auditability**: Clear, well-documented code
- **Test Coverage**: Comprehensive test suites for all contracts

### Contract Architecture

```
contracts/
├── escrow/              # Escrow contract for purchase funds
│   ├── src/            # Contract source code
│   └── tests/          # Contract tests
├── permissions/         # Permissions contract for spending limits
│   ├── src/            # Contract source code
│   └── tests/          # Contract tests
├── reputation/         # Reputation contract (planned)
│   ├── src/            # Contract source code
│   └── tests/          # Contract tests
├── Cargo.toml          # Workspace configuration
└── README.md           # This file
```

## Contracts

### Escrow Contract (`contracts/escrow`)

The escrow contract manages funds held in trust during purchase transactions.

#### Features

- **Fund Locking**: Securely lock funds for specific orders
- **Multi-Signature**: Support for multi-signature releases
- **Time-Locked Release**: Automatic release after time period
- **Refund Mechanism**: Refund funds under specified conditions
- **Emergency Pause**: Emergency pause functionality
- **Dispute Resolution**: Support for dispute resolution

#### Key Functions

- `init()` - Initialize the escrow contract
- `lock_funds()` - Lock funds for an order
- `release_funds()` - Release funds to merchant
- `refund_funds()` - Refund funds to buyer
- `emergency_pause()` - Pause contract operations
- `emergency_unpause()` - Resume contract operations

#### State

- `escrows` - Map of escrow ID to escrow details
- `config` - Contract configuration (time locks, fees, etc.)
- `paused` - Emergency pause flag

### Permissions Contract (`contracts/permissions`)

The permissions contract manages delegated spending authority and spending limits.

#### Features

- **Spending Limits**: Set and enforce spending limits
- **Approval Thresholds**: Configure approval requirements
- **Time-Based Permissions**: Time-limited permission grants
- **Permission Revocation**: Revoke delegated permissions
- **Policy Management**: Manage spending policies

#### Key Functions

- `init()` - Initialize the permissions contract
- `grant_permission()` - Grant spending permission to agent
- `revoke_permission()` - Revoke spending permission
- `check_permission()` - Check if permission is valid
- `update_limit()` - Update spending limit
- `set_approval_threshold()` - Set approval threshold

#### State

- `permissions` - Map of permission ID to permission details
- `policies` - Map of policy ID to policy details
- `limits` - Map of wallet to spending limits

### Reputation Contract (`contracts/reputation`) - Planned

The reputation contract will track cumulative reputation scores for merchants and agents.

#### Planned Features

- **Score Tracking**: Track reputation scores
- **History**: Maintain reputation history
- **Dispute Handling**: Adjust scores based on disputes
- **Influence**: Reputation influences escrow terms

## Prerequisites

### Required Tools

- **Rust**: >= 1.70.0
  ```bash
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```

- **WASM Target**: For compiling to WebAssembly
  ```bash
  rustup target add wasm32-unknown-unknown
  ```

- **Soroban CLI**: For contract deployment and interaction
  ```bash
  cargo install soroban-cli
  ```

- **Soroban SDK**: Included in Cargo.toml

### Environment Setup

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Add WASM target
rustup target add wasm32-unknown-unknown

# Install Soroban CLI
cargo install soroban-cli

# Verify installation
rustc --version
soroban --version
```

## Development

### Building Contracts

```bash
# Build all contracts in the workspace
cargo build --target wasm32-unknown-unknown --release

# Build specific contract
cd escrow
cargo build --target wasm32-unknown-unknown --release

# Build with optimizations
cargo build --target wasm32-unknown-unknown --release --opt-level=z
```

### Contract Optimization

```bash
# Build with size optimization
cargo build --target wasm32-unknown-unknown --release --opt-level=z

# Use wasm-opt for further optimization
wasm-opt target/wasm32-unknown-unknown/release/escrow.wasm -O4 -o escrow_opt.wasm
```

### Local Development

```bash
# Start local Soroban network
soroban network local

# Deploy contract to local network
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/escrow.wasm \
  --source admin \
  --network local

# Invoke contract function
soroban contract invoke \
  --id <CONTRACT_ID> \
  --source admin \
  --function init \
  --network local
```

## Testing

### Running Tests

```bash
# Run all contract tests
cargo test --workspace

# Run specific contract tests
cd escrow
cargo test

# Run tests with output
cargo test -- --nocapture

# Run tests in release mode
cargo test --release
```

### Test Structure

```rust
#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_init() {
        // Test implementation
    }

    #[test]
    fn test_lock_funds() {
        // Test implementation
    }
}
```

### Test Coverage

Aim for high test coverage:
- Unit tests for individual functions
- Integration tests for contract interactions
- Edge case testing
- Error condition testing

## Deployment

### Testnet Deployment

```bash
# Configure testnet
soroban network futurenet

# Deploy contract
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/escrow.wasm \
  --source <DEPLOYER_ADDRESS> \
  --network futurenet

# Save contract ID
export ESCROW_CONTRACT_ID=<CONTRACT_ID>
```

### Mainnet Deployment

```bash
# Configure mainnet
soroban network public

# Deploy contract
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/escrow.wasm \
  --source <DEPLOYER_ADDRESS> \
  --network public

# Verify deployment
soroban contract inspect \
  --id <CONTRACT_ID> \
  --network public
```

### Deployment Checklist

- [ ] Contract tests pass
- [ ] Code reviewed by team
- [ ] Security audit completed
- [ ] Gas optimization performed
- [ ] Documentation updated
- [ ] Deployment script tested
- [ ] Rollback plan prepared

## Security

### Security Best Practices

- **Access Control**: Implement proper access control
- **Input Validation**: Validate all inputs
- **Reentrancy Protection**: Protect against reentrancy attacks
- **Integer Overflow**: Use checked arithmetic
- **Randomness**: Use secure randomness sources
- **Secret Management**: Never store secrets on-chain

### Security Audits

All contracts must undergo:
1. Internal code review
2. External security audit
3. Penetration testing
4. Bug bounty program

### Known Vulnerabilities

Monitor for:
- Reentrancy attacks
- Integer overflow/underflow
- Access control issues
- Front-running
- Gas griefing

## Architecture

### Contract Interaction Pattern

```
Web App
    ↓
Wallet Service
    ↓
Soroban RPC
    ↓
Smart Contract
```

### Cross-Contract Calls

Contracts can call other contracts:
- Escrow contract calls Permissions contract
- Permissions contract validates spending limits
- Reputation contract called for score checks

### Upgrade Pattern

Contracts use proxy pattern for upgradability:
- Proxy contract delegates to implementation
- Implementation can be upgraded
- State stored in proxy contract

## Documentation

### Contract Documentation

Each contract should include:
- README with overview
- Function documentation
- State documentation
- Usage examples
- Security considerations

### API Documentation

Generate API docs:
```bash
cargo doc --open
```

## Contributing

When contributing to smart contracts:

1. Follow Rust best practices
2. Write comprehensive tests
3. Document all public functions
4. Consider gas efficiency
5. Security review required
6. Update documentation

See [CONTRIBUTING.md](../CONTRIBUTING.md) for general guidelines.

## Resources

- [Soroban Documentation](https://soroban.stellar.org/docs)
- [Soroban SDK](https://docs.rs/soroban-sdk/)
- [Stellar Documentation](https://developers.stellar.org/)
- [Rust Book](https://doc.rust-lang.org/book/)

## Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clean build
cargo clean
cargo build --target wasm32-unknown-unknown --release
```

**Test Failures**
```bash
# Run with detailed output
cargo test -- --nocapture

# Run specific test
cargo test test_function_name
```

**Deployment Issues**
```bash
# Check network configuration
soroban network inspect

# Verify contract WASM
soroban contract inspect --wasm contract.wasm
```

---

**Last Updated**: June 2026
