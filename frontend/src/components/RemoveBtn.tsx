import React, { useState, useCallback } from "react";
import axios from "axios";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const RemoveBtn = ({ id }: any) => {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const removeTopic = useCallback(async () => {
    try {
      const res = await axios.delete(`${apiUrl}/api/v1/topics/${id}`);

      if (res.status === 200) {
        router.refresh();
      } else {
        throw new Error("Failed to delete a topic");
      }
    } catch (error) {
      console.error("Error deleting a topic", error);
    } finally {
      setShowConfirmation(false); // Reset the confirmation state
    }
  }, [id, router]);

  return (
    <>
      <button onClick={() => setShowConfirmation(true)} className="text-red-400">
        <HiOutlineTrash size={24} />
      </button>

      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p>Are you sure you want to delete this?</p>
            <button onClick={removeTopic} className="bg-red-500 text-white px-4 py-2 mt-2">
              Confirm
            </button>
            <button onClick={() => setShowConfirmation(false)} className="ml-2">
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RemoveBtn;
