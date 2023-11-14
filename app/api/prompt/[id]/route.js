import { connectToDB } from "@utils/database";
import Prompt from '@models/Prompt';

// Get
export const GET = async (req, { params }) => {
	try {
		await connectToDB();
		const prompt = await Prompt.findById(params.id).populate('creator');
		if (!prompt) return new Response('Prompt not found', { status: 404 });
		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (err) {
		console.log(err)
		return new Response('Some error occured', { status: 500 });
	}
};

// Patch

export const PATCH = async (req, { params }) => {

	const { prompt, tag } = await req.json();

	try {
		await connectToDB();

		const existingPrompt = await Prompt.findById(params.id);
		if (!existingPrompt) {
			return new Response('Prompt not found', { status: 404 });
		}
		existingPrompt.prompt = prompt;
		existingPrompt.tag = tag;
		await existingPrompt.save();
		return new Response(JSON.stringify(existingPrompt), { status: 200 });
	} catch (err) {
		return new Response('Failed to update the prompt', { status: 404 })
	}
};

// Delete

export const DELETE = async (req, { params }) => {
	const { id } = params;
	try {
		await connectToDB();
		await Prompt.findByIdAndRemove(id)
		return new Response('Successfully deleted the post', { status: 200 })
	} catch (err) {
		return new Response('Failed to delete the prompt', { status: 404 });
	}
};