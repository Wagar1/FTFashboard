import { useState } from "react";

const Button = ({
  id,
  label,
  style,
  onClick,
  loading,
  loadingId,
  className,
}) => {
  console.log(loading, loadingId, id);
  const [loadingX, setLoading] = useState(false);

  function handleNavigate() {
    setLoading(true);
  }

  return (
    <button
      id={id}
      style={style}
      className={`view__btn ${className}`}
      onClick={onClick}
    >
      {loading && `btn-${loadingId}` == id ? (
        <div id="loader" class="loader"></div>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
