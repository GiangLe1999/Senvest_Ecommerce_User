import { useEffect, useState } from "react";

interface Props {
  show: boolean;
}

const useMountAnimation = ({ show }: Props) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
    }
  }, [show]);

  const handleAnimationEnd = () => {
    if (!show) {
      setVisible(false);
    }
  };

  return {
    visible,
    handleAnimationEnd,
  };
};

export default useMountAnimation;
