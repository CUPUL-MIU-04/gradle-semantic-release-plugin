// Tests para index.ts
import plugin from "../../src/index";

describe("plugin", () => {
  it("should export verifyConditions, prepare, and publish functions", () => {
    expect(plugin).toHaveProperty("verifyConditions");
    expect(plugin).toHaveProperty("prepare");
    expect(plugin).toHaveProperty("publish");

    expect(typeof plugin.verifyConditions).toBe("function");
    expect(typeof plugin.prepare).toBe("function");
    expect(typeof plugin.publish).toBe("function");
  });

  it("should have correct function names for semantic-release", () => {
    // Verificar que las funciones tienen los nombres esperados por semantic-release
    expect(Object.keys(plugin)).toEqual([
      "verifyConditions",
      "prepare",
      "publish",
    ]);
  });
});
