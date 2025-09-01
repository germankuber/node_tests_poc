# 🚀 TypeORM Test Project

A comprehensive TypeScript project demonstrating **TypeORM** integration with **PostgreSQL**, featuring robust testing with **Jest** and **pg-mem** for in-memory database testing.

## ✨ Features

- 🎯 **TypeORM** - Modern TypeScript ORM for database operations
- 🐘 **PostgreSQL** - Production-ready database support
- 🧪 **Jest Testing** - Comprehensive test suite with in-memory database
- 📝 **TypeScript** - Full type safety and modern JavaScript features
- 🔄 **Repository Pattern** - Clean architecture with separation of concerns
- 🛡️ **Service Layer** - Business logic encapsulation

## 🏗️ Project Structure

```
src/
├── entities/          # TypeORM entities
│   └── User.ts
├── repositories/      # Data access layer
│   └── UserRepository.ts
├── services/          # Business logic layer
│   └── UserService.ts
├── __tests__/         # Test suites
│   └── UserService.test.ts
└── index.ts          # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (for production)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd test_type_orm
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## 🧪 Testing

This project uses **Jest** with **pg-mem** for lightning-fast in-memory PostgreSQL testing.

### Run all tests:
```bash
npm test
```

### Run tests in watch mode:
```bash
npm test -- --watch
```

### Run specific test file:
```bash
npm test -- UserService.test.ts
```

### Test Coverage:
```bash
npm test -- --coverage
```

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run the compiled application |
| `npm run dev` | Run development server with ts-node |
| `npm test` | Execute test suite |

## 🏛️ Architecture

### Entities
- **User**: Core entity with id, name, and email fields

### Repository Layer
- **UserRepository**: Handles all database operations for User entity
- Provides methods for CRUD operations and filtering

### Service Layer
- **UserService**: Contains business logic and orchestrates repository calls
- Methods include:
  - `createUser(name, email)` - Create new user
  - `getAllUsers()` - Retrieve all users
  - `getUserByEmail(email)` - Find user by email
  - `filterUsers(options)` - Advanced filtering with multiple criteria
  - `deleteUser(id)` - Remove user by ID

## 🧪 Test Coverage

The project includes comprehensive tests covering:

- ✅ User creation and validation
- ✅ Retrieving all users (including empty database scenarios)
- ✅ Finding users by email
- ✅ Advanced filtering capabilities
- ✅ User deletion
- ✅ Edge cases and error handling

### Key Test Scenarios

- **Empty Database**: Ensures proper handling when no data exists
- **Data Persistence**: Verifies data integrity across operations
- **Filtering Logic**: Tests various search and filter combinations
- **Error Handling**: Validates proper error responses

## 🔧 Configuration

### TypeScript Configuration
The project uses strict TypeScript settings with:
- Target: ES2020
- Module: CommonJS
- Strict type checking enabled
- Decorator support for TypeORM

### Jest Configuration
- TypeScript support via ts-jest
- In-memory PostgreSQL with pg-mem
- Automatic test discovery
- Coverage reporting

## 📦 Dependencies

### Production
- **typeorm** - TypeScript ORM
- **pg** - PostgreSQL client
- **reflect-metadata** - Decorator metadata reflection

### Development
- **jest** - Testing framework
- **ts-jest** - TypeScript preprocessor for Jest
- **pg-mem** - In-memory PostgreSQL for testing
- **typescript** - TypeScript compiler
- **ts-node** - TypeScript execution engine

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

---

⭐ **Made with TypeScript and TypeORM** ⭐
