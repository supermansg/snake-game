import { createAuthService } from "./services/auth.js";
import { createAccountSyncService } from "./services/account-sync.js";

const auth = createAuthService();
const accountSync = createAccountSyncService(auth);

window.SnakeMeServices = {
  ...(window.SnakeMeServices || {}),
  auth,
  accountSync
};

async function boot() {
  await auth.init();
  await import("../game.js");
  await accountSync.init();
}

void boot();
