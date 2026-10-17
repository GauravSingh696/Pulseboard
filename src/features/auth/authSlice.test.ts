import reducer, { hydrateAuth, signIn, signOut } from "./authSlice";

describe("authSlice", () => {
  it("defaults to initial mock user", () => {
    const state = reducer(undefined, { type: "unknown" });
    expect(state.user?.name).toBe("Alex Rivera");
    expect(state.user?.email).toBe("alex@example.com");
  });

  it("updates user on signIn", () => {
    const state = reducer(
      undefined,
      signIn({ name: "Jordan Smith", email: "jordan@example.com" }),
    );
    expect(state.user).toEqual({
      name: "Jordan Smith",
      email: "jordan@example.com",
    });
  });

  it("clears user on signOut", () => {
    const state = reducer(undefined, signOut());
    expect(state.user).toBeNull();
  });

  it("restores user on hydrateAuth", () => {
    const state = reducer(
      { user: null },
      hydrateAuth({ user: { name: "Taylor", email: "taylor@example.com" } }),
    );
    expect(state.user?.name).toBe("Taylor");
  });
});
