/* eslint-disable no-console */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2024-01-01", dataset: "production" });

const query = `*[_type == "character"]._id`;

client
	.fetch(query)
	.then(async (ids: string[]): Promise<boolean | void> => {
		console.log(ids);
		if (!ids.length) {
			console.log("No documents to delete");
			return true;
		}

		console.log(`Deleting ${ids.length} documents`);
		return ids
			.reduce((trx, id) => trx.delete(id), client.transaction())
			.commit({ visibility: "async" })
			.then(() => console.log("Done!"));
	})
	.catch((err) => {
		if (err.message.includes("Insufficient permissions")) {
			console.error(err.message);
			console.error("Did you forget to pass `--with-user-token`?");
		} else {
			console.error(err.stack);
		}
	});
