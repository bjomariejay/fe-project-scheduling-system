import { KeyboardEvent, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { DmMessage, User } from "../../types/api";

interface DmPanelProps {
  users: User[];
  currentUserId?: string;
  selectedRecipientId: string;
  dmBody: string;
  conversationCount: number;
  onRecipientChange: (userId: string) => void;
  onBodyChange: (value: string) => void;
  onSend: () => void;
  onTextareaKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  thread: DmMessage[];
}

const getInitials = (value: string) =>
  value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk.charAt(0).toUpperCase())
    .join("") || "?";

const DmPanel = ({
  users,
  currentUserId,
  selectedRecipientId,
  dmBody,
  conversationCount,
  onRecipientChange,
  onBodyChange,
  onSend,
  onTextareaKeyDown,
  thread,
}: DmPanelProps) => {
  const [isMobileThreadVisible, setIsMobileThreadVisible] = useState(
    Boolean(selectedRecipientId),
  );

  useEffect(() => {
    if (!selectedRecipientId) {
      setIsMobileThreadVisible(false);
    }
  }, [selectedRecipientId]);

  const teammates = useMemo(
    () => users.filter((teammate) => teammate.id !== currentUserId),
    [users, currentUserId],
  );

  const selectedUser = useMemo(
    () => users.find((candidate) => candidate.id === selectedRecipientId) ?? null,
    [users, selectedRecipientId],
  );

  const handleRecipientSelect = (teammateId: string) => {
    if (teammateId !== selectedRecipientId) {
      onRecipientChange(teammateId);
    }
    setIsMobileThreadVisible(true);
  };

  const handleBackToUserList = () => {
    setIsMobileThreadVisible(false);
  };

  return (
    <section className="main__view" aria-label="Direct messages">
      <article className="card dm-panel">
        <header className="dm-panel__header">
          <div>
            <p className="eyebrow">Inbox</p>
            <h3>Direct messages</h3>
            <p className="muted">Stay in sync with teammates instantly.</p>
          </div>
          
        </header>
        <div
          className={clsx("dm-panel__layout", {
            "dm-panel__layout--mobile-thread":
              isMobileThreadVisible && Boolean(selectedRecipientId),
          })}
        >
          <aside className="dm-panel__list">
            <div className="dm-recipient-field">
              <label>Teammates</label>
              <p className="muted">
                Choose someone to start or continue a conversation.
              </p>
            </div>
            <div className="dm-user-list">
              {teammates.length ? (
                teammates.map((teammate) => (
                  <button
                    key={teammate.id}
                    type="button"
                    className={clsx("dm-user", {
                      active: teammate.id === selectedRecipientId,
                    })}
                    onClick={() => handleRecipientSelect(teammate.id)}
                  >
                    <span className="dm-user__avatar">
                      {getInitials(teammate.displayName)}
                    </span>
                    <div className="dm-user__info">
                      <strong>{teammate.displayName}</strong>
                      {teammate.handle ? <small>@{teammate.handle}</small> : null}
                    </div>
                  </button>
                ))
              ) : (
                <p className="muted">No teammates available.</p>
              )}
            </div>
          </aside>
          <section className="dm-panel__conversation">
            {selectedRecipientId ? (
              <>
                <button
                  type="button"
                  className="dm-thread__back"
                  aria-label="Back to teammates"
                  title="Back to teammates"
                  onClick={handleBackToUserList}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
                  </svg>
                </button>
                <header className="dm-conversation__header">
                  <div>
                    <p className="muted">Chatting with</p>
                    <h4>{selectedUser?.displayName || "Unknown user"}</h4>
                    {selectedUser?.handle ? (
                      <small>@{selectedUser.handle}</small>
                    ) : null}
                  </div>
                </header>
                {thread.length ? (
                  <div className="dm-thread">
                    {thread.map((message, index) => (
                      <article
                        key={message.id}
                        className={index % 2 ? "bubble-alt" : "bubble"}
                      >
                        <header>
                          <strong>{message.senderName}</strong>
                          <small>
                            {new Date(message.createdAt).toLocaleString()}
                          </small>
                        </header>
                        <p>{message.body}</p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="dm-empty">
                    <h4>No messages yet</h4>
                    <p className="muted">Say hello to get things rolling.</p>
                  </div>
                )}
                <form
                  className="dm-message-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    onSend();
                  }}
                >
                  <label className="dm-message-label" htmlFor="dm-message">
                    Message
                  </label>
                  <div className="dm-message-row">
                    <textarea
                      id="dm-message"
                      rows={4}
                      value={dmBody}
                      onChange={(event) => onBodyChange(event.target.value)}
                      onKeyDown={onTextareaKeyDown}
                      placeholder="Share a quick update or hand off a ticket"
                    />
                    <button
                      className="primary-pill"
                      type="submit"
                      disabled={!dmBody.trim()}
                    >
                      Send
                    </button>
                  </div>
                </form>
                <p className="dm-hint">
                  Tip: mention ticket numbers or @ teammates to keep everyone aligned.
                </p>
              </>
            ) : (
              <div className="dm-empty">
                <h4>Select a teammate to start chatting</h4>
                <p className="muted">
                  Pick someone from the list to view your conversation history.
                </p>
              </div>
            )}
          </section>
        </div>
      </article>
    </section>
  );
};

export default DmPanel;
