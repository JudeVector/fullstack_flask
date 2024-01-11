"use client";

import axios from "axios";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const RemoveBtn = ({ id }: any) => {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure you want to delete this");
    try {
      if (confirmed) {
        const res = await axios.delete(`${apiUrl}/api/v1/topics/${id}`);

        if (res.status === 200) {
          router.refresh();
        } else {
          throw new Error("Failed to delete a topic");
        }
      }
    } catch (error) {
      console.error("Error deleting a topic", error);
    }
  };
  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
};

export default RemoveBtn;
