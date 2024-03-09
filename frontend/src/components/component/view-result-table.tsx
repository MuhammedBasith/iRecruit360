import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function ViewResultTable() {
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
            <TableRow>
              <TableCell className="font-medium">Alice Johnson</TableCell>
              <TableCell>alice.j@example.com</TableCell>
              <TableCell>Under Review</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button size="sm" className="bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out">View</Button>
                <Button size="sm" className="bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out">Accept</Button>
                <Button size="sm" className="bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out">Reject</Button>
              </TableCell>
            </TableRow>
            {/* More TableRow components */}
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
  )
}
