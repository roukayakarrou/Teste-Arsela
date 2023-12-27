import "./Toolbox.css";
import { useDrag } from "react-dnd";
import { IoIosCheckboxOutline, IoMdRadioButtonOn } from "react-icons/io";
import { MdInput, MdOutlineLabel } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useDrop } from "react-dnd";

const Elements = [
  { id: "label", label: "Text Label", component: <MdOutlineLabel /> },
  { id: "input", label: "Text Input", component: <MdInput /> },
  { id: "checkbox", label: "Check box", component: <IoIosCheckboxOutline /> },
  { id: "radiobox", label: "Radio box", component: <IoMdRadioButtonOn /> },
  { id: "calendar", label: "Calendar", component: <FaRegCalendarAlt /> },
];

function Toolbox() {
  const [, drop] = useDrop({
    accept: "toolboxItem",
    drop: (item, monitor) => {
      const isOver = monitor.isOver({ shallow: true });
    },
  });

  const createDrag = (element) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "toolboxItem",
      item: { id: element.id, label: element.label },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return (
      <span
        key={element.id}
        ref={drag}
        className="grabbable"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        {element.component} {element.label}
      </span>
    );
  };

  return (
    <div className="toolbox" ref={drop}>
      <h3>Toolbox</h3>
      <p>
        <IoMdInformationCircleOutline style={{ fontSize: "18px" }} /> Drag and
        drop an item to create your form
      </p>
      {Elements.map((element) => createDrag(element))}
    </div>
  );
}

export default Toolbox;
