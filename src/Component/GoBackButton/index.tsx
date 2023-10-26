import React from "react";

interface GoBackButtonProps {
  isShowList: boolean;
  setIsShowList: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({
  isShowList,
  setIsShowList,
}) => {
  const handleGoBack = () => {
    setIsShowList(!isShowList);
  };

  return <button onClick={handleGoBack}>back</button>;
};

export default GoBackButton;
