import React, { useState } from "react";

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
  candle,
  setting,
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
      else if (max === r / 255) h = 60 * ((g / 255 - b / 255) / (max - min));
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
        className="Frame14161 w-full h-fit min-w-[141px] min-h-[100px] p-1.5 border-2 border-black rounded-4xl bg-dark-card inline-flex
        justify-start items-start gap-2.5 overflow-hidden m-1 mt-auto self-center box-border animate-fadeIn  transition-transform duration-200 ease-in-out

        "
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

// Usage example:
// <TimeToggle selectedPeriod="Week" />

const InfoCard = ({ title, items, groups }) => {
  // Create a normalized data structure regardless of input type
  const sections = groups || [{ title, items }];

  return (
    <div
      className={`w-fit max-h-full h-full px-8 py-6 bg-dark-card rounded-[48px] inline-flex ${
        groups ? "flex-row gap-10" : "flex-col gap-6"
      }`}
    >
      {sections.map((section, index) => (
        <div key={index} className="w-full flex flex-col justify-between ">
          <div className="justify-center text-slate-400 text-2xl font-medium">
            {section.title}
          </div>
          <div className="flex flex-row gap-6.5">
            {section.items.map((item, subIndex) => (
              <div className="flex flex-row gap-1.5" key={subIndex}>
                <div
                  className={`justify-center ${
                    item.color || "text-slate-400"
                  } text-2xl font-medium`}
                >
                  {item.value}
                </div>
                <div className="justify-center text-slate-400 text-base font-normal">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
const Event = ({
  color = "#D53933",
  textColor = "white",
  imgSrc = "https://placehold.co/111x111",
  title = "One Piece / Chapter 1093 - OFFLINE MEETING",
  time = "09:00 - 13:00, Nov 02 - 04, 2023",
  repeat = "Repeat - None",
}) => {
  return (
    <div className="relative w-full h-full">
      <div
        className="absolute w-[398px] h-[147px] rounded-[48px_32px_32px_48px] shadow-[0px_4px_100px] bg-opacity-100"
        style={{
          background: color,
          boxShadow: `0px 4px 100px ${color}`,
        }}
      />
      <div className="absolute left-[29px] top-[85px] flex flex-col gap-2">
        <div
          className="opacity-40 text-[12px] font-outfit font-medium"
          style={{ color: textColor }}
        >
          {time}
        </div>
        <div
          className="opacity-40 text-[12px] font-outfit font-medium"
          style={{ color: textColor }}
        >
          {repeat}
        </div>
      </div>
      <img
        className="absolute w-[111px] h-[111px] left-[268px] top-[18px] rounded-[24px]"
        src={imgSrc}
        alt="Event"
      />
      <div
        className="absolute w-[205px] left-[29px] top-[27px] text-[16px] font-outfit font-semibold leading-[22.4px]"
        style={{ color: textColor }}
      >
        {title}
      </div>
    </div>
  );
};

function App() {
  const [selectedPeriod, setSelectedPeriod] = useState("Week");

  const TimeToggle = ({ selectedPeriod = "Week" }) => {
    const periods = ["Day", "Week", "Month", "Year"];

    return (
      <div className="w-fit h-fit ml-25 flex self-center items-center justify-center px-6 py-4 bg-dark-card rounded-[123px]">
        {periods.map((period, index) => (
          <React.Fragment key={period}>
            {/* Add time period */}
            <btn
              // onclick={() => setSelectedPeriod(period)}
              className={`text-center font-medium text-base ${
                period === selectedPeriod
                  ? "text-accent-purple"
                  : "text-secondary-text"
              }`}
            >
              {period}
            </btn>

            {/* Add divider if not the last item */}
            {index < periods.length - 1 && (
              <div
                className="h-4 mx-4 opacity-30"
                style={{
                  borderLeft: "1px solid #8A8AAB",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

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
      <div className="App w-[100%] max-h-[100lvh] bg-black flex flex-row items-center p-2 font-outfit">
        <div className="App-side hidden xl:flex flex-col justify-between w-1/8 min-w-[220px] h-[98vh] m-3 rounded-4xl gap-2  ">
          <div className="App-side-top h-10/12 rounded-4xl flex flex-col w-full items-center pt-7 gap-10 bg-dark-bg overflow-clip">
            <div
              className="grid grid-cols-2 justify-center content-center p-5 items-center text-center rounded-xl  bg-dark-card
            "
            >
              <img
                src={GCal}
                className="App-GCal-logo justify-center w-10.5"
                alt="GCal"
              />
              <p className="flex  text-white text-center font-bold">
                Calendar
                {/* Drop Down Menu */}
                {/* <div className="relative">*/}
                {/*  <button*/}
                {/*      className="flex items-center gap-2 text-white hover:text-[#9022ff] transition-colors"*/}
                {/*      onClick={() => document.getElementById('dropdown-menu').classList.toggle('hidden')}*/}
                {/*  >*/}
                {/*    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"*/}
                {/*         xmlns="http://www.w3.org/2000/svg">*/}
                {/*      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>*/}
                {/*    </svg>*/}
                {/*  </button>*/}
                {/*  <div*/}
                {/*      id="dropdown-menu"*/}
                {/*      className="hidden absolute top-full right-full mt-2 w-24  rounded-xl bg-dark-card border border-slate-700 shadow-pur z-10"*/}
                {/*  >*/}
                {/*    <ul className="py-2 text-sm text-primary-text">*/}
                {/*      <li><a href="#" className="block px-4 py-2 hover:bg-[#2a2c42] hover:text-[#9022ff]">New Event</a>*/}
                {/*      </li>*/}
                {/*      <li><a href="#" className="block px-4 py-2 hover:bg-[#2a2c42] hover:text-[#9022ff]">Settings</a>*/}
                {/*      </li>*/}
                {/*      <li><a href="#" className="block px-4 py-2 hover:bg-[#2a2c42] hover:text-[#9022ff]">Sync</a></li>*/}
                {/*    </ul>*/}
                {/*  </div>*/}
                {/*</div> */}
              </p>
            </div>

            <div className="w-2/5 h-fit flex items-center justify-center gap-5 mx-auto">
              <img className="w-7.5 h-7.5" alt="Home" src={img13} />
              <img className="w-7.5 h-7.5 -rotate-25" alt="Fav" src={img14} />
              <img className="w-7.5 h-7.5" alt="Loca" src={img15} />
            </div>

            <div className="flex flex-col min-h-3/5">
              <div
                className="Noti w-full h-fit px-6 rounded-[123px] inline-flex justify-center gap-6



              "
              >
                <div className="text-accent-purple text-[15px] font-bold">
                  Unread
                </div>
                <div className="h-10 leading-5 text-primary-text opacity-60">
                  |
                </div>
                <div className="text-secondary-text text-[15px] font-bold">
                  Accept
                </div>
              </div>

              <div className="flex flex-col min-h-3/5 overflow-x-hidden overflow-y-auto scrollbar-hide rounded-4xl gap-2 px-2  ">
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

          <div className="App-side-bot h-2/12  rounded-4xl w-full justify-center items-center bg-dark-bg font-extrabold">
            <div className="w-full h-full  flex justify-center py-2 px-5 items-center">
              <div className="w-full grid grid-cols-7 gap-1 ">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                  (day, index) => (
                    <div
                      key={`day-${index}`}
                      className="text-center rounded-full gap-1 text-primary-text text-[12px] font-normal"
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
                  <div key={`date-${index}`} className="w-4 h-4">
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

        <div className="App-side flex flex-col  max-w-[100%-200px] w-full h-[98vh]  p-3 pl-5 rounded-[88px]  custom-shape ">
          <div className="max-w-[100%] h-fit flex flex-row  pt-10  ">
            <div className="h-fit flex flex-row w-fit p-0 m-0  gap-40">
              <div className="inline-flex  pl-10 flex-col justify-center self-center items-start gap-2">
                <div className="text-secondary-text text-2xl font-light">
                  2023
                </div>
                <div className="text-primary-text text-5xl font-semibold">
                  November
                </div>
              </div>

              <img src={addGneon} className="w-[76px] h-[76px] mt-8  " />
            </div>

            <div className="flex -mt-5  h-fit  mr-10 w-full items-start m-0 ">
              <TimeToggle selectedPeriod={selectedPeriod} className="" />

              <div className="w-fit flex items-center gap-2 bg-dark-card px-5 py-2 rounded-full ml-auto">
                <span className="text-secondary-text text-sm font-medium">
                  3
                </span>

                <img src={ticket} alt="ticket" />

                <div className="h-4 w-px bg-secondary-text opacity-30"></div>

                <div className="relative">
                  <div className="w-10 h-10 bg-dark-bg rounded-full flex items-center justify-center">
                    <img src={notification} alt="notification" />
                  </div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-accent-green rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="w-full h-fit flex flex-row self-start  items-end rounded-[10px] pt-12 pb-5  gap-10
            px-1.5 max-w-[100%]"
          >
            <div className="flex flex-col w-fit gap-3  h-fit  ">
              <img src={candle} alt="candle" />
              <img src={setting} alt="setting" />
            </div>

            <div className="flex flex-row ml-auto overflow-x-auto scrollbar-hide overflow-clip rounded-4xl min-h-fit w-full max-w-[80vw] h-full gap-2 ">
              <InfoCard
                groups={[
                  {
                    title: "Event",
                    items: [
                      { label: "Passed", value: "3" },
                      {
                        label: "Upcoming",
                        value: "29",
                        color: "text-accent-red",
                      },
                    ],
                  },
                ]}
              />

              <InfoCard
                groups={[
                  {
                    title: "Free Days",
                    items: [
                      {
                        label: "days",
                        value: "53",
                        color: "text-accent-green",
                      },
                    ],
                  },
                  {
                    title: "Repeatable",
                    items: [
                      {
                        label: "events",
                        value: "12",
                        color: "text-accent-yellow",
                      },
                    ],
                  },
                  {
                    title: "Giveaway",
                    items: [
                      { label: "events", value: "4", color: "text-accent-red" },
                    ],
                  },
                ]}
              />

              <InfoCard
                groups={[
                  {
                    title: "Busy",
                    items: [
                      {
                        label: "hrs",
                        value: "14",
                        color: "text-accent-purple",
                      },
                    ],
                  },
                ]}
              />

              <InfoCard
                groups={[
                  {
                    title: "Free Days",
                    items: [
                      {
                        label: "days",
                        value: "53",
                        color: "text-accent-green",
                      },
                    ],
                  },
                  {
                    title: "Repeatable",
                    items: [
                      {
                        label: "events",
                        value: "12",
                        color: "text-accent-yellow",
                      },
                    ],
                  },
                  {
                    title: "Giveaway",
                    items: [
                      {
                        label: "events",
                        value: "4",
                        color: "text-accent-yellow",
                      },
                    ],
                  },
                ]}
              />

              <InfoCard
                groups={[
                  {
                    title: "Free Days",
                    items: [
                      {
                        label: "days",
                        value: "53",
                        color: "text-accent-green",
                      },
                    ],
                  },
                  {
                    title: "Repeatable",
                    items: [
                      {
                        label: "events",
                        value: "12",
                        color: "text-accent-yellow",
                      },
                    ],
                  },
                  {
                    title: "Giveaway",
                    items: [
                      {
                        label: "events",
                        value: "4",
                        color: "text-accent-yellow",
                      },
                    ],
                  },
                ]}
              />
            </div>
          </div>

          <div className="flex flex-row h-full gap-10 mb-0 ">
            <div className="Frame13851 inline-flex flex-col justify-start items-end self-center pb-7 pt-20 gap-6">
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
              className="Schedule h-full w-full rounded-[88px] flex justify-start gap-[2px] items-start overflow-hidden"
            >
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={`rectangle-${i + 4}`}
                  data-layer={`Rectangle ${i + 4}`}
                  className={`Rectangle${
                    i + 4
                  } flex-1 self-stretch bg-dark-card`}
                ></div>
              ))}
            </div>

            {/* <Event color="#D53933"
              textColor="white"
              imgSrc={img9}
              title="One Piece / Chapter 1093 - OFFLINE MEETING"
              time="09:00 - 13:00, Nov 02 - 04, 2023"
              repeat="Repeat - None" /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
