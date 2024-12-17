import React from "react";

const page = () => {
  const childData = ["Benh 1", "Benh 2", "Benh 3", "Benh 4", "Benh 5"];

  return (
    <div className="pt-5 px-5">
      <h2 className="font-bold text-gray-500 text-lg">Check For</h2>

      <div>
        {childData.map((data) => (
          <div
            key={data}
            className="flex justify-between items-center border-b border-gray-200 py-3"
          >
            <p>{data}</p>
            <button className="bg-[#03DAC5] text-white px-3 py-1 rounded">
              Check
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
