'use client'

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Header from "./header";
import { useState } from "react";
import * as XLSX from 'xlsx';
import { useRouter } from 'next/navigation';


export default function AddCandidates() {
  const router = useRouter();

  const [fileName, setFileName] = useState(null);
  const [candidateData, setCandidateData] = useState('');

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      parseExcelFile(file);
    } else {
      setFileName(null);
    }
  };

  const handleTextareaChange = (e) => {
    setCandidateData(e.target.value);
  };

  const parseExcelFile = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const content = e.target.result;
      const workbook = XLSX.read(content, { type: 'binary' });
      const sheetName = workbook.SheetNames[0]; // Assuming only one sheet
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const formattedData = data.map(row => row.join('-')).join(', ');
      setCandidateData(previousData => previousData + (previousData ? ', ' : '') + formattedData);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = () => {
    // const combinedData = [localStorage.getItem('candidateData') || '', candidateData].filter(Boolean).join(', ');
    localStorage.removeItem('candidateData');
    localStorage.setItem('candidateData', candidateData);
    router.push('/admin/schedule-interview')
  };
  
  return (
    <>
      <Header showSignUpButton={false} showAdminButton={false} showSignInButton={false} isLoggedin={true} />
      <div className="flex items-center min-h-[600px] px-4 py-6 sm:px-6 sm:py-12">
        <div className="mx-auto space-y-6 w-full max-w-3xl mt-20">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Add Candidates</h1>
          </div>
          <div className="space-y-2">
            <Label htmlFor="candidates">Candidates</Label>
            <Textarea
              className="min-h-[200px]"
              id="candidates"
              placeholder="Enter candidate names and emails in this format: name1-email1, name2-email2, ..."
              style={{ backgroundColor: 'white' }}
              value={candidateData}
              onChange={handleTextareaChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="file" className="w-full cursor-pointer bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 transition duration-300 ease-in-out px-4 py-2 rounded-md text-center">
              {fileName ? fileName : "Add Excel File"}
              <input className="sr-only" id="file" type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              className={`w-full ${candidateData.trim() || fileName ? 'bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
              onClick={handleSubmit}
              disabled={!candidateData.trim() && !fileName}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
