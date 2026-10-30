# GTA High School: discovery and volunteering recon

Reviewed October 29, 2026. Public-source research under `project-delivery` and `replica-recon`. This extends the native visual recon; it does not replace the approved Nunito, original GTA artwork, logo or loading animation. No third-party account, private API, crawler or proprietary asset was used.

## Delivery order

1. Website visual and interaction parity with shipped iOS v3; review and verify before publication.
2. Android parity audit and remaining fixes; verify the actual candidate before a new tester update.
3. A genuine High School hub across web, iOS and Android, starting with volunteering and expanding to free learning, leadership, career exploration and funding opportunities.

Research and source inventory can happen while stage 1 is implemented. A researched feature is not implemented or published. Existing mandatory completion markers, full-catalogue/translation gaps and physical-device evidence remain open.

## Source register

| Source | URL | Observation and limits |
|---|---|---|
| Ontario community involvement guidance | https://www.ontario.ca/page/get-your-high-school-volunteer-hours | Read actual public browser page, updated August 7, 2026. Standard requirement is 40 hours; principal reviews planned/completed activities and board processes apply. Under-18 records require parent/guardian signature. Course/co-op requirements and ordinary recreation do not automatically qualify. Never promise that GTA can approve hours. |
| Volunteer Toronto high-school guide | https://www.volunteertoronto.ca/page/HighSchoolVolunteers | Actual public browser: separate student, teacher and parent guidance; links to role search, advisors and school-board forms. Reference screenshot retained privately. |
| Volunteer Toronto role search | https://www.volunteertoronto.ca/networking/opening_search.asp | Actual public browser: activity/cause/suitability categories, specific 14–17 youth suitability, city, keyword and one-time/weekend/evening/virtual/hybrid choices. Large multi-select is a friction point to improve. No copied role database. |
| Volunteer Success | https://www.volunteersuccess.com/opportunities | Actual public browser: Student filter, location/distance, virtual/in-person, causes, sort, list/grid and source distinctions. Clicking Student produced a filtered URL/results; this is not proof that all Student-tagged roles admit minors. Location/geography and exact age still need checking. Reference screenshot retained privately. |
| Volunteer Markham | https://volunteermarkham.ca/ | Cloudflare explicitly blocked the public page. No bypass, account access or UI claims. Other official York sources remain available. |
| Markham Public Library volunteering | https://markhampubliclibrary.ca/volunteering/ | Public provider guidance says 14+ and explains account/interview/orientation stages. A provider directory/process, not an assertion that a specific role is open now. |
| Mississauga volunteering | https://www.mississauga.ca/our-organization/jobs-and-volunteer/volunteer/ | Official directory distinguishes library Teen Advisory Group, MiWay student ambassadors, environment and recreation roles. The directory is not itself a dated vacancy. |
| Durham school-board directory | https://www.ddsb.ca/students/programs-opportunities/30-credits-my-way-graduation/community-involvement-hours/volunteer-opportunities/ | Official board explicitly asks students to contact providers and notes semiannual updates may not reflect current openings. Useful school-process reference, not live availability. |
| Oakville Youth Library Leaders | https://opl.ca/about-opl/volunteer/youth-library-leaders | Official search result identifies secondary-school students aged 14–18. Full current application status needs direct verification before displaying an Apply claim. |
| Pickering Public Library volunteering | https://pickeringlibrary.ca/volunteer-opportunities/ | Official source has youth roles and Durham residency restrictions. Preserve restrictions; do not promote every role to every GTA teen. |
| TPL teen councils | https://tpl.ca/support-us/volunteering/teen-councils/ | Official indexed description establishes a teen volunteering program. Direct reader returned a robot challenge. No bypass or current-open claim. |
| TPL homework help / Youth Hubs | https://tpl.ca/teens/homework-help/ and https://tpl.ca/teens/youth-hubs/ | Official indexed pages describe free study/support resources. Attendance is a learning activity, not automatically volunteer work. Card/branch/program requirements must remain visible. |
| U of T Blueprint | https://outreach.engineering.utoronto.ca/blueprint/ | Official indexed page says free for Canadian students in grades 10–11 who identify as Black. Keep exact eligibility and grade wording; confirm current intake before an application CTA. Do not infer a user's identity. |
| Hack Club | https://hackclub.com/ | Public page describes teen project/club discovery for ages 13–18 and programs. Program-specific costs, geography, requirements and deadlines need individual confirmation; not all external program links are universally eligible. |
| Canada Service Corps | https://www.canada.ca/en/services/youth/canada-service-corps/youth-volunteer.html | Official program for ages 15–30 with placements and service projects. Broader youth age range does not make every role a high-school fit; match exact role and provider conditions. |

## Current GTA gaps established from own source

- Website `components/OpportunityExplorer.tsx` currently allows High School by age overlap with 14–17. This is not a purpose-built student journey.
- iOS has pathway signals in addition to age; Android has a different OR predicate. Align audience semantics before claiming platform parity.
- Audited native snapshot has 1,904 records and zero `Volunteer role` / `volunteerHoursEligible=true` records. Snapshot counts are dated and do not describe today's entire live website.
- Some producer/classification code infers volunteering from text mentions. Being an attendee at an event run by volunteers is not a volunteer role.
- Broad volunteer directories are deliberately restricted from ordinary event export. They cannot be reactivated as invented dated events.
- No shared role-status, school-approval evidence, provider-stated hours, application deadline or hours-log workflow exists in the current discovery contract.

## Screen inventory

| ID | Screen | Key content and states |
|---|---|---|
| H01 | High School landing | Four clear pathways: Volunteer, Learn & create, Leadership & careers, Scholarships & support; explain each. No generic age-only result dump. |
| H02 | Volunteer discovery | Exact age/grade, region, cause, in-person/online and commitment controls; named saved filters. Show real roles separately from provider directories. Empty/error/partial-cache states are explicit. |
| H03 | Role detail | What the student does, exact provider eligibility, location, schedule/commitment, deadline/status, stated hours if known, contact/apply source and check date. School confirmation is distinct from provider evidence. |
| H04 | Hours notebook | Locally recorded completed work, dates, minutes, organization and notes; distinguish recorded from school-approved. Explicit save/edit/delete/export, visible storage failures, no invented signatures. No account or child profile required. |
| H05 | My saved filters / opportunities | Independent age/grade and intent per filter; genuine new matches only, explicit update, unchanged existing history. |
| H06 | Free teen learning/careers/support | Actually free and appropriately eligible programs, competition/application deadlines and exclusions. A bursary-dependent paid program is not universally free. |
| H07 | School-hours guidance | Short next steps and official board/provider links; no GTA certification or automatic school approval. |

## Core flows

- HF01: High School → Volunteer → exact eligibility/region → role detail → provider application. Browsing must work without creating an account. External registration stays with the provider.
- HF02: High School → school-hours guidance → school/board form → student arranges approval. GTA does not sign or approve.
- HF03: Completed volunteering → record actual minutes/date/organization → save locally → edit/export → submit through school process. Export is a personal record, not a signed school form.
- HF04: Save named teen filter → revisit → exact controls/results restored → real new matches shown. Selecting a preset does not overwrite it.
- HF05: High School → learning/careers/funding → inspect cost, grade and restrictions → source. Do not silently turn a paid program into a free listing.

## Proposed additive data contract

Keep ordinary dated events intact. A role/directory contract needs `id`, `listingKind` (role/program/provider-directory/resource), `pathway`, `provider`, `sourceUrl`, `checkedAt`, `audienceOriginal`, optional explicitly sourced `ageMin`/`ageMax`/`grades`, `region`, `deliveryMode`, `commitmentOriginal`, `applicationStatus` (open/closed/unknown), optional `deadline`, `costEvidence`, and `hoursEvidence` (not-stated/provider-stated/school-confirmation-required). A missing value is unknown, never zero or a fabricated current date. Provider directories have no event pins or fake Apply availability. Capture evidence/licensing before adding full external descriptions or automated collection.

Hours notebook: opaque local ID, role/provider label, local activity date, actual minutes, optional notes, self-reported/confirmed status only when explicitly recorded. Do not collect student name, school, date of birth, supervisor private contact or signatures just to use discovery. School approval cannot be inferred from a checkbox or progress bar.

## Reference-derived design decisions

Use a visible Volunteer entry and friendly, specific pathways. Put eligibility and commitment before decorative marketing copy. Make filters easy to use on a phone without Ctrl-click multi-selects. Keep the original GTA illustrations and Nunito; proprietary service imagery/logos never ship. Reuse the existing static host, search worker, map and local persistence. New repositories do not supply permission to copy third-party opportunity databases.

## Out of scope / unknown

No proprietary volunteer database, private API, account signup, paid subscription, automatic application, school certification or promised openings. Competitor authenticated matching, notifications, empty/offline states and app behavior were not tested. A blocked page does not establish its UX. Broader youth funding sources and seasonal intakes need per-program review. Physical-device testing and public-native-store gates remain separate from this recon.

## Follow-up source checks: material exclusions and dates

- Pickering's official page states that a police check is required and costs $20 with its discount letter. Its youth roles therefore must not receive a blanket zero-cost badge or enter an exclusively no-cost role result merely because volunteering is unpaid. The same page has youth and adult roles, with different ages. Preserve exact role-level eligibility and residency. School-hour credit is a provider statement, not a replacement for school approval.
- Whitby's official page says teen opportunities are currently closed, while a lower section describes reviewer submissions as ongoing. Treat this as conflicting availability requiring provider clarification; do not show Apply now or silently override the closure using the lower paragraph. Its grades 7–12 wording must not become an invented exact minimum age.
- U of T Blueprint's current public page gives applications opening November 2, 2026, deadline March 29, 2027, and summer dates July 5–30, 2027. On October 29 it is upcoming, not open. Tuition is covered; travel, accommodation and meals are not included. It is not credit-bearing. Preserve Canadian/Black/grades 10–11 restrictions without inferring any user's identity.
- The actual Volunteer Success Student flow displayed a driver role among Student-tagged results. Student suitability by itself does not establish eligibility for a minor, legal driving requirements or Ontario school credit.

These checks change the content model: add explicit `requiredCosts` / `costStatus` (no-fee-evidence / required-cost / unknown), `opensAt`, `closesAt`, and `availabilityEvidence` including conflicts. An unpaid role is not necessarily a free-to-access opportunity. No newly found role has yet been approved for publication by this research alone.

## Shared audience decision

High school is a student context, not an automatic hard cut at age 17. Prefer explicit provider grades 9–12/high-school eligibility and preserve any exact age/residency requirements alongside it. Include teen-specific free learning and community pathways, not only STEM-tagged results. An 18-year-old grade-12 student must not disappear solely because an older iOS predicate excludes all 18+ records. Conversely, generic adult-only mentorship must not enter because Android sees a mentor keyword. Unknown grade/age is visibly unknown; no conversion from grade to a guessed birth age. Clearly label broader all-age programs if included, and exclude child-parent sessions that only overlap because a parent can attend.

Volunteer roles with unknown or mandatory costs remain outside verified-free role results until reviewed. Provider directories can be presented separately as places to check current requirements; they do not count toward the number of free openings, have no invented event date or map pin, and receive no free/available badge. This preserves the public website's free-only promise while adding useful authoritative routes.

## Targeted additional program candidates, not yet approved openings

| Source | Verified facts | Remaining acceptance |
|---|---|---|
| https://www.yorkeducation.org/volunteer | Provider explicitly says the volunteer program is free, ages12–30; Canadian residence during volunteering, computer/internet required; virtual program minimum10hours/month; camp counsellor-in-training14+. | General application is not a confirmed placement. Preserve commitment and exact role conditions; verify role-level eligibility before listing an opening. |
| https://www.yorkeducation.org/volunteer-board | Actual public browser board has6entries, including Youth Ambassador, Camp Marketing, Event Assistant, Bioeconomy Program Assistant, Counsellor in Training and Operations Support. York/Markham locations, displayed deadlinesDecember5,2027. | Observed card/title and blank-button clicks did not reveal detailed role descriptions or unique role URLs. Do not invent those details or assume the generic program conditions apply identically to all6roles. Private reference screenshot retained. |
| https://stridestoronto.coeffect.ca/program-service/volunteer-readiness-program/ | Provider page says free, ages12–25, no prior experience, self-referrals welcome; community-service learning,100Consilium, Tuesdays4–6pm school year /2–6pm summer. | This is a volunteer-readiness program, not a claimed current vacancy. Confirm canonical current provider domain/intake before promoting an open registration claim. School/probation eligibility must remain separate; do not profile a user. |
| https://www.ymcagta.org/youth-programs | Provider lists free Black Achievers mentorship for Black high-school youth in GTA, free newcomer leadership13–24, free entrepreneurship15–24 with virtual/in-person variants, and free personal-finance workshops14–24GTA. | Verify each program-specific intake/link; a directory's Learn More is not a live vacancy. Its general Youth Leadership entry contradicts its11–18 description with13–24newcomer eligibility, so that entry needs clarification and must not be generalized to all teens. |

These sources strengthen free teen learning/leadership coverage. They do not by themselves satisfy a target of three currently open, independently verified, no-mandatory-cost volunteer roles from multiple providers and regions. Do not fill a numeric coverage target with invented or duplicated roles. A first useful slice may expose clearly labelled reviewed programs, authoritative places to look and a personal hours notebook while the open-role coverage gate remains explicitly incomplete.

Strides qualification: the corresponding path on `https://stridestoronto.ca/program-service/volunteer-readiness-program/` returned404 on this review. The `coeffect.ca` copy is therefore an unapproved lead, not current-intake evidence. Historic official PDFs support program history but cannot establish a current opening. Prefer a verified canonical provider contact/resource until the program's present availability and terms are confirmed.


## October 30 primary-source refresh — YRES commitment correction

Direct primary-page read of https://www.yorkeducation.org/volunteer now explicitly states: effective October1,2026, applicants must commit to a minimum120hours. The FAQ also retains a10hours/month virtual minimum; these are distinct overall/monthly requirements, not interchangeable. Do not market it as a quick40hour placement. The general programme still states ages12–30, completelyfree, and inperson/virtual placements. It can be a reviewed programme with120hourcondition, not six invented independently verified roles. Provider recognition/placement descriptions do not establish school approval. Current source also invites programme intake; individual placement dates/tasks/age conditions remain provider-specific. Root notified both model/UI owners before content integration.

Fresh full-FAQ read also confirms Canadian residence throughout volunteering, computer/internet access,14+campCIT and provider selection (not automatic shift confirmation). Preserve these together with120hourtotal/10hourvirtualmonthly minimum. Blueprint deadlineMarch29,2027 has day precision only: retain wording without invented closingtime; lunches/snacks are not provided.


## Additional bounded lead review — Youth Assisting Youth

Backend official-source reviewOctober30: https://youthassistingyouth.com/youth-volunteer-opportunities/ advertises peermentors16–29 acrossToronto/York, but directrolepage timedout. Accessibleprimaryapplicationconditions https://youthassistingyouth.com/mentor-application-step-2/ state references,VSC, roughly10hours/month foratleast1year, fulldaytraining/followup,under18parent signature and no guaranteedassignment. Applicant may owe reimbursement of the police-check fee if ending a match within6months; amount and full age/jurisdiction/expensecoverage are unclear. Keep asunapprovedlead, not verifiedzero-cost/openrole. No applicationfilled/submitted, account, providercontact or curatedrecordadded. This reinforces checking costs/commitment ratherthan counting unpaid roles asfree.
