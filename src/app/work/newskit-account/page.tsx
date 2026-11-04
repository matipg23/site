import type { Metadata } from "next";
import CaseHero from "@/components/case/CaseHero";
import CaseNav from "@/components/case/CaseNav";
import CaseSection, { Accent, Prose, Split } from "@/components/case/CaseSection";
import Figure from "@/components/case/Figure";
import Gallery from "@/components/case/Gallery";
import Numbered from "@/components/case/Numbered";
import Panel from "@/components/case/Panel";
import Stats from "@/components/case/Stats";
import Steps from "@/components/case/Steps";

export const metadata: Metadata = {
  title: "One Account, Three Brands · News UK",
  description:
    "One configurable account pattern for The Sun, The Times and Virgin Radio, built on NewsKit: three sections, nine edit flows and thirteen subscription and billing states.",
};

const img = (name: string, ext = "png") => `/images/newskit-account/${name}.${ext}`;
const vid = (name: string) => `/videos/newskit-account/${name}.mp4`;

// Figma: latest iterations > Case 03 - NewsKit Account (Revised v5) (321:177)
export default function Page() {
  return (
    <article>
      <CaseHero
        client="News UK"
        title={
          <>
            One account,
            <br /> three brands
          </>
        }
        tags={["Product design", "Multi-brand", "Design systems"]}
        facts={[
          { label: "Company", value: "News UK" },
          { label: "Role", value: "Senior UI Designer · Design Systems" },
          { label: "Scope", value: "End-to-end account pattern" },
          { label: "Duration", value: "2021 - 2022" },
        ]}
      />

      <CaseSection label="The work">
        <Split
          heading={
            <>
              Managing a<br /> subscription
              <br /> should not depend
              <br /> on which brand
              <br /> <Accent>sold it</Accent>
            </>
          }
        >
          <Prose>
            <p>
              Every News UK brand needed the same things from an account management solution. But The Sun had its own
              account pages, The Times had theirs, and Virgin Radio was only partly on the system.
            </p>
            <p>
              Each internal product was building its own answer, with its own maintenance burden, while subscribers were
              getting a different experience for the same job.
            </p>
            <p>
              The UX designer and the product manager defined the flows and the testing; I owned the UI for every screen,
              state and viewport, across three sections, nine edit flows and thirteen subscription and billing states,
              from free trial to payment failure to termination.
            </p>
            <p>
              One design pattern that any brand could configure and theme, instead of rebuilding. This is a highlight of
              the project, not the full record.
            </p>
          </Prose>
        </Split>
        <Stats
          items={[
            { value: "3", label: "Brands it was designed for" },
            { value: "3", label: "Configurable sections" },
            { value: "9", label: "Edit flows" },
            { value: "13", label: "Subscription and billing states" },
          ]}
        />
      </CaseSection>

      <CaseSection label="The problem" surface>
        <div className="grid gap-40 lg:grid-cols-[600fr_697fr] lg:gap-64">
          <h3 className="type-display-xs text-primary">
            Same job,
            <br /> different product
            <br /> <Accent>experiences</Accent>
          </h3>
          <Prose>
            <p>
              Every brand needed the same things from an account: update your details, manage a subscription, fix a
              failed payment, change your mind.
            </p>
            <p>
              The edge cases were where it mattered most. A payment fails, a trial ends, a cancellation is waiting on a
              refund. These are the moments where a subscriber decides whether to stay, and the ones teams usually design
              last.
            </p>
            <p>
              So the job was not a themed copy of one brand&apos;s pages. It was designing the whole lifecycle once,
              including the states nobody wanted to own. I made that case internally in a show and tell.
            </p>
          </Prose>
        </div>
      </CaseSection>

      <CaseSection label="The outcomes">
        <Split
          heading={
            <>
              It shipped,
              <br /> it&apos;s live, and
              <br /> <Accent>it kept growing</Accent>
            </>
          }
        >
          <Prose>
            <p>
              Account launched as a publicly documented Solution on newskit.co.uk, one of only two in the whole pattern
              library. Any team in the organisation could adopt it and apply their own brand&apos;s theme.
            </p>
            <p>
              The screens live now* are the ones I designed, or iterations of them. Holiday stops were still being
              defined when I left, waiting on product approval. They are in the public documentation today.
            </p>
            <p>
              The bet was better retention and a lighter customer service load. I can&apos;t tell you whether it paid
              off. I had no measurement in place for adoption or impact. Years later I checked, and the pattern is still
              live on at least two brands. That answers adoption, but it can&apos;t confirm anything about retention.
            </p>
          </Prose>
          <p className="type-body-md pt-24 text-secondary">*Last checked: The Sun and The Times account - Sep 2026</p>
        </Split>
        <div className="flex flex-col gap-64 pt-64">
          <Figure
            src={img("overview")}
            alt="Wireframes, the NewsKit theme, and the Sun, Times and Virgin Radio versions of the same account page"
            caption="Wireframes, the NewsKit theme, and the Sun, Times and Virgin Radio versions of the same account page."
            width={2700}
            height={1118}
            className="md:px-24"
          />
          <figure className="flex flex-col gap-16">
            <div className="grid gap-24 md:grid-cols-3">
              <Panel label="01 / The Times, live" src={img("live-times")} alt="The Times account page, live" width={1643} height={1793} />
              <Panel label="02 / The Sun, live" src={img("live-sun")} alt="The Sun account page, live" width={1643} height={1791} />
              <Panel label="03 / NewsKit docs" src={img("live-newskit")} alt="Account Solution in the NewsKit documentation" width={1643} height={1791} />
            </div>
            <figcaption className="type-mono-xs text-secondary">
              Live today: the account pages on The Times and The Sun, and the Account Solution in the NewsKit
              documentation. Last checked October, 2026.
            </figcaption>
          </figure>
        </div>
      </CaseSection>

      <CaseSection label="The approach">
        <div className="flex flex-col gap-24">
          <h3 className="type-display-xs text-primary">
            Design every state,
            <br /> then make it <Accent>configurable</Accent>
          </h3>
          <p className="type-body-md max-w-[900px] text-primary">
            Design the happy path and the failure paths together. Document every rule so engineering can build from it.
            Leave brands room to configure sections instead of asking us for changes.
          </p>
        </div>
        <Steps
          items={[
            {
              title: "Design every state",
              body: "Thirteen subscription and billing scenarios, from free trial to termination. Payment failure escalates through a first notice, a second notice and a terminated state, each with its own banner and next step.",
              tags: [{ label: "UI design: mine" }],
            },
            {
              title: "Design the flows",
              body: "Nine edit flows across the three sections, each with validation, error and success states. Mapped end to end first, then designed screen by screen, taken from UX wireframes to finished screens. The viewport and responsive layout decisions were mine.",
              tags: [{ label: "With the UX designer" }],
            },
            {
              title: "Make it configurable",
              body: "I built the Account pages as templates with slots, to speed up the work and reuse them across brands. Content could be swapped and each brand's theme applied without rebuilding screens. I made the slot mechanism by hand, before Figma had native slots. Theming ran through an internal plugin built by our Design Technologist.",
              tags: [{ label: "Slots: mine" }, { label: "Theming plugin: Design Technologist", muted: true }],
            },
            {
              title: "Document it for engineering",
              body: "28 components, 9 forms and 24 inputs, each with validation rules, error messages and success states mapped, so engineering could implement directly and had only one reference to look for.",
              tags: [{ label: "With the UX designer", muted: true }],
            },
          ]}
        />
      </CaseSection>

      <CaseSection label="The experience">
        <h3 className="type-display-xs text-primary">One account, multiple configurations</h3>
        <p className="type-body-md max-w-[1100px] pt-48 text-primary">
          The Account pattern was implemented by the front-end team and made available to any team in the organisation to
          adopt, themed to their brand. Theming ran through an internal plugin built by our Design Technologist, similar in
          principle to Tokens Studio but tailored to NewsKit.
        </p>
        <figure className="flex flex-col gap-16 pt-24">
          <div className="grid gap-24 md:grid-cols-[819fr_397fr] md:gap-64">
            <Figure
              video={{ src: vid("theme-switcher"), poster: img("poster-theme-switcher") }}
              alt="Theme switcher demonstration on the Account page, screen recording"
              width={1574}
              height={1384}
            />
            {/* TODO(content): the mobile recording is only 282x512 (a GIF), so it is soft at this size. A higher-resolution recording would sharpen it. */}
            <Figure
              video={{ src: vid("theme-mobile"), poster: img("theme-mobile") }}
              alt="Theme switcher demo on mobile, screen recording"
              width={282}
              height={512}
            />
          </div>
          <figcaption className="type-mono-xs text-secondary">
            Left: Theme switcher demonstration on the Account page live in production. / Right: Theme switcher demo on
            mobile.
          </figcaption>
        </figure>
      </CaseSection>

      <CaseSection label="The details">
        <div className="flex flex-col gap-96">
          <div className="flex flex-col gap-20">
            <h3 className="type-heading-lg text-primary">
              Every user story
              <br /> before any screen
            </h3>
            <p className="type-body-md max-w-[1100px] text-primary">
              The infrastructure matched the project ambition. The scenarios came first, mapped with the UX designer in
              Airtable. Each one was written as a user story before I drew a screen, so the states were agreed before the
              layouts.
            </p>
            <Figure
              src={img("scenarios")}
              alt="Account subscription scenarios table"
              caption="Account subscription scenarios table: 13 scenarios, each written as a user story."
              width={4091}
              height={1043}
              className="pt-40"
            />
          </div>

          <div className="flex flex-col gap-48">
            <h3 className="type-display-xs text-primary">
              Small flows,
              <br /> real security
              <br /> <Accent>decisions</Accent>
            </h3>
            <Prose className="max-w-[1100px]">
              <p>
                Two of the nine flows show the kind of decision that never appears on a screen. Resetting a password
                sends a single-use link that expires in 15 minutes, with a resend path and a notice on the account.
              </p>
              <p>
                Changing an email sends a verification link to the new address and an account activity warning to the
                old one, so the current owner hears about it. Each flow was mapped first, then designed screen by screen.
              </p>
            </Prose>
            <figure className="flex flex-col gap-16">
              <div className="grid gap-24 md:grid-cols-2 md:gap-64">
                <Panel label="01 / Reset password" src={img("flow-reset-password", "jpg")} alt="Reset password flow and screens" width={2200} height={1444} />
                <Panel label="02 / Edit email" src={img("flow-edit-email", "jpg")} alt="Edit email flow and screens" width={2200} height={1484} />
              </div>
              <figcaption className="type-mono-xs text-secondary">
                &lsquo;Reset Password&rsquo; and &lsquo;Edit Email&rsquo; journeys: logical and conditional flows and
                their screens representations.
              </figcaption>
            </figure>
          </div>

          <div className="flex flex-col gap-48">
            <h3 className="type-display-xs text-primary">
              One pattern,
              <br /> <Accent>all viewports</Accent>
            </h3>
            <p className="type-body-md max-w-[1100px] text-primary">
              The wireframes gave me the structure. The viewport and responsive layout decisions were mine. The base
              templates use swappable blocks, and each template was specified from XS to XL.
            </p>
            <figure className="flex flex-col gap-24">
              <div className="grid gap-24 md:grid-cols-[392fr_824fr] md:gap-64">
                <Panel label="01 / Slots" src={img("slots")} alt="Slot component" width={1600} height={1453} />
                <Panel label="02 / Content blocks" src={img("content-blocks")} alt="Content blocks that fill the slots" width={2800} height={1555} />
              </div>
              <div className="grid gap-24 md:grid-cols-2 md:gap-64">
                <Panel label="03 / Base template, XS to XL" src={img("template-base")} alt="Base template across XS to XL" width={2000} height={1609} />
                <Panel label="04 / Display page, XS to XL" src={img("template-display")} alt="Display page across XS to XL" width={2000} height={1765} />
              </div>
              <figcaption className="type-mono-xs text-secondary">
                Row one: the base template, where each block can be swapped for a library component, and the Display Page
                across XS to XL.
                <br /> Row two: the Generic Page, and the content blocks that fill the slots. Design and code both
                released.
              </figcaption>
            </figure>
          </div>

          <div className="flex flex-col gap-24">
            <h3 className="type-display-xs text-primary">
              A file organised
              <br /> <Accent>for handoff</Accent>
            </h3>
            <p className="type-body-md max-w-[1100px] text-primary">
              The file behind the cancellation journey, page by page: Final UI, Components, Handoff, Pages, Flow and the
              prototypes. One file, multiple themes, the full lifecycle.
            </p>
            {/* Slide 1 is the Final UI page. Figma's mock shows 8 slides; there are 9 exports, so the counter reads 01 / 09. */}
            <Gallery
              width={3838}
              height={2158}
              frame={{
                src: img("macbook-frame"),
                width: 2400,
                height: 1389,
                screenClass: "left-[10.88%] top-[4.39%] h-[84.38%] w-[78.13%]",
              }}
              slides={Array.from({ length: 9 }, (_, i) => ({
                src: img(`handoff-0${i + 1}`),
                alt: `Cancellation journey Figma file, page ${i + 1} of 9`,
                caption: i === 0 ? "Final UI: the cancellation journey in five steps, every state." : undefined,
              }))}
            />
          </div>

          <div className="flex flex-col gap-20">
            <h3 className="type-heading-lg text-primary">
              Different themes,
              <br /> <Accent>live-action prototyping</Accent>
            </h3>
            <p className="type-body-md max-w-[1100px] text-primary">
              Building up from the templates and project infrastructure, the concept prototypes were matched and
              configured for each brand as needed, by simply choosing the themes and letting the Figma prototype work its
              magic.
            </p>
            <figure className="flex flex-col gap-16 pt-40">
              <div className="grid gap-24 md:grid-cols-2 md:gap-48">
                <Panel
                  label="01 / NewsKit theme"
                  video={{ src: vid("prototype-newskit"), poster: img("poster-prototype-newskit", "jpg") }}
                  alt="Cancellation journey in the NewsKit theme, prototype recording"
                  width={1400}
                  height={992}
                />
                <Panel
                  label="02 / The Times theme"
                  video={{ src: vid("prototype-times"), poster: img("poster-prototype-times", "jpg") }}
                  alt="Cancellation journey in the Times theme, prototype recording"
                  width={1400}
                  height={992}
                />
              </div>
              <figcaption className="type-mono-xs text-secondary">
                The same cancellation journey in the NewsKit and Times themes. Prototype recordings.
              </figcaption>
            </figure>
          </div>
        </div>
      </CaseSection>

      <CaseSection label="The gap" surface>
        <div className="grid gap-40 lg:grid-cols-[600fr_697fr] lg:gap-64">
          <h3 className="type-display-xs text-primary">
            Shipped without
            <br /> <Accent>a scoreboard</Accent>
          </h3>
          <p className="type-body-md text-primary">
            The NewsKit documentation promises that self-service improves retention and cuts the load on customer service.
            I can&apos;t tell you whether it did. I didn&apos;t have measurement in place to track adoption across brands,
            and this is something I set up now, especially for multi-branded projects.
          </p>
        </div>
      </CaseSection>

      <CaseSection label="Reflections">
        <div className="grid gap-64 lg:grid-cols-2">
          <div>
            <h3 className="type-display-xs text-primary">
              What made
              <br /> <Accent>it land</Accent>
            </h3>
            <Prose size="sm" className="max-w-[600px] pt-48">
              <p>
                Looking back, I don&apos;t think I fully appreciated what I was part of at the time: I was sitting inside
                NewsKit design systems team, helping build the shared foundation that all of it ran on.
              </p>
              <p>
                News UK is one of the biggest media companies in the UK and the team was small and the conditions were
                unusually good. Our Head of Design Systems had real organisational influence, buy-in came from the top,
                and engineering was a genuine partner. That kind of environment is rarer than it sounds.
              </p>
              <p>
                The components were the easy part. The team had authority to set standards, and leadership treated the
                system as infrastructure, not overhead. Those conditions don&apos;t just appear, and without them the work
                doesn&apos;t land. My role was UI design, but on a small team I worked across the whole pattern, from the
                scenario tables to the slot templates to the handoff.
              </p>
            </Prose>
          </div>
          <div>
            <h3 className="type-display-xs text-primary">Learnings</h3>
            <div className="pt-24">
              <Numbered
                items={[
                  {
                    title: "Design the unglamorous states first",
                    body: "Payment failure, cancellation and refunds are where subscribers decide whether to stay. They need to be designed on purpose, not left for each brand to improvise.",
                  },
                  {
                    title: "Configurable beats customised",
                    body: "Letting brands switch sections on and off kept requests out of our queue. Every custom ask is a fork of the pattern.",
                  },
                  {
                    title: "Authority is a design input",
                    body: "Top-down buy-in and an engineering partnership did more for adoption than any single component. I now ask about both before I join a team.",
                  },
                  {
                    title: "Measure adoption from day one",
                    body: "I shipped a pattern without a way to measure it. Now the measurement plan exists before the first component does.",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </CaseSection>

      <CaseNav slug="newskit-account" />
    </article>
  );
}
