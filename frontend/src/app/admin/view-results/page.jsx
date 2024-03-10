'use client'

import ViewResultTable from '../../../components/component/view-result-table';
import Header from '@/components/component/header';

export default function ViewResult() {
  return (
    <>
      <Header showSignUpButton={false} showAdminButton={false} showSignInButton={false} isLoggedin={true} />
        <div className="flex justify-center items-center h-full pt-9">
            <div className="center-table">
                <ViewResultTable />
            </div>
        </div>
        <style jsx>{`
          /* Add custom CSS to center the table horizontally */
          .center-table {
            display: grid;
            place-items: center;
          }
        `}</style>
    </>
  );
}
