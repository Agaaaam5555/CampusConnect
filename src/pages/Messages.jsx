import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { idOf } from "../lib/utils";
import Avatar from "../components/Avatar";
import PageHeader from "../components/PageHeader";

export default function Messages() {
  const { user } = useAuth();
  const [list, setList] = useState(null);

  // Chats open once a request has a helper, so we build the inbox from the requests list
  useEffect(() => {
    api.getRequests().then((all) =>
      setList(all.filter((r) => r.status !== "Open" && (r.requester._id === user._id || idOf(r.helper) === user._id)))
    );
  }, []);

  return (
    <>
      <PageHeader title="Messages" subtitle="Chats open once a request is accepted." />
      {!list ? <p>Loading...</p> : list.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="font-bold">No conversations yet.</p>
          <p className="text-muted">Accept a request or get one accepted to start chatting.</p>
          <Link to="/requests" className="btn btn-primary mt-4">Browse requests</Link>
        </div>
      ) : (
        <ul className="card divide-y divide-line">
          {list.map((c) => (
            <li key={c._id}>
              <Link to={`/chat/${c._id}`} className="flex items-center gap-4 p-4 hover:bg-surface2">
                <Avatar name={(c.requester._id === user._id ? c.helper?.name : c.requester.name) || "?"} size={44} />
                <div className="min-w-0">
                  <p className="font-semibold">{c.requester._id === user._id ? c.helper?.name || "Your helper" : c.requester.name}</p>
                  <p className="truncate text-sm text-muted">{c.title}</p>
                </div>
                <span className="chip ml-auto">{c.status}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
