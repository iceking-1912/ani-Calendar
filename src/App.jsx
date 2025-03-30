import React from "react";

import "./App.css";

import GCal from "./assets/GCal.svg";

import {
  img16,
  img13,
  img14,
  img15,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  noti1,
  noti2,
  img12,
  img17,
  img1,
  img18,
  MainLeft,
  addGneon,
  ticket,
  notification,
} from "./assets/index.js";

import { useExtractColors } from "react-extract-colors";

const NotiChild = ({ item, index }) => {
  const { dominantColor, loading } = useExtractColors(item[0]);

  // Function to check if a color is dark
  const isDarkColor = (color) => {
    if (!color) return true;
    // Convert hex to RGB and calculate luminance
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance < 0.5;
  };

  // Convert any color to a neon version
  const createNeonColor = (color) => {
    if (!color) return "#00ffff"; // Default cyan neon

    // If it's already an HSL color from the time-based fallback
    if (color.startsWith("hsl")) {
      // Extract hue from existing HSL
      const hue = color.match(/\d+/)[0];
      // Create a more intense neon color with high saturation and lightness
      return `hsl(${hue}, 100%, 65%)`;
    }

    // If it's a hex color
    try {
      const hex = color.replace("#", "");
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);

      // Convert RGB to HSL for easier manipulation
      // Simple conversion - this is an approximation
      const max = Math.max(r, g, b) / 255;
      const min = Math.min(r, g, b) / 255;

      // Calculate hue
      let h = 0;
      if (max === min) h = 0;
      else if (max === r / 255)
        h = 60 * (0 + (g / 255 - b / 255) / (max - min));
      else if (max === g / 255)
        h = 60 * (2 + (b / 255 - r / 255) / (max - min));
      else h = 60 * (4 + (r / 255 - g / 255) / (max - min));

      if (h < 0) h += 360;

      // Return a bright neon version
      return `hsl(${h}, 100%, 65%)`;
    } catch (e) {
      // Fallback to a bright color if conversion fails
      return `hsl(${new Date(item[2]).getHours() * 15}, 100%, 65%) ${e}`;
    }
  };

  // Adjust color if too dark - make it NEON instead of just using fallback
  const adjustedColor = loading
    ? "#00ffff"
    : isDarkColor(dominantColor)
    ? createNeonColor(dominantColor) // Make dark colors NEON
    : dominantColor;

  return (
    <React.Fragment>
      <div
        id={index}
        className="Frame14161 w-fit h-fit min-w-[141px] min-h-[100px] p-1.5 border-2 border-black rounded-4xl bg-dark-card inline-flex justify-start items-start gap-2.5 overflow-hidden m-1 mt-auto self-end box-border animate-fadeIn hover:scale-105 transition-transform duration-300 ease-in-out"
        style={{
          animationDelay: `${index * 0.2}s`,
        }}
      >
        <div
          style={{
            backgroundColor: adjustedColor,
            filter: "brightness(1.5) saturate(1.3)",
            boxShadow: loading ? "none" : `0 0 8px 2px ${adjustedColor}`,
            transition: "all 0.3s ease",
          }}
          className="w-[10px] h-[10px] ml-2 mx-1 relative aspect-square top-3.5 rounded-full animate-pulse"
        />
        <div className="w-full grid grid-rows-2 m-0 p-0 gap-2">
          <div className="grid grid-cols-2 w-full h-1/2 p-1 gap-2">
            <p
              className="text-primary-text text-[12px] self-center"
              style={{
                color: adjustedColor,
                filter: "brightness(1.5) saturate(1.3)",
              }}
            >
              {item[1]}
            </p>
            <img
              src={item[0]}
              className=" w-9 justify-self-end self-center hover:rotate-3 transition-transform duration-200"
            />
          </div>
          <div className="grid grid-rows-2 gap-1 w-full align-end tracking-tightest font-sans font-light h-1/2 text-secondary-text text-[10px]">
            <div className="whitespace-nowrap">{item[2]}</div>
            <div className="repeat-none">Repeat - None</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

function App() {
  const NotiList = [
    [noti1, "Addidas Giveaway", "06:00,Nov 22, 2023"],
    [noti2, "Product Meeting", "07:00,Dec 23, 2023"],
    [noti1, "Team Standup", "09:30,Dec 26, 2023"],
    [noti2, "Client Presentation", "14:00,Dec 28, 2023"],
    [img4, "Marketing Review", "11:15,Dec 29, 2023"],
    [img12, "Budget Planning", "13:45,Jan 03, 2024"],
    [noti1, "Project Kickoff", "10:00,Jan 08, 2024"],
  ];

  return (
    <>
      <div className="App w-[100%] max-h-[100lvh] bg-black flex flex-row items-center font-outfit">
        <div className="App-side flex flex-col justify-between w-1/8 min-w-[220px] h-[98vh] m-3 rounded-4xl gap-5">
          <div className="App-side-top h-9/12 rounded-4xl flex flex-col w-full items-center pt-7 gap-10 bg-dark-bg overflow-clip">
            <div className="grid grid-cols-2 justify-center content-center p-5 items-center text-center rounded-xl shadow-blu">
              <img
                src={GCal}
                className="App-GCal-logo justify-center w-10.5"
                alt="GCal"
              />
                          <p className="text-white text-center font-bold">Calendar</p>
            </div>
            <div className="w-2/5 h-fit flex items-center justify-center gap-5 mx-auto">
              <img className="w-7.5 h-7.5" alt="Home" src={img13} />
              <img className="w-7.5 h-7.5 -rotate-25" alt="Fav" src={img14} />
              <img className="w-7.5 h-7.5" alt="Loca" src={img15} />
            </div>

            <div className="flex flex-col min-h-3/5">
              <div className="Noti w-full h-fit px-6 rounded-[123px] inline-flex justify-center gap-6">
                <div className="text-[#9022ff] text-[15px] font-bold">
                  Unread
                </div>
                <div className="h-10 leading-5 text-primary-text opacity-60">
                  |
                </div>
                <div className="text-[#8a8aab] text-[15px] font-bold">
                  Accept
                </div>
              </div>

              <div className="flex flex-col min-h-3/5 overflow-y-auto scrollbar-hide rounded-4xl p-1 gap-3.5">
                {NotiList.map((item, index, array) => (
                  <NotiChild
                    key={index}
                    item={item}
                    index={index}
                    array={array}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="App-side-bot h-3/12 rounded-4xl w-full flex justify-center items-center bg-dark-bg font-extrabold pt-5 flex-col">
            <div className="w-full h-full relative flex justify-center p-3 items-center">
              <div className="w-full grid grid-cols-7 gap-1 -mt-3">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                  (day, index) => (
                    <div
                      key={`day-${index}`}
                      className="text-center bg-accent-green rounded-full gap-1 text-primary-text text-[12px] font-normal"
                    >
                      {day}
                    </div>
                  )
                )}
                {[
                  null,
                  null,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18,
                  19,
                  20,
                  21,
                  22,
                  23,
                  24,
                  25,
                  26,
                  27,
                  28,
                  29,
                  30,
                  31,
                  null,
                  null,
                ].map((date, index) => (
                  <div key={`date-${index}`} className="w-5 h-5">
                    {date && (
                      <div
                        className={`text-center text-[12px] font-normal ${
                          date <= 16 ? "text-white" : "text-secondary-text"
                        }`}
                      >
                        {date}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="App-side flex flex-col justify-between  w-full h-[98vh] gap-10 p-3 pl-5 rounded-[88px] custom-shape">
          <div className="w-full flex flex-row gap-30 ">
            <div className="inline-flex flex-col justify-start items-center gap-2">
              <div className="text-[#969eba] text-2xl font-light">2023</div>
              <div className="text-white text-5xl font-semibold">November</div>
            </div>

            <img src={addGneon} className="w-[76px] h-[76px] top-10 relative" />

            <div className="grid grid-cols-4 w-full h-[60px] my-5 bg-dark-card rounded-full justify-center items-center gap-1 m-0 p-4">
              {["Day", "Week", "Month", "Year"].map((item, index) => (
                <div
                  key={index}
                  className={`flex gap-0 justify-center items-center ${
                    index < 3
                      ? "border-r border-[#8a8aab] border-opacity-30"
                      : ""
                  }`}
                >
                  <p
                    className={`w-fit text-center text-[15px] font-medium ${
                      item === "Week" ? "text-[#9022ff]" : "text-[#8a8aab]"
                    }`}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-start items-center mr-10 w-full">
              <div className="w-fit flex items-center gap-2 bg-dark-card px-5 py-2 rounded-full ml-auto">
                {/* Notification count */}
                <span className="text-[#8a8aab] text-sm font-medium">3</span>

                {/* Ticket icon */}
                <img src={ticket} alt="ticket" />

                {/* Divider */}
                <div className="h-4 w-px bg-[#8a8aab] opacity-30"></div>

                {/* Notification container with badge */}
                <div className="relative">
                  <div className="w-10 h-10 bg-[#0d0d13] rounded-full flex items-center justify-center">
                    <img src={notification} alt="notification" />
                  </div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-[#71f10d] rounded-full"></div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>

          <div className="flex flex-row w-full h-fit justify-end px-1.5 gap-10">
            <div className="bg-[#1b1b25] rounded-[48px] p-10 flex flex-col items-center">
              <div className="text-[#8a8aaa] text-xl font-medium">Event</div>
              <div className="text-[#8989aa] text-sm font-normal">Passed</div>
              <div className="text-[#8a8aab] text-xl font-medium">3</div>
              <div className="text-[#8989aa] text-sm font-normal">Upcoming</div>
              <div className="text-[#d53933] text-xl font-medium">29</div>
            </div>
            <div className="bg-[#1b1b25] rounded-[48px] p-3 flex flex-col items-center">
              <div className="text-[#8989aa] text-sm font-normal">hrs</div>
              <div className="text-[#9022ff] text-xl font-medium">14</div>
              <div className="text-[#8a8aaa] text-xl font-medium">Busy</div>
            </div>
            <div className="bg-[#1b1b25] rounded-[48px] p-3 flex items-center gap-4">
              <div className="text-[#8989aa] text-sm font-normal">days</div>
              <div className="text-[#71f10d] text-xl font-medium">53</div>
              <div className="text-[#8a8aaa] text-xl font-medium">
                Free days
              </div>
              <div className="text-[#8989aa] text-sm font-normal">events</div>
              <div className="text-[#fbea39] text-xl font-medium">12</div>
              <div className="text-[#8a8aaa] text-xl font-medium">
                Repeatable
              </div>
            </div>
          </div>

          <div className="flex flex-row h-full gap-10">
            <div className="Frame13851 inline-flex flex-col justify-start items-end self-center pb-7 gap-7">
              {[
                "06:00",
                "07:00",
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
              ].map((item, index) => (
                <div
                  key={index}
                  className="00 text-center justify-start text-[#969eba] text-xs font-light font-['Outfit']"
                >
                  {item}
                </div>
              ))}
            </div>

            <div
              data-layer="SCHEDULE"
              className="Schedule h-full w-full rounded-[80px] flex justify-start items-start overflow-hidden"
            >
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={`rectangle-${i + 4}`}
                  data-layer={`Rectangle ${i + 4}`}
                  className={`Rectangle${
                    i + 4
                  } flex-1 self-stretch bg-[#1b1b25]`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
