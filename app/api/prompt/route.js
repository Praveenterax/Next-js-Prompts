import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, res) => {
	try {
		await connectToDB();

		const prompts = await Prompt.find({}).populate('creator');
		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (err) {
		return new Response('Failed to fetch the prompts', { status: 200 });
	}
};