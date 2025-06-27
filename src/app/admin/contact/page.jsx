"use client";

import { getContacts, getCookie } from "@/actions/auth";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import { useEffect, useState } from "react";
const token = getCookie("token");

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [contacts, setContacts] = useState([])

  async function fetchData() {
    try {
      const response = await getContacts(token)
      if (response.success) setContacts(response.payload)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(function () {
    fetchData()
  }, [])
  return <AdminDashboard>
    <div className="mt-8">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Subject
            </th>
            <th scope="col" className="px-6 py-3">
              Message
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts?.map((contact, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {contact.name}
              </th>
              <td className="px-6 py-4">{contact?.email}</td>
              <td className="px-6 py-4">{contact?.subject}</td>
              <td className="px-6 py-4">{contact?.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </AdminDashboard>
}