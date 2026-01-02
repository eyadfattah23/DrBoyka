const calcDisc = function (
  selectedMonth,
  before1,
  after1,
  before6,
  after6,
  before12,
  after12
) {
  if (selectedMonth === 1) {
    return Math.round(((before1 - after1) / before1) * 100);
  } else if (selectedMonth === 6) {
    return Math.round(((before6 - after6) / before6) * 100);
  } else {
    return Math.round(((before12 - after12) / before12) * 100);
  }
};

function Ribbon({
  selectedMonth,
  before1,
  after1,
  before6,
  after6,
  before12,
  after12,
}) {
  return (
    <div className="ribbon z-20 flex flex-row-reverse gap-1.5 items-center">
      <div>
        {calcDisc(
          selectedMonth,
          before1,
          after1,
          before6,
          after6,
          before12,
          after12
        )}
        %
      </div>
      <div>OFF</div>
    </div>
  );
}

export default Ribbon;
