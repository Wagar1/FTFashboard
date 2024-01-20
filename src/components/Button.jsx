const Button = ({ id, label, style, onClick }) => {
  return (
    <button id={id} style={style} className="view__btn" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
