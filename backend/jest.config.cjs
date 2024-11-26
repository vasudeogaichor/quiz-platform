module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  extensionsToTreatAsEsm: [".ts"], // Treat `.ts` files as ES modules
  globals: {
      "ts-jest": {
          useESM: true, // Enable ESM support for TypeScript
      },
  },
  };
  