import Andromeda from "andromeda-sdk";

const config = {
  network: "testnet",
  apiKey: process.env.ANDROMEDA_API_KEY,
};
const andromeda = new Andromeda(config);

export async function POST(request) {
  try {
    const { title, description } = await request.json();
    const proposal = await andromeda.createProposal({ title, description });
    return new Response(JSON.stringify(proposal), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { proposalId, vote } = await request.json();
    const response = await andromeda.vote(proposalId, vote);
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const proposalId = url.searchParams.get("proposalId");
    const results = await andromeda.getProposalResults(proposalId);
    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
