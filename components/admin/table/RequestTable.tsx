"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import { BookRequest } from "@/types";
import { AdminTab } from "@/utils/enum";

interface RequestTableProps {
  data: BookRequest[];
  actions?: {
    label: string;
    onClick: (request: BookRequest) => void;
    bgColor: string;
  }[];
  useIn:
    | AdminTab.INCOMING_REQUEST
    | AdminTab.ACTIVE_REQUEST
    | AdminTab.ARCHIVED_REQUEST;
}

export default function RequestTable({
  data,
  actions,
  useIn,
}: RequestTableProps) {
  console.log("====================================");
  console.log("data", data);
  console.log("====================================");

  return (
    <table className='w-full '>
      <thead>
        <tr
          className='
            border-b-2 border-primary 
            font-bold text-xl text-primary 
            [&>td]:py-4 w-full
            [&<td]:w-fit [&<td]:whitespace-nowrap
          '
        >
          <td className='w-2/5'>Book</td>
          <td>Username</td>
          {useIn === AdminTab.INCOMING_REQUEST && <td>Request date</td>}
          {useIn === AdminTab.ACTIVE_REQUEST && <td>To be returned date</td>}
          {useIn === AdminTab.ARCHIVED_REQUEST && <td>Status</td>}
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {data.map((request) => (
          <tr
            key={request.requestId}
            className='
              border-b-2 border-primary
              text-primary text-lg
              w-full
              [&>td]:p-2
              [&>td]:whitespace-pre-wrap
            '
          >
            <td className=''>
              <div className='flex flex-grow gap-2 items-center'>
                {/* <img
                  src={request.book.bookImg}
                  alt={request.book.title}
                  className='w-14'
                /> */}
                <div className='relative w-14 h-20 hidden md:block'>
                  <Image
                    src={request.book.bookImg}
                    alt={request.book.title}
                    fill
                    className='object-scale-down'
                  />
                </div>
                <div className='whitespace-pre-wrap text-center'>
                  {request.book.title}
                </div>
              </div>
            </td>
            <td>{request.borrower.username}</td>

            {useIn === AdminTab.INCOMING_REQUEST && (
              <td>{request.dateOfRequest.toLocaleString()}</td>
            )}

            {useIn === AdminTab.ACTIVE_REQUEST && (
              <td>{request.dateOfReturn!.toLocaleString()}</td>
            )}

            {useIn === AdminTab.ARCHIVED_REQUEST && (
              <td>
                <div
                  className={`
                    rounded-full px-4 py-2 text-sm font-bold text-white w-fit
                    ${request.isApproved ? "bg-success" : "bg-danger"}
                  `}
                >
                  {request.isApproved && "Approved"}
                  {!request.isApproved && "Rejected"}
                </div>
              </td>
            )}

            <td>
              {actions?.map((action) => (
                <button
                  key={action.label}
                  className={`
                    rounded-full px-4 py-2 
                    text-sm text-primary font-bold m-1
                    ${action.bgColor}
                    hover:bg-opacity-80
                  `}
                  onClick={() => action.onClick(request)}
                >
                  {action.label}
                </button>
              ))}
            </td>
          </tr>
        ))}

        {data.length === 0 && (
          <tr className='text-primary text-xl'>
            <td colSpan={5} className='text-center p-4'>
              No request
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
