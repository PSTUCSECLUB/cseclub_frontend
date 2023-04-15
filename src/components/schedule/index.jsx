import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const styles = [
  { background: "rgb(33, 150, 243)", color: "#fff" },
  { background: "rgb(33, 120, 243)", color: "#fff" },
  { background: "rgb(33, 100, 243)", color: "#fff" },
];

const icons = ["hour", "play", "view"];
const iconsMap = {
  hour: <HourglassEmptyIcon />,
  play: <PlayCircleFilledWhiteIcon />,
  view: <ViewAgendaIcon />,
};
export default function Schedule({ schedules = [] }) {
  return (
    <>
      {schedules.length > 0 && (
        <div className="schedule">
          <h3 className="schedule__title">Schedule</h3>
          <VerticalTimeline lineColor="gray">
            {schedules.map((s, i) => {
              return (
                <VerticalTimelineElement
                  key={i}
                  className="vertical-timeline-element--work"
                  contentStyle={
                    styles[Math.floor(Math.random() * styles.length)]
                  }
                  contentArrowStyle={{
                    borderRight: "7px solid  rgb(33, 150, 243)",
                  }}
                  iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                  icon={
                    iconsMap[icons[Math.floor(Math.random() * icons.length)]]
                  }
                >
                  <h3 className="vertical-timeline-element-title">{s.title}</h3>
                  <h4 className="vertical-timeline-element-subtitle">
                    {s.time}
                  </h4>
                  <p>{s.details} </p>
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
          ;
        </div>
      )}
    </>
  );
}
