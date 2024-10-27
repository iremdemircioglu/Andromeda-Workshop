// components/VotingComponent.js
// src/modules/wallet/components/VotingComponent.js
"use client";

import { useState } from "react";

export default function VotingComponent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [proposalId, setProposalId] = useState('');
  const [results, setResults] = useState(null);

  const createProposal = async () => {
    const res = await fetch('/api/proposal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    const data = await res.json();
    alert(`Proposal created: ${data.id}`);
  };
  
  const voteOnProposal = async (vote) => {
    const res = await fetch('/api/proposal', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ proposalId, vote }),
    });
    const data = await res.json();
    alert("Vote cast!");
  };
  
  const fetchResults = async () => {
    const res = await fetch(`/api/proposal?proposalId=${proposalId}`);
    const data = await res.json();
    setResults(data);
  };
  

  return (
    <div>
      <h2>Create Proposal</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button onClick={createProposal}>Create</button>

      <h2>Vote on Proposal</h2>
      <input value={proposalId} onChange={(e) => setProposalId(e.target.value)} placeholder="Proposal ID" />
      <button onClick={() => voteOnProposal("yes")}>Vote Yes</button>
      <button onClick={() => voteOnProposal("no")}>Vote No</button>

      <h2>Proposal Results</h2>
      <button onClick={fetchResults}>Fetch Results</button>
      {results && <pre>{JSON.stringify(results, null, 2)}</pre>}
    </div>
  );
}
