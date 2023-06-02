const DebtNotFound = () => {
  return (
    <div>
      <div className="grid place-items-center p-4">
        <h2 className="text-lg font-semibold text-red">Debt not found</h2>
        <p className="text-center">Perhaps you deleted it?</p>
      </div>
    </div>
  );
};

export default DebtNotFound;
