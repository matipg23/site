// Figma: Case 01 > Details > Stage > Diagram (384:19832).
// The embedded designer sits between the core team and a vertical product team: feedback flows
// one way, knowledge the other, and continuous improvement feeds both teams.
// Desktop is the Figma layout (1040 x 373, absolutely placed). Below xl the pieces stack.

const circle =
  "flex h-[260px] w-[260px] flex-col items-center justify-center gap-8 rounded-full border-2 border-default text-center";
const nodeTitle = "type-label-sm text-primary";
const nodeBody = "type-caption-md text-primary";

export default function EngagementFlow() {
  return (
    <figure>
      {/* Desktop */}
      <div className="relative mx-auto hidden h-[373px] w-[1040px] xl:block">
        <svg aria-hidden className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 1040 373" fill="none">
          {/* embedded designer to product team */}
          <path
            d="M520.5 63V33.5H911V63"
            className="stroke-[color:var(--border-accent)]"
            strokeDasharray="4 4"
          />
          {/* continuous improvement to both teams */}
          <g className="stroke-[color:var(--text-primary)]" strokeDasharray="4 4">
            <path d="M370 347.2H133V274" />
            <path d="M665 347.2H910V274" />
          </g>
          <g className="stroke-[color:var(--text-primary)]">
            <path d="M129.5 272.5 133 269 136.5 272.5" />
            <path d="M906.5 272.5 910 269 913.5 272.5" />
          </g>
        </svg>

        <div className="absolute left-0 top-0">
          <CoreTeam />
        </div>
        <div className="absolute left-[780px] top-0">
          <ProductTeam />
        </div>
        <div className="absolute left-[413px] top-[55px]">
          <Embedded />
        </div>
        <Exchange className="left-[285px] top-[65px]" feedback="light" />
        <Exchange className="left-[652px] top-[65px]" feedback="dark" />
        <div className="absolute left-[369.5px] top-[321px]">
          <Improvement />
        </div>
      </div>

      {/* Below lg */}
      <div className="flex flex-col items-center gap-24 xl:hidden">
        <CoreTeam />
        <p className="type-label-xs text-secondary">knowledge ↓ · feedback ↑</p>
        <Embedded />
        <p className="type-label-xs text-secondary">knowledge ↓ · feedback ↑</p>
        <ProductTeam />
        <Improvement />
      </div>
    </figure>
  );
}

function CoreTeam() {
  return (
    <div className={`${circle} px-[25px]`}>
      <svg aria-hidden width="24" height="24" viewBox="-3 -3 24 24" className="text-accent" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M8 10H0V0H8V10ZM8 18H0V12H8V18ZM10 18H18V8H10V18ZM10 6V0H18V6H10Z"
        />
      </svg>
      <div className="flex w-[210px] flex-col gap-[10px]">
        <p className={nodeTitle}>Design System Core Team</p>
        <p className={nodeBody}>Building global solutions, implementing and sharing design system features</p>
      </div>
    </div>
  );
}

function ProductTeam() {
  return (
    <div className={`${circle} px-[25px]`}>
      <svg aria-hidden width="24" height="24" viewBox="0 -5 24 24" className="text-accent" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M18 6C19.66 6 20.99 4.66 20.99 3C20.99 1.34 19.66 0 18 0C17.68 0 17.37 0.05 17.09 0.14C17.66 0.95 17.99 1.93 17.99 3C17.99 4.07 17.65 5.04 17.09 5.86C17.37 5.95 17.68 6 18 6ZM8 5H5V2H3V5H0V7H3V10H5V7H8V5ZM15.99 3C15.99 4.66 14.66 6 13 6C11.34 6 10 4.66 10 3C10 1.34 11.34 0 13 0C14.66 0 15.99 1.34 15.99 3ZM19.62 8.16C20.45 8.89 21 9.82 21 11V13H24V11C24 9.46 21.63 8.51 19.62 8.16ZM7 11C7 9 11 8 13 8C15 8 19 9 19 11V13H7V11Z"
        />
      </svg>
      <div className="flex w-[200px] flex-col gap-[10px]">
        <p className={nodeTitle}>Vertical Product Team</p>
        <p className={nodeBody}>Building products, providing system feedback, sharing learnings</p>
      </div>
    </div>
  );
}

function Embedded() {
  return (
    <div className="flex w-[214px] flex-col items-center gap-[2px] border-2 border-default bg-surface px-16 pb-16 pt-12 text-center">
      <svg aria-hidden width="22" height="22" viewBox="-3.6 -3.6 21.6 21.6" className="text-accent" fill="currentColor">
        <path d="M7.2 7.2C9.189 7.2 10.8 5.589 10.8 3.6C10.8 1.611 9.189 0 7.2 0C5.211 0 3.6 1.611 3.6 3.6C3.6 5.589 5.211 7.2 7.2 7.2ZM7.2 9C4.797 9 0 10.206 0 12.6V14.4H14.4V12.6C14.4 10.206 9.603 9 7.2 9Z" />
      </svg>
      <div className="flex flex-col gap-[10px]">
        <p className={nodeTitle}>Embedded Designer</p>
        <p className={nodeBody}>Applies standards, adapts to context, shares insights</p>
      </div>
    </div>
  );
}

function Improvement() {
  return (
    <div className="flex h-[52px] items-center gap-12 rounded-full border-2 border-default bg-page py-16 pl-16 pr-24">
      <svg aria-hidden width="32" height="32" viewBox="-5.33 -1.33 32 32" className="text-primary" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10.6667 4V0L5.33333 5.33333L10.6667 10.6667V6.66667C15.08 6.66667 18.6667 10.2533 18.6667 14.6667C18.6667 16.0133 18.3333 17.2933 17.7333 18.4L19.68 20.3467C20.72 18.7067 21.3333 16.76 21.3333 14.6667C21.3333 8.77333 16.56 4 10.6667 4V4ZM10.6667 22.6667C6.25333 22.6667 2.66667 19.08 2.66667 14.6667C2.66667 13.32 3 12.04 3.6 10.9333L1.65333 8.98667C0.613333 10.6267 0 12.5733 0 14.6667C0 20.56 4.77333 25.3333 10.6667 25.3333V29.3333L16 24L10.6667 18.6667V22.6667V22.6667Z"
        />
      </svg>
      <span className="type-label-xs whitespace-nowrap text-primary">Continuous improvement</span>
    </div>
  );
}

// Two curved arrows with a label each: feedback above, knowledge below.
// `feedback` says which arc is the light one (left group: feedback is light; right group: knowledge is).
const arc =
  "M100.278 22.4598C100.392 21.7052 100.505 21.1392 100.618 20.5354C100.807 19.4789 101.034 18.4601 101.261 17.4413C101.337 17.1017 101.488 16.7999 101.639 16.5357C101.79 16.2716 102.055 16.1207 102.357 16.1961C102.698 16.2716 102.924 16.498 102.962 16.8376C103 17.1017 103 17.3659 103 17.5923C102.735 20.3845 102.282 23.139 101.45 25.8181C101.374 26.0822 101.261 26.3463 101.11 26.6104C100.845 27.0255 100.505 27.101 100.051 26.8746C99.7867 26.7614 99.5599 26.6482 99.2574 26.5727C97.5185 26.1576 95.7795 25.7803 94.0405 25.3653C93.8137 25.3275 93.5869 25.2143 93.3979 25.1011C93.0954 24.9502 92.9442 24.6861 92.9442 24.3465C92.982 24.0069 93.171 23.7427 93.5113 23.6673C93.8137 23.5918 94.1917 23.5541 94.4942 23.5918C95.6283 23.7427 96.8002 23.9691 97.9343 24.1578C98.1233 24.1955 98.3123 24.1955 98.6148 24.2333C98.3879 23.8937 98.2745 23.6673 98.1233 23.4409C94.1161 17.4791 88.8992 12.8756 82.5104 9.55515C77.2935 6.72517 71.7363 4.83853 65.9523 3.74427C60.7732 2.76321 55.5563 2.15949 50.2638 2.23495C42.6652 2.31042 35.1801 3.29147 27.9218 5.59319C21.0037 7.7817 14.7283 11.1022 9.24672 15.8565C6.14682 18.5356 3.57616 21.592 1.53476 25.1011C1.42135 25.3275 1.27013 25.5539 1.08111 25.7426C0.703077 26.1199 0.098217 25.9313 0.0226095 25.403C-0.0151942 25.1011 -0.0151943 24.7615 0.098217 24.4974C0.362843 23.8182 0.627469 23.139 1.00551 22.5353C2.55546 19.743 4.63467 17.3281 6.9785 15.1396C11.704 10.6871 17.1855 7.4421 23.1207 4.98946C27.4681 3.17828 31.929 2.04629 36.5032 1.2539C41.6067 0.348304 46.7102 -0.0667583 51.8893 0.00870761C55.5563 0.0464406 59.1855 0.42377 62.8146 0.952031C67.3133 1.63122 71.6985 2.65001 76.0081 4.19707C81.1872 6.08371 86.1017 8.53636 90.487 11.9323C94.0783 14.7246 97.1782 18.0073 99.7867 21.7806C99.9001 21.9316 100.051 22.1202 100.278 22.4598Z";

function Exchange({ className, feedback }: { className: string; feedback: "light" | "dark" }) {
  const light = "fill-[color:var(--border-default)]";
  const dark = "fill-[color:var(--text-secondary)]";
  return (
    <div className={`absolute h-[130px] w-[103px] ${className}`}>
      <p className="type-label-xs absolute left-0 top-0 w-full text-center text-secondary">feedback</p>
      <svg
        aria-hidden
        width="103"
        height="66"
        viewBox="0 0 103 66"
        className="absolute left-0 top-[32px]"
      >
        {/* top arc: points left */}
        <path d={arc} transform="translate(103 0) scale(-1 1)" className={feedback === "light" ? light : dark} />
        {/* bottom arc: points right */}
        <path d={arc} transform="translate(0 66) scale(1 -1)" className={feedback === "light" ? dark : light} />
      </svg>
      <p className="type-label-xs absolute left-0 top-[110px] w-full text-center text-secondary">knowledge</p>
    </div>
  );
}
