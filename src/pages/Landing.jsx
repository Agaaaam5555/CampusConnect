import { Link } from "react-router-dom";
import { ArrowRight, Check, Footprints, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import ScoreRing from "../components/ScoreRing";

const demo = [
  { name: "Riya Sharma", skills: "DBMS · SQL · Notes", score: 92, walk: 3 },
  { name: "Karan Mehta", skills: "Express · MongoDB", score: 81, walk: 5 },
  { name: "Naina Gill", skills: "Maths · Physics", score: 67, walk: 8 },
];

function MatchDemo() {
  return (
    <div className="card p-5 shadow-xl">
      <div className="rise rounded-xl bg-surface2 p-4" style={{ "--d": "0.1s" }}>
        <p className="text-sm text-muted">New request · High urgency</p>
        <p className="font-display text-xl font-bold">Need DBMS notes for Unit 3</p>
      </div>
      <p className="rise mb-2 mt-4 text-sm font-semibold text-muted" style={{ "--d": "0.5s" }}>Best matches</p>
      <ul className="space-y-2">
        {demo.map((h, i) => (
          <li key={h.name} className="rise flex items-center gap-3 rounded-xl border border-line p-3" style={{ "--d": `${0.7 + i * 0.3}s` }}>
            <ScoreRing value={h.score} size={52} />
            <div className="min-w-0">
              <p className="font-semibold">{h.name}</p>
              <p className="truncate text-sm text-muted">{h.skills}</p>
            </div>
            <span className="ml-auto inline-flex items-center gap-1 text-sm text-muted"><Footprints size={14} />{h.walk} min</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const problems = [
  ["Scattered requests", "Help posts get buried in group chats and notice boards."],
  ["No right person", "Nobody knows who actually has the skill you need."],
  ["Distance ignored", "The helper may be busy, or on the other side of campus."],
  ["No trust or tracking", "No reputation, no completion status, no moderation."],
];

const steps = [
  ["Post a request", "Describe what you need, pick a category and how urgent it is."],
  ["Get ranked helpers", "The matching engine scores every helper on skills, availability and distance."],
  ["Chat and agree", "Talk to the helper and track the request."],
  ["Close it out", "Mark it complete. The helper earns +10 reputation points."],
];

export default function Landing() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-[1.1fr_1fr] md:py-24">
        <div>
          <h1 className="text-4xl font-extrabold leading-[1.05] md:text-6xl">
            Stuck on something small? Someone close by can help in minutes.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted">
            CampusConnect matches your request with the students who have the right skill, the free time
            and are a short walk away.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/register" className="btn btn-primary">Get started <ArrowRight size={18} /></Link>
            <Link to="/how-it-works" className="btn">See how matching works</Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {["Skills", "Availability", "Campus distance"].map((s) => (
              <li key={s} className="flex items-center gap-1.5"><Check size={16} className="text-teal" />Matched on {s.toLowerCase()}</li>
            ))}
          </ul>
        </div>
        <MatchDemo />
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="max-w-xl text-3xl font-extrabold md:text-4xl">Why help requests get lost today</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-4">
            {problems.map(([h, p]) => (
              <div key={h} className="border-l-4 border-accent pl-4">
                <h3 className="text-lg font-bold">{h}</h3>
                <p className="mt-1 text-muted">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-extrabold md:text-4xl">From request to done in four steps</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-4">
          {steps.map(([h, p], i) => (
            <li key={h}>
              <span className="font-display text-5xl font-extrabold text-teal">{i + 1}</span>
              <h3 className="mt-2 text-lg font-bold">{h}</h3>
              <p className="mt-1 text-muted">{p}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 md:grid-cols-2">
        <div className="rounded-2xl bg-brand p-8 text-brandfg">
          <h3 className="text-2xl font-bold">If you need help</h3>
          <ul className="mt-4 space-y-2">
            {["Recommended helpers instead of guesswork", "Filter requests by category and urgency", "Chat and track progress"].map((t) => (
              <li key={t} className="flex gap-2"><Check size={20} className="shrink-0" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="card p-8">
          <h3 className="text-2xl font-bold">If you can help</h3>
          <ul className="mt-4 space-y-2">
            {["Browse requests that match your skills", "Accept only the requests that suit you", "Earn reputation points for every request you complete"].map((t) => (
              <li key={t} className="flex gap-2"><Check size={20} className="shrink-0 text-teal" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            [Sparkles, "Smart Help Matching", "Every helper gets a score for your request, so the best fit comes first."],
            [MessageSquare, "Chat on every request", "Talk it through with your helper right inside the request."],
            [ShieldCheck, "Reputation you can trust", "Helpers earn +10 points for every completed request."],
          ].map(([Icon, h, p]) => (
            <div key={h} className="flex gap-4">
              <Icon className="mt-1 shrink-0 text-teal" />
              <div><h3 className="font-bold">{h}</h3><p className="text-muted">{p}</p></div>
            </div>
          ))}
        </div>
        <div className="mt-14 rounded-2xl border border-line bg-surface p-10 text-center">
          <h2 className="text-3xl font-extrabold">Your next favour is one request away.</h2>
          <Link to="/register" className="btn btn-primary mt-6">Create your account</Link>
        </div>
      </section>
    </>
  );
}
