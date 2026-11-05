import type { Metadata } from "next";
import CaseHero from "@/components/case/CaseHero";
import CaseNav from "@/components/case/CaseNav";
import ThemeBar from "@/components/case/ThemeBar";
import CaseSection, { Accent, Prose, Split } from "@/components/case/CaseSection";
import Figure from "@/components/case/Figure";
import Interlude from "@/components/case/Interlude";
import Numbered from "@/components/case/Numbered";
import Stats from "@/components/case/Stats";
import Steps from "@/components/case/Steps";
import Story from "@/components/case/Story";

export const metadata: Metadata = {
  title: "Improving the Mobile Onboarding Journey · Nutmeg",
  description:
    "Native mobile sign-up for Nutmeg: create an account with an email and a password, and explore portfolio projections while verification runs.",
};

// Figma: latest iterations > Case 04 - Nutmeg (fixes applied) (415:25255)
export default function Page() {
  return (
    <article>
      <ThemeBar
        theme="rangergreen"
        anchors={[{ id: "problem", label: "Problem" }, { id: "idea", label: "Idea" }, { id: "approach", label: "Approach" }]}
      />
      <CaseHero
        client="Nutmeg"
        title="Improving the mobile onboarding journey"
        tags={["Onboarding", "Fintech", "Mobile", "User testing"]}
        facts={[
          { label: "Company", value: "Nutmeg" },
          { label: "Role", value: "UX/UI Designer · Mobile" },
          { label: "Scope", value: "Research to tested prototype" },
          { label: "Duration", value: "2020 · 8 weeks" },
        ]}
      />

      <CaseSection label="The work">
        <Split
          heading={
            <>
              Turning the wait
              <br /> <Accent>into product time</Accent>
            </>
          }
        >
          <Prose>
            <p>
              The Nutmeg mobile app didn&apos;t have a native way for users to create a new account. Tapping &lsquo;Sign
              Up&rsquo; sent people to the web platform in their phone browser, and after sign-up they waited a couple of
              days for verification before they could do anything with their money.
            </p>
            <p>
              I was the designer on the redesign, working with the product manager, a UX researcher, and the mobile and
              web engineers. The idea: create an account with just an email and a password, and let people engage with
              the product and run portfolio projections in the app straight away, with personal details and identity
              checks coming afterwards.
            </p>
            <p>
              Over eight weeks I ran the competitor research, mapped the journey against what the legacy backend could
              support, built a conditional-logic prototype in Axure, and tested it over three rounds.
            </p>
          </Prose>
        </Split>
        <Stats
          items={[
            { value: "8", label: "Weeks from research to test" },
            { value: "3", label: "Rounds of remote user testing" },
            { value: "7", label: "Iterations before first test" },
            { value: "2", label: "Versions tested head to head" },
          ]}
        />
      </CaseSection>

      <CaseSection label="The problem" surface>
        <div className="grid gap-40 lg:grid-cols-[600fr_697fr] lg:gap-64">
          <h3 className="type-display-xs text-primary">
            You could get
            <br /> the app but
            <br /> <Accent>not an account</Accent>
          </h3>
          <Prose>
            <p>
              After downloading the mobile app, new customers were redirected to the web platform in their phone browser
              to create a new account. Behind it sat a legacy onboarding process where every step depended on the one
              before, so the journey was long, and making it flexible would have needed real backend work.
            </p>
            <p>
              Making sign-up native meant changing the web journey too, so the two stayed consistent. We agreed to do it
              in phases: shorten the web flow first, then bring it in line with the native one.
            </p>
            <p>
              On the website, a simulator showed how investments could grow over time, but it was not part of
              onboarding. After sign-up came a couple of days of silence while verification ran, with no way to see what
              the product could do.
            </p>
          </Prose>
        </div>
      </CaseSection>

      <CaseSection label="The idea">
        <h3 className="type-display-xs text-primary">
          Let them explore
          <br /> <Accent>while verification runs</Accent>
        </h3>
        <div className="type-body-md max-w-[1100px] pt-64 text-primary">
          <p>The concept had two states:</p>
          <ul className="list-disc pl-24">
            <li>
              A <strong className="font-medium">user</strong> is anyone who signs up with an email, a password,
              marketing consent and the terms.
            </li>
            <li>
              An <strong className="font-medium">investor</strong> is a user who decides to start investing and provides
              personal details, an address and bank account information to pass KYC and AML checks.
            </li>
          </ul>
          <p className="pt-32">
            Users could build a pot and run portfolio projections straight away, using the simulator in their own time,
            so the wait for verification became time in the product. A learning hub was in the first version of the
            flow. We cut it from launch because it added complexity and users could still reach the blog and knowledge
            base.
          </p>
        </div>
        <Figure
          src="/images/nutmeg/phones.png"
          alt="Six screens of the native onboarding flow: sign up, pot setup, projections and the success state"
          width={2722}
          height={912}
          className="pt-64 [&_img]:border-0 [&_img]:bg-transparent"
        />
        <p className="type-heading-md mx-auto max-w-[900px] pt-48 text-center text-accent">
          The waiting for account verification became time interacting with the product.
        </p>
      </CaseSection>

      <CaseSection label="The approach">
        <div className="flex flex-col gap-24">
          <h3 className="type-display-xs text-primary">
            Eight weeks,
            <br /> four steps
          </h3>
          <Prose className="max-w-[1100px]">
            <p>
              This was the first project at Nutmeg that I was involved in from the start, which meant I could shape the
              solution, not polish one. I drafted a plan for the eight weeks that moved from outside-in research to
              inside-out validation: competitors, then the journey with product and engineering, then a prototype, then
              users.
            </p>
            <p>
              I worked closely with the product manager throughout, and with a UX researcher on the testing. I presented
              the findings at a company all-hands.
            </p>
          </Prose>
        </div>
        <Steps
          items={[
            {
              title: "Analyse competitors",
              body: "Week 1. I printed competitors' sign-up journeys on A3, put them on a whiteboard, and left them in an office corridor for anyone to annotate. With the product manager I turned the trends into a feature matrix.",
              tags: [{ label: "With product manager" }],
            },
            {
              title: "Map the journey",
              body: "Week 2. I mapped the journey with product and agreed with engineering what the legacy system could take. The learning hub was cut from launch. I also spotted that the flow did not let people open an ISA. We had just implemented that journey in the mobile apps, so leaving it out risked conversion. I raised it with the PM and we agreed to add it to the flow.",
              tags: [{ label: "With product + engineering" }],
            },
            {
              title: "Build the prototype",
              body: "Weeks 3 to 6. Projections and step checks had to react to what users did, so I built a prototype in Axure with conditional logic and sample data. A mobile developer helped me design the data structure behind it.",
              tags: [{ label: "Prototype: mine" }, { label: "Data model: mobile dev", muted: true }],
            },
            {
              title: "Test with users",
              body: "Weeks 7 and 8. Three remote rounds. Round one covered new, intermediate and experienced investors and existing Nutmeg users. Later rounds rewrote scenarios and tasks, then tweaked the flow. Key quotes went into Dovetail.",
              tags: [{ label: "User testing: mine" }, { label: "Test scripts: with UX researcher", muted: true }],
            },
          ]}
        />

        <div className="flex flex-col gap-96 pt-96">
          <Story
            kicker="The prototype"
            heading={
              <>
                A prototype with
                <br /> real logic
              </>
            }
            lead="Testing needed projections and step checks that reacted to what users did, so linked screens were not enough."
            notes={[
              {
                label: "What it needed",
                body: "Calculations and conditional logic, with sample data that returned realistic results as people explored the app and started a pot.",
              },
              {
                label: "How I built it",
                body: "Axure was new to me, so I gave it a week of tutorials, built the most important conditional flow and tested it with mobile developers.",
              },
              {
                label: "What we left out",
                body: "We left the real brand out of the test, but every screen was based on the real app. It took seven iterations to reach the first version for users.",
              },
            ]}
            figure={
              <Figure
                video={{ src: "/videos/nutmeg/ut-session.mp4", poster: "/images/nutmeg/poster-ut-session.jpg" }}
                alt="User testing session recording of a tester using the Axure prototype"
                caption="Interactive Axure prototype: 2qxic8.axshare.com/#c=2. User testing session recording above."
                width={1364}
                height={768}
              />
            }
          />

          <Interlude
            kicker="What was going wrong"
            heading={
              <>
                Testers stopped at the draft pot. <Accent>Was it the test or the flow?</Accent>
              </>
            }
            body="The product manager and I read the same drop-off differently, and both readings were reasonable. Round three changed the prototype to test how clearly the draft status came across."
          />

          <Story
            kicker="The test"
            heading={
              <>
                When users disagreed
                <br /> with the plan
              </>
            }
            lead="Testers liked starting with only an email and a password. Some did not realise they were exploring projections, not yet investing."
            notes={[
              {
                label: "What the tests showed",
                body: "Testers liked creating a pot straight away and being asked for more details afterwards. But during testing, some did not realise they were only playing with projections, and that they still needed to complete their profile and pass the legal checks before they could invest. Across three rounds, 73 observations were tagged in Dovetail, led by clear next steps (19), easy navigation (12) and progression visibility (11). Interactive prototypes can mask real issues because testers want to succeed, so I treated the praise with care.",
              },
              {
                label: "Where we disagreed",
                body: "The product manager's first move was to fix the test: a new scenario and clearer tasks, since testers might be rushing or treating it as not real money. That was a reasonable reading. I read it as a comprehension problem. Some testers did not realise they were exploring a projection, and that investing needed a completed profile and the legal checks behind it.",
              },
              {
                label: "What I did",
                body: "Round two rewrote the scenario and tasks, and testers still stopped at the draft pot. For round three we ran two versions. One added an extra task prompting testers to carry on until the pot was funded. In the other I proposed a stop screen after the draft pot is created, saying the pot is a draft and one step from investing. It offered two routes: review the pot and start investing, or return to a dashboard showing a 99% complete draft pot and a prompt to finish now or later. A half-way scenario tested how an unfinished account reads when testers come back to it. I can't recover how each version scored, but the session notes do show the stop was tied to the draft pot screen: one tester did not scroll to the continue button, and another note suggests changing the button placement or copy.",
              },
            ]}
            figure={
              <div className="flex flex-col gap-32">
                <Figure
                  src="/images/nutmeg/round3-flows.png"
                  alt="Round three screens. Extra task version: the draft pot created screen with a View draft pot button, and the extra task prompt. Flow tweak version: the stop screen with two routes, the dashboard with a 99% complete draft pot, and two pot overview screens. Half-way scenario: the welcome back screen with a 40% checklist."
                  caption="Round three screens: the extra task version, the flow tweak with the stop screen after the draft pot is created, and the half-way scenario."
                  width={1440}
                  height={1040}
                />
                <Figure
                  src="/images/nutmeg/onboarding-flowchart.png"
                  alt="Flowchart of the native mobile onboarding journey, from landing home and sign-up through the pot steps, profile, risk checks, ISA and payments to investor home. Screens are colour coded as existing, existing but needing work, or new, with the backend services behind each step."
                  caption="The onboarding journey flow I mapped with product and engineering. Green screens existed, yellow needed work, blue were new."
                  width={2880}
                  height={1004}
                />
              </div>
            }
          />
        </div>
      </CaseSection>

      <CaseSection label="Reflections">
        <div className="grid gap-64 lg:grid-cols-2">
          <div>
            <h3 className="type-display-xs text-primary">
              Validated,
              <br /> not measured.
            </h3>
            <Prose size="sm" className="max-w-[600px] pt-48">
              <p>
                Three rounds of remote testing supported the concept, and one tester said it was a lot better than most
                apps they knew.
              </p>
              <p>
                The research and prototype went into a delivery brief for native mobile onboarding, with designs for the
                first mobile version due in May 2020. The brief set one success metric, accounts created on mobile versus
                web. I had no way to track it, and I can&apos;t confirm what shipped. Nutmeg was later acquired and
                rebranded, and I can&apos;t open a new account to check.
              </p>
              <p>
                I ran this alongside design systems work at Nutmeg, including an iOS theme with dark mode, so this case
                shows the product side of that range.
              </p>
            </Prose>
          </div>
          <div>
            <h3 className="type-display-xs text-primary">Learnings</h3>
            <div className="pt-24">
              <Numbered
                items={[
                  {
                    title: "Rule out the test before blaming the flow",
                    body: "Rewriting the scenario was a fair first step. When testers still stopped at the draft pot, it pointed us to the flow.",
                  },
                  {
                    title: "Flexible onboarding needs honest states",
                    body: "Letting people explore before they are verified only works if the app is clear about what is exploring and what is investing.",
                  },
                  {
                    title: "Legacy constraints belong in week one",
                    body: "Agreeing early with engineering what the old system could take cut scope before it turned into rework.",
                  },
                  {
                    title: "Prototype to the question",
                    body: "The test depended on projections reacting to what users did, so the prototype needed real logic, not just linked screens.",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </CaseSection>

      <CaseNav slug="nutmeg" />
    </article>
  );
}
