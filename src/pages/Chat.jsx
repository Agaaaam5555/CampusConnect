import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/Avatar";
import { idOf } from "../lib/utils";

const textOf = (m) => m.text ?? m.content ?? m.message ?? "";

export default function Chat() {
  const { id } = useParams(); // request id
  const { user } = useAuth();
  const [request, setRequest] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottom = useRef(null);

  useEffect(() => { api.getRequest(id).then(setRequest); }, [id]);

  // Simple REST chat: fetch now, then refresh every 3 seconds
  useEffect(() => {
    const load = () => api.getMessages(id).then(setMessages).catch(() => {});
    load();
    const t = setInterval(load, 3000);
    return () => clearInterval(t);
  }, [id]);

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: "smooth" }); }, [messages.length]);

  const other = request && (request.requester._id === user._id ? request.helper : request.requester);

  const send = async (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setText("");
    await api.sendMessage(id, t);
    api.getMessages(id).then(setMessages);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/messages" className="mb-3 inline-flex items-center gap-1 text-sm font-semibold"><ArrowLeft size={16} />All messages</Link>
      <div className="card flex h-[70vh] flex-col overflow-hidden">
        <header className="flex items-center gap-3 border-b border-line p-4">
          <Avatar name={other?.name || "?"} size={40} />
          <div className="min-w-0">
            <p className="font-semibold">{other?.name || "Chat"}</p>
            <Link to={`/requests/${id}`} className="block truncate text-sm text-muted hover:underline">{request?.title}</Link>
          </div>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
          {messages.length === 0 && <p className="mt-10 text-center text-muted">No messages yet. Say hello.</p>}
          {messages.map((m) => {
            const mine = idOf(m.sender) === user._id;
            return (
              <div key={m._id} className={mine ? "text-right" : ""}>
                <p className={`inline-block max-w-[80%] rounded-2xl px-4 py-2 text-left ${mine ? "bg-brand text-brandfg" : "bg-surface2"}`}>{textOf(m)}</p>
              </div>
            );
          })}
          <div ref={bottom} />
        </div>

        <form onSubmit={send} className="flex gap-3 border-t border-line p-3">
          <input className="input" placeholder="Type a message" aria-label="Message" value={text} onChange={(e) => setText(e.target.value)} />
          <button className="btn btn-primary" aria-label="Send"><Send size={18} /></button>
        </form>
      </div>
    </div>
  );
}
