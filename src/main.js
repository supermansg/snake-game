import { createAuthService } from "./services/auth.js";

const auth = createAuthService();

window.SnakeMeServices = {
  ...(window.SnakeMeServices || {}),
  auth
};

async function boot() {
  await auth.init();
  await import("../game.js");
}

void boot();
