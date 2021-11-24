import React from "react";
import { useParams } from "react-router";
import SubjectCard from "../subject/subjectCard";
export default function Subject() {
  const [subject, setSubjects] = React.useState([]);
  const { id } = useParams();
  console.log(id);
  React.useEffect(() => {
    async function fechSubjects() {
      const res = await window.electron.subject.fetchSubjects(id);
      setSubjects(res);
    }

    fechSubjects();
  }, []);
  return (
    <React.Fragment>
      {subject.map((subject, index) => (
        <SubjectCard courseName={id} subjectName={subject} index={index} />
      ))}
    </React.Fragment>
  );
}
