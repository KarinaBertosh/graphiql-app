export const Modal = (
  error: any,
  active: boolean,
  setActive: () => void
) => {
  console.log("active", active);

  return (
    <div
      id="myModal"
      className={active ? "modal" : "modal none"}
      onClick={(e) => e.currentTarget === e.target && setActive()}
    >
      <div className="modal-content">
        <div className="close" onClick={setActive}>
          &times;
        </div>
        <p>{error.error}</p>
      </div>
    </div>
  );
};
