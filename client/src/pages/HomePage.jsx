import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axiosClient from '../utils/axiosClient';
import socket from '../utils/socket';

export default function HomePage() {
  const [candidates, setCandidates] = useState([]);

  async function fetchCandidates() {
    try {
      const { data } = await axiosClient.get('/candidates');
      setCandidates(data);
    } catch (error) {
      console.log(error);
      Swal.fire(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    socket.on('notify:incomingVote', (arg) => {
      console.log(arg);
      fetchCandidates();
    });
    return () => {
      socket.off('notify:incomingVote');
    };
  }, []);

  return (
    <div className="flex my-3 flex-wrap justify-center gap-2 h-100">
      {candidates.map((candidate) => {
        return (
          <div key={candidate.id} className="card card-side bg-base-100 shadow-xl">
            <figure>
              <img src={candidate.imgUrl} style={{ width: '200px' }} alt="Candidate" />
            </figure>
            <div className="card-body">
              <p>No. Urut: {candidate.id}</p>
              <h2 className="card-title">{candidate.name}</h2>
              <p>{candidate.motto}</p>
              <p>Total Vote: {candidate.totalVote}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
