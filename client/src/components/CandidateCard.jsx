/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import axiosClient from '../utils/axiosClient';
import socket from '../utils/socket';
import Swal from 'sweetalert2';

export default function CandidateCard({ candidate }) {
  const { name, imgUrl, motto } = candidate;
  const navigate = useNavigate();

  const handlePilih = async () => {
    try {
      const { data } = await axiosClient.patch(`/users/${localStorage.getItem('user_id')}`, {
        CandidateId: candidate.id,
      });

      socket.emit('incomingVote', 'new vote created');
      navigate('/');
      Swal.fire(data.message);
    } catch (error) {
      console.log('🚀 ~ handlePilih ~ error:', error);
      Swal.fire(error.response.data.message);
    }
  };

  return (
    <div className="group flex flex-col items-center">
      <div className="relative w-full max-w-xs h-64 overflow-hidden">
        <img src={imgUrl} alt={name} className="w-full h-full object-center object-cover rounded-md opacity-90 group-hover:opacity-100" />
      </div>
      <div className="w-full max-w-xs h-40 px-4 py-8 flex flex-col items-center bg-gray-800 rounded-md mt-2">
        <p className="text-xl text-white uppercase text-center font-bold">{name}</p>
        <p className="text-sm text-gray-300 text-center mt-2">{motto}</p>
        {/* <p className="text-md text-gray-300 text-center mt-1">
          {totalVote} Votes
        </p> */}
      </div>
      <div className="flex justify-center items-center h-16 mt-4">
        <button onClick={handlePilih} className="px-3 py-2 text-gray-900 bg-gray-100 rounded-sm focus:outline-none focus:ring focus:ring-gray-500 uppercase tracking-widest font-bold">
          Vote
        </button>
      </div>
    </div>
  );
}
