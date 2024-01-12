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
