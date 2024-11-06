import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import CandidateCard from "../components/CandidateCard";
import Swal from "sweetalert2";

export default function VotePage() {
  const [candidate, setCandidate] = useState([]);

  const fetchCandidate = async () => {
    try {
      const response = await axiosClient({
        method: "GET",
        url: "/candidates",
      });

      setCandidate(response.data);
    } catch (error) {
      console.log("🚀 ~ fetchCandidate ~ error:", error);
      Swal.fire(error.response.data.message)
    }
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl tracking-widest text-white text-center uppercase font-bold">
        <span className="block">Choose your Candidate</span>
      </h2>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 justify-items-center">
        {candidate.length > 0 ? (
          candidate.map((candidate, i) => (
            <CandidateCard key={i} candidate={candidate} />
          ))
        ) : (
          <p className="text-center">No candidate found</p>
        )}
      </div>
    </div>
  );
}
