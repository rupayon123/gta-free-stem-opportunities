import { ProgramDirectory, programDirectoryMetadata } from "./ProgramDirectory";

export const dynamic = "force-static";
export const metadata = programDirectoryMetadata(1);

export default function ProgramsPage() {
  return <ProgramDirectory page={1} />;
}
