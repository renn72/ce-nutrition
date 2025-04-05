import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();

const tursoClient = createClient({
    url: process.env.DATABASE_URL ?? '',
    syncUrl: process.env.DATABASE_SYNC_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
    offline: true,
});

(async () => {
    console.log("Syncing  database");
    await tursoClient.sync();
    console.log("Synced  database");
})();
