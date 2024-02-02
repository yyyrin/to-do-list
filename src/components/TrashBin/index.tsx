import { Droppable } from "react-beautiful-dnd";
import * as style from "./styles";

interface ITrashBinProps {
  trashBinShow: boolean;
}

const TrashBin = ({ trashBinShow }: ITrashBinProps) => {
  return (
    <style.TrashBin $trashBinShow={trashBinShow}>
      <Droppable droppableId="trashbin" type="card">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <style.BinIcStyle $isDraggingOver={snapshot.isDraggingOver} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </style.TrashBin>
  );
};

export default TrashBin;
