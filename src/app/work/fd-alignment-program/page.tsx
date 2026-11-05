import type { Metadata } from "next";
import CaseHero from "@/components/case/CaseHero";
import CaseNav from "@/components/case/CaseNav";
import ThemeBar from "@/components/case/ThemeBar";
import CaseSection, { Accent, Prose, Split } from "@/components/case/CaseSection";
import Interlude from "@/components/case/Interlude";
import Numbered from "@/components/case/Numbered";
import PhaseTimeline from "@/components/case/PhaseTimeline";
import Stats from "@/components/case/Stats";
import Steps from "@/components/case/Steps";
import Button from "@/components/ui/Button";
import ImageSlot from "@/components/ui/ImageSlot";

export const metadata: Metadata = {
  title: "Design System Alignment Program · FanDuel",
  description:
    "Embedding design system specialists inside five FanDuel product verticals over twelve months. Scaling trust, not just components.",
};

// Figma: latest iterations > Case 01 - FD DS Alignment Program (257:3113)
export default function Page() {
  return (
    <article>
      <ThemeBar
        theme="bluefield"
        anchors={[{ id: "problem", label: "Problem" }, { id: "outcomes", label: "Outcomes" }, { id: "approach", label: "Approach" }]}
      />
      <CaseHero
        client="FanDuel"
        title="Design system alignment program"
        tags={["Cross-functional leadership", "Change management", "Design systems", "DesignOps"]}
        facts={[
          { label: "Company", value: "FanDuel" },
          { label: "Role", value: "Lead Designer · Design Systems" },
          { label: "Scope", value: "IC / Manager Hybrid" },
          { label: "Duration", value: "2024 - Present" },
        ]}
      />

      <CaseSection label="The work">
        <Split
          heading={
            <>
              Scaling trust,
              <br /> not just
              <br /> <Accent>components</Accent>
            </>
          }
        >
          <Prose>
            <p>
              FanDuel&apos;s Formation Design System had a solid foundation: a well-structured token architecture, a
              maintained component library, solid documentation. None of that was really the problem.
            </p>
            <p>
              The problem was that teams across our product verticals weren&apos;t adopting it consistently. And when
              you looked closely at why, the answer wasn&apos;t &ldquo;bad components.&rdquo; It was that we, the Design
              System team, had become too removed from where the actual design work was happening.
            </p>
            <p>
              So I designed and led the Formation Design System Alignment Program: a structured initiative that embedded
              DS specialists directly inside product teams through phased engagements, running across five verticals
              over twelve months.
            </p>
          </Prose>
        </Split>
        <Stats
          items={[
            { value: "3", label: "Embedded DS specialists" },
            { value: "5", label: "Product design teams served" },
            { value: "20+", label: "Designers across all teams" },
            { value: "12", label: "Months of active engagements" },
          ]}
        />
      </CaseSection>

      <CaseSection label="The problem" surface>
        <Split
          heading={
            <>
              The system
              <br /> was good.
              <br /> It just wasn&apos;t
              <br /> solving the
              <br /> <Accent>right problems</Accent>
            </>
          }
        >
          <Prose>
            <p>
              Our team was doing solid work. Prioritising the roadmap, building out libraries, improving documentation.
              But most of it was happening in relative isolation from the teams it was supposed to serve. We&apos;d ship
              updates, write guidelines, respond to requests. And adoption still wasn&apos;t moving.
            </p>
            <p>
              When teams couldn&apos;t find a component that solved their exact need, they&apos;d duplicate it. When
              theming felt too complex or the docs didn&apos;t match their context, they&apos;d create workarounds: new
              styles, wrong token applications, quick fixes their engineering teams could spin up in production fast.
              Not because they were being careless, but because moving fast was their job, and the system wasn&apos;t
              close enough to their reality to help them do it.
            </p>
            <p>
              We&apos;d got too focused on building the &ldquo;almost perfect&rdquo; design system and forgotten that we
              weren&apos;t just solving system problems. We were supposed to be solving the problems of the people using
              it. Those aren&apos;t the same thing.
            </p>
            <p>
              The consequence was inconsistency compounding across verticals: fragmented libraries, design and code
              drift, handoffs that needed more back-and-forth than they should. Not a crisis. A slow leak that was
              getting harder to ignore.
            </p>
            <p>
              The centralised model had served us well to establish the foundations. But it had a ceiling, and we&apos;d
              hit it.
            </p>
          </Prose>
        </Split>
      </CaseSection>

      <CaseSection label="The outcomes">
        <div className="grid gap-48 lg:grid-cols-[600px_1fr] lg:gap-64">
          <div className="flex flex-col gap-24">
            <h3 className="type-display-xs text-primary">
              The numbers moved.
              <br /> <Accent>So did the relationship</Accent>
            </h3>
            <Prose>
              <p>
                We measured each vertical before and after embedding on two axes: System Usability Score and component
                coverage. Every team went up on both. NPS was captured once at the end, as a read on how the engagement
                itself landed.
              </p>
              <p>
                The goal was a usability score of 75 or higher for every team. Three got there. Two finished just short,
                at 73 and 70, and the lowest NPS (25) showed where the engagement itself needed work. That feedback
                shaped how later engagements were set up.
              </p>
            </Prose>
          </div>
          <ImageSlot
            src="/images/fd-alignment-program/outcomes.png"
            alt="Per-team System Usability Score, component coverage and NPS before and after each engagement"
            width={1394}
            height={978}
          />
        </div>
        <Interlude
          kicker="Beyond the scores"
          heading={
            <>
              The clearest signal wasn&apos;t any single score.
              <br /> <Accent>Teams stopped working around the system.</Accent>
            </>
          }
          body="They started working with it, and kept doing so after we stepped back."
        />
      </CaseSection>

      <CaseSection label="The approach">
        <h3 className="type-display-xs text-primary">
          Getting closer to
          <br /> the work, <Accent>on purpose</Accent>
        </h3>
        <div className="grid gap-48 pt-64 lg:grid-cols-[697fr_600fr] lg:gap-64">
          <Prose>
            <p>
              The model wasn&apos;t complicated in concept. Embed DS expertise inside product teams, work alongside them
              rather than in response to them, and leave something behind when you go. The difficulty is in the
              execution: specifically in resisting the urge to arrive with answers before you understand the problem,
              and in planning the exit from day one rather than treating it as an afterthought.
            </p>
            <p>
              I designed the engagement framework and led the initiative across all five verticals. In most engagements
              my role was strategic: aligning with directors and vertical leads, managing program direction, making sure
              the embedded designers had what they needed to operate. In one engagement, with our largest vertical and a
              team being simultaneously reorganised into new pillars, I was closer to the day-to-day: not in the files,
              but more present in the communications and alignment work. That one was the hardest to navigate and,
              looking back, produced some of our most self-sufficient champions.
            </p>
          </Prose>
          <ImageSlot
            src="/images/fd-alignment-program/laptop.png"
            alt="Quality and coverage audit open on a laptop"
            width={1200}
            height={914}
            className="border-0 bg-transparent"
          />
        </div>
        <div className="pt-48">
          <PhaseTimeline

            phases={[
              { icon: "search", title: "Phase 1", body: "Understand the Current State of Play" },
              { icon: "click", title: "Phase 2", body: "Hands-on Collaboration" },
              { icon: "check", title: "Phase 3", body: "Future Health and Continued Adoption" },
            ]}
          />
        </div>
        <Steps
          items={[
            {
              title: "Listen first",
              body: "Each engagement started with the embedded designer joining team rituals and design reviews as an observer. No output, no deliverables pushed, just presence. Understanding how the vertical actually worked and what drove the decisions that drifted from the system. You can't co-create with a team you don't understand yet.",
              tags: [{ label: "Phase 1 · Observe" }],
            },
            {
              title: "Build with, not for",
              body: "Working sessions on real projects, not hypotheticals. Helping teams swap themes and fix broken Figma style connections, and running Quality and Coverage sessions: file walkthroughs on what was working, what wasn't, and why things had drifted. Sometimes that meant replacing components, sometimes building a domain-specific extension the core system didn't cover yet.",
              tags: [{ label: "Phase 2 · Co-create" }],
            },
            {
              title: "Leave them stronger",
              body: "Every engagement was planned with a structured handoff from the start. We identified designers who engaged more deeply with the system and gave them more exposure and context. Not gatekeepers, but advocates. Handoff sessions were recorded, Slack support channels stayed open, and the exit was a gradual step back as confidence grew.",
              tags: [{ label: "Phase 3 · Hand off" }],
            },
          ]}
        />
      </CaseSection>

      <CaseSection label="The details">
        <h3 className="type-display-xs text-primary">
          Systems work
          <br /> is people work
          <br /> <Accent>in disguise</Accent>
        </h3>
        <Prose className="max-w-[900px] pt-64">
          <p>A few things worth making explicit about how this actually worked.</p>
          <p>
            The engagement framework was lightweight by design. Each one started with a kick-off conversation between
            me, the embedded designer, and the relevant product design director or manager. Not to set rigid
            deliverables, but to understand their priorities, pain points, and what would actually unblock them. We then
            aligned with the front-line designers to understand where they felt the gaps in knowledge and confidence.
            This set expectations for everyone and meant the embedded designer could hit the ground running, rather than
            spending weeks figuring out what to focus on.
          </p>
          <p>
            The Quality and Coverage sessions were deliberately run as conversations, not evaluations. We&apos;d sit with
            a designer, open their files, and talk through what we were seeing together. Teams often already knew where
            the drift had happened: &ldquo;yeah, we know we&apos;re using all different button styles in here.&rdquo;
            What they needed was the context to understand why it mattered and a partner to fix it with them, not a
            report telling them they&apos;d done it wrong.
          </p>
          <p>
            Knowledge transfer was built into every exit. Handoff sessions were recorded where possible so future team
            joiners could benefit too. Slack channels stayed open. Check-ins were scheduled and a governance model was
            shaped to help teams maintain progress without needing the DS team back in the room.
          </p>
        </Prose>

        <EngagementFlow />

        <div className="flex flex-col gap-16">
          <p className="type-body-md text-primary">
            I wrote a two-part article with the full breakdown, per-team data, and what each engagement actually looked
            like.
          </p>
          <Button href="https://medium.com/@mpg23" variant="link" arrow="up-right" className="type-mono-xs-bold uppercase">
            Read it on Medium
          </Button>
        </div>
      </CaseSection>

      <CaseSection label="Reflections">
        <div className="grid gap-64 lg:grid-cols-2">
          <div>
            <h3 className="type-display-xs text-primary">Impact</h3>
            <Prose size="sm" className="max-w-[600px] pt-48">
              <p>
                The model worked because it put the right people in the right rooms. Across all five verticals, teams
                that had been working around the system started working with it.
              </p>
              <p>
                Design system quality and coverage improved across files. Legacy libraries got consolidated and
                engineering handoffs got cleaner. And local champions emerged in every vertical, designers who now
                answered system questions for their colleagues rather than escalating them upward.
              </p>
              <p>
                What participants consistently named as valuable wasn&apos;t a better component library, it was our
                presence. The program ended with zero detractors and a clear signal: proximity to the work changes the
                relationship with the system.
              </p>
              <p>On both sides of the fence.</p>
            </Prose>
          </div>
          <div>
            <h3 className="type-display-xs text-primary">Learnings</h3>
            <div className="pt-24">
              <Numbered
                items={[
                  {
                    title: "Meet teams where they are",
                    body: "Starting coverage ranged from 13% to 35% across verticals. A structured maturity assessment at the start of each engagement would have let us calibrate faster.",
                  },
                  {
                    title: "Leadership engagement is the multiplier",
                    body: "Where managers made space and signalled the work mattered, adoption stuck after we left. Where support was inconsistent, momentum faded.",
                  },
                  {
                    title: "Embedded work needs a consultant mindset",
                    body: "The role demanded flexibility, communication and systems thinking that not every designer was ready for on day one. Role-readiness belongs in preparation, not just onboarding.",
                  },
                  {
                    title: "Plan capacity and automation, don't assume them",
                    body: "Embedded designers got pulled deep into engagement work, and manual auditing took more time than it should have at this scale. Future programs need capacity planning and tooling built in from the start.",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </CaseSection>

      <CaseNav slug="fd-alignment-program" />
    </article>
  );
}

// Figma: Case 01 > THE DETAILS > flow. Embedded designer between the core team and the vertical team.
function EngagementFlow() {
  const node = "flex flex-col gap-8 border border-default bg-page p-20";
  return (
    <figure className="py-64">
      <div className="grid items-center gap-16 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <div className={node}>
          <p className="type-label-sm text-primary">Design System Core Team</p>
          <p className="type-caption-md text-primary">
            Building global solutions, implementing and sharing design system features
          </p>
        </div>
        <FlowArrows />
        <div className={`${node} md:-translate-y-8 border-accent`}>
          <p className="type-label-sm text-primary">Embedded Designer</p>
          <p className="type-caption-md text-primary">Applies standards, adapts to context, shares insights</p>
        </div>
        <FlowArrows />
        <div className={node}>
          <p className="type-label-sm text-primary">Vertical Product Team</p>
          <p className="type-caption-md text-primary">
            Building products, providing system feedback, sharing learnings
          </p>
        </div>
      </div>
      <figcaption className="type-label-xs mx-auto mt-32 flex w-fit items-center gap-12 border border-default bg-page px-24 py-16 text-primary">
        <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
          <path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v4h-4" />
        </svg>
        Continuous improvement
      </figcaption>
    </figure>
  );
}

function FlowArrows() {
  return (
    <div aria-hidden className="type-label-xs flex flex-col items-center gap-4 text-secondary max-md:flex-row max-md:justify-center max-md:gap-16">
      <span>knowledge →</span>
      <span>← feedback</span>
    </div>
  );
}
