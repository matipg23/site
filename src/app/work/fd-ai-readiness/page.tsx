import type { Metadata } from "next";
import CaseHero from "@/components/case/CaseHero";
import CaseNav from "@/components/case/CaseNav";
import BackToTop from "@/components/case/BackToTop";
import ThemeBar from "@/components/case/ThemeBar";
import CaseSection, { Accent, Prose, Split } from "@/components/case/CaseSection";
import Figure from "@/components/case/Figure";
import Interlude from "@/components/case/Interlude";
import Numbered from "@/components/case/Numbered";
import Stats from "@/components/case/Stats";
import Steps from "@/components/case/Steps";
import Story from "@/components/case/Story";

export const metadata: Metadata = {
  title: "The System Becomes Shared AI Infrastructure · FanDuel",
  description:
    "A proof of concept: can a governed, machine-readable design system source change what AI agents produce? Pass rate went from 0 to 87%.",
};

// Figma: latest iterations > Case 02 - FD AI Readiness (257:3377)
export default function Page() {
  return (
    <article>
      <ThemeBar
        theme="bluefield"
        anchors={[{ id: "problem", label: "Problem" }, { id: "vision", label: "Vision" }, { id: "approach", label: "Approach" }]}
      />
      <CaseHero
        client="FanDuel"
        title={
          <>
            The system
            <br /> becomes shared
            <br /> AI infrastructure
          </>
        }
        tags={["Design systems", "AI integration", "Platform strategy", "Cross-functional leadership"]}
        facts={[
          { label: "Company", value: "FanDuel" },
          { label: "Role", value: "Lead Designer · IC / Manager Hybrid" },
          { label: "Scope", value: "Proof of concept, cross-functional validation" },
          { label: "Duration", value: "2026 - Present" },
        ]}
      />

      <CaseSection label="The work">
        <Split
          heading={
            <>
              Proving the
              <br /> system as AI
              <br /> <Accent>infrastructure</Accent>
            </>
          }
        >
          <Prose>
            <p>
              AI agents were already building with the design system, before anyone had decided what good looks like.
            </p>
            <p>
              Teams were prompting Cursor, Claude, and prototyping tools directly, and none of that consumption ran
              through any governed source. I wanted to know if that was actually a problem, or just a new way of working
              we hadn&apos;t caught up to describing yet.
            </p>
            <p>
              I ran a proof of concept to understand if a unified governed source of truth could measurably change what
              these agents produced, without changing how designers or engineers already worked.
            </p>
          </Prose>
        </Split>
        <Stats
          items={[
            { value: "0%", label: "Baseline pass rate, ungoverned" },
            { value: "87%", label: "Pass rate with governed schema" },
            { value: "4", label: "Components schema-validated" },
            { value: "11x", label: "Cheaper per correct output" },
          ]}
        />
      </CaseSection>

      <CaseSection label="The problem" surface>
        <div className="grid gap-40 lg:grid-cols-[600fr_697fr] lg:gap-64">
          <h3 className="type-display-xs text-primary">
            AI output is only as good as <Accent>what it&apos;s given</Accent>
          </h3>
          <Prose>
            <p>
              AI amplifies the system&apos;s foundations. When sources disagree or a fact is missing, the agent fills the
              gap with a guess.
            </p>
            <p>
              Tools scraped Figma, parsed docs and read component code, then stitched together an answer. The output
              carried the system&apos;s look and none of its accountability.
            </p>
            <p>
              I started with a controlled test: three agents, three ways of consuming context, one task, rebuild the
              same component. All three looked acceptable at a glance. None got the typography right. Some invented
              tokens outright. The failures were systematic, not random.
            </p>
          </Prose>
        </div>
      </CaseSection>

      <CaseSection label="The vision">
        <h3 className="type-display-xs text-primary">
          From &ldquo;AI guesses our design system&rdquo;
          <br /> <Accent>to live, verified, self-updating truth</Accent>
        </h3>
        <Prose className="max-w-[900px] pt-64">
          <p>
            A single governed source of truth can measurably reduce output that carries the system&apos;s look but none
            of its accountability. Foundations, guidelines, components and tokens sit behind one entry point. The agent
            reads from it, and what comes out is reliable and predictable because what went in was.
          </p>
          <p>
            The question was not whether AI could use a design system. It clearly already was. It was whether a
            governed, machine-readable source could close the quality gap, without changing how designers or engineers
            already worked.
          </p>
        </Prose>
        <Figure
          src="/images/fd-ai-readiness/vision.png"
          alt="User prompt to AI agent, reading from an AI-ready design system of foundations, guidelines, components and tokens, producing DS-driven output"
          width={2722}
          height={832}
          className="pt-64 [&_img]:border-0 [&_img]:bg-transparent"
        />
        <p className="type-heading-md mx-auto max-w-[900px] pt-48 text-center text-accent">
          A well-structured design system doesn&apos;t get forced into AI workflows. It gets pulled in.
        </p>
      </CaseSection>

      <CaseSection label="The approach">
        <div className="flex flex-col gap-24">
          <h3 className="type-display-xs text-primary">
            A big bet,
            <br /> with a narrow scope
          </h3>
          <Prose className="max-w-[900px]">
            <p>
              The question was never whether AI could use a design system, it clearly already was. It was whether a
              governed, machine-readable source could close the quality gap without changing how anyone already worked.
            </p>
            <p>
              I didn&apos;t have a team or a budget for this, so I made it deliberately narrow. One component, complex
              enough to stress every part of the schema, multiple variants, token references, accessibility rules. If it
              couldn&apos;t hold there, nothing after it was worth testing.
            </p>
            <p>
              I owned the information layer myself and delegated the MCP distribution and connector work to a teammate
              who&apos;s stronger there. That split mattered, it let me focus on the part that actually determines output
              quality, not the plumbing.
            </p>
          </Prose>
        </div>
        <Steps
          items={[
            {
              title: "Prove the case",
              body: "One component complex enough to exercise the full schema: multiple variants, token references, accessibility rules. If it couldn't hold here, nothing else was worth testing.",
              tags: [{ label: "Mine" }],
            },
            {
              title: "Harden against variation",
              body: "Three more components followed, each with a different content shape and token structure. Every failure became the next version. Four components validated clean, with zero changes upstream.",
              tags: [{ label: "Mine" }],
            },
            {
              title: "Govern and distribute",
              body: "I took care of the information layer: the schema, the per-component data files, the documentation and the translation logic. The distribution layer and the MCP connection were built by a collaborator.",
              tags: [{ label: "Information layer: mine" }, { label: "Distribution + MCP: collaborator", muted: true }],
            },
            {
              title: "Validate externally",
              body: "I brought in a reviewer outside the work, feeding the schema to an external AI agent and auditing what came back. That audit found real gaps my own checks had missed.",
              tags: [{ label: "Outside reviewer", muted: true }],
            },
          ]}
        />

        <div className="flex flex-col gap-96 pt-96">
          <Story
            kicker="01 / The first run"
            heading={
              <>
                Wrong direction,
                <br /> not wrong system
              </>
            }
            lead="The first end-to-end test was asking an agent to find a component, pull its data, rebuild it as code. The gap wasn't in what the system could catch. It was in where the system was actually looking."
            notes={[
              {
                label: "What shipped",
                body: "Every value came back correct, straight from the real token file. Everything else was invented: a hand-rolled div, Unicode instead of real icons, and made-up variable names.",
              },
              {
                label: "What I caught",
                body: "Nothing in the pipeline flagged it. I asked the agent directly whether it had used the real icons or invented anything, and that surfaced every gap. My checks existed, just scoped to a different folder. The only thing that fired was a person asking.",
              },
              {
                label: "What I changed",
                body: "I turned the manual catch into a standing report, checking every rendered part of a component against the real package and tokens, automatically. The next version doesn't depend on me remembering to ask.",
              },
            ]}
            figure={
              <Figure
                src="/images/fd-ai-readiness/anatomy-report.png"
                alt="FloatingBanner anatomy report"
                caption="FloatingBanner anatomy report, the standing check that came out of the first run."
                width={1568}
                height={1804}
              />
            }
          />

          <Interlude
            kicker="Responsible AI usage: AI as a copilot, not on auto-pilot"
            heading={
              <>
                Deciding which source an agent should trust was{" "}
                <Accent>a judgment call I made myself, not handed to AI.</Accent>
              </>
            }
            body="Every fix in this project came from a human decision about where to look, not from the model getting smarter. That's deliberate. I don't think the answer to AI reliability is a more capable model, it's making sure a person is still the one deciding what counts as ground truth."
          />

          <Story
            kicker="02 / The fix"
            heading={
              <>
                Right answer,
                <br /> wrong question
              </>
            }
            lead="This wasn't a wrong answer. It was the right answer to a question the schema never asked."
            notes={[
              {
                label: "A new kind of gap",
                body: "A collaborator building a real component off the schema hit a render with a filled circle behind the icon. Every value was correct, real colours, real tokens, nothing invented. The shape was still wrong, and none of my checks caught it.",
              },
              {
                label: "What the audit found",
                body: "The circle didn't exist in the real component, and neither did several other details. All of it traced to one gap in the data: nothing said whether a container was visual or just structural scaffolding. My checks missed it because every value used was still a legitimate design-system token.",
              },
              {
                label: "What I added",
                body: "A field to say, explicitly, whether a piece of anatomy is structural or visual. That one addition closed the gap, and gave any future check, mine or anyone else's, the one signal it had been missing.",
              },
            ]}
            figure={
              <Figure
                src="/images/fd-ai-readiness/audit-report.png"
                alt="FloatingBanner audit report"
                caption="FloatingBanner audit report: hallucinated vs corrected output, the three critical fixes, and the root cause."
                width={1492}
                height={2112}
              />
            }
          />
        </div>
      </CaseSection>

      <CaseSection label="The cost curve">
        <h3 className="type-display-xs text-primary">
          The set-up cost
          <br /> is sub-linear
        </h3>
        <div className="grid gap-24 pt-64 lg:grid-cols-[535fr_802fr]">
          <Figure
            src="/images/fd-ai-readiness/cost-curve.png"
            alt="Chart: relative effort to add each component to the schema drops from days for the first to minutes by the fortieth"
            width={1070}
            height={704}
          />
          <Prose>
            <p>
              Getting the schema to produce the first component output right took days. Every one after that took
              minutes, because the failures from the first became rules in the schema, so the second, third and fourth
              inherited that hardening for free.
            </p>
            <p>
              Once a pattern is resolved in the schema, all components sharing it become near-free. The ingest pipeline
              and schema pattern consolidation compound across the library.
            </p>
            <p>
              That&apos;s the actual argument for scaling this past a proof of concept. Full component coverage is a
              sprint&apos;s worth of work, not a multi-quarter program, if it gets resourced properly.
            </p>
          </Prose>
        </div>
      </CaseSection>

      <CaseSection label="The product application" surface>
        <h3 className="type-display-xs text-primary">
          Turning the &ldquo;invisible work&rdquo;
          <br /> <Accent>into visible products</Accent>
        </h3>
        <Prose className="max-w-[1100px] pt-24">
          <p>
            None of the schema work is visible to anyone outside the system. So in parallel, we built the same governed
            data into UI kits in Figma Make and Lovable, so people could prototype against the real system, real tokens,
            real theming, without needing me in the room. Not shippable product, but it took the friction out of getting
            an idea in front of someone fast.
          </p>
          <p>
            The schema and constraints do the magic behind the scenes. The visible work is a kit that lets someone else
            make the product decision, fast, inside the system&apos;s rules.
          </p>
        </Prose>
        <Figure
          src="/images/fd-ai-readiness/ui-kit.png"
          alt="UI kit prototype"
          caption="UI kit prototype built on the governed design system data."
          width={2042}
          height={1304}
          className="pt-64"
        />
      </CaseSection>

      <CaseSection label="Reflections">
        <div className="grid gap-64 lg:grid-cols-2">
          <div>
            <h3 className="type-display-xs text-primary">
              Proven, not
              <br /> shipped. Yet.
            </h3>
            <Prose size="sm" className="max-w-[600px] pt-48">
              <p>
                The proof of concept settled the technical question: a governed source measurably reduces rework costs
                and AI-generated errors.
              </p>
              <p>
                The MCP layer with governed data hasn&apos;t shipped, and the reason isn&apos;t technical. The design
                system team lost its dedicated engineering capacity in a reorganisation. The capability to build this now
                sits with teams reporting into different leadership, each delivering exactly what their own leadership
                asked for.
              </p>
              <p>
                Nobody&apos;s failing at their job. There&apos;s just no shared priority spanning the two chains, so work
                that would take a week gets negotiated for a quarter.
              </p>
              <p>
                My move now isn&apos;t to keep pushing the technical case, that part&apos;s proven. It&apos;s naming the
                decision explicitly, so it becomes something the organisation can choose to resolve.
              </p>
            </Prose>
          </div>
          <div>
            <h3 className="type-display-xs text-primary">Learnings</h3>
            <div className="pt-24">
              <Numbered
                items={[
                  {
                    title: "The bottleneck is content, not architecture",
                    body: "The schema absorbed every component without a structural change. Scaling this is a documentation-consistency problem, not a schema problem.",
                  },
                  {
                    title: "A schema is a hallucination guardrail",
                    body: "Not just a structure. Every field's source gets verified, so missing data gets flagged at build time instead of invented at runtime.",
                  },
                  {
                    title: "Smarter models are not the fix",
                    body: "A more capable agent with no governed source doesn't get more careful, it produces wrong-but-confident output faster.",
                  },
                  {
                    title: "The cost curve favours starting narrow",
                    body: "Proving one component properly before generalising meant the failures were real, not hypothetical, and each made the next component cheaper.",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </CaseSection>

      <CaseNav slug="fd-ai-readiness" />
      <BackToTop />
    </article>
  );
}
