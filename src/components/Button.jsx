const Button = ({ label, onClick }) => {
    return (
      <button
        className="view__btn"
        onClick={onClick}
      >
        {label}
      </button>
    );
  };
  
  export default Button;