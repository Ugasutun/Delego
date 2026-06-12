# Contract Tests

Soroban contract tests live alongside each contract in `contracts/*/tests/` and `src/lib.rs` `#[cfg(test)]` modules.

```bash
pnpm test:contracts
# or
cd contracts && cargo test --workspace
```
