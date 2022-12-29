const Notification = ({ message, messageStyle }) => {
  const className = "notification " + messageStyle;
  console.log(className)

  if (message === null) {
    // react 组件，如果 return null 则表示不显示任何内容
    return null;
  }
  return <div className={className}>{message}</div>;
};

export default Notification;
