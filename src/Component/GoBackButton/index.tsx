import React from "react";

interface GoBackButtonProps {
  isShowList: boolean;
  setIsShowList: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  style?: React.CSSProperties;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({
  isShowList,
  setIsShowList,
  className,
  style,
}) => {
  const handleGoBack = () => {
    setIsShowList(!isShowList);
  };

  return (
    <button className={className} style={style} onClick={handleGoBack}>
      &lt;
    </button>
  );
};

export default GoBackButton;
