"use client";
import { getSessions } from "@/actions/app";
import { createSession, deleteSession, getCookie, updateSession } from "@/actions/auth";
import AdminDashboard from "@/components/Admin/AdminDashboard"
import ContentError from "@/components/common/ContentError";
import ContentLoader from "@/components/common/ContentLoader";
import { FormControl } from "@/components/common/FormControl";
import SelectControl from "@/components/common/Select";
import { Modal } from "@mui/material";
import { format, formatISO, parse } from "date-fns";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast"
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import useSWR, { mutate } from "swr";

const token = getCookie("token");

export default function Page() {
  return <AdminDashboard>
    <Toaster />
    <div className="w-full bg-white p-4 rounded-[10px]">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-[24px]">Sessions</h4>
        <SessionModal />
      </div>
      <ListSessions />
    </div>
  </AdminDashboard>
}

function ListSessions() {
  const { isLoading, error, data } = useSWR("app/sessions", getSessions);

  if (isLoading) return <ContentLoader />

  if (error || !data.success) return <ContentError title={error || data?.message} />
  const sessions = data.data;

  return <table className="mt-2 text-center border-collapse border border-gray-300">
    <thead>
      <tr>
        <th className="border border-gray-300 px-2 py-1">Name</th>
        <th className="border border-gray-300 px-2 py-1">Date</th>
        <th className="border border-gray-300 px-2 py-1">Day</th>
        <th className="border border-gray-300 px-2 py-1">Time</th>
        <th className="border border-gray-300 px-2 py-1">Trainer Name</th>
        <th className="border border-gray-300 px-2 py-1">Workout Type</th>
      </tr>
    </thead>
    <tbody>
      {sessions.map((session, idx) => (
        <tr key={idx}>
          <td className="border border-gray-300 px-2 py-1">{session.name}</td>
          <td className="border border-gray-300 px-2 py-1">{format(new Date(session.date), "dd-MM-yyyy")}</td>
          <td className="border border-gray-300 px-2 py-1">{session.day}</td>
          <td className="border border-gray-300 px-2 py-1">{session.time}</td>
          <td className="border border-gray-300 px-2 py-1">{session.trainerName}</td>
          <td className="border border-gray-300 px-2 py-1">{session.workoutType}</td>
          <td className="border border-gray-300 px-2 py-1 flex items-center gap-2">
            <SessionModal data={session}>
              <FaEdit className="cursor-pointer" />
            </SessionModal>
            <DeleteSession sessionId={session._id} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
}

function formatDate(dateStr = new Date().toISOString()) {
  return format(new Date(dateStr), "yyyy-MM-dd");
}

function formatTime(time) {
  if (!time) return time;
  return format(parse(time, "hh:mm a", new Date()), "HH:mm");
}

async function getLink(isUpdate, data) {
  if (isUpdate) {
    return await updateSession(data, token);
  } else {
    return await createSession(data, token);
  }
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function SessionModal({ data, children }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(() => ({
    sessionId: data?._id || undefined,
    name: data?.name || "",
    trainerName: data?.trainerName || "",
    day: data?.day || "Sunday",
    date: formatDate(data?.date),
    workoutType: data?.workoutType || "",
    time: formatTime(data?.time) || "",
    videoUrl: data?.videoUrl || "",
    thumbnail: data?.thumbnail || ""
  }));
  function changeFieldValue(name, value) {
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    try {
      setLoading(true);
      for (const field in formData) {
        if (!formData[field] && field !== "sessionId") throw new Error(`${field} is required!`);
      }
      const payload = {
        ...formData,
        date: formatISO(parse(formData.date, 'yyyy-MM-dd', new Date())),
        time: format(parse("18:00", "HH:mm", new Date()), "hh:mm a")
      };

      const response = await getLink(Boolean(data), payload); // function passed as prop
      if (!response?.success) throw new Error(response?.message || "Something went wrong");
      toast.success(response.message, "Session saved!");
      mutate("app/sessions");
      setModalOpened(false);
    } catch (error) {
      toast.error(error.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  return <div>
    {!children && (
      <button
        onClick={() => setModalOpened(true)}
        className="bg-blue-600 text-white px-4 py-1 rounded-md"
      >
        Add Session
      </button>
    )}
    <div onClick={() => setModalOpened(true)}>{children}</div>

    <Modal
      onClose={() => setModalOpened(false)} open={modalOpened}
      className="flex items-center justify-center"
    >
      <div className="max-h-[70vh] max-w-[500px] w-full bg-white p-4 rounded-md relative overflow-y-auto">
        <FaXmark className="absolute top-4 right-4 cursor-pointer" onClick={() => setModalOpened(false)} />
        <h3 className="text-[28px] font-bold mb-4">Session Details</h3>

        <FormControl label="Name" value={formData.name} onChange={e => changeFieldValue("name", e.target.value)} />
        <FormControl label="Trainer Name" value={formData.trainerName} onChange={e => changeFieldValue("trainerName", e.target.value)} />
        <SelectControl className="mb-4 block" label="Day" options={DAYS.map(day => ({ id: day, name: day, value: day }))} value={formData.day} onChange={e => changeFieldValue("day", e.target.value)} />
        <FormControl label="Date" type="date" value={formData.date} onChange={e => changeFieldValue("date", e.target.value)} />
        <FormControl label="Workout Type" value={formData.workoutType} onChange={e => changeFieldValue("workoutType", e.target.value)} />
        <FormControl label="Time" type="time" value={formData.time} onChange={e => changeFieldValue("time", e.target.value)} placeholder="e.g., 06:00 PM" />
        <FormControl label="Video URL" value={formData.videoUrl} onChange={e => changeFieldValue("videoUrl", e.target.value)} />
        <FormControl label="Thumbnail URL" value={formData.thumbnail} onChange={e => changeFieldValue("thumbnail", e.target.value)} />

        <button
          disabled={loading}
          onClick={handleSave}
          className="w-fit bg-blue-600 text-white px-4 py-1 mt-4 mx-auto block rounded-md"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </Modal>
  </div>
}

function DeleteSession({ sessionId }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  async function deleteSessionAction() {
    try {
      setLoading(true);
      const response = await deleteSession({ sessionId }, token);
      if (!response?.success) throw new Error(response?.message || "Something went wrong");
      toast.success(response.message, "Session saved!");
      mutate("app/sessions");
      setModalOpened(false);
    } catch (error) {
      toast.error(error.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  return <div>
    <FaTrash onClick={() => setModalOpened(true)} className="text-red-600 cursor-pointer" />
    <Modal
      onClose={() => setModalOpened(false)} open={modalOpened}
      className="flex items-center justify-center"
    >
      <div className="max-h-[70vh] max-w-[500px] w-full bg-white p-4 rounded-md relative overflow-y-auto">
        <FaXmark className="absolute top-4 right-4 cursor-pointer" onClick={() => setModalOpened(false)} />
        <h3 className="text-[28px] font-bold mb-4">Are you sure?</h3>
        <div className="flex gap-4">
          <button onClick={() => setModalOpened(false)} className="bg-black text-white px-4 py-[6px] rounded-[8px]">Cancel</button>
          <button onClick={deleteSessionAction} className="bg-red-600 text-white px-4 py-[6px] rounded-[8px]">Yes</button>
        </div>
      </div>
    </Modal>
  </div>
}