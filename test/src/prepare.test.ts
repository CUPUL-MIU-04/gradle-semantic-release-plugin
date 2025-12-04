// Tests simplificados para prepare.ts
import prepare from "../../src/prepare";
import { runGradle } from "../../src/gradle";

// Mock de runGradle
jest.mock("../../src/gradle");

describe("prepare", () => {
  const mockContext = {
    cwd: "/test/path",
    logger: {
      log: jest.fn(),
    },
  };

  const mockPluginConfig = {
    gradleCommand: "./gradlew",
    gradleOptions: ["--stacktrace"],
    gradleProperties: { version: "1.0.0" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call runGradle with build task", async () => {
    await prepare(mockPluginConfig, mockContext as any);

    expect(runGradle).toHaveBeenCalledWith("build", {
      cwd: "/test/path",
      gradleCommand: "./gradlew",
      gradleOptions: ["--stacktrace"],
      gradleProperties: { version: "1.0.0" },
      logger: mockContext.logger,
    });
  });

  it("should use default values when not provided", async () => {
    const config = {};
    await prepare(config, mockContext as any);

    expect(runGradle).toHaveBeenCalledWith("build", {
      cwd: "/test/path",
      gradleCommand: undefined,
      gradleOptions: undefined,
      gradleProperties: undefined,
      logger: mockContext.logger,
    });
  });
});
