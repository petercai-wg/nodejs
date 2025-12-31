import pg from "pg";
import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, ".env") });


const { Client } = pg;

const db_url = `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`

console.log("Connecting to DB at ", db_url);

const client = new Client({
    connectionString: db_url,
    ssl: {
        rejectUnauthorized: false, // use only in dev; for production, configure certs properly
    },
});

await client.connect().then(() => {
    console.log("Connection to DB established.");
});
const userId = 1

const result = await client.query("SELECT * FROM users WHERE id = $1", [userId]);

console.log("Return #rows:", result.rows.length);

for (const row of result.rows) {
    console.log(`Row:, ${row.id}, ${row.name}, ${row.home_address}, ${row.settings}`);

    const compositeStr = row.home_address;
    const [street, city, zip] = compositeStr.slice(1, -1).split(",");

    console.log("Home address is:", street, city, zip);

}

await client.query("LISTEN new_order_channel");

client.on("notification", (msg) => {
    const order = JSON.parse(msg.payload);
    console.log(" Received from new_order_channel : ", order);

});