import { FormEvent } from "react";
import type { CreateProjectModel } from "../../context/WorkspaceContext";

interface CreateProjectModalProps {
  isOpen: boolean;
  form: CreateProjectModel;
  onFieldChange: <K extends keyof CreateProjectModel>(
    field: K,
    value: CreateProjectModel[K],
  ) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const CreateProjectModal = ({
  isOpen,
  form,
  onFieldChange,
  onClose,
  onSubmit,
}: CreateProjectModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <article className="modal">
        <header>
          <h3>Create project</h3>
          <button type="button" onClick={onClose} aria-label="Close create project form">
            ×
          </button>
        </header>
        <form onSubmit={onSubmit} className="create-project">
          <label>
            Name
            <input
              type="text"
              value={form.name}
              onChange={(event) => onFieldChange("name", event.target.value)}
              required
            />
          </label>
          <label style={{display: 'none'}}>
            Slug
            <input
              type="text"
              value={form.slug}
              onChange={(event) => onFieldChange("slug", event.target.value)}
            />
          </label>
          <label>
            Ticket prefix
            <input
              type="text"
              value={form.ticketPrefix}
              onChange={(event) => onFieldChange("ticketPrefix", event.target.value)}
              required
            />
          </label>
          <label style={{display: 'none'}}>
            Description
            <textarea
              rows={3}
              value={form.description}
              onChange={(event) => onFieldChange("description", event.target.value)}
            />
          </label>
          <footer>
            <button type="button" className="link-button outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="link-button">
              Create project
            </button>
          </footer>
        </form>
      </article>
    </div>
  );
};

export default CreateProjectModal;
