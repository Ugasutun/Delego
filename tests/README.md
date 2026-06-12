# Tests

This directory contains the test suites for the Delego monorepo, covering unit tests, integration tests, contract tests, and end-to-end tests.

## 📋 Table of Contents

- [Overview](#overview)
- [Test Suites](#test-suites)
- [Testing Strategy](#testing-strategy)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Test Coverage](#test-coverage)
- [CI/CD Integration](#cicd-integration)

## Overview

The tests directory contains comprehensive test suites to ensure code quality, reliability, and correctness across the Delego platform.

### Testing Philosophy

- **Test-Driven Development**: Write tests before or alongside code
- **Comprehensive Coverage**: Aim for high test coverage across all layers
- **Fast Feedback**: Keep tests fast for quick iteration
- **Reliability**: Tests should be reliable and deterministic
- **Maintainability**: Tests should be easy to understand and maintain

## Test Suites

### Unit Tests (`tests/unit`)

**Command**: `pnpm test:unit`

Unit tests test individual functions and components in isolation.

#### Scope

- Individual function testing
- Component testing
- Utility function testing
- Service layer testing
- Business logic testing

#### Framework

- **JavaScript/TypeScript**: Jest or Vitest
- **Rust**: Rust's built-in test framework

#### Example

```typescript
// tests/unit/utils/currency.test.ts
import { formatCurrency } from '@delego/utils';

describe('formatCurrency', () => {
  it('should format XLM correctly', () => {
    expect(formatCurrency(10000000, 'XLM')).toBe('10 XLM');
  });

  it('should handle zero amount', () => {
    expect(formatCurrency(0, 'XLM')).toBe('0 XLM');
  });
});
```

### Integration Tests (`tests/integration`)

**Command**: `pnpm test:integration`

Integration tests test the interaction between multiple components or services.

#### Scope

- Service-to-service communication
- Database interactions
- API endpoint testing
- Event-driven communication
- External service integration

#### Framework

- **JavaScript/TypeScript**: Jest with Supertest
- **Database**: Testcontainers for PostgreSQL

#### Example

```typescript
// tests/integration/api/delegations.test.ts
import request from 'supertest';
import { app } from '@delego/gateway';

describe('Delegations API', () => {
  it('should create a delegation', async () => {
    const response = await request(app)
      .post('/api/v1/delegations')
      .send({
        agentType: 'buyer',
        spendingLimit: 10000000,
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
  });
});
```

### Contract Tests (`contracts/`)

**Command**: `pnpm test:contracts`

Contract tests test the Soroban smart contracts.

#### Scope

- Contract deployment
- Contract function testing
- State verification
- Gas optimization testing
- Security testing

#### Framework

- **Rust**: Soroban SDK test framework

#### Example

```rust
// contracts/escrow/tests/test.rs
#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_lock_funds() {
        let env = Env::default();
        let contract_id = env.register_contract(None, EscrowContract);
        let client = EscrowContractClient::new(&env, &contract_id);

        client.init(&env);
        client.lock_funds(&env, &1000);
        
        let balance = client.get_balance(&env);
        assert_eq!(balance, 1000);
    }
}
```

### End-to-End Tests (`tests/e2e`)

**Command**: `pnpm test:e2e`

End-to-end tests test the entire system from user perspective.

#### Scope

- User workflows
- Multi-service scenarios
- Browser automation
- Mobile app testing (Planned)
- Performance testing

#### Framework

- **Web**: Playwright or Cypress
- **API**: Postman/Newman (Planned)

#### Example

```typescript
// tests/e2e/purchase-flow.test.ts
import { test, expect } from '@playwright/test';

test('complete purchase flow', async ({ page }) => {
  await page.goto('http://localhost:3001');
  
  // Connect wallet
  await page.click('[data-testid="connect-wallet"]');
  
  // Create delegation
  await page.click('[data-testid="create-delegation"]');
  await page.fill('[data-testid="spending-limit"]', '10000000');
  await page.click('[data-testid="submit"]');
  
  // Verify delegation created
  await expect(page.locator('[data-testid="delegation-success"]')).toBeVisible();
});
```

## Testing Strategy

### Test Pyramid

```
        /\
       /E2E\        (Few, slow, expensive)
      /------\
     /Integration\ (More, medium speed)
    /------------\
   /   Unit Tests  \  (Many, fast, cheap)
  /----------------\
```

### Coverage Goals

- **Unit Tests**: 80%+ coverage
- **Integration Tests**: 70%+ coverage
- **Contract Tests**: 90%+ coverage
- **E2E Tests**: Critical user paths only

### Test Categories

#### Happy Path Tests

Test the expected, successful execution of features.

#### Edge Case Tests

Test boundary conditions and unusual inputs.

#### Error Case Tests

Test error handling and failure scenarios.

#### Security Tests

Test security vulnerabilities and authorization.

#### Performance Tests

Test performance characteristics under load.

## Running Tests

### Running All Tests

```bash
# Run all test suites
pnpm test

# Run with coverage
pnpm test:coverage
```

### Running Specific Suites

```bash
# Run unit tests only
pnpm test:unit

# Run integration tests only
pnpm test:integration

# Run contract tests only
pnpm test:contracts

# Run E2E tests only
pnpm test:e2e
```

### Running Specific Tests

```bash
# Run specific test file
pnpm test tests/unit/utils/currency.test.ts

# Run tests matching pattern
pnpm test -- delegation

# Run tests in watch mode
pnpm test --watch
```

### Running Tests in CI

Tests run automatically in CI/CD pipeline:

```yaml
- name: Run tests
  run: pnpm test

- name: Upload coverage
  uses: codecov/codecov-action@v3
```

## Writing Tests

### Unit Test Guidelines

1. **Isolation**: Tests should be independent
2. **Clarity**: Test names should describe what is being tested
3. **Arrange-Act-Assert**: Follow AAA pattern
4. **Mocking**: Mock external dependencies
5. **Fast**: Keep tests fast

### Integration Test Guidelines

1. **Real Dependencies**: Use real databases/services where possible
2. **Setup/Teardown**: Proper setup and teardown
3. **Idempotency**: Tests should be idempotent
4. **Environment**: Use test environment
5. **Cleanup**: Clean up after tests

### Contract Test Guidelines

1. **Coverage**: Test all contract functions
2. **Edge Cases**: Test edge cases and boundary conditions
3. **Gas**: Monitor gas usage
4. **Security**: Test for security vulnerabilities
5. **Upgradability**: Test upgrade patterns

### E2E Test Guidelines

1. **User Perspective**: Test from user perspective
2. **Critical Paths**: Focus on critical user journeys
3. **Stability**: Tests should be stable and reliable
4. **Speed**: Keep E2E tests reasonably fast
5. **Maintenance**: Keep tests maintainable

## Test Coverage

### Coverage Tools

- **JavaScript/TypeScript**: Istanbul/nyc
- **Rust**: tarpaulin or cargo-llvm-cov

### Coverage Report

```bash
# Generate coverage report
pnpm test:coverage

# View coverage report
open coverage/index.html
```

### Coverage Thresholds

Set coverage thresholds in package.json:

```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

## CI/CD Integration

### GitHub Actions

Tests run on every pull request:

```yaml
name: Tests

on: [pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm test
      - run: pnpm test:e2e
```

### Pre-commit Hooks

Run tests before committing:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "pnpm test:unit"
    }
  }
}
```

## Best Practices

### General

- **Write Tests Early**: Write tests alongside code
- **Keep Tests Simple**: Avoid complex test logic
- **Use Descriptive Names**: Test names should describe what they test
- **Test Behavior, Not Implementation**: Test what code does, not how
- **Maintain Tests**: Keep tests updated with code changes

### Unit Tests

- **One Assert Per Test**: Prefer one assert per test
- **Mock External Dependencies**: Mock external services
- **Test Edge Cases**: Test boundary conditions
- **Use Test Doubles**: Use mocks, stubs, and fakes appropriately

### Integration Tests

- **Use Test Containers**: Use testcontainers for databases
- **Clean Up**: Clean up test data after tests
- **Use Fixtures**: Use fixtures for consistent test data
- **Parallel Execution**: Run tests in parallel when possible

### E2E Tests

- **Focus on Critical Paths**: Test important user journeys
- **Use Page Objects**: Use page object pattern
- **Wait for Elements**: Wait for elements to be ready
- **Avoid Brittle Selectors**: Use stable selectors

## Troubleshooting

### Common Issues

**Tests failing intermittently**
```bash
# Add retries for flaky tests
# Check for timing issues
# Use proper waiting strategies
```

**Tests running slowly**
```bash
# Use parallel test execution
# Mock external dependencies
# Optimize database queries
```

**Coverage not reporting**
```bash
# Check coverage configuration
# Ensure test files are included
# Verify coverage tool installation
```

## Documentation

- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Rust Testing](https://doc.rust-lang.org/book/ch11-00-testing.html)
- [Soroban Testing](https://soroban.stellar.org/docs/learn/testing)

---

**Last Updated**: June 2026
