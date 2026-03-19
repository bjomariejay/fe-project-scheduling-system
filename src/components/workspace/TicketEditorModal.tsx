import { FormEvent } from "react";
import { Project } from "../../types/api";
import type { CreateTicketModel } from "../../context/WorkspaceContext";

interface TicketEditorModalProps {
  isOpen: boolean;
  form: CreateTicketModel;
  projects: Project[];
  saving: boolean;
  error: string;
  onFieldChange: <K extends keyof CreateTicketModel>(
    field: K,
    value: CreateTicketModel[K],
  ) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const TicketEditorModal = ({
  isOpen,
  form,
  projects,
  saving,
  error,
  onFieldChange,
  onClose,
  onSubmit,
}: TicketEditorModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <article className="modal">
        <header>
          <h3>Edit ticket</h3>
          <button type="button" onClick={onClose} aria-label="Close edit ticket form">
            ×
          </button>
        </header>
        <form onSubmit={onSubmit}>
          <label>
            Title: &nbsp;
            <input
              type="text"
              value={form.title}
              onChange={(event) => onFieldChange("title", event.target.value)}
              required
            />
          </label>

          <label>
            Project: &nbsp;
            <select
              value={form.projectId}
              onChange={(event) => onFieldChange("projectId", event.target.value)}
              required
            >
              <option value="">Select project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Estimated hours: &nbsp;
            <input
              type="number"
              min={0}
              value={form.estimatedHours}
              onChange={(event) =>
                onFieldChange("estimatedHours", Number(event.target.value))
              }
            />
          </label>

          <label>
            Priority: &nbsp;
            <select
              value={form.priority}
              onChange={(event) =>
                onFieldChange(
                  "priority",
                  event.target.value as CreateTicketModel["priority"],
                )
              }
            >
              <option value="normal">Normal</option>
              <option value="priority">Priority</option>
            </select>
          </label>

          <label>
            Privacy: &nbsp;
            <select
              value={form.privacy}
              onChange={(event) =>
                onFieldChange(
                  "privacy",
                  event.target.value as CreateTicketModel["privacy"],
                )
              }
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>

          <label style={{ display: "contents" }}>
            Description: &nbsp;
            <textarea
              rows={5}
              value={form.description}
              placeholder="Add context, goals, or reproduction steps"
              onChange={(event) => onFieldChange("description", event.target.value)}
            />
          </label>

          {error && <p className="error">{error}</p>}

          <footer>
            <button type="button" className="link-button outline" onClick={onClose}>
              Cancel
            </button>
            <button className="link-button" type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </button>
          </footer>
        </form>
      </article>
    </div>
  );
};

export default TicketEditorModal;
