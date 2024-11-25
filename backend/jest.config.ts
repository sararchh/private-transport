import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "src"],
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  restoreMocks: true,
};

export default config;
