/* eslint-disable no-console */
// eslint-disable-next-line unicorn/prevent-abbreviations
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2024-01-01", dataset: "production" });

const run = async (): Promise<void> => {
	const experienceIds: string[] = await client.fetch(`*[_type == "experience"]._id`);

	if (experienceIds.length === 0) {
		console.log("No experience documents found");

		return;
	}

	console.log(`Found ${String(experienceIds.length)} experience documents`);

	// Find assets only referenced by experience documents
	const assetIds: string[] = await client.fetch(
		`*[_type in ["sanity.imageAsset", "sanity.fileAsset"] && count(*[references(^._id) && _type != "experience"]) == 0 && count(*[references(^._id) && _type == "experience"]) > 0]._id`,
	);

	console.log(`Found ${String(assetIds.length)} assets exclusively referenced by experiences`);

	const idsToDelete = [...experienceIds, ...assetIds];

	console.log(`\nDeleting ${String(idsToDelete.length)} documents total...`);

	await idsToDelete.reduce((trx, id) => trx.delete(id), client.transaction()).commit({ visibility: "async" });

	console.log("Done!");
};

run().catch((error: unknown) => {
	const errorMessage = error instanceof Error ? error.message : String(error);
	const errorStack = error instanceof Error ? error.stack : String(error);

	if (errorMessage.includes("Insufficient permissions")) {
		console.error(errorMessage);
		console.error("Did you forget to pass `--with-user-token`?");
	} else {
		console.error(errorStack);
	}
});
