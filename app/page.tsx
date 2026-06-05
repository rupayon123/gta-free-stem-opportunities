import { HomePage } from "@/components/HomePage";

export default function Page() {
  return (
    <>
      <section className="sr-only" aria-label="Site summary">
        <h1>GTA FREE STEM Opportunities</h1>
        <p>
          GTA FREE STEM Opportunities helps students, parents, caregivers, educators, newcomer families, and community
          groups find free and accessible STEM programs across the Greater Toronto Area in Ontario, Canada.
        </p>
        <p>
          Search free STEM programs, library events, volunteer hours, co-op, SHSM, mentorship, youth leadership,
          hackathons, workshops, and youth learning opportunities in Toronto, Peel, York, Durham, Halton, Mississauga,
          Brampton, Markham, Scarborough, Vaughan, Richmond Hill, Oakville, Burlington, Oshawa, Ajax, Pickering, Whitby,
          and nearby GTA communities.
        </p>
        <p>
          The platform includes EDI-focused discovery for Black youth-focused programs, girls and women-focused STEM
          programs, Indigenous youth-focused opportunities, accessible programs, and multilingual support for Greater
          Toronto Area families.
        </p>
      </section>
      <HomePage />
    </>
  );
}
