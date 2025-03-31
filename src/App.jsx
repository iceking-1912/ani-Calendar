import React,{useState,} from "react";

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
        h = 60 * ((g / 255 - b / 255) / (max - min));
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
      <div className={`w-fit max-h-full  px-8 py-6 bg-dark-card rounded-[48px] inline-flex ${groups ? "flex-row gap-10" : "flex-col gap-6"}`}>
        {sections.map((section, index) => (
            <div key={index} className="w-full flex flex-col justify-between ">
              <div className="justify-center text-slate-400 text-2xl font-medium">{section.title}</div>
              <div className="flex flex-row gap-6.5">
                {section.items.map((item, subIndex) => (
                    <div className="flex flex-row gap-1.5" key={subIndex}>
                      <div className={`justify-center ${item.color || 'text-slate-400'} text-2xl font-medium`}>
                        {item.value}
                      </div>
                      <div className="justify-center text-slate-400 text-base font-normal">{item.label}</div>
                    </div>
                ))}
              </div>
            </div>
        ))}
      </div>
  );
};




function App() {


  const [selectedPeriod, setSelectedPeriod] = useState("Week");



  const TimeToggle = ({ selectedPeriod = "Week" }) => {
    const periods = ["Day", "Week", "Month", "Year"];

    return (
        <div className="w-fit h-fit mx-auto flex self-center items-center justify-center px-6 py-5 bg-dark-card rounded-[123px]">
          {periods.map((period, index) => (
              <React.Fragment key={period}>
                {/* Add time period */}
                <btn
                    // onclick={() => setSelectedPeriod(period)}
                    className={`text-center font-medium text-base ${
                        period === selectedPeriod ? "text-accent-purple" : "text-secondary-text"
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

          <div
              className="App-side-top h-10/12 rounded-4xl flex flex-col w-full items-center pt-7 gap-10 bg-dark-bg overflow-clip">

            <div className="grid grid-cols-2 justify-center content-center p-5 items-center text-center rounded-xl rounded-2xl bg-dark-card
            ">
              <img
                  src={GCal}
                  className="App-GCal-logo justify-center w-10.5"
                  alt="GCal"
              />
              <p className="flex  text-white text-center font-bold">Calendar
              {/*  <div className="relative">*/}
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
              {/*</div>*/}
              </p>

            </div>

            <div className="w-2/5 h-fit flex items-center justify-center gap-5 mx-auto">
              <img className="w-7.5 h-7.5" alt="Home" src={img13}/>
              <img className="w-7.5 h-7.5 -rotate-25" alt="Fav" src={img14}/>
              <img className="w-7.5 h-7.5" alt="Loca" src={img15}/>
            </div>

            <div className="flex flex-col min-h-3/5">
              <div className="Noti w-full h-fit px-6 rounded-[123px] inline-flex justify-center gap-6



              ">
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

              <div className="flex flex-col min-h-3/5  overflow-y-auto scrollbar-hide rounded-4xl p-2 gap-3.5">
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
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
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
                  1, 2, 3, 4, 5, 6,
                  7, 8, 9, 10, 11, 12, 13, 14,
                  15, 16, 17, 18, 19, 20, 21, 22,
                  23, 24, 25, 26, 27, 28, 29, 30, 31,
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


        <div className="App-side flex flex-col justify-between  w-full h-[98vh] gap-10 p-3 pl-5 rounded-[88px]
        ">

          <div className="w-full h-fit flex flex-row gap-30 mt-0  ">

            <div className="inline-flex  pl-10 flex-col justify-center self-center items-start gap-2">
              <div className="text-secondary-text text-2xl font-light">2023</div>
              <div className="text-primary-text text-5xl font-semibold">November</div>
            </div>

            <img src={addGneon} className="w-[76px] h-[76px]  self-end relative" />

            <TimeToggle selectedPeriod={selectedPeriod} />


            <div className="flex justify-start self-center items-center mr-10 w-full">
              <div className="w-fit flex items-center gap-2 bg-dark-card px-5 py-2 rounded-full ml-auto">
                {/* Notification count */}
                <span className="text-secondary-text text-sm font-medium">3</span>

                {/* Ticket icon */}
                <img src={ticket} alt="ticket" />

                {/* Divider */}
                <div className="h-4 w-px bg-secondary-text opacity-30"></div>

                {/* Notification container with badge */}
                <div className="relative">
                  <div className="w-10 h-10 bg-dark-bg rounded-full flex items-center justify-center">
                    <img src={notification} alt="notification" />
                  </div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-accent-green rounded-full"></div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>

          <div className="max-w-8/12 h-fit  self-end rounded-[48px]
          overflow-x-auto scrollbar-hide overflow-clip min-h-fit justify-end px-1.5" >

<div className="flex flex-row    gap-10">
  <InfoCard
                groups={[
                  {
                    title: "Event",
                    items: [
                      { label: "Passed", value: "3" },
                      { label: "Upcoming", value: "29", color: "text-accent-red" }
                    ]
                  }
                ]}
            />


            <InfoCard
                groups={[
                  {
                    title: "Free Days",
                    items: [
                      { label: "days", value: "53", color: "text-accent-green" }
                    ]
                  },
                  {
                    title: "Repeatable",
                    items: [
                      { label: "events", value: "12", color: "text-accent-yellow" }
                    ]
                  },
                  {
                    title: "Giveaway",
                    items: [
                      { label: "events", value: "4", color: "text-accent-red" }
                    ]
                  }
                ]}
            />

            <InfoCard
                groups={[
                  {
                    title: "Busy",
                    items: [
                      { label: "hrs", value: "14", color: "text-accent-purple" }
                    ]
                  }
                ]}
            />

            <InfoCard
                groups={[
                  {
                    title: "Free Days",
                    items: [
                      { label: "days", value: "53", color: "text-accent-green" }
                    ]
                  },
                  {
                    title: "Repeatable",
                    items: [
                      { label: "events", value: "12", color: "text-accent-yellow" }
                    ]
                  },
                  {
                    title: "Giveaway",
                    items: [
                      { label: "events", value: "4", color: "text-accent-yellow" }
                    ]
                  }
                ]}
            />



</div>

          </div>


          <div className="flex flex-row h-fit gap-10">
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
              className="Schedule h-full w-full rounded-[80px] flex justify-start gap-[0.1%] items-start overflow-hidden"
            >
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={`rectangle-${i + 4}`}
                  data-layer={`Rectangle ${i + 4}`}
                  className={`Rectangle${
                    i + 4
                  } flex-1 self-stretch bg-dark-card`}
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
            // <div className="bg-[#1b1b25] rounded-[48px] p-10 flex flex-col items-center">
            //   <div className="text-[#8a8aaa] text-xl font-medium">Event</div>
            //   <div className="text-[#8989aa] text-sm font-normal">Passed</div>
            //   <div className="text-[#8a8aab] text-xl font-medium">3</div>
            //   <div className="text-[#8989aa] text-sm font-normal">Upcoming</div>
            //   <div className="text-[#d53933] text-xl font-medium">29</div>
            // </div>
            // <div className="bg-[#1b1b25] rounded-[48px] p-3 flex flex-col items-center">
            //   <div className="text-[#8989aa] text-sm font-normal">hrs</div>
            //   <div className="text-[#9022ff] text-xl font-medium">14</div>
            //   <div className="text-[#8a8aaa] text-xl font-medium">Busy</div>
            // </div>
            // <div className="bg-[#1b1b25] rounded-[48px] p-3 flex items-center gap-4">
            //   <div className="text-[#8989aa] text-sm font-normal">days</div>
            //   <div className="text-[#71f10d] text-xl font-medium">53</div>
            //   <div className="text-[#8a8aaa] text-xl font-medium">Free days</div>
            //   <div className="text-[#8989aa] text-sm font-normal">events</div>
            //   <div className="text-[#fbea39] text-xl font-medium">12</div>
            //   <div className="text-[#8a8aaa] text-xl font-medium">Repeatable</div>
            // </div>
