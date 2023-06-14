import { Select } from "@mantine/core";
import { useState } from "react";
import AddProjectModal from "./ProjectManager/AddProjectModal";
import { useSession } from "next-auth/react";

export const ProjectManagerBoard = () => {
  const [project, setProject] = useState<string>("");

  const { data: sessionData, status } = useSession();

  return (
    <>
      <div className="m-8">
        <div>
          <Select
            className="flex w-96 flex-col"
            label="Your favorite framework/library"
            placeholder="Pick one"
            data={[
              { value: "react", label: "React" },
              { value: "ng", label: "Angular" },
              { value: "svelte", label: "Svelte" },
              { value: "vue", label: "Vue" },
            ]}
          />
          <div className="my-4">
            <AddProjectModal />
          </div>
        </div>
        <button onClick={() => console.log(sessionData?.user.id)}>
          Show session
        </button>

        <div>Project Table</div>
      </div>
    </>
  );
};

export default ProjectManagerBoard;
