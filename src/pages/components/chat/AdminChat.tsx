import useMessageStore from "~/pages/store/message-store";
const AdminChat = () => {
  const bears = useMessageStore((state) => state.bears);
  // const increaseBears = useMessageStore((state) => state.increasePopulation);

  const { increasePopulation, removeAllBears } = useMessageStore();

  return (
    <>
      <div className="m-2 gap-2">
        <input className="m-2"></input>
        <button className="m-2" onClick={removeAllBears}>
          removeBears
        </button>
        <button onClick={increasePopulation}>Increase Bears</button>
        <div className="m-2">{bears}</div>
      </div>
    </>
  );
};

export default AdminChat;
