# Packages

This directory contains shared libraries and utilities consumed by the web application and backend services in the Delego monorepo.

## 📋 Table of Contents

- [Overview](#overview)
- [Packages](#packages)
- [Development](#development)
- [Usage](#usage)
- [Publishing](#publishing)
- [Best Practices](#best-practices)

## Overview

The packages directory contains reusable code that is shared across the monorepo. This promotes code reuse, consistency, and maintainability across all applications and services.

### Package Principles

- **Reusability**: Packages should be reusable across multiple projects
- **Independence**: Packages should have minimal dependencies
- **Type Safety**: Full TypeScript coverage with strict mode
- **Testing**: Comprehensive test coverage
- **Documentation**: Clear documentation for all exports

## Packages

### @delego/ui

Shared React component library for consistent UI across applications.

#### Features

- **Components**: Reusable React components
- **Styling**: Tailwind CSS integration
- **Theming**: Consistent design system
- **Accessibility**: WCAG compliant components
- **Icons**: Icon components (Lucide React)

#### Components

- Button, Card, Input, Select
- Modal, Dialog, Alert
- Form components
- Layout components
- Navigation components

#### Usage

```typescript
import { Button, Card, Input } from '@delego/ui';

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </Card>
  );
}
```

### @delego/sdk

API client SDK for interacting with Delego backend services.

#### Features

- **HTTP Client**: Axios-based HTTP client
- **Authentication**: JWT token management
- **Type Safety**: Full TypeScript types
- **Error Handling**: Consistent error handling
- **Retry Logic**: Automatic retry for failed requests

#### API Methods

```typescript
import { delegoClient } from '@delego/sdk';

// Get delegations
const delegations = await delegoClient.delegations.list();

// Create delegation
const delegation = await delegoClient.delegations.create({
  agentType: 'buyer',
  spendingLimit: 10000000,
});

// Get orders
const orders = await delegoClient.orders.list();
```

### @delego/types

Shared TypeScript type definitions and interfaces.

#### Features

- **Domain Types**: Core domain types
- **API Types**: API request/response types
- **Utility Types**: TypeScript utility types
- **Enums**: Shared enumerations

#### Types

```typescript
// User types
export interface User {
  id: string;
  email: string;
  stellarAddress?: string;
  createdAt: Date;
}

// Delegation types
export interface Delegation {
  id: string;
  userId: string;
  agentType: AgentType;
  spendingLimit: number;
  status: DelegationStatus;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
}
```

### @delego/utils

Shared utility functions and helpers.

#### Features

- **Logger**: Structured logging utility
- **HTTP Server**: Express server setup
- **Currency**: Currency formatting and conversion
- **Validation**: Input validation utilities
- **Formatting**: Data formatting utilities

#### Utilities

```typescript
// Logger
import { logger } from '@delego/utils';
logger.info('Server started', { port: 3000 });

// Currency
import { formatCurrency } from '@delego/utils';
const formatted = formatCurrency(10000000, 'XLM');

// Validation
import { validateEmail } from '@delego/utils';
const isValid = validateEmail('test@example.com');
```

## Development

### Package Structure

Each package follows a consistent structure:

```
packages/
├── ui/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── sdk/
│   ├── src/
│   │   ├── client/
│   │   ├── types/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── types/
│   ├── src/
│   │   ├── domain/
│   │   ├── api/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
└── utils/
    ├── src/
    │   ├── logger/
    │   ├── currency/
    │   └── index.ts
    ├── package.json
    └── tsconfig.json
```

### Building Packages

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @delego/ui build

# Watch mode for development
pnpm --filter @delego/ui build --watch
```

### Testing Packages

```bash
# Test all packages
pnpm test

# Test specific package
pnpm --filter @delego/ui test

# Test with coverage
pnpm --filter @delego/ui test --coverage
```

## Usage

### Installing Packages

Packages are consumed by other packages in the monorepo using workspace protocol:

```json
{
  "dependencies": {
    "@delego/ui": "workspace:*",
    "@delego/sdk": "workspace:*",
    "@delego/types": "workspace:*",
    "@delego/utils": "workspace:*"
  }
}
```

### Importing from Packages

```typescript
// Import UI components
import { Button } from '@delego/ui';

// Import SDK
import { delegoClient } from '@delego/sdk';

// Import types
import { User, Delegation } from '@delego/types';

// Import utilities
import { logger } from '@delego/utils';
```

### Package Dependencies

Package dependencies are managed through the root package.json:

```json
{
  "workspaces": [
    "packages/*"
  ]
}
```

## Publishing

### Publishing to npm

Packages can be published to npm (optional for internal use):

```bash
# Build package
pnpm --filter @delego/ui build

# Publish to npm
pnpm --filter @delego/ui publish

# Publish with specific version
pnpm --filter @delego/ui publish --new-version minor
```

### Version Management

Use semantic versioning for package versions:

- **Major**: Breaking changes
- **Minor**: New features, backward compatible
- **Patch**: Bug fixes, backward compatible

### Private Packages

For internal use, packages can be marked as private:

```json
{
  "name": "@delego/ui",
  "private": true,
  "version": "0.0.1"
}
```

## Best Practices

### Package Design

- **Single Responsibility**: Each package should have a single purpose
- **Minimal Dependencies**: Keep dependencies to a minimum
- **Clear API**: Design clear, intuitive APIs
- **Type Safety**: Use TypeScript for all packages
- **Documentation**: Document all public APIs

### Code Organization

- **Barrel Exports**: Use index.ts for clean imports
- **Modular Structure**: Organize code into logical modules
- **Naming Conventions**: Use consistent naming
- **File Structure**: Follow consistent file structure

### Testing

- **Unit Tests**: Test individual functions
- **Integration Tests**: Test package integration
- **Type Tests**: Test TypeScript types
- **Coverage**: Maintain high test coverage

### Documentation

- **README**: Each package should have a README
- **API Docs**: Document all public APIs
- **Examples**: Provide usage examples
- **Changelog**: Track changes in CHANGELOG.md

### Dependencies

- **Peer Dependencies**: Use peer dependencies for React, etc.
- **Dev Dependencies**: Keep dev dependencies minimal
- **Version Ranges**: Use appropriate version ranges
- **Updates**: Regular dependency updates

## Troubleshooting

### Common Issues

**Package not found**
```bash
# Reinstall dependencies
pnpm install

# Rebuild packages
pnpm build
```

**Type errors**
```bash
# Clean build
pnpm clean
pnpm build

# Check TypeScript configuration
pnpm --filter @delego/ui typecheck
```

**Circular dependencies**
```bash
# Check for circular dependencies
# Refactor to remove circular dependencies
# Use dependency injection pattern
```

## Contributing

When contributing to packages:

1. **Follow Patterns**: Follow existing package patterns
2. **Add Tests**: Add tests for new functionality
3. **Update Docs**: Update documentation
4. **Type Safety**: Maintain TypeScript type safety
5. **Breaking Changes**: Document breaking changes

See [CONTRIBUTING.md](../CONTRIBUTING.md) for general contribution guidelines.

## Documentation

- [UI Package README](./ui/README.md)
- [SDK Package README](./sdk/README.md)
- [Types Package README](./types/README.md)
- [Utils Package README](./utils/README.md)

---

**Last Updated**: June 2026
