import store from "@/store";
const isAuthenticated = async (to, from, next) => {
  const { ok } = await store.dispatch("checkAuth");

  if (to.name !== "Login" && !ok) {
    if (to.name === "Register") {
      next();
    } else {
      next({ name: "Login" });
    }
  } else if ((to.name === "Login" || to.name === "Register") && ok) {
    next({ name: "Home" });
  } else {
    next();
  }
};

export default isAuthenticated;
