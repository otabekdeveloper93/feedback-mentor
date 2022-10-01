import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Roadmap from '../../pages/roadMap/Roadmap';

const RoadContext = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Roadmap />
        </DndProvider>
    );
};


export default RoadContext;