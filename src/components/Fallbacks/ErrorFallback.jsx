const ErrorFallback = () => {
  return (
    <div>
      <h2>Something went wrong :(</h2>
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
};

export default ErrorFallback;
