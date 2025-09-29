import React from "react";

export default function AttendancePreview() {
  const schedule = [
    { day: "Monday", date: "29", activity: "IT General", time: "10:00 AM - 07:00 PM", status: "Present" },
    { day: "Tuesday", date: "30", activity: "IT General", time: "10:00 AM - 07:00 PM", status: "Absent" },
  ];

  return (
    <div className="max-w-md mt-8">
      <table className="w-full border-collapse">
        <tbody>
          {schedule.map((item, index) => (
            <tr key={index} className="bg-gray-50 mb-2 rounded-lg">
              {/* Column 1: Week + Date */}
              <td className="p-4 align-middle">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="font-semibold text-gray-700">{item.day}</div>
                  <div className="mt-1 w-12 h-12 flex items-center justify-center bg-blue-200 text-blue-800 font-medium rounded">
                    {item.date}
                  </div>
                </div>
              </td>

              {/* Column 2: Activity + Time with background and left border */}
              <td className="p-4 align-middle">
                <div className="flex flex-col justify-center h-full bg-gray-100 border-l-4 border-blue-500 rounded-lg p-3">
                  <div className="text-gray-700 font-medium">{item.activity}</div>
                  <div className="text-gray-500 text-sm">{item.time}</div>
                </div>
              </td>

              {/* Column 3: Status */}
              <td className="p-4 align-middle text-right">
                <div className="flex items-center justify-center h-full">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      item.status === "Present" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
