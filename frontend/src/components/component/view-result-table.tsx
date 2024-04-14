import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


export default function ViewResultTable() {
  const router = useRouter();
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const interviewName = localStorage.getItem('interviewName');
        const response = await axios.get('http://localhost:8000/api/getCandidatesNames', {
          params: { interviewName }
        });

        // Set the fetched candidates to state
        setCandidates(response.data.candidates);
      } catch (error) {
        console.error('Error fetching Candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  const handleViewClick = (candidate) => {
    localStorage.removeItem('CandidateNameForReport');
    localStorage.removeItem('CandidateEmailForReport');
    localStorage.setItem('CandidateNameForReport', candidate.name);
    localStorage.setItem('CandidateEmailForReport', candidate.email);
    router.push('/admin/candidate-report')
  }

  const getStatusLabel = (submitted) => {
    return submitted ? 'Under Review' : 'Absent';
  };

  const handleAction = async (candidate, action) => {
    try {
      const updatedCandidates: any = candidates.map((c) => {
        if (c.name === candidate.name) {
          return { ...c, status: action === 'accept' ? 'Accepted' : 'Rejected' };
        }
        return c;
      });

      setCandidates(updatedCandidates);
      const response = await axios.post('http://localhost:8000/api/updateCandidateStatus', {
        candidateName: candidate.name,
        candidateEmail: candidate.email,
        action // 'accept' or 'reject'
      });

      console.log(response.data);

      // Update the candidate status locally

    } catch (error) {
      console.error('Error updating candidate status:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full mt-20">
      <div className="center-table">
        <Table className="border border-gray-300">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Candidate</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[150px] text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.name}>
                <TableCell className="font-medium">{candidate.name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.status || getStatusLabel(candidate.submitted.submitted)}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  {candidate.submitted.submitted ? (
                    <>
                      <Button
                        size="sm"
                        className="bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out"
                        onClick={() => handleViewClick(candidate)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out"
                        onClick={() => handleAction(candidate, 'accept')}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out"
                        onClick={() => handleAction(candidate, 'reject')}
                      >
                        Reject
                      </Button>
                    </>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <style jsx>{`
        /* Custom CSS to center the table */
        .center-table {
          display: grid;
          place-items: center;
        }
      `}</style>
    </div>
  );
}
