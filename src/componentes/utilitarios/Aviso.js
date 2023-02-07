import React from 'react';

const Aviso = ({ className, value }) => {
  const [message, setMessage] = React.useState(false);

  React.useEffect(() => {
    setMessage(value.estoque);
    setTimeout(() => {
      setMessage(false);
    }, 9000);
  }, []);
  return <>{message && <p className={className}>{message}</p>}</>;
};

export default Aviso;
