import { fetchData } from "@/lib/api";
import CoachDetails from "@/components/CoachDetails";
import { notFound } from "next/navigation";

export default async function CoachPage({ params }) {
  const { id } = await params;

  try {
    const coachData = await fetchData(`app/all-coaches?coachId=${id}`);

    if (!coachData.success || !coachData.data) {
      return <></>
    }

    return <CoachDetails coach={coachData.data} />;
  } catch (error) {
    console.error("Error fetching coach:", error);
    
  }
}
