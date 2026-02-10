import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import {AlertCircleIcon , Command, GlobeIcon, Loader2Icon} from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,

} from "@/components/ui/command";
import { useProjects } from "../hooks/use-projects";
import { on } from "events";
import { get } from "http";

interface ProjectCommandDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const getProjectIcon = (project : Doc<"projects">) => {
    if (project.importStatus === "completed") {
        return <FaGithub className="size-4 text-muted-foreground" />
    }

    if (project.importStatus === "failed") {
        return <AlertCircleIcon className="size-4 text-muted-foreground" />
    }

    if (project.importStatus === "importing") {
        return (
            <Loader2Icon className="size 4 text-muted-foreground animate-spin" />
        );
    }

    return <GlobeIcon className="size-4 text-muted-foreground" />;
}

export const ProjectCommandDialog = ({
    open,
    onOpenChange,
} : ProjectCommandDialogProps) => {
    const router = useRouter();
    const projects  = useProjects();

    const handleSelect =(projectId: string) => {
        router.push(`/projects/${projectId}`);
        onOpenChange(false);
    };

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}
        title ="Search Projects"
        description="Search and navigate to your projects ">
            <CommandInput placeholder="Search projects..." />
            <CommandList>
                <CommandEmpty>
                    No projects found .
                </CommandEmpty>
                <CommandGroup heading="Projects">
                    {projects?.map((projects) => (
                        <CommandItem key={projects._id}
                        value={`${projects.name} ${projects._id}`}
                        onSelect={() => handleSelect(projects._id)}>
                            {getProjectIcon(projects)}
                            <span>
                                {projects.name}
                            </span>

                        </CommandItem>
                    ))}
                     </CommandGroup>

            </CommandList>
            </CommandDialog>
    )
};