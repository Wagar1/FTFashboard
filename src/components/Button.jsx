const Button = ({ id, label, onClick }) => {
  return (
    <button id={id} className="view__btn" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
