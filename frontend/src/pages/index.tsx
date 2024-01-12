import React, { useEffect, useState } from "react";
import RemoveBtn from "@/components/RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const TopicsList = () => {
  const [topics, setTopics] = useState([]);

  const getTopics = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/topics`, {
        headers: { "Cache-Control": "no-store" },
      });

      return res.data;
    } catch (error) {
      console.error("Error loading topics", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopics();
      setTopics(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {topics.map((topic: any) => (
        <div
          key={topic.id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{topic.title}</h2>
            <div>{topic.description}</div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn id={topic.id} />
            <Link href={`/editTopic/${topic.id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicsList;
