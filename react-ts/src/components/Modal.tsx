export const Modal = ({
  error,
  active,
  setActive,
}: {
  error: string;
  active: boolean;
  setActive: () => void;
}) => {
  return (
    <div
      id="myModal"
      className={active ? "modal" : "modal none"}
      onClick={(e) => {
        e.currentTarget === e.target && setActive();
      }}
    >
      <div className="modal-content">
        <div className="close" onClick={() => setActive()}>
          &times;
        </div>
        <p>{error}</p>
      </div>
    </div>
  );
};
