import { notFound } from "next/navigation";
import { ProgramDirectory, programDirectoryMetadata } from "../../ProgramDirectory";
import { programDirectoryPageCount } from "@/lib/programPages";

type DirectoryPageProps = { params: Promise<{ page: string }> };
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: programDirectoryPageCount - 1 }, (_, index) => ({ page: String(index + 2) }));
}

function directoryPage(value: string) {
  const page = Number(value);
  if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(page) || page < 2 || page > programDirectoryPageCount) notFound();
  return page;
}

export async function generateMetadata({ params }: DirectoryPageProps) {
  return programDirectoryMetadata(directoryPage((await params).page));
}

export default async function PagedPrograms({ params }: DirectoryPageProps) {
  return <ProgramDirectory page={directoryPage((await params).page)} />;
}
