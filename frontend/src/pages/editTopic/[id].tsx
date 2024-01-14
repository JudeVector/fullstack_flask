"use client";

import EditTopicForm from "@/components/EditTopicForm";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const getTopicById = async (id: any) => {
  try {
    const res = await axios.get(`${apiUrl}/api/v1/topics/${id}`, {
      headers: {
        "Cache-Control": "no-store",
      },
    });

    if (!res.data) {
      throw new Error("Failed to fetch topic");
    }
    return res.data;
  } catch (error) {
    console.error("Error loading topic", error);
    throw error;
  }
};

const editTopic = ({ id, title, description }: any) => {
  return <EditTopicForm id={id} title={title} description={description} />;
};

export async function getServerSideProps({ params }: any) {
  const { id } = params;
  const topic = await getTopicById(id);

  return {
    props: {
      id,
      title: topic.topic.title,
      description: topic.topic.description,
    },
  };
}

export default editTopic;

// import EditTopicForm from "@/components/EditTopicForm";
// import axios from "axios";
// import { useState, useEffect } from "react";

// const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// const EditTopic = ({ id }: any) => {
//   const [topic, setTopic] = useState({ title: "", description: "" });

//   useEffect(() => {
//     const fetchTopic = async () => {
//       try {
//         const res = await axios.get(`${apiUrl}/api/v1/topics/${id}`);
//         setTopic({ ...res.data });
//       } catch (error) {
//         console.error("Error loading topic", error);
//         // Handle error gracefully, e.g., display an error message
//       }
//     };

//     fetchTopic();
//   }, [id]);

//   return <EditTopicForm id={id} topic={topic} />;
// };

// export default EditTopic;
