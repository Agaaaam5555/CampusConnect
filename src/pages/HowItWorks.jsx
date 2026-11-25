import { Link } from "react-router-dom";
import { Footprints, Sparkles, Clock } from "lucide-react";

const signals = [
  [Sparkles, "Skills", "Helpers list the skills they can offer. A request's category and description are compared against them."],
  [Clock, "Availability", "A helper who is free when you need them ranks higher than one who is busy."],
  [Footprints, "Campus distance", "Helpers who are a short walk from the request location rank higher."],
];

const faqs = [
  ["Is CampusConnect free?", "Yes. Helping is voluntary and rewarded with reputation points, not money."],
  ["Who can see my request?", "Logged-in students can browse requests. Only you see the ranked helper list for your own request."],
  ["How is reputation earned?", "When a request you helped with is marked complete, you earn 10 reputation points."],
];

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-extrabold md:text-5xl">How CampusConnect works</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        One platform for campus help requests, with a matching engine that finds the right person instead of waiting for anyone to reply.
      </p>

      <h2 className="mt-14 text-2xl font-bold">What the matching engine looks at</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {signals.map(([Icon, h, p]) => (
          <div key={h} className="card p-6">
            <Icon className="text-teal" />
            <h3 className="mt-3 text-lg font-bold">{h}</h3>
            <p className="mt-1 text-muted">{p}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-muted">The result is a ranked list of helpers with a match score for every request.</p>

      <h2 className="mt-14 text-2xl font-bold">Questions</h2>
      <div className="mt-4 divide-y divide-line border-y border-line">
        {faqs.map(([q, a]) => (
          <details key={q} className="group py-4">
            <summary className="cursor-pointer font-semibold">{q}</summary>
            <p className="mt-2 text-muted">{a}</p>
          </details>
        ))}
      </div>

      <Link to="/register" className="btn btn-primary mt-10">Join your campus</Link>
    </div>
  );
}
