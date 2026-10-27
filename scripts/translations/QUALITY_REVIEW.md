# Experimental quality review

No model is currently accepted for a full 17-locale release. Passing byte coverage,
end-of-sequence checks, dialect probes or the contract's 17 unit tests does not
prove a translation is accurate. Benchmark JSON always retains its experimental
status. Never promote it directly to a production locale pack.

The 8B hard set uses exact original descriptions from the branch's immutable
public source snapshot. SHA256 values identify raw UTF-8, including whitespace.
Source segmentation must reassemble every byte; reviewers compare each target
segment with its stored complete source segment. Review omissions, added facts,
negation, registration conditions, names, dates, numbers, contact details and
natural language. A fluent-looking ending can still omit the middle.

Required factual checks for the assistive-device event (Cantonese and Punjabi):

- A presentation explains why accessible devices are needed and includes voices
  of people with disabilities.
- Participants use real tools; completed devices go to Canadians with
  disabilities through community partners.
- Science, technology and engineering experience supports the community.
- Volunteer hours count toward high-school community-involvement requirements;
  interested participants should bring the relevant tracking form.
- All teens welcome; drop-in with no registration.
- Youth Hubs serve teens after school AND during summer, with helpful staff.
- Free nutritious snacks are offered daily; contact or visit a branch with a Hub.
- Cantonese must be natural Cantonese, not Mandarin with a few added particles.
  Disability and volunteering must not become widows, golden hours or charity
  claims absent from the source. Ordinary body words must not be left in English.

Required checks for the long French capitalism event:

- Preserve the full historical discussion and questions, both named speakers,
  sponsor acknowledgments, both series descriptions and the privacy notice.
- Books and beer/wine are available for purchase: the free event does not make
  those purchases free. Bar payment is debit/credit only.
- Toronto Reference Library, Bram and Bluma Appel Salon, 789 Yonge Street,
  second floor. Doors 6:00 pm; event 7 pm. Free registration required.
- Tickets guaranteed only until 6:50 pm, followed by rush admission; seating is
  first come, first served.
- Deaf attendees or attendees with a disability may request accommodation via
  accessibleservices@tpl.ca or 416-393-7099 at least three weeks before the event.
- Public Libraries Act sections 20(a), 20(c), 20(d), registration/delivery/
  evaluation purpose and optional follow-up survey must survive the translation.
- Privacy contact answerline@tpl.ca, 416-397-5981, 789 Yonge Street,
  Toronto ON M4W 2G8 remains intact at the end.

Required checks for the long Chinese early-years event:

- Cover both speakers' complete biographies and all four What to Expect topics.
- Preserve birth-to-five scope, relationships, co-regulation, emotional learning,
  caregiver/community support and the partnership/series description.
- Keep https://www.womenscollegehospital.ca/bridging-minds/ exactly.
- The event is virtual on Zoom, free, and requires registration; registered
  participants receive the Zoom link by email. No invented medical advice.

A future release needs a reviewed strategy for every target locale, a larger
held-out corpus, complete current-source packs, app source-hash verification and
actual selected-language runtime checks on web, iOS and Android. One hard set can
reject an engine or justify a next bounded evaluation; it cannot prove coverage.
