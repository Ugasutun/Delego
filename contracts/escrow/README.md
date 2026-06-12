# Escrow Contract

Soroban smart contract for holding purchase funds until fulfillment.

## Functions (planned)

| Function | Description |
|----------|-------------|
| `create_escrow` | Lock buyer funds for an order |
| `release` | Transfer to seller on confirmation |
| `refund` | Return funds to buyer |

## Development

```bash
cd contracts/escrow
cargo test
# TODO: soroban contract build && deploy
```
